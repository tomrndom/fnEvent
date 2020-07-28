import React from 'react'

import { initLogOut } from 'openstack-uicore-foundation/lib/methods'

export default class
  LogoutButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showLogOut: false,
    };
  }

  render() {
    let { isLoggedUser, styles } = this.props;

    if (isLoggedUser) {
      return (

        <div className={styles.buttons}>          
          <a className={`${styles.userIcon}`} title="Clear state" onClick={() => { this.props.clearState(); }}>
            <i className="fa fa-trash icon is-medium" style={{fontSize: '1.5rem'}} />
          </a>
          {/* <a className={`${styles.userIcon}`}>
            <i className="fa fa-exclamation-circle icon is-medium" style={{fontSize: '1.5rem'}} />
          </a>
          <a className={`${styles.userIcon}`}>
            <i className="fa fa-cog icon is-medium" style={{fontSize: '1.5rem'}} />
          </a>
          <a className={`${styles.userIcon}`}>
            <i className="fa fa-bell icon is-medium" style={{fontSize: '1.5rem'}} />
          </a>           */}
          <a className={`${styles.userIcon}`} title="Logout" onClick={() => { initLogOut(); }}>
            <i className="fa fa-sign-out icon is-medium" style={{fontSize: '1.5rem'}} />
          </a>
        </div>
      );
    } else {
      return null;
    }

  }
}