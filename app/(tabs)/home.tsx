import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.2, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <View style={styles.container}>
      {/* Fotos do casal */}
      <View style={styles.photosRow}>
        {[0, 1].map((idx) => (
          <TouchableOpacity key={idx} style={styles.photoPlaceholder}>
            <Ionicons name="camera" size={32} color="#666" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Coração pulsante */}
      <Animated.View style={{ transform: [{ scale: pulseAnim }], marginVertical: 20 }}>
        <Ionicons name="heart" size={64} color="#e74c3c" />
      </Animated.View>

      {/* Informações do relacionamento */}
      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Nomes:</Text>
        <Text style={styles.infoText}>Alice & Bob</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Tempo juntos:</Text>
        <Text style={styles.infoText}>2 anos e 3 meses</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Objetivos:</Text>
        <Text style={styles.infoText}>Viajar mais e assistir 1 filme por semana</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },
  photosRow: {
    flexDirection: 'row',
    gap: 20,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBox: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 6,
    borderRadius: 8,
    elevation: 2,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  infoText: {
    marginTop: 4,
    color: '#555',
  },
}); 