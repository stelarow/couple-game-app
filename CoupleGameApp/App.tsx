import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { initializeDefaultData } from './src/utils/storage';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import MoviePickerScreen from './src/screens/MoviePickerScreen';
import ActivityWheelScreen from './src/screens/ActivityWheelScreen';

// Types
import { RootTabParamList } from './src/types';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  useEffect(() => {
    // Initialize default data when app starts
    initializeDefaultData();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'Home') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'MoviePicker') {
              iconName = focused ? 'film' : 'film-outline';
            } else if (route.name === 'ActivityWheel') {
              iconName = focused ? 'game-controller' : 'game-controller-outline';
            } else {
              iconName = 'help-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#e74c3c',
          tabBarInactiveTintColor: '#95a5a6',
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopWidth: 0,
            elevation: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Início',
          }}
        />
        <Tab.Screen
          name="MoviePicker"
          component={MoviePickerScreen}
          options={{
            tabBarLabel: 'Filmes',
          }}
        />
        <Tab.Screen
          name="ActivityWheel"
          component={ActivityWheelScreen}
          options={{
            tabBarLabel: 'Atividades',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
