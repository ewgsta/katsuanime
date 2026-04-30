import { getBaseUrl } from './config';
import type { AnimeResponse, SingleAnimeResponse } from '../types/anime';

export async function fetchAnimes(page = 1, limit = 20, categoryId?: string, type?: string): Promise<AnimeResponse | null> {
    try {
        let url = `${getBaseUrl()}/animes?page=${page}&limit=${limit}`;

        if (categoryId) {
            url = `${getBaseUrl()}/categories/${categoryId}/animes?page=${page}&limit=${limit}`;
        }

        if (type) url += `&type=${type}`;

        const res = await fetch(url, {
            next: { revalidate: 60 }
        });
        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`API Error ${res.status}: ${errText}`);
        }

        const jsonData = await res.json();

        if (Array.isArray(jsonData)) {
            // Convert Array response to AnimeResponse interface
            return {
                data: jsonData,
                page,
                limit
            };
        }

        return jsonData;
    } catch (error) {
        console.error('Failed to fetch animes:', error);
        return null;
    }
}

export async function fetchAnimeDetail(slug: string): Promise<SingleAnimeResponse | null> {
    try {
        const res = await fetch(`${getBaseUrl()}/animes/${slug}`, {
            next: { revalidate: 60 }
        });
        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`API Error ${res.status}: ${errText}`);
        }
        return await res.json();
    } catch (error) {
        console.error(`Failed to fetch detail for ${slug}:`, error);
        return null;
    }
}

export async function searchAnimes(query: string): Promise<AnimeResponse | null> {
    try {
        const res = await fetch(`${getBaseUrl()}/search?q=${encodeURIComponent(query)}`, {
            cache: 'no-store'
        });
        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`API Error ${res.status}: ${errText}`);
        }
        return await res.json();
    } catch (error) {
        console.error(`Failed to search ${query}:`, error);
        return null;
    }
}

export async function fetchCategories() {
    try {
        const res = await fetch(`${getBaseUrl()}/categories`, {
            next: { revalidate: 3600 }
        });
        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`API Error ${res.status}: ${errText}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return null;
    }
}
