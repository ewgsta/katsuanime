import React from "react";
import Link from "next/link";
import { fetchAnimeDetail, getBaseUrl, getImageUrl } from "@/lib/api";
import type { Anime, AnimeEpisode } from "@/lib/types/anime";
import { notFound } from "next/navigation";
import { KatsuPlayer } from "@/components/ui/KatsuPlayer";

interface WatchPageProps {
  params: Promise<{
    slug: string;
    episode: string;
  }>;
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { slug, episode: episodeStr } = await params;
  const episodeNumber = parseInt(episodeStr);

  const animeData = await fetchAnimeDetail(slug);

  if (!animeData || !animeData.data) {
    return notFound();
  }

  const anime: Anime = animeData.data;
  const currentEpisode = anime.episodes?.find(
    (ep: AnimeEpisode) => ep.episode_number === episodeNumber
  );

  if (!currentEpisode) {
    return notFound();
  }

  // API'den gelen watch_url (/watch/TOKEN) formatında. 
  const videoSource = currentEpisode.sources?.[0]?.watch_url;
  const fullVideoUrl = videoSource ? `${getBaseUrl()}${videoSource}` : null;

  const nextEpisode = anime.episodes?.find(
    (ep: AnimeEpisode) => ep.episode_number === episodeNumber + 1
  );
  const prevEpisode = anime.episodes?.find(
    (ep: AnimeEpisode) => ep.episode_number === episodeNumber - 1
  );

  return (
    <div className="watch-page-wrapper">
      <div className="watch-container">
        <div className="watch-layout-grid">
          {/* Left: Player and Main Info */}
          <div className="watch-main-column">
            <section className="player-section-professional">
              <div className="player-aspect-ratio">
                <div className="player-inner-container">
                  {fullVideoUrl ? (
                    <KatsuPlayer
                      src={fullVideoUrl}
                      poster={getImageUrl(anime.first_image)}
                    />
                  ) : (
                    <div className="player-placeholder-professional">
                      <div className="loader-spinner"></div>
                      <p>Video kaynağı bulunamadı.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="watch-header-simple">
                <div className="watch-title-area">
                  <h1 className="watch-title-minimal">{anime.name}</h1>
                  <div className="watch-meta-pills">
                    <span className="pill-ep">Bölüm {episodeNumber}</span>
                    <span className="pill-type">{currentEpisode.type || 'TV'}</span>
                  </div>
                </div>

                <div className="watch-nav-minimal">
                  {prevEpisode && (
                    <Link href={`/izle/${slug}/${prevEpisode.episode_number}`} className="nav-btn-mini" title="Önceki Bölüm">
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </Link>
                  )}
                  <div className="nav-ep-indicator">Bölüm {episodeNumber} / {anime.episodes?.length}</div>
                  {nextEpisode && (
                    <Link href={`/izle/${slug}/${nextEpisode.episode_number}`} className="nav-btn-mini" title="Sonraki Bölüm">
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </section>

            <div className="watch-details-section">
              <h3 className="section-label">Açıklama</h3>
              <p className="description-text">
                {anime.description || "Bu seri için henüz bir açıklama girilmemiş."}
              </p>

              <div className="watch-quick-actions">
                <Link href={`/anime/${slug}`} className="action-btn-outline">
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Seri Sayfasına Dön
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Episodes Sidebar */}
          <aside className="watch-sidebar-v2">
            <div className="sidebar-header-v2">
              <h3 className="sidebar-title-v2">Bölüm Listesi</h3>
              <span className="ep-count-v2">{anime.episodes?.length} Bölüm</span>
            </div>
            <div className="episode-scroll-v2">
              {anime.episodes?.map((ep: AnimeEpisode) => (
                <Link
                  key={ep.episode_number}
                  href={`/izle/${slug}/${ep.episode_number}`}
                  className={`ep-item-v2 ${ep.episode_number === episodeNumber ? 'active' : ''}`}
                >
                  <div className="ep-item-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={getImageUrl(anime.first_image)} alt={`Bölüm ${ep.episode_number}`} />
                    {ep.episode_number === episodeNumber && (
                      <div className="playing-overlay">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    )}
                  </div>
                  <div className="ep-item-info">
                    <span className="ep-item-num">Bölüm {ep.episode_number}</span>
                    <span className="ep-item-label">{ep.type || 'TV'} Yayını</span>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
