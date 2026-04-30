export interface AnimeCategory {
    id: number;
    name: string;
}

export interface AnimeEpisode {
    episode_number: number;
    type?: string;
    sources?: { watch_url: string }[];
}

export interface Anime {
    slug: string;
    name: string;
    first_image?: string;
    categories?: string[];
    description?: string;
    episodes?: AnimeEpisode[];
    related_animes?: Pick<Anime, "slug" | "name" | "first_image">[];
}

export interface AnimeResponse {
    data: Anime[];
    total?: number;
    page?: number;
    limit?: number;
}

export interface SingleAnimeResponse {
    data: Anime;
}
