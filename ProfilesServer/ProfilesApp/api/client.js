// api/client.js
import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 saniye içinde cevap gelmezse iptal et [cite: 1501]
});

// Tüm yanıtları dinleyen global hata yakalayıcı
api.interceptors.response.use(
  (response) => response, // Başarılıysa aynen devam et
  (error) => {
    if (!error.response) {
      // Sunucuya hiç ulaşılamadıysa (İnternet yok veya sunucu kapalı)
      throw new Error('Network error. Check your connection.'); // [cite: 1510]
    }
    
    // Sunucudan hata kodu döndüyse
    if (error.response.status === 404) {
      throw new Error('Resource not found'); // [cite: 1513]
    }
    
    if (error.response.status >= 500) {
      throw new Error('Server error. Please try again later.'); // [cite: 1515]
    }

    // Diğer hataları olduğu gibi fırlat
    throw error;
  }
);