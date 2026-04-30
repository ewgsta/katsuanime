import React from 'react';
import Link from 'next/link';
import { fetchAnimeDetail, getImageUrl } from '@/lib/api';
import { AnimeGrid } from '@/components/home/AnimeGrid';
import type { Anime, AnimeEpisode } from '@/lib/types/anime';
import { notFound } from 'next/navigation';

export default async function AnimeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Real API Fetch
    const response = await fetchAnimeDetail(slug);

    if (!response || !response.data) {
        // If not found in API, you can show a 404 page or graceful degradation.
        return notFound();
    }

    const anime: Anime = response.data;
    const categories = anime.categories || [];
    const episodes = anime.episodes || [];
    const relatedAnimes = anime.related_animes || [];

    const coverImage = getImageUrl(anime.first_image);
    const posterImage = getImageUrl(anime.first_image);

    // Get format from first episode if available, else omit
    const format = episodes.length > 0 && episodes[0].type ? episodes[0].type : 'TV';

    return (
        <>
            <div
                className="detail-hero"
                style={{ backgroundImage: `url('${coverImage}')` }}
            />

            <div className="detail-container">
                <div className="detail-poster">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={posterImage} alt={anime.name} />
                </div>

                <div className="detail-content">
                    <h1 className="detail-title">{anime.name}</h1>

                    <div className="detail-meta-group">
                        <div className="detail-meta-item">
                            <strong>Format:</strong> {format}
                        </div>
                        {episodes.length > 0 && (
                            <div className="detail-meta-item">
                                <strong>Bölüm:</strong> {episodes.length}
                            </div>
                        )}
                        <div className="detail-meta-item">
                            <strong>Durum:</strong> Genel Yayın
                        </div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        {categories.map((genre: string) => (
                            <span key={genre} className="tag" style={{ marginRight: '8px' }}>
                                {genre}
                            </span>
                        ))}
                    </div>

                    <p className="detail-synopsis">{anime.description || 'Bu anime için henüz bir açıklama eklenmemiş.'}</p>

                    <div className="btn-group">
                        {episodes.length > 0 ? (
                            <Link href={`/izle/${slug}/${episodes[0].episode_number}`} className="btn-play">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                İzlemeye Başla
                            </Link>
                        ) : (
                            <button disabled className="btn-play" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                                Henüz Bölüm Yok
                            </button>
                        )}
                        <button type="button" className="btn-list">Listeme Ekle</button>
                    </div>
                </div>
            </div>

            <div className="episodes-section">
                <h2 style={{ fontFamily: "'Carter One', cursive", fontSize: '24px', fontWeight: 600 }}>Tüm Bölümler</h2>
                {episodes.length > 0 ? (
                    <div className="episodes-grid">
                        {episodes.map((ep: AnimeEpisode) => (
                            <Link href={`/izle/${slug}/${ep.episode_number}`} key={ep.episode_number} className="episode-card" style={{ textDecoration: 'none' }}>
                                <div className="episode-number">{ep.episode_number}</div>
                                <div className="episode-info">
                                    <h4>Bölüm {ep.episode_number}</h4>
                                    <span>{ep.type || 'TV'} formatında</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div style={{ marginTop: '20px', color: 'var(--text-muted)' }}>
                        Aktif bölüm bulunamadı.
                    </div>
                )}

                {relatedAnimes.length > 0 && (
                    <div style={{ marginTop: '60px' }}>
                        <AnimeGrid
                            title="İlgili Animeler (Benzer Seriler)"
                            animes={relatedAnimes.map((ra) => ({
                                slug: ra.slug,
                                title: ra.name,
                                image: getImageUrl(ra.first_image),
                                genres: 'İlgili Anime',
                                rating: '-'
                            }))}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
