export const ANIME_API_URL = process.env.NEXT_PUBLIC_ANIME_API_URL;

export const getBaseUrl = () => {
    return (ANIME_API_URL || '').replace(/\/$/, '');
};

export const getImageUrl = (path?: string) => {
    if (!path) return 'https://placehold.co/400x600/1e1e20/555?text=No+Image';
    if (path.startsWith('http')) return path;
    return `${getBaseUrl()}${path.startsWith('/') ? '' : '/'}${path}`;
};
