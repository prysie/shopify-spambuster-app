import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Layout,
  Tabs,
} from '@shopify/polaris';

import {
  handleRcSiteKeyChange,
  handleRcSiteSecretChange,
  dismissError,
  dismissSuccess,
  handleRecaptchaTypeChange
} from '../actions/interface.js';

import {
  updateContact,
  update,
  getRecaptchaSettings,
  updateRecaptchaSettings,
  changeRecaptchaType
} from '../actions/network.js';

import SettingsTabContent from './settingsTabContent.jsx';
import StatsTabContent from './statsTabContent.jsx';

export const mapStateToProps = (state) => {
  return {
    rcSiteKey: state.root.get('rcSiteKey'),
    rcSiteSecret: state.root.get('rcSiteSecret'),
    errorMessage: state.root.get('errorMessage'),
    showKeySecretUpdateSuccess: state.root.get('showKeySecretUpdateSuccess'),
    recaptchaType: state.root.get('recaptchaType'),
    recaptchaActivity: state.root.get('recaptchaActivity'),
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    updateKeySecret: () => dispatch(update()),
    dismissError: () => dispatch(dismissError()),
    dismissSuccess: () => dispatch(dismissSuccess()),
    handleRcSiteKeyChange: (value) => dispatch(handleRcSiteKeyChange(value)),
    handleRcSiteSecretChange: (value) => dispatch(handleRcSiteSecretChange(value)),
    handleRecaptchaTypeChange: (type) => dispatch(handleRecaptchaTypeChange(type)),
    updateRecaptchaSettings: () => dispatch(updateRecaptchaSettings()),
    getRecaptchaSettings: () => dispatch(getRecaptchaSettings())
  }
}

export const ConnectedScriptInstalledView = (props) => {
  const [showSecret, setShowSecret] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleTabChange = (selectedTabIndex) => {
    setSelectedTab(selectedTabIndex);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  useEffect(() => {
    props.getRecaptchaSettings();
  }, []);

  const handleUpdateKeySecret = () => {
    props.updateKeySecret();
  };

  const handleDismissError = () => {
    props.dismissError();
  };

  const handleDismissSuccess = () => {
    props.dismissSuccess();
  };

  const handleRcSiteKeyChange = (value) => {
    props.handleRcSiteKeyChange(value);
  };

  const handleRcSiteSecretChange = (value) => {
    props.handleRcSiteSecretChange(value);
  };

  const handleRecaptchaTypeChange = (value) => {
    props.handleRecaptchaTypeChange(value);
    props.updateRecaptchaSettings();
  };

  const toggleShowSecret = () => {
    setShowSecret(!showSecret);
  };

  const tabs = [
    {
      id: 'settings',
      content: 'Settings',
      panelID: 'settings-panel',
    },
    {
      id: 'stats',
      content: 'Stats',
      panelID: 'stats-panel',
    },
  ];

  return (
    <Layout>
      <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
        <Card.Section title={tabs[selectedTab].content}>
          {selectedTab === 0 ? (
            <SettingsTabContent
              rcSiteKey={props.rcSiteKey}
              rcSiteSecret={props.rcSiteSecret}
              errorMessage={props.errorMessage}
              showKeySecretUpdateSuccess={props.showKeySecretUpdateSuccess}
              enablementLink={props.enablementLink}
              showSecret={showSecret}
              toggleShowSecret={toggleShowSecret}
              handleUpdateKeySecret={handleUpdateKeySecret}
              handleDismissError={handleDismissError}
              handleDismissSuccess={handleDismissSuccess}
              handleRcSiteKeyChange={handleRcSiteKeyChange}
              handleRcSiteSecretChange={handleRcSiteSecretChange}
              handleRecaptchaTypeChange={handleRecaptchaTypeChange}
              recaptchaType={props.recaptchaType}
            />
          ) : (
            <StatsTabContent
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              recaptchaActivity={props.recaptchaActivity}
            />
          )}
        </Card.Section>
      </Tabs>
    </Layout>
  );
};

const ScriptInstalledView = connect(mapStateToProps, mapDispatchToProps)(ConnectedScriptInstalledView);
export default ScriptInstalledView;