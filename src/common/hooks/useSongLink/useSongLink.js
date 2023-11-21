import { useState, useEffect } from 'react';
import { zustandStorage } from 'stores';

const ERROR_CODES = [
  'could_not_resolve_entity', // statusCode: 400
];

const useSongLink = (url, selectedPlatform) => {
  const [newLink, setNewLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchRequested, setFetchRequested] = useState(false);

  const searchParams = {
    url: encodeURIComponent(url),
    platform: selectedPlatform, 
  };
  const apiUrl = new URL(`https://song.link/redirect?url=${searchParams.url}&to=${searchParams.platform}`).toString().slice(0, -1); // del trailing slash

  const fetchLinks = async () => {
    setLoading(true);
    // let apiUrl = String(api).slice(0, -1);
    console.log({ apiUrl });
    try {
      const response = await fetch(apiUrl, {
        redirect: 'follow',
      });
      if (response.ok) {
        console.log(response.url);
        setNewLink(response.url);
        zustandStorage.setItem('lastSongUrl', response.url);
      }
    } catch (err) {
      setError(err);
      console.log('[useSongLink error]', err);
    } finally {
      setLoading(false);
      setFetchRequested(false);
    }
    // setNewLink(`${apiUrl}`);
    // setLoading(false);
    // setFetchRequested(false);
  };

  // [] - didMount
  // return () => {} - willUnmount
  // no [] - didUpdate
  useEffect(() => {
    if (!fetchRequested || !url || !selectedPlatform) {
      return;
    }
    fetchLinks();
  }, [fetchRequested, url, selectedPlatform]);

  const requestFetch = () => {
    setFetchRequested(true);
  };

  return {
    data: newLink,
    loading,
    error,
    requestFetch,
  };
};

export default useSongLink;
