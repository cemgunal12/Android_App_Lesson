// screens/ProfilesListScreen.js
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { api } from '../api/client';

export default function ProfilesListScreen({ navigation }) {
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  
  // Yenileme durumu için state
  const [refreshing, setRefreshing] = useState(false);

  const fetchProfiles = async (isRefresh = false) => {
    // Eğer zaten yükleniyorsa ve bu bir yenileme işlemi değilse dur
    if ((loading || !hasMore) && !isRefresh) return;

    setLoading(true);
    setError(null);

    // Yenileme ise sayfayı 1 yap, yoksa mevcut sayfayı kullan
    const targetPage = isRefresh ? 1 : page;

    try {
      const res = await api.get(`/profiles?page=${targetPage}&limit=10`);

      if (res.data.length === 0) {
        if (isRefresh) setProfiles([]); // Yenilendiyse ve boşsa listeyi temizle
        setHasMore(false);
      } else {
        if (isRefresh) {
          // Yenileme ise eski verileri sil, yenileri koy
          setProfiles(res.data);
          setPage(2); // Sonraki sayfa 2 olacak
        } else {
          // Değilse üzerine ekle
          setProfiles((prev) => [...prev, ...res.data]);
          setPage((prev) => prev + 1);
        }
        // Eğer gelen veri limiti dolduruyorsa muhtemelen devamı vardır
        if (res.data.length < 10) setHasMore(false);
        else setHasMore(true);
      }
    } catch (err) {
      // Hata mesajını client.js'den gelen mesaj olarak alıyoruz
      setError(err.message || 'Failed to load profiles.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Pull-to-refresh tetiklendiğinde çalışacak fonksiyon
  const onRefresh = async () => {
    setRefreshing(true);
    setHasMore(true); 
    await fetchProfiles(true); 
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate('ProfileDetail', { id: item.id })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </Pressable>
  );

  const renderFooter = () => {
    if (!loading || refreshing) return null; 
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) return null;
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No profiles found</Text>
      </View>
    );
  };

  // İlk yükleme ekranı
  if (loading && profiles.length === 0 && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading profiles...</Text>
      </View>
    );
  }

  // Hata ekranı
  if (error && profiles.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={() => fetchProfiles(true)}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={() => fetchProfiles(false)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={profiles.length === 0 ? { flex: 1 } : styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
  },
});