import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useActivities } from '@/hooks/useActivities';

export default function ActivityWheelScreen() {
  const { activities, addActivity, deleteActivity, pickRandom } = useActivities();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const handleAdd = () => {
    if (!name.trim()) return;
    addActivity({ name, category });
    setName('');
    setCategory('');
  };

  const handleSpin = () => {
    const activity = pickRandom();
    if (activity) {
      Alert.alert('Atividade Sorteada', activity.name);
    } else {
      Alert.alert('Ops', 'Nenhuma atividade cadastrada');
    }
  };

  return (
    <View style={styles.container}>
      {/* Formulário */}
      <View style={styles.formRow}>
        <TextInput
          style={styles.input}
          placeholder="Nome da atividade"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Categoria (opcional)"
          value={category}
          onChangeText={setCategory}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Lista */}
      <FlatList
        data={activities}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              {item.category ? <Text style={styles.itemCategory}>{item.category}</Text> : null}
            </View>
            <TouchableOpacity onPress={() => deleteActivity(item.id)}>
              <Ionicons name="trash" size={20} color="#e74c3c" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhuma atividade cadastrada</Text>}
      />

      {/* Botão de roleta */}
      <TouchableOpacity style={styles.spinButton} onPress={handleSpin}>
        <Text style={styles.spinButtonText}>Girar Roleta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
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
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 4,
    elevation: 1,
  },
  itemName: { fontWeight: 'bold' },
  itemCategory: { color: '#666' },
  spinButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#9b59b6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  spinButtonText: { color: '#fff', fontWeight: 'bold' },
}); 