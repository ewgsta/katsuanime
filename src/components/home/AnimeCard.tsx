import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';

export interface AnimeCardProps {
    slug: string;
    title: string;
    image: string;
    genres?: string;
    rating?: string | number;
}

export function AnimeCard({ slug, title, image, genres, rating }: AnimeCardProps) {
    return (
        <Link href={`/anime/${slug}`} className="anime-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={`${title} Poster`} />
            <div className="card-info">
                <div className="card-title">{title}</div>
                <div className="card-meta">
                    <span>{genres}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star size={14} fill="currentColor" stroke="none" />
                        {rating}
                    </span>
                </div>
            </div>
        </Link>
    );
}
