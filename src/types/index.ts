export interface Movie {
  id: string;
  title: string;
  genre?: string;
  duration?: string;
  rating?: number;
  createdAt: Date;
}

export interface Activity {
  id: string;
  name: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  createdAt: Date;
}

export interface CoupleData {
  person1Name: string;
  person2Name: string;
  person1Photo?: string;
  person2Photo?: string;
  anniversaryDate?: Date;
  relationshipGoals?: string[];
}

export interface AppData {
  movies: Movie[];
  activities: Activity[];
  coupleData: CoupleData;
}

export type RootTabParamList = {
  Home: undefined;
  MoviePicker: undefined;
  ActivityWheel: undefined;
};