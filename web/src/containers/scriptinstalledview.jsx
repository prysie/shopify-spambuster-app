import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Card, Layout, Tabs } from '@shopify/polaris';

import {
  handleRcSiteKeyChange,
  handleRcSiteSecretChange,
  dismissError,
  dismissSuccess,
  handleRecaptchaTypeChange
} from '../actions/interface.js';

import {
  update,
  getRecaptchaSettings,
  updateRecaptchaSettings
} from '../actions/network.js';

import SettingsTabContent from './settingsTabContent';
import StatsTabContent from './statsTabContent';

export const mapStateToProps = (state) => {
  const rootState = state?.root;
  console.log('scriptinstalledview.jsx - mapStateToProps - rootState:', rootState);
  return {
    rcSiteKey: rootState.get('rcSiteKey'),
    rcSiteSecret: rootState.get('rcSiteSecret'),
    errorMessage: rootState.get('errorMessage'),
    showKeySecretUpdateSuccess: rootState.get('showKeySecretUpdateSuccess'),
    recaptchaType: rootState.get('recaptchaType'),
    enablementLink: rootState.get('enablementLink'),
    recaptchaActivity: rootState.get('recaptchaActivity'),
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

const ScriptInstalledView = (props) => {
  console.log('scriptinstalledview.jsx - ScriptInstalledView - props:', props);  
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
/*    {
      id: 'settings',
      content: 'Settings',
      panelID: 'settings-panel',
    },
*/  
    {
      id: 'stats',
      content: 'Stats',
      panelID: 'stats-panel',
    },
  ];
  
  return (
    <Layout>
      <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
      <Tabs.Panel id="stats-panel" hidden={selectedTab !== 1}>
          <Card.Section>
            <StatsTabContent
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              recaptchaActivity={props.recaptchaActivity}
            />
          </Card.Section>
        </Tabs.Panel>
      </Tabs>
    </Layout>
  
    );
  
};

const ConnectedScriptInstalledView = connect(mapStateToProps, mapDispatchToProps)(ScriptInstalledView);
console.log('scriptinstalledview.jsx - ConnectedScriptInstalledView - props:', ConnectedScriptInstalledView.props);
export default ConnectedScriptInstalledView;
