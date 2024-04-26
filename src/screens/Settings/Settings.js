import React, { useRef } from 'react';
import { string } from 'prop-types';
import {
  useColorScheme, ScrollView, View, Text,
  TouchableOpacity,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { AnimatedDropdown } from 'components';
import { useSongStore } from 'stores';
import { PLATFORMS } from 'constants';
import styles from './styles';


const propTypes = {
  key: string,
};

const defaultProps = {
  key: null,
};

const Settings = ({ key }) => {
  const theme = useColorScheme();
  const data = useSongStore();
  const setDefaultPlatform = useSongStore((state) => state.setDefaultPlatform);
  const resetCache = useSongStore((state) => state.reset);

  // just check if artist field is null for cache
  const shouldDisableReset = !(data.lastSongArtist !== null || data.preferredPlatform !== null);

  // convert PLATFORMS obj into array for dropdown
  const platformObjEnum = Object.values(PLATFORMS);
  // sort alphabetically 
  platformObjEnum.sort((a, b) => {
    if (a.id < b.id) return -1
    if (a.id > b.id) return 1
    return 0
  });
  const platformEnum = platformObjEnum.map((plat) => plat.name);
  platformEnum.sort();

  const dropdownRef = useRef({});

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ marginHorizontal: 25, marginTop: 5, marginBottom: 20 }}>
        <Text style={styles.description(theme)}>Beatbridge was designed as a personal tool to share music links with friends regardless of the platforms being used.</Text>
        <Text style={styles.description(theme)}>This app is not intended to convert playlists.</Text>
      </View>
      <View style={{ marginHorizontal: 25, marginBottom: 10 }}>
        <Text style={[styles.buttonLabel(theme)]}>DEFAULT PLATFORM</Text>
        <Text style={[styles.buttonLabel(theme), { fontWeight: '300' }]}>Select to open external links automatically</Text>
      </View>
      <AnimatedDropdown data={platformObjEnum} theme={theme} />
      {/* <SelectDropdown
        ref={dropdownRef}
        onSelect={(selectedItem, idx) => {
          const plat = selectedItem.id === 'appleMusic' ? 'itunes' : selectedItem.id.toLowerCase();
          setDefaultPlatform({ preferredPlatform: plat });
        }}
        buttonTextAfterSelection={(selectedItem, idx) => {
          return selectedItem.name;
        }}
        rowTextForSelection={(item, idx) => {
          return item.name;
        }}
        dropdownStyle={styles.dropdown(theme)}
        buttonStyle={[styles.dropdownButton(theme)]}
        buttonTextStyle={[styles.buttonText(theme), { color: 'white' }]}
        rowStyle={[styles.dropdownRow(theme)]}
        rowTextStyle={[styles.dropdownRowText(theme)]}
        selectedRowStyle={[styles.selectedRow(theme)]}
        selectedRowTextStyle={[styles.selectedRowText(theme)]}
        dropdownOverlayColor='rgba(0,0,0,0.4)'
        defaultButtonText='Select Platform'
        data={platformObjEnum}
        disableAutoScroll={true}
        showsVerticalScrollIndicator={false}
      /> */}
      <View style={{ position: 'absolute', bottom: 75 }}>
        <View style={{ marginHorizontal: 25, marginBottom: 10 }}>
          <Text style={[styles.buttonLabel(theme)]}>RESET</Text>
          <Text style={[styles.buttonLabel(theme), { fontWeight: '300' }]}>Delete all data</Text>
        </View>
        <TouchableOpacity
          key={'reset-cache-btn'}
          onPress={() => {
            resetCache();
            dropdownRef.current.reset();
          }}
          disabled={shouldDisableReset}
        >
          <View style={[styles.buttonContainer(theme, shouldDisableReset), { backgroundColor: shouldDisableReset ? '#AAA' : '#FC5B81' }]}>
            <Text style={[styles.buttonText(theme)]}>Reset Data</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          marginVertical: 20,
          bottom: 0,
        }}
      >
        <Text style={{ color: '#777777' }}>Powered by Odesli.co</Text>
      </View>
    </View>
  );
};

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;

export default Settings;
