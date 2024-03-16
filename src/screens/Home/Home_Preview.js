import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import {
  useColorScheme,
  View, Pressable,
} from 'react-native';
import { AnimatedLoading, AnimatedToast } from 'components';
import Icon from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import isUrl from 'validator/lib/isURL';
import { useSongLink } from 'hooks';
import { LinkResult } from './components';
import styles from './styles';

const propTypes = {
  key: string,
};

const defaultProps = {
  key: null,
};

const Home_Preview = ({ key }) => {
  const theme = useColorScheme();
  const [pastedUrl, setPastedUrl] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [status, setStatus] = useState(null);
  const [toastName, setToastName] = useState(null);

  // grab zustand data from the hook, not from home screen
  const { loading, error, requestFetch } = useSongLink(pastedUrl);

  useEffect(() => {
    if (pastedUrl) {
      requestFetch();
      setStatus(null);
    }
  }, [pastedUrl]);

  useEffect(() => {
    if (error) {
      setStatus(error);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  }, [error]);

  const getUrl = async () => {
    try {
      const clipboardUrl = await Clipboard.getString();
      if (await isUrl(clipboardUrl)) setPastedUrl(clipboardUrl);
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const handleNewShare = async () => {
    getUrl();
  };

  const PasteButton = () => (
    <Pressable
      onPress={handleNewShare}
      style={({ pressed }) => [styles.shareButton(pressed)]}
      android_ripple={styles.androidRipple}
    >
      {({ pressed }) => (
        <>
          <Icon
            name="arrow-up"
            size={28}
            color={pressed ? '#f2ee6e' : '#405FDF'}
          />
        </>
      )}
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Show Results or Instructions (LinkResult) if not loading */}
      {showToast && <AnimatedToast status={status} platform={toastName} />}
      {
        loading == true ?
          <AnimatedLoading theme={theme} />
          : <LinkResult
            loading={loading}
            setToastName={setToastName}
            setShowToast={setShowToast}
          />
      }
      <PasteButton />
    </View >
  );
};

Home_Preview.propTypes = propTypes;
Home_Preview.defaultProps = defaultProps;

export default Home_Preview;
