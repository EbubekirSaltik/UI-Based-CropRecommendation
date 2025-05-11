# Mahsul Tahmin Projesi

Bu proje, mahsul verilerini analiz eden ve tahminler yapan bir web uygulamasıdır. Proje üç ana bölümden oluşmaktadır: Frontend, Backend ve Model.

## 🏗️ Proje Yapısı

```
├── Frontend/          # Next.js tabanlı web arayüzü
├── Backend/          # Node.js API servisi
└── Model/            # Makine öğrenmesi modeli ve veri seti
```

## 🚀 Başlangıç

### Gereksinimler
- Node.js (v14 veya üzeri)
- Python 3.8+
- npm veya yarn

### Kurulum

1. **Frontend Kurulumu**
```bash
cd Frontend
npm install
npm run dev
```

2. **Backend Kurulumu**
```bash
cd Backend
npm install
npm start
```

3. **Model Kurulumu**
```bash
cd Model
pip install -r requirements.txt
```

## 🛠️ Teknolojiler

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- React Hooks

### Backend
- Node.js
- Express.js
- MongoDB

### Model
- Python
- Pandas
- Scikit-learn

## 📁 Klasör Yapısı

### Frontend
- `app/` - Sayfa bileşenleri
- `components/` - Yeniden kullanılabilir UI bileşenleri
- `hooks/` - Özel React hooks'ları
- `lib/` - Yardımcı fonksiyonlar ve utilities

### Backend
- `src/` - Kaynak kodları
- `models/` - Veritabanı modelleri
- `logs/` - Uygulama logları

### Model
- `Data/` - Veri setleri
- `Script/` - Python scriptleri

## 🔧 Geliştirme

1. Frontend geliştirme sunucusu: `http://localhost:3000`
2. Backend API sunucusu: `http://localhost:5000`

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👥 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch'i oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun 