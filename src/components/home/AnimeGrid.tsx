import React from 'react';
import { AnimeCard, AnimeCardProps } from './AnimeCard';
import Link from 'next/link';

interface AnimeGridProps {
    title: string;
    viewAllLink?: string;
    animes: AnimeCardProps[];
}

export function AnimeGrid({ title, viewAllLink, animes }: AnimeGridProps) {
    return (
        <>
            <div className="section-header">
                <h2>{title}</h2>
                {viewAllLink && <Link href={viewAllLink}>Hepsini Gör</Link>}
            </div>

            <div className="anime-grid">
                {animes.map((anime) => (
                    <AnimeCard key={anime.slug} {...anime} />
                ))}
            </div>
        </>
    );
}
