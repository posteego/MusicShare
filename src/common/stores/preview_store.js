import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from "./mmkv";

export default useSongStore = create(
  persist(
    () => ({
      lastSongUrl: null,
      lastSongOrigin: null,
      lastSongType: null,
      lastSongName: null,
      lastSongArtist: null,
      lastSongThumbnail: null,
      lastSongConversion: null,
      platformsAvailable: null,
    }),
    {
      name: 'song-storage', // must be unique
      storage: createJSONStorage(() => zustandStorage), // default localStorage
    },
  ),
);