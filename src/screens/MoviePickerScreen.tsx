import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { Movie } from '../types';
import {
  getMovies,
  addMovie,
  deleteMovie,
  getRandomMovie,
  initializeDefaultData,
} from '../utils/storage';

const { width } = Dimensions.get('window');

const MoviePickerScreen: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [newMovie, setNewMovie] = useState({
    title: '',
    genre: '',
    duration: '',
    rating: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await initializeDefaultData();
      const moviesData = await getMovies();
      setMovies(moviesData);
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMovie = async () => {
    if (!newMovie.title.trim()) {
      Alert.alert('Erro', 'Por favor, adicione um título para o filme.');
      return;
    }

    try {
      const addedMovie = await addMovie(newMovie);
      setMovies([...movies, addedMovie]);
      setNewMovie({ title: '', genre: '', duration: '', rating: 0 });
      setAddModalVisible(false);
      Alert.alert('Sucesso', 'Filme adicionado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar o filme.');
    }
  };

  const handleDeleteMovie = (movieId: string) => {
    Alert.alert(
      'Confirmar',
      'Tem certeza que deseja excluir este filme?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteMovie(movieId);
              setMovies(movies.filter(movie => movie.id !== movieId));
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o filme.');
            }
          },
        },
      ]
    );
  };

  const handleRandomPick = async () => {
    if (movies.length === 0) {
      Alert.alert('Ops!', 'Adicione alguns filmes primeiro para fazer o sorteio!');
      return;
    }

    setIsSpinning(true);
    setSelectedMovie(null);

    // Simulate spinning animation
    setTimeout(async () => {
      try {
        const randomMovie = await getRandomMovie();
        setSelectedMovie(randomMovie);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível sortear um filme.');
      } finally {
        setIsSpinning(false);
      }
    }, 2000);
  };

  const MovieCard: React.FC<{ movie: Movie; index: number }> = ({ movie, index }) => (
    <Animatable.View
      animation="fadeInUp"
      delay={index * 100}
      style={styles.movieCard}
    >
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle}>{movie.title}</Text>
        {movie.genre && <Text style={styles.movieGenre}>{movie.genre}</Text>}
        {movie.duration && <Text style={styles.movieDuration}>⏱️ {movie.duration}</Text>}
        {movie.rating && movie.rating > 0 && (
          <Text style={styles.movieRating}>⭐ {movie.rating}/10</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteMovie(movie.id)}
      >
        <Ionicons name="trash" size={20} color="#e74c3c" />
      </TouchableOpacity>
    </Animatable.View>
  );

  if (loading) {
    return (
      <LinearGradient colors={['#f093fb', '#f5576c']} style={styles.container}>
        <View style={styles.loadingContainer}>
          <Animatable.Text
            animation="pulse"
            iterationCount="infinite"
            style={styles.loadingText}
          >
            Carregando filmes...
          </Animatable.Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#f093fb', '#f5576c']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Animatable.View animation="fadeInDown" style={styles.header}>
          <Text style={styles.title}>🎬 Sorteio de Filmes 🎬</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setAddModalVisible(true)}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </Animatable.View>

        {/* Random Pick Section */}
        <Animatable.View animation="fadeInUp" delay={300} style={styles.pickerSection}>
          <TouchableOpacity
            style={[styles.spinButton, isSpinning && styles.spinButtonDisabled]}
            onPress={handleRandomPick}
            disabled={isSpinning}
          >
            <Animatable.View
              animation={isSpinning ? 'rotate' : undefined}
              iterationCount={isSpinning ? 'infinite' : 1}
            >
              <Ionicons
                name="film"
                size={40}
                color="white"
              />
            </Animatable.View>
            <Text style={styles.spinButtonText}>
              {isSpinning ? 'Sorteando...' : 'Sortear Filme'}
            </Text>
          </TouchableOpacity>

          {selectedMovie && (
            <Animatable.View
              animation="bounceIn"
              style={styles.selectedMovieCard}
            >
              <Text style={styles.selectedTitle}>🎉 Filme Sorteado!</Text>
              <Text style={styles.selectedMovieTitle}>{selectedMovie.title}</Text>
              {selectedMovie.genre && (
                <Text style={styles.selectedMovieInfo}>Gênero: {selectedMovie.genre}</Text>
              )}
              {selectedMovie.duration && (
                <Text style={styles.selectedMovieInfo}>Duração: {selectedMovie.duration}</Text>
              )}
              {selectedMovie.rating && selectedMovie.rating > 0 && (
                <Text style={styles.selectedMovieInfo}>Nota: ⭐ {selectedMovie.rating}/10</Text>
              )}
            </Animatable.View>
          )}
        </Animatable.View>

        {/* Movies List */}
        <Animatable.View animation="fadeInUp" delay={600} style={styles.moviesSection}>
          <Text style={styles.sectionTitle}>
            📋 Seus Filmes ({movies.length})
          </Text>
          
          {movies.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                Nenhum filme cadastrado ainda.
              </Text>
              <Text style={styles.emptySubtext}>
                Toque no + para adicionar seu primeiro filme!
              </Text>
            </View>
          ) : (
            <FlatList
              data={movies}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <MovieCard movie={item} index={index} />
              )}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          )}
        </Animatable.View>
      </ScrollView>

      {/* Add Movie Modal */}
      <Modal
        visible={addModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Adicionar Filme</Text>
            <TouchableOpacity onPress={() => setAddModalVisible(false)}>
              <Ionicons name="close" size={24} color="#2c3e50" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Título *</Text>
              <TextInput
                style={styles.input}
                value={newMovie.title}
                onChangeText={(text) =>
                  setNewMovie({ ...newMovie, title: text })
                }
                placeholder="Ex: Vingadores: Ultimato"
                maxLength={100}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Gênero</Text>
              <TextInput
                style={styles.input}
                value={newMovie.genre}
                onChangeText={(text) =>
                  setNewMovie({ ...newMovie, genre: text })
                }
                placeholder="Ex: Ação, Romance, Comédia..."
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Duração</Text>
              <TextInput
                style={styles.input}
                value={newMovie.duration}
                onChangeText={(text) =>
                  setNewMovie({ ...newMovie, duration: text })
                }
                placeholder="Ex: 2h 30min"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nota (0-10)</Text>
              <TextInput
                style={styles.input}
                value={newMovie.rating ? newMovie.rating.toString() : ''}
                onChangeText={(text) =>
                  setNewMovie({ ...newMovie, rating: parseInt(text) || 0 })
                }
                placeholder="Ex: 8"
                keyboardType="numeric"
                maxLength={2}
              />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleAddMovie}>
              <Text style={styles.saveButtonText}>Adicionar Filme</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    padding: 10,
  },
  pickerSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  spinButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 40,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
  },
  spinButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  spinButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 10,
  },
  selectedMovieCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    width: width - 40,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  selectedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 10,
  },
  selectedMovieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 10,
  },
  selectedMovieInfo: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 5,
  },
  moviesSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  emptyState: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#2c3e50',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
  },
  movieCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  movieInfo: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  movieGenre: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 3,
  },
  movieDuration: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 3,
  },
  movieRating: {
    fontSize: 14,
    color: '#f39c12',
  },
  deleteButton: {
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  saveButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MoviePickerScreen;