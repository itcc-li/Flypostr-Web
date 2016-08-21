import { action, autorun, computed, observable } from 'mobx';

class LocationStore {
  @observable available = false;
  @observable enabled = false;
  @observable coords = {};

  constructor() {
    if ('geolocation' in navigator) {
      this.available = true;
      navigator.geolocation.getCurrentPosition(this.onPositionSuccess.bind(this), this.onPositionError.bind(this), {
        enableHighAccuracy: true,
        timeout: 6000,
        maximumAge: 0,
      });
      // TODO: Throttle watchPosition()
      // navigator.geolocation.watchPosition(this.onPositionSuccess.bind(this), this.onPositionError.bind(this));
    }
  }

  @action onPositionSuccess(position) {
    this.enabled = true;
    this.coords = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
  }

  @action onPositionError(error) {
    this.enabled = false;
    // Don't reset last available coords.
  }

  @computed get active() {
    return this.available && this.enabled && this.coords;
  }
}

export default LocationStore;
