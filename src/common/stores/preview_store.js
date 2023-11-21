import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

export const useSongStore = create(
  persist(
    (get, set) => ({
      lastSongShared: '',
      updateSong: (songUrl) => set({ lastSongShared: songUrl }),
      removeSong: () => set({ lastSongShared: '' }),
    }),
    {
      name: 'song-storage', // must be unique
      storage: createJSONStorage(() => localStorage), // default
    },
  ),
);
