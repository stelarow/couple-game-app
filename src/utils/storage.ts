import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie, Activity, CoupleData, AppData } from '../types';

const STORAGE_KEYS = {
  MOVIES: '@CoupleGameApp:movies',
  ACTIVITIES: '@CoupleGameApp:activities',
  COUPLE_DATA: '@CoupleGameApp:coupleData',
} as const;

// Movie Storage Functions
export const saveMovies = async (movies: Movie[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.MOVIES, JSON.stringify(movies));
  } catch (error) {
    console.error('Error saving movies:', error);
  }
};

export const getMovies = async (): Promise<Movie[]> => {
  try {
    const moviesJson = await AsyncStorage.getItem(STORAGE_KEYS.MOVIES);
    return moviesJson ? JSON.parse(moviesJson) : [];
  } catch (error) {
    console.error('Error getting movies:', error);
    return [];
  }
};

export const addMovie = async (movie: Omit<Movie, 'id' | 'createdAt'>): Promise<Movie> => {
  try {
    const movies = await getMovies();
    const newMovie: Movie = {
      ...movie,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    const updatedMovies = [...movies, newMovie];
    await saveMovies(updatedMovies);
    return newMovie;
  } catch (error) {
    console.error('Error adding movie:', error);
    throw error;
  }
};

export const deleteMovie = async (movieId: string): Promise<void> => {
  try {
    const movies = await getMovies();
    const updatedMovies = movies.filter(movie => movie.id !== movieId);
    await saveMovies(updatedMovies);
  } catch (error) {
    console.error('Error deleting movie:', error);
  }
};

// Activity Storage Functions
export const saveActivities = async (activities: Activity[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  } catch (error) {
    console.error('Error saving activities:', error);
  }
};

export const getActivities = async (): Promise<Activity[]> => {
  try {
    const activitiesJson = await AsyncStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    return activitiesJson ? JSON.parse(activitiesJson) : [];
  } catch (error) {
    console.error('Error getting activities:', error);
    return [];
  }
};

export const addActivity = async (activity: Omit<Activity, 'id' | 'createdAt'>): Promise<Activity> => {
  try {
    const activities = await getActivities();
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    const updatedActivities = [...activities, newActivity];
    await saveActivities(updatedActivities);
    return newActivity;
  } catch (error) {
    console.error('Error adding activity:', error);
    throw error;
  }
};

export const deleteActivity = async (activityId: string): Promise<void> => {
  try {
    const activities = await getActivities();
    const updatedActivities = activities.filter(activity => activity.id !== activityId);
    await saveActivities(updatedActivities);
  } catch (error) {
    console.error('Error deleting activity:', error);
  }
};

// Couple Data Storage Functions
export const saveCoupleData = async (coupleData: CoupleData): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.COUPLE_DATA, JSON.stringify(coupleData));
  } catch (error) {
    console.error('Error saving couple data:', error);
  }
};

export const getCoupleData = async (): Promise<CoupleData | null> => {
  try {
    const coupleDataJson = await AsyncStorage.getItem(STORAGE_KEYS.COUPLE_DATA);
    return coupleDataJson ? JSON.parse(coupleDataJson) : null;
  } catch (error) {
    console.error('Error getting couple data:', error);
    return null;
  }
};

// Random Selection Functions
export const getRandomMovie = async (): Promise<Movie | null> => {
  try {
    const movies = await getMovies();
    if (movies.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * movies.length);
    return movies[randomIndex];
  } catch (error) {
    console.error('Error getting random movie:', error);
    return null;
  }
};

export const getRandomActivity = async (): Promise<Activity | null> => {
  try {
    const activities = await getActivities();
    if (activities.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * activities.length);
    return activities[randomIndex];
  } catch (error) {
    console.error('Error getting random activity:', error);
    return null;
  }
};

// Initialize default data
export const initializeDefaultData = async (): Promise<void> => {
  try {
    const movies = await getMovies();
    const activities = await getActivities();
    
    // Add default movies if none exist
    if (movies.length === 0) {
      const defaultMovies = [
        { title: 'A Origem', genre: 'Ficção Científica', duration: '2h 28min', rating: 9 },
        { title: 'La La Land', genre: 'Romance', duration: '2h 8min', rating: 8 },
        { title: 'Parasita', genre: 'Thriller', duration: '2h 12min', rating: 9 },
        { title: 'Your Name', genre: 'Animação', duration: '1h 46min', rating: 8 },
        { title: 'Cidade de Deus', genre: 'Drama', duration: '2h 10min', rating: 9 },
      ];
      
      for (const movie of defaultMovies) {
        await addMovie(movie);
      }
    }
    
    // Add default activities if none exist
    if (activities.length === 0) {
      const defaultActivities = [
        { name: 'Cozinhar juntos', category: 'Casa', difficulty: 'easy' as const },
        { name: 'Fazer um piquenique', category: 'Ao ar livre', difficulty: 'medium' as const },
        { name: 'Massagem relaxante', category: 'Intimidade', difficulty: 'easy' as const },
        { name: 'Dançar na sala', category: 'Casa', difficulty: 'easy' as const },
        { name: 'Jogar videogame', category: 'Diversão', difficulty: 'easy' as const },
        { name: 'Caminhada no parque', category: 'Exercício', difficulty: 'medium' as const },
        { name: 'Noite de spa caseiro', category: 'Relaxamento', difficulty: 'medium' as const },
        { name: 'Pintar ou desenhar juntos', category: 'Arte', difficulty: 'hard' as const },
      ];
      
      for (const activity of defaultActivities) {
        await addActivity(activity);
      }
    }
  } catch (error) {
    console.error('Error initializing default data:', error);
  }
};