# Profiles Directory App (React Native Lab 5)

**Student Name:** Cem Günal
**Student ID:** 210408036

## [cite_start]Proje Kurulumu (Setup Instructions) [cite: 1609]

Bu projeyi çalıştırmak için aşağıdaki adımları izleyin:

### [cite_start]1. Backend Sunucusunu Başlatma [cite: 1610]
1. `ProfilesServer` klasörüne gidin.
2. Bağımlılıkları yükleyin: `npm install`
3. Sunucuyu başlatın: `node server.js`
4. Bilgisayarınızın yerel IP adresini bulun.

### [cite_start]2. Mobil Uygulamayı Başlatma [cite: 1611]
1. `ProfilesApp` klasörüne gidin.
2. Bağımlılıkları yükleyin: `npm install`
3. `.env.example` dosyasının adını `.env` olarak değiştirin.
4. `.env` dosyasını açın ve `EXPO_PUBLIC_API_BASE_URL` değerini kendi bilgisayarınızın IP adresiyle güncelleyin:
   `EXPO_PUBLIC_API_BASE_URL=http://<IP_ADRESINIZ>:3000`
5. Uygulamayı başlatın: `npx expo start`

## Özellikler
- **Networking:** Axios ile veri çekme ve global hata yönetimi.
- **Pagination:** FlatList ile sonsuz kaydırma (Infinite Scroll).
- **Navigation:** Liste ve Detay sayfaları arası geçiş.
- **UX:** Pull-to-Refresh ve Loading/Error durumları.