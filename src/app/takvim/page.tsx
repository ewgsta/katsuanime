"use client";
import React, { useState, useEffect } from "react";
import {
  AnimeHorizontalCard,
  AnimeHorizontalCardProps,
} from "@/components/home/AnimeHorizontalCard";
import { fetchAnimes, getImageUrl } from "@/lib/api";
import type { Anime } from "@/lib/types/anime";

const DAYS = [
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
  "Pazar",
];

export default function TakvimPage() {
  const [scheduleData, setScheduleData] = useState<
    Record<string, AnimeHorizontalCardProps[]>
  >({});
  const [loading, setLoading] = useState(true);

  // Madem API'den geleni istiyoruz, sahte sabit veri yerine liste çekip günlere dağıtıyoruz.
  useEffect(() => {
    const loadSchedule = async () => {
      setLoading(true);
      const res = await fetchAnimes(1, 30);
      const animes: Anime[] = res?.data || [];

      const newSchedule: Record<string, AnimeHorizontalCardProps[]> = {};
      DAYS.forEach((day) => {
        newSchedule[day] = [];
      });

      // Gelen animeleri günlere eşit bir tasarımsal simülasyonla paylaştır (API'de takvim verisi gelene kadar)
      animes.forEach((anime: Anime, index: number) => {
        const dayName = DAYS[index % 7];
        newSchedule[dayName].push({
          slug: anime.slug,
          title: anime.name,
          image: getImageUrl(anime.first_image),
          genres: anime.categories?.slice(0, 2).join(", ") || "Yeni Bölüm",
          rating: "-",
        });
      });

      setScheduleData(newSchedule);
      setLoading(false);
    };
    loadSchedule();
  }, []);

  return (
    <>
      <div
        style={{
          padding: "60px 5% 20px",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.03), transparent)",
        }}
      >
        <h1
          style={{
            fontFamily: "'Carter One', cursive",
            fontSize: "40px",
            fontWeight: 700,
            marginBottom: "16px",
            color: "var(--accent)",
          }}
        >
          Çıkış Takvimi
        </h1>
      </div>

      <div style={{ padding: "0 5% 60px" }}>
        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "100px 0",
              color: "var(--text-muted)",
            }}
          >
            Takvim yükleniyor...
          </div>
        ) : (
          DAYS.map((day) => {
            const animes = scheduleData[day] || [];
            return (
              <div key={day} style={{ marginBottom: "48px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Carter One', cursive",
                      fontSize: "24px",
                      fontWeight: 600,
                      color: "var(--accent)",
                    }}
                  >
                    {day}
                  </h2>
                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      background: "var(--glass-border)",
                      marginLeft: "16px",
                    }}
                  ></div>
                </div>

                {animes.length > 0 ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(300px, 1fr))",
                      gap: "20px",
                    }}
                  >
                    {animes.map((anime) => (
                      <AnimeHorizontalCard key={anime.slug} {...anime} />
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      padding: "30px",
                      background: "var(--glass-bg)",
                      borderRadius: "var(--radius-md)",
                      border: "1px dashed var(--glass-border)",
                      color: "var(--text-muted)",
                      fontSize: "14px",
                    }}
                  >
                    Dinlenme Günü. Aktif bir yayın yok.
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
