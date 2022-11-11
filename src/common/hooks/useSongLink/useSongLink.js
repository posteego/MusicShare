import { useState, useEffect } from 'react';

const useSongLink = (url, provider) => {
  const [loading, setLoading] = useState(false);
  const [songData, setSongData] = useState({});
  const [error, setError] = useState (null);

  const apiUrl = new URL('https://api.song.link/v1-alpha.1/links');
  const searchParams = {
    url: encodeURIComponent(url),
  };
  // add reqBody to the url as correct url params
  // Object.keys(reqBody).forEach(key => baseUrl.searchParams.append(key, reqBody[key]));
  apiUrl.searchParams.append('url', searchParams.url);

  const getMetadata = (data) => {
    const entities = data.entitiesByUniqueId;
    // grab first set of data
    const arbitraryService = Object.keys(entities)[0];
    const serviceData = entities[arbitraryService];
    const serviceName = serviceData.apiProvider;
    const type = serviceData.type;
    const title = serviceData.title;
    const artistName = serviceData.artistName;
    const thumbnailUrl = serviceData.thumbnailUrl;
    const thumbnailWidth = serviceData.thumbnailWidth;
    const thumbnailHeight = serviceData.thumbnailHeight;

    console.log(`${type} data provided by`, serviceName);
    return {
      type,
      title,
      artistName,
      thumbnailUrl,
      thumbnailWidth,
      thumbnailHeight,
    }
  };

  const fetchLinks = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      const metadata = getMetadata(json);
      const platformsAvailable = Object.keys(json.linksByPlatform);
      setSongData(metadata);
    } catch (err) {
      setError(err);
      console.log('[useSongLink error]', err);
    }
  };

  // [] - didMount
  // return () => {}, willUnmount
  // no [] = didUpdate
  useEffect(() => {
    setLoading(true);
    fetchLinks();
    setLoading(false);
  }, []);

  return {
    data: songData,
    loading,
    error,
  };
};

export default useSongLink;
