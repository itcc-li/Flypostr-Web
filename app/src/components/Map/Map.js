import React from 'react';
import ReactDOM from 'react-dom';
import { inject, observer } from 'mobx-react';
import { autorun } from 'mobx';
import styles from './styles.css';

@inject('postingStore', 'locationStore', 'mapStore')
@observer
class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { center, zoom } = this.props.mapStore;
    const options = {
      center: new google.maps.LatLng(center.lat, center.lng),
      zoom: zoom,
      scrollwheel: true,
    };

    this.props.mapStore.map = new google.maps.Map(this.refs.map, options);
  }

  render() {
    this.addMarkers();
    return (
      <div className={styles.map} ref="map"></div>
    );
  }

  buildMarkerIcon(label) {
    // const svg = '<svg height="48" viewBox="0 0 64 64" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M56.525 24.533c0-13.548-10.982-24.528-24.53-24.528-13.355 0-24.2 10.683-24.5 23.968-.01-.004-.02-.004-.028-.004-.006.12.013.24.01.36 0 .068-.01.136-.01.203 0 .244.03.48.037.72.276 15.938 18.29 32.756 24.492 38.742 17.415-14.12 22.485-27.216 23.95-34.2.053-.244.1-.488.145-.733.142-.752.24-1.426.308-2.004l.002-.02c.183-1.615.125-2.505.125-2.505z" fill="#157293" stroke="#fff" style="stroke-width: 3px; stroke-opacity: 1;" /></svg>';
    const svg = '<svg width="48" height="48" viewBox="0 0 175 262" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><path d="M87.5,0c48.293,0 87.5,39.207 87.5,87.5c0,48.293 -39.207,87.5 -87.5,87.5c-48.293,0 -87.5,-39.207 -87.5,-87.5c0,-48.293 39.207,-87.5 87.5,-87.5ZM87.5,54.167c18.397,0 33.333,14.936 33.333,33.333c0,18.397 -14.936,33.333 -33.333,33.333c-18.397,0 -33.333,-14.936 -33.333,-33.333c0,-18.397 14.936,-33.333 33.333,-33.333Z" style="fill:#157293;"/><path d="M87.5,261.917l-81.25,-141.504l162.5,0l-81.25,141.504Z" style="fill:#157293;"/></svg>';
    return {
      anchor: new google.maps.Point(24, 24),
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    };
  }

  updateZoom() {
    this.mapStore.map.setZoom(14);
  }

  addMarkers() {
    const { postings } = this.props.postingStore;

    postings.forEach((posting) => {

      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(posting.lat, posting.lng),
        title: posting.title,
        map: this.props.mapStore.map,
        icon: this.buildMarkerIcon(),
      });

      marker.addListener('click', () => {
        this.props.postingStore.activePosting = posting;
      });
    });
  }

  addLocation() {
    var infoWindow = new google.maps.InfoWindow({ map: this.props.mapStore.map });
    var pos = {
      lat: this.props.locationStore.coords.lat,
      lng: this.props.locationStore.coords.lng,
    };
    infoWindow.setPosition(pos);
    infoWindow.setContent('Du');
  }
}

export default Map;
