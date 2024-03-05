import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from "./mmkv";


export default useSongStore = create(
  persist(
    (set) => ({
      // key-value pairs
      lastSongUrl: null,
      lastSongOrigin: null,
      lastSongType: null,
      lastSongName: null,
      lastSongArtist: null,
      lastSongThumbnail: null,
      platformsAvailable: null,
      preferredPlatform: null,
      // actions
      setLastSongDetails: (
        { url, origin, type, name, artist, thumb, plats }
      ) => set({
        lastSongUrl: url,
        lastSongOrigin: origin,
        lastSongType: type,
        lastSongName: name,
        lastSongArtist: artist,
        lastSongThumbnail: thumb,
        platformsAvailable: plats,
      }),
    }),
    {
      name: 'song-storage', // must be unique
      storage: createJSONStorage(() => zustandStorage), // default localStorage
    },
  ),
);