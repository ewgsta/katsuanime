import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';

export interface AnimeHorizontalCardProps {
    slug: string;
    title: string;
    image: string;
    genres?: string;
    rating?: string | number;
}

export function AnimeHorizontalCard({ slug, title, image, genres, rating }: AnimeHorizontalCardProps) {
    return (
        <Link href={`/anime/${slug}`} className="anime-horizontal-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={`${title} Poster`} />
            <div className="horizontal-card-info">
                <div className="horizontal-card-title">{title}</div>
                <div className="horizontal-card-meta">
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
