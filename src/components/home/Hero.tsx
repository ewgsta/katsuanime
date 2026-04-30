"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export interface HeroItem {
    title: string;
    description: string;
    tag: string;
    backgroundImage: string;
    link?: string;
}

interface HeroProps {
    items: HeroItem[];
}

export function Hero({ items }: HeroProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!items || items.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, 6000); // Change image every 6 seconds

        return () => clearInterval(interval);
    }, [items]);

    if (!items || items.length === 0) return null;

    return (
        <section className="hero-carousel-container" style={{ position: 'relative', height: '75vh', overflow: 'hidden', marginBottom: '40px', borderBottomLeftRadius: 'var(--radius-lg)', borderBottomRightRadius: 'var(--radius-lg)' }}>
            {items.map((item, index) => {
                const isActive = index === currentIndex;

                return (
                    <div
                        key={index}
                        className={`hero-slide ${isActive ? 'active' : ''}`}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            opacity: isActive ? 1 : 0,
                            transition: 'opacity 1s ease-in-out',
                            zIndex: isActive ? 5 : 1,
                            background: `url('${item.backgroundImage}') center/cover no-repeat`
                        }}
                    >
                        {/* Gradient Overlay */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, var(--bg-base) 0%, rgba(10, 10, 11, 0.5) 50%, transparent 100%)',
                            zIndex: 1
                        }}></div>

                        <div className="hero-content" style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            padding: '60px 5%',
                            zIndex: 10,
                            maxWidth: '700px',
                            transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                            opacity: isActive ? 1 : 0,
                            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
                        }}>
                            <span className="tag">{item.tag}</span>
                            <h1>{item.title}</h1>
                            <p style={{
                                color: 'var(--text-muted)',
                                fontSize: '15px',
                                lineHeight: 1.6,
                                marginBottom: '24px',
                                maxWidth: '90%',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical' as const,
                                overflow: 'hidden',
                            }}>{item.description}</p>
                            <div className="btn-group">
                                <Link href={item.link || "/play"} className="btn-play">
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                    İzlemeye Başla
                                </Link>
                                <button type="button" className="btn-list">Listeme Ekle</button>
                            </div>
                        </div>
                    </div>
                );
            })}

            {items.length > 1 && (
                <div className="hero-indicators" style={{
                    position: 'absolute',
                    bottom: '30px',
                    right: '5%',
                    display: 'flex',
                    gap: '12px',
                    zIndex: 20
                }}>
                    {items.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            style={{
                                width: idx === currentIndex ? '30px' : '10px',
                                height: '10px',
                                borderRadius: '5px',
                                background: idx === currentIndex ? 'var(--accent)' : 'var(--glass-border)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            aria-label={`Slide ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
