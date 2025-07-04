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
import { Activity } from '../types';
import {
  getActivities,
  addActivity,
  deleteActivity,
  initializeDefaultData,
} from '../utils/storage';
import AnimatedWheel from '../components/AnimatedWheel';

const { width } = Dimensions.get('window');

const ActivityWheelScreen: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [newActivity, setNewActivity] = useState({
    name: '',
    category: '',
    difficulty: 'easy' as 'easy' | 'medium' | 'hard',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await initializeDefaultData();
      const activitiesData = await getActivities();
      setActivities(activitiesData);
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddActivity = async () => {
    if (!newActivity.name.trim()) {
      Alert.alert('Erro', 'Por favor, adicione um nome para a atividade.');
      return;
    }

    try {
      const addedActivity = await addActivity(newActivity);
      setActivities([...activities, addedActivity]);
      setNewActivity({ name: '', category: '', difficulty: 'easy' });
      setAddModalVisible(false);
      Alert.alert('Sucesso', 'Atividade adicionada com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar a atividade.');
    }
  };

  const handleDeleteActivity = (activityId: string) => {
    Alert.alert(
      'Confirmar',
      'Tem certeza que deseja excluir esta atividade?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteActivity(activityId);
              setActivities(activities.filter(activity => activity.id !== activityId));
              // Reset selected activity if it was deleted
              if (selectedActivity && selectedActivity.id === activityId) {
                setSelectedActivity(null);
              }
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir a atividade.');
            }
          },
        },
      ]
    );
  };

  const handleSpinComplete = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsSpinning(false);
  };

  const handleSpinStart = () => {
    setIsSpinning(true);
    setSelectedActivity(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#27ae60';
      case 'medium': return '#f39c12';
      case 'hard': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return difficulty;
    }
  };

  const ActivityCard: React.FC<{ activity: Activity; index: number }> = ({ activity, index }) => (
    <Animatable.View
      animation="fadeInUp"
      delay={index * 100}
      style={styles.activityCard}
    >
      <View style={styles.activityInfo}>
        <Text style={styles.activityName}>{activity.name}</Text>
        {activity.category && (
          <Text style={styles.activityCategory}>📂 {activity.category}</Text>
        )}
        {activity.difficulty && (
          <View style={styles.difficultyContainer}>
            <View style={[
              styles.difficultyBadge,
              { backgroundColor: getDifficultyColor(activity.difficulty) }
            ]}>
              <Text style={styles.difficultyText}>
                {getDifficultyText(activity.difficulty)}
              </Text>
            </View>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteActivity(activity.id)}
      >
        <Ionicons name="trash" size={20} color="#e74c3c" />
      </TouchableOpacity>
    </Animatable.View>
  );

  if (loading) {
    return (
      <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.container}>
        <View style={styles.loadingContainer}>
          <Animatable.Text
            animation="pulse"
            iterationCount="infinite"
            style={styles.loadingText}
          >
            Carregando atividades...
          </Animatable.Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Animatable.View animation="fadeInDown" style={styles.header}>
          <Text style={styles.title}>🎯 Roleta de Atividades 🎯</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setAddModalVisible(true)}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </Animatable.View>

        {/* Wheel Section */}
        <Animatable.View animation="fadeInUp" delay={300} style={styles.wheelSection}>
          <AnimatedWheel
            activities={activities}
            onSpinComplete={handleSpinComplete}
            isSpinning={isSpinning}
          />
          
          {activities.length > 0 && !isSpinning && (
            <TouchableOpacity
              style={styles.spinTriggerButton}
              onPress={handleSpinStart}
            >
              <Text style={styles.spinTriggerText}>🎲 Girar Roleta!</Text>
            </TouchableOpacity>
          )}
        </Animatable.View>

        {/* Selected Activity */}
        {selectedActivity && !isSpinning && (
          <Animatable.View
            animation="bounceIn"
            style={styles.selectedActivityCard}
          >
            <Text style={styles.selectedTitle}>🎉 Atividade Escolhida!</Text>
            <Text style={styles.selectedActivityName}>{selectedActivity.name}</Text>
            {selectedActivity.category && (
              <Text style={styles.selectedActivityInfo}>
                Categoria: {selectedActivity.category}
              </Text>
            )}
            {selectedActivity.difficulty && (
              <View style={styles.selectedDifficultyContainer}>
                <Text style={styles.selectedActivityInfo}>Dificuldade: </Text>
                <View style={[
                  styles.difficultyBadge,
                  { backgroundColor: getDifficultyColor(selectedActivity.difficulty) }
                ]}>
                  <Text style={styles.difficultyText}>
                    {getDifficultyText(selectedActivity.difficulty)}
                  </Text>
                </View>
              </View>
            )}
          </Animatable.View>
        )}

        {/* Activities List */}
        <Animatable.View animation="fadeInUp" delay={600} style={styles.activitiesSection}>
          <Text style={styles.sectionTitle}>
            📋 Suas Atividades ({activities.length})
          </Text>
          
          {activities.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                Nenhuma atividade cadastrada ainda.
              </Text>
              <Text style={styles.emptySubtext}>
                Toque no + para adicionar sua primeira atividade!
              </Text>
            </View>
          ) : (
            <FlatList
              data={activities}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <ActivityCard activity={item} index={index} />
              )}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          )}
                 </Animatable.View>
      </ScrollView>

      {/* Add Activity Modal */}
      <Modal
        visible={addModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Adicionar Atividade</Text>
            <TouchableOpacity onPress={() => setAddModalVisible(false)}>
              <Ionicons name="close" size={24} color="#2c3e50" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nome da Atividade *</Text>
              <TextInput
                style={styles.input}
                value={newActivity.name}
                onChangeText={(text) =>
                  setNewActivity({ ...newActivity, name: text })
                }
                placeholder="Ex: Cozinhar juntos"
                maxLength={50}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Categoria</Text>
              <TextInput
                style={styles.input}
                value={newActivity.category}
                onChangeText={(text) =>
                  setNewActivity({ ...newActivity, category: text })
                }
                placeholder="Ex: Casa, Ao ar livre, Diversão..."
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Dificuldade</Text>
              <View style={styles.difficultySelector}>
                {(['easy', 'medium', 'hard'] as const).map((difficulty) => (
                  <TouchableOpacity
                    key={difficulty}
                    style={[
                      styles.difficultyOption,
                      {
                        backgroundColor: newActivity.difficulty === difficulty
                          ? getDifficultyColor(difficulty)
                          : '#ecf0f1'
                      }
                    ]}
                    onPress={() => setNewActivity({ ...newActivity, difficulty })}
                  >
                    <Text style={[
                      styles.difficultyOptionText,
                      {
                        color: newActivity.difficulty === difficulty ? 'white' : '#2c3e50'
                      }
                    ]}>
                      {getDifficultyText(difficulty)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleAddActivity}>
              <Text style={styles.saveButtonText}>Adicionar Atividade</Text>
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
  wheelSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  spinTriggerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  spinTriggerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  selectedActivityCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
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
  selectedActivityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 10,
  },
  selectedActivityInfo: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 5,
  },
  selectedDifficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activitiesSection: {
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
  activityCard: {
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
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  activityCategory: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  difficultyContainer: {
    flexDirection: 'row',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
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
  difficultySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  difficultyOption: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  difficultyOptionText: {
    fontSize: 14,
    fontWeight: 'bold',
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

export default ActivityWheelScreen;