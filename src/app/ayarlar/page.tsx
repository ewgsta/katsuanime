"use client";
import React, { useState } from 'react';
import { 
    User, 
    Palette, 
    Link as LinkIcon, 
    Bell, 
    Shield, 
    Monitor,
    Save
} from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { useToast } from '@/components/ui/Toast';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('hesap');
    const { isLoggedIn } = useAuth();
    const { addToast } = useToast();

    // Mock states for settings
    const [theme, setTheme] = useState('Karanlık (Varsayılan)');
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        newsletter: true
    });
    const [integrations, setIntegrations] = useState({
        anilist: true,
        myanimelist: false
    });

    const handleSave = () => {
        addToast("Ayarlar başarıyla kaydedildi.", "success");
    };

    const toggleNotification = (key: keyof typeof notifications) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleIntegration = (key: keyof typeof integrations) => {
        setIntegrations(prev => ({ ...prev, [key]: !prev[key] }));
    };

    if (!isLoggedIn) {
        return (
            <div className="settings-page" style={{ textAlign: 'center', paddingTop: '100px' }}>
                <h2>Ayarları görüntülemek için giriş yapmalısınız.</h2>
            </div>
        );
    }

    return (
        <div className="settings-page">
            <div className="settings-header">
                <h1>Ayarlar</h1>
                <p>KatsuAnime deneyiminizi kişiselleştirin ve tercihlerinizi yönetin.</p>
            </div>

            <div className="settings-grid">
                <div className="settings-nav">
                    <button 
                        className={`settings-nav-item ${activeTab === 'hesap' ? 'active' : ''}`}
                        onClick={() => setActiveTab('hesap')}
                    >
                        <User size={18} /> Hesap Bilgileri
                    </button>
                    <button 
                        className={`settings-nav-item ${activeTab === 'tema' ? 'active' : ''}`}
                        onClick={() => setActiveTab('tema')}
                    >
                        <Palette size={18} /> Görünüm & Tema
                    </button>
                    <button 
                        className={`settings-nav-item ${activeTab === 'baglantilar' ? 'active' : ''}`}
                        onClick={() => setActiveTab('baglantilar')}
                    >
                        <LinkIcon size={18} /> Senkronizasyon
                    </button>
                    <button 
                        className={`settings-nav-item ${activeTab === 'bildirimler' ? 'active' : ''}`}
                        onClick={() => setActiveTab('bildirimler')}
                    >
                        <Bell size={18} /> Bildirimler
                    </button>
                    <button 
                        className={`settings-nav-item ${activeTab === 'gizlilik' ? 'active' : ''}`}
                        onClick={() => setActiveTab('gizlilik')}
                    >
                        <Shield size={18} /> Gizlilik ve Güvenlik
                    </button>
                </div>

                <div className="settings-content">
                    {activeTab === 'hesap' && (
                        <div className="settings-card">
                            <div className="settings-card-title">
                                <User size={20} className="text-accent" /> Genel Hesap Ayarları
                            </div>
                            
                            <div className="settings-row">
                                <div className="settings-row-info">
                                    <b>Kullanıcı Adı</b>
                                    <span>Herkese açık görünüm adınız. Profil URL'inizi etkiler.</span>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input type="text" className="form-input" disabled value="duman" style={{ width: '200px' }} />
                                    <button className="settings-action-btn">Değiştir</button>
                                </div>
                            </div>

                            <div className="settings-row">
                                <div className="settings-row-info">
                                    <b>E-Posta Adresi</b>
                                    <span>Hesap kurtarma ve bildirimler için kullanılır.</span>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input type="email" className="form-input" disabled value="duman@example.com" style={{ width: '200px' }} />
                                    <button className="settings-action-btn">Güncelle</button>
                                </div>
                            </div>

                            <div className="settings-row">
                                <div className="settings-row-info">
                                    <b>Biyografi</b>
                                    <span>Profilinizde görünecek kısa açıklamanız.</span>
                                </div>
                                <div>
                                    <button className="settings-action-btn primary" onClick={handleSave}>
                                        <Save size={16} style={{ display: 'inline', marginRight: '6px' }} /> Kaydet
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'tema' && (
                        <div className="settings-card">
                            <div className="settings-card-title">
                                <Palette size={20} className="text-accent" /> Tema Ayarları
                            </div>
                            
                            <div className="settings-row" style={{ alignItems: 'flex-start' }}>
                                <div className="settings-row-info">
                                    <b>Aktif Tema</b>
                                    <span>KatsuAnime'yi hangi görünümde kullanmak istersiniz?</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <select 
                                        className="form-input" 
                                        value={theme}
                                        onChange={(e) => setTheme(e.target.value)}
                                        style={{ width: '200px' }}
                                    >
                                        <option>Karanlık (Varsayılan)</option>
                                        <option>Aydınlık (Yakında)</option>
                                        <option>AMOLED Siyahı</option>
                                    </select>
                                </div>
                            </div>

                            <div className="settings-row">
                                <div className="settings-row-info">
                                    <b>Video Oynatıcı Efektleri</b>
                                    <span>Sinema modu aktifken arkaplan parlama efekti kalsın mı?</span>
                                </div>
                                <div 
                                    className="settings-switch toggled"
                                >
                                    <div className="settings-switch-knob"></div>
                                </div>
                            </div>
                            
                            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                                <button className="settings-action-btn primary" onClick={handleSave}>Değişiklikleri Kaydet</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'baglantilar' && (
                        <div className="settings-card">
                            <div className="settings-card-title">
                                <LinkIcon size={20} className="text-accent" /> Hesap Senkronizasyonu
                            </div>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '14px', lineHeight: '1.6' }}>
                                İzleme geçmişinizi ve listelerinizi favori anime takip uygulamalarınızla otomatik olarak senkronize edebilirsiniz.
                            </p>

                            <div className="settings-row">
                                <div className="settings-row-info">
                                    <b style={{ color: '#02A9FF' }}>AniList</b>
                                    <span>İzleme durumları çift taraflı eşitleniyor.</span>
                                </div>
                                <div 
                                    className={`settings-switch ${integrations.anilist ? 'toggled' : ''}`}
                                    onClick={() => toggleIntegration('anilist')}
                                >
                                    <div className="settings-switch-knob"></div>
                                </div>
                                {integrations.anilist && <button className="settings-action-btn danger" style={{ marginLeft: '16px' }}>Bağlantıyı Kes</button>}
                            </div>

                            <div className="settings-row">
                                <div className="settings-row-info">
                                    <b style={{ color: '#2E51A2' }}>MyAnimeList</b>
                                    <span>Şu anda devre dışı. Puanlamalar eşitlenecek.</span>
                                </div>
                                <div 
                                    className={`settings-switch ${integrations.myanimelist ? 'toggled' : ''}`}
                                    onClick={() => toggleIntegration('myanimelist')}
                                >
                                    <div className="settings-switch-knob"></div>
                                </div>
                                {!integrations.myanimelist && <button className="settings-action-btn" style={{ marginLeft: '16px' }}>Giriş Yap</button>}
                            </div>
                        </div>
                    )}

                    {activeTab === 'bildirimler' && (
                        <div className="settings-card">
                            <div className="settings-card-title">
                                <Bell size={20} className="text-accent" /> Bildirim Tercihleri
                            </div>
                            
                            <div className="settings-row">
                                <div className="settings-row-info">
                                    <b>Yeni Bölüm Bildirimleri</b>
                                    <span>İzlemekte olduğunuz serilerin yeni bölümleri geldiğinde anlık e-posta alın.</span>
                                </div>
                                <div 
                                    className={`settings-switch ${notifications.email ? 'toggled' : ''}`}
                                    onClick={() => toggleNotification('email')}
                                >
                                    <div className="settings-switch-knob"></div>
                                </div>
                            </div>

                            <div className="settings-row">
                                <div className="settings-row-info">
                                    <b>Tarayıcı Bildirimleri</b>
                                    <span>Siteye girdiğinizde sağ altta çıkan yeni bölüm uyarıları.</span>
                                </div>
                                <div 
                                    className={`settings-switch ${notifications.push ? 'toggled' : ''}`}
                                    onClick={() => toggleNotification('push')}
                                >
                                    <div className="settings-switch-knob"></div>
                                </div>
                            </div>

                            <div className="settings-row">
                                <div className="settings-row-info">
                                    <b>Haftalık Bülten</b>
                                    <span>KatsuAnime'deki popüler seriler ve güncellemeler hakkında bültenler.</span>
                                </div>
                                <div 
                                    className={`settings-switch ${notifications.newsletter ? 'toggled' : ''}`}
                                    onClick={() => toggleNotification('newsletter')}
                                >
                                    <div className="settings-switch-knob"></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'gizlilik' && (
                        <div className="settings-card">
                            <div className="settings-card-title">
                                <Shield size={20} className="text-accent" /> Gizlilik
                            </div>
                            
                            <div className="settings-row">
                                <div className="settings-row-info">
                                    <b>Profil Görünürlüğü</b>
                                    <span>Profilini ziyaret edenler izleme geçmişini görebilir.</span>
                                </div>
                                <div className="settings-switch toggled"><div className="settings-switch-knob"></div></div>
                            </div>

                            <div className="settings-row">
                                <div className="settings-row-info">
                                    <b>Oturumları Yönet</b>
                                    <span>Diğer cihazlardaki açık KatsuAnime hesaplarınız.</span>
                                </div>
                                <div>
                                    <button className="settings-action-btn">Cihazları Gör</button>
                                </div>
                            </div>
                            
                            <div className="settings-row" style={{ borderTop: '1px solid rgba(239, 68, 68, 0.2)', paddingTop: '20px', marginTop: '20px', borderBottom: 'none' }}>
                                <div className="settings-row-info">
                                    <b style={{ color: '#ef4444' }}>Tehlikeli Bölge</b>
                                    <span>Hesabınızı ve tüm izleme listelerinizi kalıcı olarak siler.</span>
                                </div>
                                <div>
                                    <button className="settings-action-btn danger">Hesabı Sil</button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
            
            <style jsx>{`
                .text-accent { color: var(--accent); }
            `}</style>
        </div>
    );
}
