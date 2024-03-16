import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import zustandStorage from "./mmkv";

// maybe use react-native-mmkv-storage if mmkv not working
// new update means both libs are in C++ on the JSI
// https://github.com/ammarahm-ed/react-native-mmkv-storage/issues/200

const initialState = {
  lastSongUrl: null,
  lastSongOrigin: null,
  lastSongType: null,
  lastSongName: null,
  lastSongArtist: null,
  lastSongThumbnail: null,
  platformsAvailable: null,
  preferredPlatform: null,
};

export default useSongStore = create(
  persist(
    (set) => ({
      // key-value pairs
      ...initialState,
      // actions
      setLastSongDetails: ({
        lastSongUrl, lastSongOrigin, lastSongType, lastSongName,
        lastSongArtist, lastSongThumbnail, platformsAvailable,
      }) => set(() => ({
        lastSongUrl,
        lastSongOrigin,
        lastSongType,
        lastSongName,
        lastSongArtist,
        lastSongThumbnail,
        platformsAvailable,
      })),
      reset: () => set(initialState),
    }),
    {
      name: 'song-storage', // unique name
      storage: createJSONStorage(() => zustandStorage), // default localStorage
      // storage: () => zustandStorage, // trying this from older docs
    },
  ),
);