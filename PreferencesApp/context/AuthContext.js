import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 1. Import et

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Yüklenme durumu ekle

  // 2. Uygulama açılınca kayıtlı kullanıcıyı yükle
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error('Failed to load user', e);
      } finally {
        setLoading(false); // Yükleme bitti
      }
    };
    loadUser();
  }, []);

  // 3. Kullanıcı değişince hafızayı güncelle
  useEffect(() => {
    if (loading) return; // Yükleme sürerken kaydetme

    const saveUser = async () => {
      if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
      } else {
        await AsyncStorage.removeItem('user');
      }
    };
    saveUser();
  }, [user, loading]);

  const login = (username) => setUser({ username });
  const logout = () => setUser(null);

  // Veriler yüklenene kadar boş ekran göster (Login ekranının yanıp sönmesini engeller)
  if (loading) {
    return null; 
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}