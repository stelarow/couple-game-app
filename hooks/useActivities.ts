import { useEffect, useState, useCallback } from 'react';
import * as SQLite from 'expo-sqlite';

export type Activity = {
  id: number;
  name: string;
  category?: string;
  difficulty?: 'Fácil' | 'Médio' | 'Difícil';
};

// @ts-ignore
const db = (SQLite as any).openDatabase ? (SQLite as any).openDatabase('couplegame.db') : (SQLite as any).openDatabaseSync('couplegame.db');

function initDB() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  db.transaction((tx: any) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS activities (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, category TEXT, difficulty TEXT);'
    );
  });
}

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);

  const refresh = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    db.transaction((tx: any) => {
      tx.executeSql('SELECT * FROM activities;', [], (_: any, { rows }: any) => {
        setActivities(rows._array as Activity[]);
      });
    });
  }, []);

  useEffect(() => {
    initDB();
    refresh();
  }, [refresh]);

  const addActivity = useCallback((activity: Omit<Activity, 'id'>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    db.transaction((tx: any) => {
      tx.executeSql(
        'INSERT INTO activities (name, category, difficulty) VALUES (?, ?, ?);',
        [activity.name, activity.category ?? null, activity.difficulty ?? null],
        () => refresh()
      );
    });
  }, [refresh]);

  const deleteActivity = useCallback((id: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    db.transaction((tx: any) => {
      tx.executeSql('DELETE FROM activities WHERE id = ?;', [id], () => refresh());
    });
  }, [refresh]);

  const pickRandom = useCallback((): Activity | undefined => {
    if (activities.length === 0) return undefined;
    const idx = Math.floor(Math.random() * activities.length);
    return activities[idx];
  }, [activities]);

  return { activities, addActivity, deleteActivity, pickRandom };
} 