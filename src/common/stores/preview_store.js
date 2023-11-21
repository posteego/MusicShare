import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from "./mmkv";

export default useSongStore = create(
  persist(
    () => ({
      lastSongUrl: null,
      lastSongName: null,
      lastSongArtist: null,
      lastSongConversion: null,
    }),
    {
      name: 'song-storage', // must be unique
      storage: createJSONStorage(() => zustandStorage), // default localStorage
    },
  ),
);