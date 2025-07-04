import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#e74c3c',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'heart' : 'heart-outline'} size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="movie-picker"
        options={{
          title: 'Filmes',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'film' : 'film-outline'} size={28} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="activity-wheel"
        options={{
          title: 'Atividades',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'game-controller' : 'game-controller-outline'} size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
