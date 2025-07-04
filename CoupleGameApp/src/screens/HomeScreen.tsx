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
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { Image } from 'react-native';
import { CoupleData } from '../types';
import { getCoupleData, saveCoupleData } from '../utils/storage';

const { width, height } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const [coupleData, setCoupleData] = useState<CoupleData>({
    person1Name: '',
    person2Name: '',
  });
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCoupleData();
  }, []);

  const loadCoupleData = async () => {
    try {
      const data = await getCoupleData();
      if (data) {
        setCoupleData(data);
      }
    } catch (error) {
      console.error('Error loading couple data:', error);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async (person: 'person1' | 'person2') => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permissão necessária',
        'Precisamos de acesso à galeria para escolher uma foto.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const updatedData = {
        ...coupleData,
        [`${person}Photo`]: result.assets[0].uri,
      };
      setCoupleData(updatedData);
      await saveCoupleData(updatedData);
    }
  };

  const saveData = async () => {
    if (!coupleData.person1Name || !coupleData.person2Name) {
      Alert.alert('Erro', 'Por favor, preencha os nomes do casal.');
      return;
    }
    
    try {
      await saveCoupleData(coupleData);
      setEditModalVisible(false);
      Alert.alert('Sucesso', 'Dados salvos com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
    }
  };

  const calculateDaystogether = () => {
    if (!coupleData.anniversaryDate) return null;
    const today = new Date();
    const anniversary = new Date(coupleData.anniversaryDate);
    const diffTime = Math.abs(today.getTime() - anniversary.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const PersonCard: React.FC<{ 
    name: string; 
    photo?: string; 
    person: 'person1' | 'person2';
    delay: number;
  }> = ({ name, photo, person, delay }) => (
    <Animatable.View
      animation="fadeInUp"
      delay={delay}
      style={styles.personCard}
    >
      <TouchableOpacity
        style={styles.photoContainer}
        onPress={() => pickImage(person)}
      >
        {photo ? (
          <Image source={{ uri: photo }} style={styles.photo} />
        ) : (
          <View style={styles.placeholderPhoto}>
            <Ionicons name="camera" size={40} color="#bdc3c7" />
            <Text style={styles.placeholderText}>Adicionar Foto</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.personName}>{name || 'Nome'}</Text>
    </Animatable.View>
  );

  if (loading) {
    return (
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
        <View style={styles.loadingContainer}>
          <Animatable.Text
            animation="pulse"
            iterationCount="infinite"
            style={styles.loadingText}
          >
            Carregando...
          </Animatable.Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Animatable.View animation="fadeInDown" style={styles.header}>
          <Text style={styles.title}>💕 Nosso App do Amor 💕</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditModalVisible(true)}
          >
            <Ionicons name="settings" size={24} color="white" />
          </TouchableOpacity>
        </Animatable.View>

        {/* Couple Photos */}
        <View style={styles.coupleContainer}>
          <PersonCard
            name={coupleData.person1Name}
            photo={coupleData.person1Photo}
            person="person1"
            delay={300}
          />
          
          <Animatable.View
            animation="heartBeat"
            iterationCount="infinite"
            style={styles.heartContainer}
          >
            <Text style={styles.heartIcon}>❤️</Text>
          </Animatable.View>
          
          <PersonCard
            name={coupleData.person2Name}
            photo={coupleData.person2Photo}
            person="person2"
            delay={600}
          />
        </View>

        {/* Relationship Info */}
        {coupleData.anniversaryDate && (
          <Animatable.View animation="fadeInUp" delay={900} style={styles.infoCard}>
            <Text style={styles.infoTitle}>📅 Tempo Juntos</Text>
            <Text style={styles.infoValue}>
              {calculateDaystogether()} dias de amor!
            </Text>
          </Animatable.View>
        )}

        {/* Relationship Goals */}
        {coupleData.relationshipGoals && coupleData.relationshipGoals.length > 0 && (
          <Animatable.View animation="fadeInUp" delay={1200} style={styles.infoCard}>
            <Text style={styles.infoTitle}>🎯 Nossos Objetivos</Text>
            {coupleData.relationshipGoals.map((goal, index) => (
              <Text key={index} style={styles.goalText}>
                • {goal}
              </Text>
            ))}
          </Animatable.View>
        )}

        {/* Welcome Message */}
        <Animatable.View animation="fadeInUp" delay={1500} style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>
            Bem-vindos ao nosso app especial! 🎮
          </Text>
          <Text style={styles.welcomeSubtext}>
            Use as abas abaixo para sortear filmes ou girar a roleta de atividades!
          </Text>
        </Animatable.View>
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Editar Informações</Text>
            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
              <Ionicons name="close" size={24} color="#2c3e50" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nome da Pessoa 1</Text>
              <TextInput
                style={styles.input}
                value={coupleData.person1Name}
                onChangeText={(text) =>
                  setCoupleData({ ...coupleData, person1Name: text })
                }
                placeholder="Digite o nome..."
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nome da Pessoa 2</Text>
              <TextInput
                style={styles.input}
                value={coupleData.person2Name}
                onChangeText={(text) =>
                  setCoupleData({ ...coupleData, person2Name: text })
                }
                placeholder="Digite o nome..."
              />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={saveData}>
              <Text style={styles.saveButtonText}>Salvar</Text>
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
  editButton: {
    padding: 10,
  },
  coupleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 30,
  },
  personCard: {
    alignItems: 'center',
  },
  photoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  placeholderPhoto: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 10,
    color: '#bdc3c7',
    textAlign: 'center',
    marginTop: 5,
  },
  personName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  heartContainer: {
    marginHorizontal: 20,
  },
  heartIcon: {
    fontSize: 40,
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  infoValue: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
  },
  goalText: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 5,
  },
  welcomeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 10,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
    lineHeight: 22,
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

export default HomeScreen;