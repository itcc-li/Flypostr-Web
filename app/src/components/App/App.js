import React from 'react';
import { Provider } from 'mobx-react';
import firebase from 'firebase';

import Map from '../Map';
import MapStore from '../../stores/MapStore';

import Posting from '../Posting';
import PostingStore from '../../stores/PostingStore';

import Location from '../Location';
import LocationStore from '../../stores/LocationStore';

import Debug from '../Debug';

import styles from './styles.css';

const config = {
  apiKey: 'AIzaSyC4as3SxxQOtOWnyLzu4lnMCUm46L3z88E',
  authDomain: 'flypostr-cd317.firebaseapp.com',
  databaseURL: 'https://flypostr-cd317.firebaseio.com',
  storageBucket: 'flypostr-cd317.appspot.com',
};

const firebaseApp = firebase.initializeApp(config);
const databaseRef = firebase.database().ref('postings');
const storageRef = firebase.storage().ref('images');

const postingStore = new PostingStore(databaseRef, storageRef);
const locationStore = new LocationStore();
const mapStore = new MapStore(locationStore);

const App = () => (
  <Provider postingStore={postingStore} locationStore={locationStore} mapStore={mapStore}>
    <div>
      <Location />
      {/*<Debug />*/}
      <div className={styles.container}>
        <Map />
        <Posting />
      </div>
    </div>
  </Provider>
);

export default App;
