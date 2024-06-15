import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Form,
  FormLayout,
  TextField,
  Button,
  Banner,
  TextContainer,
  Select,
  Layout,
  RangeSlider,
  Tabs,
  DataTable,
  DatePicker,
} from '@shopify/polaris';

import {
  handleRcSiteKeyChange,
  handleRcSiteSecretChange,
  handleRangeSliderChange,
  dismissError,
  dismissSuccess,
  dismissErrorContact,
  dismissSuccessContact,
  changeContact,
  handleRecaptchaTypeChange // Ensure correct import
} from '../actions/interface.js'

import {
  updateContact,
  update,
  getRecaptchaSettings,
  updateRecaptchaSettings,
  changeRecaptchaType
} from '../actions/network.js'

import { settingsTabContent } from './settingsTabContent.jsx';
import { statsTabContent } from './statsTabContent.jsx';

export const mapStateToProps = (state, props) => {
  return {
    rcSiteKey: state.root.get('rcSiteKey'),
    rcSiteSecret: state.root.get('rcSiteSecret'),
    errorMessage: state.root.get('errorMessage'),
    showKeySecretUpdateSuccess: state.root.get('showKeySecretUpdateSuccess'),
    recaptchaType: state.root.get('recaptchaType')
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    updateKeySecret: () => dispatch(update()),
    dismissError: () => dispatch(dismissError()),
    dismissSuccess: () => dispatch(dismissSuccess()),
    handleRcSiteKeyChange: (value) => dispatch(handleRcSiteKeyChange(value)),
    handleRcSiteSecretChange: (value) => dispatch(handleRcSiteSecretChange(value)),
    handleRecaptchaTypeChange: (type) => dispatch(handleRecaptchaTypeChange(type)), // Use correct function
    updateRecaptchaSettings: () => dispatch(updateRecaptchaSettings()),
    getRecaptchaSettings: () => dispatch(getRecaptchaSettings())
  }
}

export const ConnectedScriptInstalledView = (props) => {
  const [showSecret, setShowSecret] = useState(false)
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
    props.getRecaptchaSettings()
  }, [])

  const handleUpdateKeySecret = () => {
    props.updateKeySecret()
  }

  const handleDismissError = () => {
    props.dismissError()
  }

  const handleDismissSuccess = () => {
    props.dismissSuccess()
  }

  const handleRcSiteKeyChange = (value) => {
    props.handleRcSiteKeyChange(value)
  }

  const handleRcSiteSecretChange = (value) => {
    props.handleRcSiteSecretChange(value)
  }

  const handleRecaptchaTypeChange = (value) => {
    props.handleRecaptchaTypeChange(value); // Use correct function
    props.updateRecaptchaSettings();
  }

  const toggleShowSecret = () => {
    setShowSecret(!showSecret)
  }

  const tabContent = [
    {
      id: 'settings',
      content: settingsTabContent,
    },
    {
      id: 'stats',
      content: () => statsTabContent({
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        recaptchaActivity: props.recaptchaActivity,
      }),
    },
  ];

  return (
    <Layout>
      <Tabs tabs={tabContent} selected={selectedTab} onSelect={handleTabChange}>
        <Card.Section title={tabContent[selectedTab].id}>
          {tabContent[selectedTab].content}
        </Card.Section>
      </Tabs>
    </Layout>
  );
};

const ScriptInstalledView = connect(mapStateToProps, mapDispatchToProps)(ConnectedScriptInstalledView)
export default ScriptInstalledView