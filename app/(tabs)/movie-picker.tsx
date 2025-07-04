import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMovies } from '@/hooks/useMovies';

export default function MoviePickerScreen() {
  const { movies, addMovie, deleteMovie, pickRandom } = useMovies();
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');

  const handleAdd = () => {
    if (!title.trim()) return;
    addMovie({ title, genre });
    setTitle('');
    setGenre('');
  };

  const handlePick = () => {
    const movie = pickRandom();
    if (movie) {
      Alert.alert('Filme Sorteado', movie.title);
    } else {
      Alert.alert('Ops', 'Nenhum filme cadastrado');
    }
  };

  return (
    <View style={styles.container}>
      {/* Formulário de cadastro */}
      <View style={styles.formRow}>
        <TextInput
          style={styles.input}
          placeholder="Título do filme"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Gênero (opcional)"
          value={genre}
          onChangeText={setGenre}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Lista de filmes */}
      <FlatList
        data={movies}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <View>
              <Text style={styles.movieTitle}>{item.title}</Text>
              {item.genre ? <Text style={styles.movieGenre}>{item.genre}</Text> : null}
            </View>
            <TouchableOpacity onPress={() => deleteMovie(item.id)}>
              <Ionicons name="trash" size={20} color="#e74c3c" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum filme cadastrado</Text>}
      />

      {/* Botão de sorteio */}
      <TouchableOpacity style={styles.randomButton} onPress={handlePick}>
        <Text style={styles.randomButtonText}>Sortear Filme</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 8,
    height: 40,
  },
  addButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 6,
  },
  movieItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 4,
    elevation: 1,
  },
  movieTitle: {
    fontWeight: 'bold',
  },
  movieGenre: {
    color: '#666',
  },
  randomButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  randomButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
}); 