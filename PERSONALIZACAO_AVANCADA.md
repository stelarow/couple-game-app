# 🛠️ Personalização Avançada - App do Casal

## 🎨 Customizações Visuais

### Alterando Temas das Telas

#### Gradientes
Cada tela possui um gradiente único. Para alterar:

**HomeScreen.tsx:**
```tsx
<LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
```

**MoviePickerScreen.tsx:**
```tsx
<LinearGradient colors={['#f093fb', '#f5576c']} style={styles.container}>
```

**ActivityWheelScreen.tsx:**
```tsx
<LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.container}>
```

#### Cores da Roleta
No arquivo `AnimatedWheel.tsx`, modifique o array de cores:

```tsx
const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
  // Adicione mais cores aqui
];
```

### Ícones da Navegação
No `App.tsx`, altere os ícones das abas:

```tsx
if (route.name === 'Home') {
  iconName = focused ? 'heart' : 'heart-outline';
} else if (route.name === 'MoviePicker') {
  iconName = focused ? 'film' : 'film-outline';
} else if (route.name === 'ActivityWheel') {
  iconName = focused ? 'game-controller' : 'game-controller-outline';
}
```

## 🗃️ Adicionando Novos Dados

### Filmes Padrão Personalizados
Edite `storage.ts` na função `initializeDefaultData()`:

```tsx
const defaultMovies = [
  { title: 'Seu Filme Favorito', genre: 'Romance', duration: '2h', rating: 10 },
  { title: 'Filme de Ação', genre: 'Ação', duration: '1h 45min', rating: 8 },
  // Adicione mais filmes aqui
];
```

### Atividades Personalizadas
```tsx
const defaultActivities = [
  { name: 'Sua Atividade', category: 'Romântico', difficulty: 'easy' as const },
  { name: 'Aventura', category: 'Esporte', difficulty: 'hard' as const },
  // Adicione mais atividades aqui
];
```

## 🎮 Funcionalidades Extras

### Adicionando Nova Tela
1. **Crie o arquivo da tela** em `src/screens/`:

```tsx
// src/screens/NewScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NewScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Nova Tela</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default NewScreen;
```

2. **Adicione aos tipos** em `src/types/index.ts`:

```tsx
export type RootTabParamList = {
  Home: undefined;
  MoviePicker: undefined;
  ActivityWheel: undefined;
  NewScreen: undefined; // Nova tela
};
```

3. **Configure a navegação** em `App.tsx`:

```tsx
import NewScreen from './src/screens/NewScreen';

// Dentro do Tab.Navigator:
<Tab.Screen
  name="NewScreen"
  component={NewScreen}
  options={{
    tabBarLabel: 'Nova Tela',
  }}
/>
```

### Sistema de Pontuação
Adicione pontuação para atividades completadas:

```tsx
// Em types/index.ts
export interface ScoreData {
  totalActivities: number;
  totalMovies: number;
  points: number;
}

// Em storage.ts
export const addPoints = async (points: number): Promise<void> => {
  try {
    const currentScore = await getScore();
    const newScore = {
      ...currentScore,
      points: currentScore.points + points,
    };
    await AsyncStorage.setItem('@CoupleGameApp:score', JSON.stringify(newScore));
  } catch (error) {
    console.error('Error adding points:', error);
  }
};
```

### Histórico de Sorteios
Implemente um sistema de histórico:

```tsx
// Em types/index.ts
export interface HistoryItem {
  id: string;
  type: 'movie' | 'activity';
  item: Movie | Activity;
  timestamp: Date;
}

// Em storage.ts
export const addToHistory = async (item: HistoryItem): Promise<void> => {
  try {
    const history = await getHistory();
    const updatedHistory = [item, ...history].slice(0, 50); // Últimos 50
    await AsyncStorage.setItem('@CoupleGameApp:history', JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Error adding to history:', error);
  }
};
```

## 🎭 Animações Personalizadas

### Adicionando Novas Animações
Use `react-native-animatable` para animações simples:

```tsx
import * as Animatable from 'react-native-animatable';

// Animação personalizada
<Animatable.View
  animation="bounceIn"
  delay={500}
  duration={1000}
  iterationCount={1}
>
  <Text>Texto animado</Text>
</Animatable.View>
```

### Animações com Reanimated 3
Para animações avançadas:

```tsx
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const CustomAnimation = () => {
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  
  const handlePress = () => {
    scale.value = withSpring(scale.value === 1 ? 1.2 : 1);
  };
  
  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity onPress={handlePress}>
        <Text>Toque para animar</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
```

## 📱 Funcionalidades Nativas

### Notificações Locais
Para lembrar de usar o app:

```bash
npx expo install expo-notifications
```

```tsx
import * as Notifications from 'expo-notifications';

const scheduleNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hora do casal! 💕",
      body: "Que tal sortear uma atividade?",
    },
    trigger: { seconds: 60 },
  });
};
```

### Haptic Feedback
Para feedback tátil:

```bash
npx expo install expo-haptics
```

```tsx
import * as Haptics from 'expo-haptics';

const handleSpinWithHaptic = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  // Depois execute o sorteio
};
```

## 🎨 Temas Dinâmicos

### Sistema de Temas
Crie um contexto para temas:

```tsx
// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface Theme {
  primary: string;
  secondary: string;
  background: string[];
}

const themes = {
  romantic: {
    primary: '#e74c3c',
    secondary: '#f39c12',
    background: ['#667eea', '#764ba2'],
  },
  ocean: {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: ['#4facfe', '#00f2fe'],
  },
};

const ThemeContext = createContext(themes.romantic);

export const useTheme = () => useContext(ThemeContext);
```

## 🔧 Configurações Avançadas

### Modo Dark/Light
Implemente alternância de temas:

```tsx
import { useColorScheme } from 'react-native';

const isDark = useColorScheme() === 'dark';
const backgroundColors = isDark 
  ? ['#2c3e50', '#34495e'] 
  : ['#667eea', '#764ba2'];
```

### Configurações Personalizadas
Adicione um sistema de configurações:

```tsx
// Em types/index.ts
export interface AppSettings {
  theme: 'romantic' | 'ocean' | 'sunset';
  animations: boolean;
  notifications: boolean;
  autoPlay: boolean;
}

// Implemente storage para configurações
export const saveSettings = async (settings: AppSettings): Promise<void> => {
  await AsyncStorage.setItem('@CoupleGameApp:settings', JSON.stringify(settings));
};
```

---

**💡 Dica:** Sempre teste as personalizações em dispositivo físico para verificar performance das animações!

**🚀 Experimente:** Combine diferentes customizações para criar um app único para seu relacionamento!