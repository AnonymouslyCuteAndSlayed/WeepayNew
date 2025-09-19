import React from 'react';
import { Col } from 'react-bootstrap';
import { mdiHandWaveOutline } from "@mdi/js";
import Icon from '@mdi/react';

function dashboardGreeting({ name }) {
  return (
    <div>
      <h5 className="dashboard-title">
        Dashboard
      </h5>
      <h1 className="dashboard-greeting">
        Hello, {name}{' '}
        <span className="username-icon">
          <Icon path={mdiHandWaveOutline} size={1.5} />
        </span>
      </h1>
    </div>
  );
}

export default dashboardGreeting;