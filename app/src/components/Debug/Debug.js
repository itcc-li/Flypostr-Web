import React from 'react';
import { inject, observer } from 'mobx-react';

import styles from './styles.css';

@inject('locationStore')
@observer
class Debug extends React.Component {
  render() {
    return(
      <div className={styles.debug}>
        <ul>
          <li><strong>Available:</strong> <code>{JSON.stringify(this.props.locationStore.available, null, 2)}</code></li>
          <li><strong>Enabled:</strong> <code>{JSON.stringify(this.props.locationStore.enabled, null, 2)}</code></li>
          <li><strong>Coords:</strong> <code>{JSON.stringify(this.props.locationStore.coords, null, 2)}</code></li>
        </ul>
      </div>
    );
  }
}

export default Debug;
