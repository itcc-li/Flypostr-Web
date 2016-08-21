import { autorun, observable } from 'mobx';

class MapStore {
  locationStore;
  @observable map = null;
  @observable zoom = 3;
  @observable center = { lat: 47.141030, lng: 9.520928 };

  constructor(locationStore) {
    this.locationStore = locationStore;

    /*
    autorun(() => {
      // Update map center from geolocation coords.
      if (locationStore.coords.lat & locationStore.coords.lat) {
        this.center.lat = locationStore.coords.lat;
        this.center.lng = locationStore.coords.lng;
      }
    });
    */

    autorun(() => {
      const coords = this.locationStore.coords;
      if (this.map && Object.keys(coords).length > 0) {
        this.map.setZoom(12);
        this.map.setCenter(coords);
      }
    });
  }
}

export default MapStore;
