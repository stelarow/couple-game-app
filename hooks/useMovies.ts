import { useEffect, useState, useCallback } from 'react';
import * as SQLite from 'expo-sqlite';

export type Movie = {
  id: number;
  title: string;
  genre?: string;
  duration?: number; // minutos
  rating?: number; // 0-10
};

// @ts-ignore — alguns tipos não reconhecem openDatabase, mas a função existe em tempo de execução
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const db = (SQLite as any).openDatabase ? (SQLite as any).openDatabase('couplegame.db') : (SQLite as any).openDatabaseSync('couplegame.db');

function initDB() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  db.transaction((tx: any) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS movies (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, genre TEXT, duration INTEGER, rating INTEGER);'
    );
  });
}

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const refresh = useCallback(() => {
    db.transaction((tx: any) => {
      tx.executeSql('SELECT * FROM movies;', [], (_: any, { rows }: any) => {
        const data: Movie[] = rows._array as any;
        setMovies(data);
      });
    });
  }, []);

  useEffect(() => {
    initDB();
    refresh();
  }, [refresh]);

  const addMovie = useCallback((movie: Omit<Movie, 'id'>) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        'INSERT INTO movies (title, genre, duration, rating) VALUES (?, ?, ?, ?);',
        [movie.title, movie.genre ?? null, movie.duration ?? null, movie.rating ?? null],
        () => refresh()
      );
    });
  }, [refresh]);

  const deleteMovie = useCallback((id: number) => {
    db.transaction((tx: any) => {
      tx.executeSql('DELETE FROM movies WHERE id = ?;', [id], () => refresh());
    });
  }, [refresh]);

  const pickRandom = useCallback((): Movie | undefined => {
    if (movies.length === 0) return undefined;
    const idx = Math.floor(Math.random() * movies.length);
    return movies[idx];
  }, [movies]);

  return { movies, addMovie, deleteMovie, pickRandom };
} 