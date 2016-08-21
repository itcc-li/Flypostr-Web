import React from 'react';
import { inject, observer } from 'mobx-react';

import styles from './styles.css'

@inject('locationStore')
@observer
class Location extends React.Component {
  render() {
    return (
      <div>
        {this.renderStatus()}
      </div>
    );
  }

  renderStatus() {
    const { available, enabled } = this.props.locationStore;

    if (!available) {
      return <div className={styles.statusError}>GeoLocation ist auf deinem Client leider nicht verfügbar.</div>
    }

    if (available && !enabled) {
      return <div className={styles.statusSuccess}>Deine Position wird bestimmt...</div>
    }
  }
}

export default Location;
