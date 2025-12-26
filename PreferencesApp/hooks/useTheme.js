import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useTheme() {
  const [theme, setTheme] = useState('light');

  // Uygulama açılınca kayıtlı temayı yükle
  useEffect(() => {
    const loadTheme = async () => {
      const stored = await AsyncStorage.getItem('theme');
      if (stored) {
        setTheme(stored);
      }
    };
    loadTheme();
  }, []);

  // Temayı değiştir ve kaydet
  const toggleTheme = async () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    await AsyncStorage.setItem('theme', next);
  };

  return { theme, toggleTheme };
}