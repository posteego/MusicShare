import { useState, useEffect } from 'react';
import { zustandStorage } from 'stores';

const ERROR_CODES = [
  'could_not_resolve_entity', // statusCode: 400
];

const useSongLink = (url) => { // add selectedPlatform
  const [songData, setSongData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchRequested, setFetchRequested] = useState(false);

  const apiUrl = new URL('https://api.song.link/v1-alpha.1/links?');
  const searchParams = {
    url: encodeURIComponent(url),
    songIfSingle: true,
  };

  // add reqBody to the url as correct url params
  // Object.keys(reqBody).forEach(key => baseUrl.searchParams.append(key, reqBody[key]));
  apiUrl.searchParams.append('url', searchParams.url);

  const getMetadata = (data) => {
    const originalService = data.entityUniqueId.split('_')[0];
    const entities = data.entitiesByUniqueId;
    console.log({ entities });
    // grab first set of data
    const arbitraryService = Object.keys(entities)[0];
    const serviceData = entities[arbitraryService];
    const serviceName = serviceData.apiProvider;
    const type = serviceData.type.toUpperCase();
    const title = serviceData.title;
    const artistName = serviceData.artistName;
    const thumbnailUrl = serviceData.thumbnailUrl;
    const thumbnailWidth = serviceData.thumbnailWidth;
    const thumbnailHeight = serviceData.thumbnailHeight;
    zustandStorage.setItem('lastSongUrl', url);
    zustandStorage.setItem('lastSongOrigin', originalService.toLowerCase());
    zustandStorage.setItem('lastSongType', type);
    zustandStorage.setItem('lastSongName', title);
    zustandStorage.setItem('lastSongArtist', artistName);
    zustandStorage.setItem('lastSongThumbnail', thumbnailUrl);

    // const plats = new Object();

    // for (const name in data.linksByPlatform) {
    //   plats[name] = data.linksByPlatform[name].url;
    // }

    const platformsAvailableByName = Object.keys(data.linksByPlatform);

    const platformsAvailable = platformsAvailableByName.map((name, idx) => (
      {
        id: idx,
        name: name,
        url: data.linksByPlatform[name].url,
      }
    ));
    // const platformsAvailable = plats;

    const stringed = JSON.stringify(platformsAvailable);
    zustandStorage.setItem('platformsAvailable', stringed);

    console.log(`${type} data provided by`, originalService);
    return {
      type,
      title,
      artistName,
      thumbnailUrl,
      thumbnailWidth,
      thumbnailHeight,
      originalService,
      platformsAvailable,
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
      const metadata = getMetadata(json);
      setSongData(metadata);
    } catch (err) {
      setError(err);
      console.log('[useSongLink error]', err);
    } finally {
      setLoading(false);
      setFetchRequested(false);
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

  return {
    data: songData,
    loading,
    error,
    requestFetch,
  };
};

export default useSongLink;
