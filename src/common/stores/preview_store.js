import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

export default useSongStore = create(
  persist(
    (get, set) => ({
      lastSongShared: '',
      updateSong: (songUrl) => set({ lastSongShared: songUrl }),
      removeSong: () => set({ lastSongShared: '' }),
    }),
    {
      name: 'song-storage', // must be unique
      storage: createJSONStorage(() => AsyncStorage), // default is localStorage
      onRehydrateStorage: (state) => {
        console.log("rehydrating");
        return (state, err) => {
          if (err) {
            console.log('error during rehydration', err);
          } else {
            console.log('hydration finished');
          }
        };
      },
    },
  ),
);