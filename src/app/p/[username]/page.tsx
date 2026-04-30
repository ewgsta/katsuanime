"use client";
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { 
    Clock, 
    Calendar, 
    MapPin, 
    Heart, 
    User,
    PlayCircle
} from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { useToast } from '@/components/ui/Toast';

// Mock Data
const MOCK_WATCHED = [
    { title: "One Piece", episode: "1095", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21-6v9iMv96U3Yy.jpg", date: "2 saat önce" },
    { title: "Solo Leveling", episode: "12", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151807-6IX96aX6696d.png", date: "Dün" },
    { title: "Jujutsu Kaisen", episode: "23", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-bbBWjSTNaxvF.png", date: "2 gün önce" },
    { title: "Frieren", episode: "28", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-n1M2JMCyqN2Q.jpg", date: "3 gün önce" }
];

export default function ProfilePage() {
    const { username } = useParams();
    const { isLoggedIn } = useAuth();
    const { addToast } = useToast();
    
    const [activeFilter, setActiveFilter] = useState('Spotlight');
    
    const profileName = username === 'me' ? 'duman' : username;
    const isOwnProfile = isLoggedIn && profileName === 'duman';

    return (
        <div className="profile-page">
            <div className="profile-v3-banner"></div>
            
            <div className="profile-v3-container">
                {/* SOL SÜTUN - Hakkımda & Bilgiler */}
                <div className="profile-v3-sidebar">
                    <div className="profile-v3-avatar-wrapper">
                        <img 
                            src={`https://ui-avatars.com/api/?name=${profileName}&background=random&color=fff&size=256`} 
                            alt="Avatar" 
                            className="profile-v3-avatar" 
                        />
                    </div>
                    
                    <div className="profile-v3-name">{profileName}</div>
                    <div className="profile-v3-handle">@{profileName}</div>
                    
                    <div className="profile-v3-bio">
                        Görsel olarak hoş sanat tarzlarını ve keyifli karakterleri arıyorum, ama asıl aradığım sürükleyici bir hikaye. Romantizme zaafım var, aksiyon dolu dövüş sahneleri beni heyecanlandırır.
                    </div>
                    
                    <div className="profile-v3-info-list">
                        <div className="profile-v3-info-item">
                            <User size={16} /> <span>Erkek</span>
                        </div>
                        <div className="profile-v3-info-item">
                            <Calendar size={16} /> <span>Nisan</span>
                        </div>
                        <div className="profile-v3-info-item">
                            <MapPin size={16} /> <span>Türkiye</span>
                        </div>
                        <div className="profile-v3-info-item">
                            <Clock size={16} /> <span>2015'ten beri izliyor</span>
                        </div>
                        <div className="profile-v3-info-item">
                            <Heart size={16} /> <span>Waifu: Makima</span>
                        </div>
                    </div>
                    
                    <div className="profile-v3-tags">
                        <button className="profile-v3-tag">Aksiyon</button>
                        <button className="profile-v3-tag">Macera</button>
                        <button className="profile-v3-tag">Komedi</button>
                        <button className="profile-v3-tag">Fantastik</button>
                        <button className="profile-v3-tag">Romantizm</button>
                        <button className="profile-v3-tag">Slice of Life</button>
                    </div>
                </div>

                {/* ORTA SÜTUN - Blog / Postlar */}
                <div className="profile-v3-main">
                    <div className="profile-v3-feed-filters">
                        <button 
                            className={`profile-v3-pill ${activeFilter === 'Spotlight' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('Spotlight')}
                        >
                            Öne Çıkanlar
                        </button>
                        <button 
                            className={`profile-v3-pill ${activeFilter === 'Blog' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('Blog')}
                        >
                            Blog
                        </button>
                        <button 
                            className={`profile-v3-pill ${activeFilter === 'İnceleme' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('İnceleme')}
                        >
                            İncelemeler
                        </button>
                    </div>

                    <div className="profile-v3-posts">
                        {/* Mock Post 1 */}
                        <div className="profile-v3-post">
                            <h2 className="profile-v3-post-title">Bu Sezon Kesinlikle İzlenmeli!</h2>
                            <p className="profile-v3-post-text">
                                Adrenalin pompalayan, kalbi tutkuyla çarptıran bir duygu... Her bölümden sonra nefesimi tutarak bekliyorum! Animasyon kalitesi ve hikaye örgüsü bu sezonun en iyilerinden biri olmasını sağlıyor. Kesinlikle kaçırmamalı ve hemen listelerinize eklemelisiniz.
                            </p>
                            <img 
                                src="https://images.unsplash.com/photo-1541562232579-51fca395f60d?auto=format&fit=crop&q=80&w=800" 
                                alt="Post Image" 
                                className="profile-v3-post-img"
                            />
                        </div>

                        {/* Mock Post 2 */}
                        <div className="profile-v3-post">
                            <h2 className="profile-v3-post-title">Eski Animelere Dönüş</h2>
                            <p className="profile-v3-post-text">
                                Bazen nostalji yapmak gibisi yok. Eski çizim tarzlarının verdiği o sıcak hissiyat ve karakterlerin derinliği günümüz animelerinde pek bulunmuyor. Bu hafta sonu eski favorilerimden birine tekrar başlayacağım. Sizin eski favorileriniz neler?
                            </p>
                        </div>
                    </div>
                </div>

                {/* SAĞ SÜTUN - Widgetlar (Son İzlenenler vb.) */}
                <div className="profile-v3-right-col">
                    <div className="profile-v3-widget">
                        <div className="profile-v3-widget-header">
                            <PlayCircle size={18} className="text-accent" /> Son İzlenenler
                        </div>
                        <div className="profile-v3-widget-list">
                            {MOCK_WATCHED.map((anime, idx) => (
                                <div key={idx} className="profile-v3-widget-item">
                                    <img src={anime.image} alt={anime.title} className="profile-v3-widget-item-poster" />
                                    <div className="profile-v3-widget-info">
                                        <div className="profile-v3-widget-title">{anime.title}</div>
                                        <div className="profile-v3-widget-sub">Bölüm {anime.episode} • {anime.date}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="profile-v3-widget">
                        <div className="profile-v3-widget-header">
                            <Heart size={18} className="text-accent" /> Favori Karakterler
                        </div>
                        <div className="profile-v3-widget-list">
                            <div className="profile-v3-widget-item">
                                <img src="https://s4.anilist.co/file/anilistcdn/character/large/b4606-hMDeo02T4x0m.png" alt="Character" className="profile-v3-widget-item-img" />
                                <div className="profile-v3-widget-info">
                                    <div className="profile-v3-widget-title">Makima</div>
                                    <div className="profile-v3-widget-sub">Chainsaw Man</div>
                                </div>
                            </div>
                            <div className="profile-v3-widget-item">
                                <img src="https://s4.anilist.co/file/anilistcdn/character/large/b40-yIydx8sJv9tF.png" alt="Character" className="profile-v3-widget-item-img" />
                                <div className="profile-v3-widget-info">
                                    <div className="profile-v3-widget-title">Luffy Monkey D.</div>
                                    <div className="profile-v3-widget-sub">One Piece</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                .text-accent { color: var(--accent); }
            `}</style>
        </div>
    );
}
