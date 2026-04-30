import { Hero } from "@/components/home/Hero";
import { AnimeGrid } from "@/components/home/AnimeGrid";
import { fetchAnimes, fetchAnimeDetail, getImageUrl } from "@/lib/api";
import type { Anime } from "@/lib/types/anime";

export default async function Home() {
  const res = await fetchAnimes(1, 15);
  const data: Anime[] = res?.data || [];

  const heroData = data.slice(0, 6);
  const gridData = data.slice(6);

  // Fetch detailed info for hero animes to get full descriptions
  const heroAnimesDetailed = await Promise.all(
    heroData.map(async (anime: Anime) => {
      const detail = await fetchAnimeDetail(anime.slug);
      return detail?.data || anime;
    })
  );

  const gridAnimes = gridData.map((anime: Anime) => ({
    slug: anime.slug,
    title: anime.name,
    image: getImageUrl(anime.first_image),
    description: anime.description || "Bu seri henüz KatsuAnime veritabanına detaylı şekilde işlenmemiş.",
    genres: anime.categories?.join(", ") || "Anime",
    rating: "-",
  }));

  const heroItems = heroAnimesDetailed.length > 0
    ? heroAnimesDetailed.map((a: Anime) => ({
      title: a.name,
      description: a.description || "Bu seri henüz KatsuAnime veritabanına detaylı şekilde işlenmemiş. Daha fazla bilgi edinmek ve içeriği keşfetmek için tıklayın.",
      tag: "Öne Çıkan",
      backgroundImage: getImageUrl(a.first_image),
      link: `/anime/${a.slug}`
    }))
    : [{
      title: "KatsuAnime",
      description: "Sisteme henüz anime eklenmemiş veya API'ye ulaşılamıyor.",
      tag: "Bilgi",
      backgroundImage: "https://placehold.co/1920x1080/1a1a1d/444444?text=KatsuAnime",
      link: "/"
    }];

  return (
    <>
      <Hero items={heroItems} />

      {gridAnimes.length > 0 && (
        <AnimeGrid
          title="Son Eklenenler"
          viewAllLink="/kesfet"
          animes={gridAnimes}
        />
      )}
    </>
  );
}
