import { getBaseUrl, getImageUrl } from './api/config';
import * as animeApi from './api/anime';
import * as katsuApi from './api/katsu';

const { fetchAnimes, fetchAnimeDetail, searchAnimes, fetchCategories } = animeApi;

export {
    getBaseUrl,
    getImageUrl,
    fetchAnimes,
    fetchAnimeDetail,
    searchAnimes,
    fetchCategories,
    animeApi,
    katsuApi
};
