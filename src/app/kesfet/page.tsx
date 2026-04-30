"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { LayoutGrid, List, Search, Star, X, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import { AnimeGrid } from '@/components/home/AnimeGrid';
import { AnimeCardProps } from '@/components/home/AnimeCard';
import { fetchAnimes, searchAnimes, getImageUrl } from '@/lib/api';
import type { Anime, AnimeCategory } from '@/lib/types/anime';

const FORMATS = [
    { value: 'tv', label: 'TV' },
    { value: 'movie', label: 'Movie' },
    { value: 'ova', label: 'OVA' },
    { value: 'ona', label: 'ONA' },
    { value: 'special', label: 'Special' },
];

const STATUSES = [
    { value: 'ongoing', label: 'Devam Ediyor' },
    { value: 'completed', label: 'Tamamlandı' },
    { value: 'upcoming', label: 'Gelecek' },
];

export default function KesfetPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    
    // Filters
    const [selectedGenre, setSelectedGenre] = useState<string>('');
    const [selectedFormat, setSelectedFormat] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    
    // Dynamic Categories
    const [genres, setGenres] = useState<{ value: string, label: string }[]>([]);
    
    // API States
    const [animes, setAnimes] = useState<AnimeCardProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);

    // Initial Load
    useEffect(() => {
        loadCategories();
        loadAnimes(true);
    }, [selectedGenre, selectedFormat, selectedStatus]);

    // Close filter dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
                setIsFilterOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const loadCategories = async () => {
        const { fetchCategories } = await import('@/lib/api');
        const res = await fetchCategories();
        if (res?.data) {
            const apiItems = res.data.map((cat: AnimeCategory) => ({
                value: String(cat.id),
                label: cat.name
            }));
            setGenres(apiItems);
        }
    };

    const loadAnimes = async (reset = false) => {
        setLoading(true);
        const currentPage = reset ? 1 : page + 1;
        
        const res = await fetchAnimes(currentPage, 24, selectedGenre || undefined, selectedFormat || undefined);
        
        if (res?.data) {
            const formatted = res.data.map((a: Anime) => ({
                slug: a.slug,
                title: a.name,
                image: getImageUrl(a.first_image),
                genres: a.categories?.join(', ') || '',
                rating: a.score || '8.4' 
            }));
            
            if (reset) {
                setAnimes(formatted);
                setPage(1);
            } else {
                setAnimes(prev => [...prev, ...formatted]);
                setPage(currentPage);
            }
            
            setHasMore(res.data.length >= 24);
        } else {
            if (reset) setAnimes([]);
            setHasMore(false);
        }
        setLoading(false);
    };

    // Infinite Scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 800) {
                if (!loading && hasMore && !searchTerm) {
                    loadAnimes();
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore, searchTerm, page]);

    // Search Logic
    useEffect(() => {
        if (!searchTerm) {
            if (animes.length === 0 && !loading) loadAnimes(true);
            return;
        }

        setIsTyping(true);
        const delayDebounceFn = setTimeout(async () => {
            const res = await searchAnimes(searchTerm);
            if (res?.data) {
                const searchResults = res.data.map((a: Anime) => ({
                    slug: a.slug,
                    title: a.name,
                    image: getImageUrl(a.first_image),
                    genres: a.categories?.join(', ') || 'Anime',
                    rating: a.score || 'N/A'
                }));
                setAnimes(searchResults);
                setHasMore(false);
            } else {
                setAnimes([]);
            }
            setIsTyping(false);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const resetFilters = () => {
        setSelectedGenre('');
        setSelectedFormat('');
        setSelectedStatus('');
        setSearchTerm('');
    };

    const totalFilters = (selectedGenre ? 1 : 0) + (selectedFormat ? 1 : 0) + (selectedStatus ? 1 : 0);

    return (
        <div className="explore-page" style={{ paddingBottom: '100px' }}>
            <div className="explore-header-v2">
                <div className="explore-title-row" style={{ marginBottom: '24px' }}>
                    <h1 style={{ fontFamily: "'Carter One', cursive" }}>Keşfet</h1>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div className="search-container-v2" style={{ flex: '0 1 400px' }}>
                        <Search className="search-icon-v2" size={20} />
                        <input
                            type="text"
                            placeholder="Anime ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input-v2"
                        />
                        {searchTerm && (
                            <button 
                                onClick={() => setSearchTerm('')}
                                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>
                    
                    <div className="filter-dropdown-v2" ref={filterRef}>
                        <button 
                            className={`filter-btn-v2 ${isFilterOpen ? 'active' : ''}`}
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                            <SlidersHorizontal size={18} />
                            Filtrele {totalFilters > 0 && `(${totalFilters})`}
                        </button>

                        <div className={`filter-panel-v2 ${isFilterOpen ? 'open' : ''}`}>
                            {/* TÜRLER */}
                            <div className="filter-column-v2">
                                <div className="filter-column-header">TÜRLER</div>
                                <div className="filter-items-scroll">
                                    <button 
                                        className={`filter-item-v2 ${selectedGenre === '' ? 'active' : ''}`}
                                        onClick={() => setSelectedGenre('')}
                                    >
                                        Tüm Türler
                                    </button>
                                    {genres.map((g) => (
                                        <button 
                                            key={g.value}
                                            className={`filter-item-v2 ${selectedGenre === g.value ? 'active' : ''}`}
                                            onClick={() => setSelectedGenre(g.value)}
                                        >
                                            {g.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* FORMAT */}
                            <div className="filter-column-v2">
                                <div className="filter-column-header">FORMAT</div>
                                <div className="filter-items-scroll">
                                    <button 
                                        className={`filter-item-v2 ${selectedFormat === '' ? 'active' : ''}`}
                                        onClick={() => setSelectedFormat('')}
                                    >
                                        Tüm Formatlar
                                    </button>
                                    {FORMATS.map((f) => (
                                        <button 
                                            key={f.value}
                                            className={`filter-item-v2 ${selectedFormat === f.value ? 'active' : ''}`}
                                            onClick={() => setSelectedFormat(f.value)}
                                        >
                                            {f.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* DURUM */}
                            <div className="filter-column-v2">
                                <div className="filter-column-header">DURUM</div>
                                <div className="filter-items-scroll">
                                    <button 
                                        className={`filter-item-v2 ${selectedStatus === '' ? 'active' : ''}`}
                                        onClick={() => setSelectedStatus('')}
                                    >
                                        Tüm Durumlar
                                    </button>
                                    {STATUSES.map((s) => (
                                        <button 
                                            key={s.value}
                                            className={`filter-item-v2 ${selectedStatus === s.value ? 'active' : ''}`}
                                            onClick={() => setSelectedStatus(s.value)}
                                        >
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div style={{ gridColumn: 'span 3', borderTop: '1px solid var(--glass-border)', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                                <button onClick={resetFilters} className="filter-item-v2" style={{ width: 'auto', textAlign: 'center' }}>
                                    Temizle
                                </button>
                                <button onClick={() => setIsFilterOpen(false)} className="filter-item-v2 active" style={{ width: 'auto', textAlign: 'center', background: 'var(--accent)', color: 'var(--bg-base)' }}>
                                    Uygula
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style={{ flex: 1 }}></div>
                    <div className="view-toggle-group">
                        <button 
                            className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                            title="Grid Görünümü"
                        >
                            <LayoutGrid size={20} />
                        </button>
                        <button 
                            className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                            title="Liste Görünümü"
                        >
                            <List size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {loading && animes.length === 0 ? (
                <div style={{ padding: '40px 5%', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <div className="loader" style={{ marginBottom: '20px' }}></div>
                    İçerikler yükleniyor...
                </div>
            ) : animes.length > 0 ? (
                viewMode === 'grid' ? (
                    <AnimeGrid title={searchTerm ? "Arama Sonuçları" : (selectedGenre || selectedFormat || selectedStatus ? "Filtrelenmiş Sonuçlar" : "Keşfet")} animes={animes} />
                ) : (
                    <div className="anime-list-v2">
                        <div style={{ padding: '0 5% 20px', fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600 }}>
                            {animes.length} sonuç listeleniyor
                        </div>
                        {animes.map((anime) => (
                            <Link href={`/anime/${anime.slug}`} key={anime.slug} className="list-card-v2">
                                <img src={anime.image} alt={anime.title} />
                                <div className="list-card-info">
                                    <div className="list-card-title">{anime.title}</div>
                                    <div className="list-card-meta">
                                        <span>{anime.genres}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Star size={14} fill="currentColor" stroke="none" />
                                            {anime.rating}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )
            ) : (
                <div style={{ padding: '100px 5%', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Eşleşen sonuç bulunamadı.
                </div>
            )}

            {loading && animes.length > 0 && (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                    Daha fazla yükleniyor...
                </div>
            )}

            <style dangerouslySetInnerHTML={{ __html: `
                .loader {
                    width: 40px;
                    height: 40px;
                    border: 3px solid var(--glass-border);
                    border-top-color: var(--accent);
                    border-radius: 50%;
                    margin: 0 auto;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}} />
        </div>
    );
}
