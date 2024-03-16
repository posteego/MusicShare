import { MMKV } from "react-native-mmkv";

const storage = new MMKV({
  id: 'song-storage',
});

export default zustandStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    return storage.getString(name) ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};
