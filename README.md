# KatsuAnime

<div align="center">

![Version](https://img.shields.io/badge/Version-0.1.0-blue?style=flat-square)
![License](https://img.shields.io/badge/License-GPL%20v3-green?style=flat-square)
![Open Source](https://img.shields.io/badge/Open%20Source-Yes-brightgreen?style=flat-square)
![Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=flat-square&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19.2.3-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)

</div>

---

## Içindekiler

- [Proje Hakkında](#proje-hakkında)
- [Görseller](#gorseller)
- [Dosya Yapısı](#dosya-yapısı)
- [Kurulum](#kurulum)
- [Geliştirme](#geliştirme)
- [Lisans](#lisans)

---

## Proje Hakkında

KatsuAnime, anime severler için tasarlanmış modern bir web uygulamasıdır.

Özellikler:
- Anime izleme
- Anime keşfetme ve arama
- Anime takvimi
- Modern ve responsive tasarım

---

## Gorseller

<details>
  <summary>Ekran Görüntülerini Gör (Tıkla)</summary>
  <p align="center">
    <br>
    
    <b>Ana Sayfa</b><br>
    <img src="./img/homepage.png" width="700" alt="Ana Sayfa">
    <br><hr><br>
    
    <b>Arama Sayfası</b><br>
    <img src="./img/searhpage.png" width="700" alt="Arama Sayfası">
    <br><hr><br>
    
    <b>Takvim Sayfası</b><br>
    <img src="./img/calendarpage.png" width="700" alt="Takvim Sayfası">
    <br><hr><br>
    
    <b>Giriş Paneli</b><br>
    <img src="./img/loginmodal.png" width="400" alt="Giriş Modalı">
    
  </p>
</details>

---


## Dosya Yapısı

```
katsuanime/
│
├── src/
│   ├── app/                          # Next.js App Router sayfaları
│   │   ├── page.tsx                 # Ana sayfa (Home)
│   │   ├── kesfet/                  # Anime keşfetme sayfası
│   │   ├── profil/                  # Kullanıcı profil sayfası
│   │   ├── ayarlar/                 # Ayarlar sayfası
│   │   ├── takvim/                  # Anime takvimi sayfası
│   │   ├── anime/[slug]/            # Anime detay sayfası
│   │   ├── izle/[slug]/[episode]/  # Anime oynatma sayfası
│   │   ├── p/[username]/            # Kullanıcı profil sayfası
│   │   ├── layout.tsx               # Global layout
│   │   ├── globals.css              # Global stiller
│   │   ├── ui.css                   # UI bileşen stilleri
│   │   └── page.module.css          # Sayfa spesifik stiller
│   │
│   ├── components/                  # React bileşenleri
│   │   ├── auth/
│   │   │   ├── AuthModal.tsx        # Giriş/Kayıt modal
│   │   │   └── AuthContext.tsx      # Kimlik doğrulama bağlamı
│   │   ├── ui/
│   │   │   ├── Modal.tsx            # Tekrar kullanılabilir modal
│   │   │   ├── KatsuPlayer.tsx      # Video oynatıcı bileşeni
│   │   │   └── Toast.tsx            # Bildirim bileşeni
│   │   ├── layout/
│   │   │   └── Sidebar.tsx          # Yan menü bileşeni
│   │   └── home/
│   │       ├── Hero.tsx             # Ana sayfa hero bölümü
│   │       ├── AnimeCard.tsx        # Anime kartı bileşeni
│   │       ├── AnimeHorizontalCard.tsx  # Yatay anime kartı
│   │       └── AnimeGrid.tsx        # Anime ızgarası
│   │
│   ├── lib/                         # Yardımcı fonksiyonlar ve API
│   │   ├── api/
│   │   │   ├── config.ts            # API yapılandırması
│   │   │   ├── anime.ts             # Anime API çağrıları
│   │   │   └── katsu.ts             # KatsuAnime API işlemleri
│   │   ├── types/
│   │   │   └── anime.ts             # TypeScript tür tanımlamaları
│   │   └── api.ts                   # Genel API fonksiyonları
│   │
│   └── ...
│
├── public/                          # Statik dosyalar
│   ├── logo.jpeg                   # Uygulama logosu
│   ├── next.svg                    # Next.js ikonu
│   ├── vercel.svg                  # Vercel ikonu
│   ├── globe.svg                   # Globe ikonu
│   ├── window.svg                  # Window ikonu
│   └── file.svg                    # File ikonu
│
├── .vscode/                        # VS Code yapılandırması
│   └── settings.json               # Editor ayarları
│
├── .next/                          # Next.js derlenmiş çıktı (prod)
├── .vercel/                        # Vercel deployment config
│
├── package.json                    # Proje bağımlılıkları
├── package-lock.json               # Bağımlılık kilidi
├── tsconfig.json                   # TypeScript yapılandırması
├── eslint.config.mjs               # ESLint linter yapılandırması
├── next.config.ts                  # Next.js yapılandırması
├── next-env.d.ts                   # Next.js TypeScript definisyonları
├── .gitignore                      # Git ignore kuralları
├── .env                            # Ortam değişkenleri
└── README.md                       # Bu dosya
```

### Bağımlılıklar

**Üretim Bağımlılıkları:**
- `next@16.1.6` - React framework
- `react@19.2.3` - UI kütüphanesi
- `react-dom@19.2.3` - React DOM
- `lucide-react@1.8.0` - İkon kütüphanesi

**Geliştirme Bağımlılıkları:**
- `typescript@5` - Tür kontrolü
- `eslint@9` - Kod kalitesi
- `@types/*` - TypeScript tür tanımlamaları

---

## Kurulum

### Gereksinimler
- Node.js 18.0+
- npm veya yarn

### Adımlar

```bash
# Projeyi klonlayın
git clone https://github.com/kullanıcıadı/katsuanime.git
cd katsuanime

# Bağımlılıkları yükleyin
npm install

# Ortam değişkenlerini ayarlayın
cp .env.example .env.local
```

---

## Geliştirme

### Geliştirme Sunucusu Başlatma

```bash
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini açın.

### Kod Kontrolü (Lint)

```bash
npm run lint
```

### Üretim Derlemesi

```bash
npm run build
npm start
```

---

## Lisans

Bu proje **GPL v3** lisansı altında dağıtılmaktadır.

GPL v3 lisansı hakkında daha fazla bilgi için [LICENSE](./LICENSE) dosyasını veya [GNU GPL v3](https://www.gnu.org/licenses/gpl-3.0.html) resmi sayfasını ziyaret edin.

### Lisans Özeti
- Özgür yazılım
- Kaynağa erişim
- Değiştirme hakkı
- Yeniden dağıtım hakkı
- Aynı lisans altında dağıtım zorunlu

---

## Katkı Yapmak

Katkılarınız memnuniyetle karşılanır! Lütfen:

1. Projeyi fork edin
2. Özellik branch'i oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'e push yapın (`git push origin feature/AmazingFeature`)
5. Pull Request açın
