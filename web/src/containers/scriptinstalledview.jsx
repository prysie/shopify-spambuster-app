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
  Layout,
  Stack,
  Checkbox,
  Select,
  RangeSlider,
  DataTable,
  DatePicker,
} from '@shopify/polaris';
import { EditMinor, DeleteMinor } from '@shopify/polaris-icons';

import {
  handleRcSiteKeyChange,
  handleRcSiteSecretChange,
  dismissError,
  dismissSuccess,
  handleRecaptchaTypeChange,
  handleRangeSliderChange,
} from '../actions/interface.js';

import {
  update,
  getRecaptchaSettings,
  updateRecaptchaSettings,
  getRecaptchaActivity,
} from '../actions/network.js';

export const mapStateToProps = (state) => {
  const rootState = state?.root;
  return {
    rcSiteKey: rootState.get('rcSiteKey'),
    rcSiteSecret: rootState.get('rcSiteSecret'),
    errorMessage: rootState.get('errorMessage'),
    showKeySecretUpdateSuccess: rootState.get('showKeySecretUpdateSuccess'),
    recaptchaType: rootState.get('recaptchaType'),
    enablementLink: rootState.get('enablementLink'),
    recaptchaActivity: rootState.get('recaptchaActivity'),
    contactEnabled: rootState.get('contactEnabled'),
    rangeSliderValue: rootState.get('rangeSliderValue'),
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    updateKeySecret: () => dispatch(update()),
    dismissError: () => dispatch(dismissError()),
    dismissSuccess: () => dispatch(dismissSuccess()),
    handleRcSiteKeyChange: (value) => dispatch(handleRcSiteKeyChange(value)),
    handleRcSiteSecretChange: (value) => dispatch(handleRcSiteSecretChange(value)),
    handleRecaptchaTypeChange: (type) => dispatch(handleRecaptchaTypeChange(type)),
    updateRecaptchaSettings: () => dispatch(updateRecaptchaSettings()),
    getRecaptchaSettings: () => dispatch(getRecaptchaSettings()),
    getRecaptchaActivity: (startDate, endDate) => dispatch(getRecaptchaActivity(startDate, endDate)),
    handleRangeSliderChange: (value) => dispatch(handleRangeSliderChange(value)),
  };
};

const ScriptInstalledView = (props) => {
  const today = new Date().toISOString().split('T')[0];
  const [showSecret, setShowSecret] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

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
    props.getRecaptchaActivity(startDate, endDate);
  }, [startDate, endDate]);

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
      accessibilityLabel: 'Settings',
      panelID: 'settings-content',
    },
    {
      id: 'stats',
      content: 'Stats',
      accessibilityLabel: 'Stats',
      panelID: 'stats-content',
    },
  ];

  return (
    <Layout>
      <Layout.Section>
        <Card>
          <Card.Header
            title="reCAPTCHA Spambuster"
            actions={[
              {
                content: 'Settings',
                onAction: () => handleTabChange(0),
              },
              {
                content: 'Stats',
                onAction: () => handleTabChange(1),
              },
            ]}
          />
          <Card.Section>
            {selectedTab === 0 && (
              <>
                <TextContainer>
                  <p>ReCAPTCHA spambuster is now installed.</p>
                  <p>
                    To enable the app please click the following{' '}
                    <a href={props.enablementLink} target="_blank" rel="noopener noreferrer">
                      Enablement Link
                    </a>
                    , or you can manually enable it from the app embed function within the theme editor for your store.
                  </p>
                </TextContainer>
                <Form onSubmit={handleUpdateKeySecret}>
                  <FormLayout>
                    {props.errorMessage && (
                      <Banner onDismiss={handleDismissError} status="critical">
                        <p>{props.errorMessage}</p>
                      </Banner>
                    )}
                    {props.showKeySecretUpdateSuccess && (
                      <Banner onDismiss={handleDismissSuccess} status="success">
                        <p>Updated successfully</p>
                      </Banner>
                    )}
                    <Select
                      label="ReCAPTCHA Type"
                      options={[
                        { label: 'ReCAPTCHA Enterprise', value: 'enterprise' },
                        { label: 'ReCAPTCHA v3', value: 'v3' },
                      ]}
                      value={props.recaptchaType || 'enterprise'}
                      onChange={handleRecaptchaTypeChange}
                    />
                    <TextField
                      value={props.rcSiteKey}
                      onChange={handleRcSiteKeyChange}
                      label="reCAPTCHA site key"
                    />
                    <TextField
                      value={showSecret ? props.rcSiteSecret : '***'}
                      onChange={handleRcSiteSecretChange}
                      label="reCAPTCHA secret key"
                      type={showSecret ? 'text' : 'password'}
                    />
                    <Button onClick={toggleShowSecret} plain>
                      {showSecret ? 'Hide Secret' : 'Show Secret'}
                    </Button>
                    <Checkbox
                      label="Enable on Contact Us"
                      helpText="Enables reCAPTCHA verification on the Contact Us form."
                      checked={props.contactEnabled}
                      onChange={props.handleEnableOnContactUsChange}
                    />
                    <RangeSlider
                      label="Spam Threshold"
                      value={props.rangeSliderValue}
                      onChange={props.handleRangeSliderChange}
                      min={0}
                      max={1}
                      step={0.1}
                    />
                    <Button submit>Update</Button>
                  </FormLayout>
                </Form>
              </>
            )}
            {selectedTab === 1 && (
              <>
                <Card sectioned>
                  <FormLayout>
                    <FormLayout.Group>
                      <DatePicker
                        month={new Date().getMonth()}
                        year={new Date().getFullYear()}
                        onChange={handleStartDateChange}
                        selected={startDate}
                      />
                      <DatePicker
                        month={new Date().getMonth()}
                        year={new Date().getFullYear()}
                        onChange={handleEndDateChange}
                        selected={endDate}
                      />
                    </FormLayout.Group>
                  </FormLayout>
                </Card>
                <Card title="reCAPTCHA Activity Blotter" sectioned>
                  <DataTable
                    columnContentTypes={['text', 'text', 'text', 'numeric']}
                    headings={['Timestamp', 'Action', 'Result', 'Score']}
                    rows={props.recaptchaActivity.map((activity) => [
                      activity.timestamp,
                      activity.action,
                      activity.result,
                      activity.score,
                    ])}
                  />
                </Card>
                <Card title="reCAPTCHA Activity Graph" sectioned>
                  {/* Render the graph component here */}
                </Card>
              </>
            )}
          </Card.Section>
        </Card>
      </Layout.Section>
    </Layout>
  );
};

const ConnectedScriptInstalledView = connect(mapStateToProps, mapDispatchToProps)(ScriptInstalledView);
export default ConnectedScriptInstalledView;