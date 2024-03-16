import { useState, useEffect } from 'react';
import { Linking } from 'react-native';
import { useSongStore } from 'stores';

const ERROR_CODES = [
  'could_not_resolve_entity', // statusCode: 400
];

const useSongLink = (url) => { // add selectedPlatform
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchRequested, setFetchRequested] = useState(false);
  const preferredPlatform = useSongStore((state) => state.preferredPlatform);
  const setLastSongDetails = useSongStore((state) => state.setLastSongDetails);
  const reset = useSongStore((state) => state.reset);

  const apiUrl = new URL('https://api.song.link/v1-alpha.1/links?');
  const searchParams = {
    url: encodeURIComponent(url),
    songIfSingle: true,
  };

  // add reqBody to the url as correct url params
  // Object.keys(reqBody).forEach(key => baseUrl.searchParams.append(key, reqBody[key]));
  apiUrl.searchParams.append('url', searchParams.url);

  // const {
  //   lastSongOrigin: originalService,
  //   lastSongType: type,
  //   lastSongTitle: title,
  //   lastSongArtist: artistName,
  //   lastSongThumbnail: thumbnail,
  //   platformsAvailable: plats,
  // } = useSongStore();
  // let platformsAvailable = JSON.parse(plats) ?? null;

  const getMetadata = async (data) => {
    const originalService = data.entityUniqueId.split('_')[0];
    const entities = data.entitiesByUniqueId;
    // grab first set of data
    const arbitraryService = Object.keys(entities)[0];
    const serviceData = entities[arbitraryService];
    // const serviceName = serviceData.apiProvider;
    const type = serviceData.type.toUpperCase();
    const title = serviceData.title;
    const artistName = serviceData.artistName;
    const thumbnailUrl = serviceData.thumbnailUrl;
    // const thumbnailWidth = serviceData.thumbnailWidth;
    // const thumbnailHeight = serviceData.thumbnailHeight;

    const platformsAvailableByName = Object.keys(data.linksByPlatform);

    const platformsAvailable = platformsAvailableByName.map((name, idx) => (
      {
        id: idx,
        name: name,
        url: data.linksByPlatform[name].url,
      }
    ));
    const plats = JSON.stringify(platformsAvailable);

    // update store
    setLastSongDetails({
      lastSongUrl: url,
      lastSongOrigin: originalService.toLowerCase(),
      lastSongType: type,
      lastSongName: title,
      lastSongArtist: artistName,
      lastSongThumbnail: thumbnailUrl,
      platformsAvailable: plats,
    });

    console.log(`${type} data provided by`, originalService);

    console.log('data', JSON.stringify(data, null, 2));

    if (
      preferredPlatform !== null &&
      preferredPlatform !== originalService.toLowerCase()
    ) {
      await Linking.openURL(data.linksByPlatform[preferredPlatform].url);
    }
  };

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      if (json.statusCode === 400) throw json.code;
      getMetadata(json);
    } catch (err) {
      setError(err);
      reset();
      console.log('[useSongLink error]', JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
      setFetchRequested(false);
      setError(null);
    }
  };

  // [] - didMount
  // return () => {} - willUnmount
  // no [] - didUpdate
  useEffect(() => {
    if (!url || !fetchRequested) {
      return;
    }
    fetchLinks();
  }, [url, fetchRequested]);

  const requestFetch = () => {
    setFetchRequested(true);
  }

  // useEffect(() => {
  //   if (url == null) {
  //     const metadata = getMetadata(null);
  //     setSongData(metadata);
  //   }
  // }, []);

  return {
    loading,
    error,
    requestFetch,
  };
};

export default useSongLink;
