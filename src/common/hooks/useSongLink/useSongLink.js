import { useState, useEffect } from 'react';

const ERROR_CODES = [
  'could_not_resolve_entity', // statusCode: 400
];

const useSongLink = (url) => {
  const [songData, setSongData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiUrl = new URL('https://api.song.link/v1-alpha.1/links');
  const searchParams = {
    url: encodeURIComponent(url),
  };
  // add reqBody to the url as correct url params
  // Object.keys(reqBody).forEach(key => baseUrl.searchParams.append(key, reqBody[key]));
  apiUrl.searchParams.append('url', searchParams.url);

  const getMetadata = (data) => {
    const originalService = data.entityUniqueId.split('_')[0];
    const entities = data.entitiesByUniqueId;
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

    const platformsAvailable = Object.keys(data.linksByPlatform);

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
    }
  };

  // [] - didMount
  // return () => {} - willUnmount
  // no [] - didUpdate
  useEffect(() => {
    if (!url) {
      console.log("no URL found.");
      return;
    }
    setLoading(true);
    fetchLinks();
    setLoading(false);
  }, [url]);

  return {
    data: songData,
    loading,
    error,
  };
};

export default useSongLink;
