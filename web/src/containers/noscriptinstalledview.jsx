import React from 'react';
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
  RadioButton,
  Select,
} from '@shopify/polaris';
import { EditMinor, DeleteMinor } from '@shopify/polaris-icons';

import {
  handleRcSiteKeyChange,
  handleRcSiteSecretChange,
  dismissError,
  handleDisplayNameChange,
  handleNewDomainChange,
  handleAddDomain,
  handleDomainChange,
  handleDomainBlur,
  handleEditDomain,
  handleRemoveDomain,
  handleUseCheckboxChallengeChange,
  handleEnableOnContactUsChange,
  handleEnableOnLoginChange,
  handleEnableOnNewsletterChange,
  handleRecaptchaTypeChange,
} from '../actions/interface.js';
import { install, generateRecaptchaCredentials } from '../actions/network.js';

export const mapStateToProps = (state, props) => {
  return {
    rcSiteKey: state.root.get('rcSiteKey'),
    rcSiteSecret: state.root.get('rcSiteSecret'),
    errorMessage: state.root.get('errorMessage'),
    displayName: state.root.get('displayName'),
    newDomain: state.root.get('newDomain'),
    domainList: state.root.get('domainList'),
    useCheckboxChallenge: state.root.get('useCheckboxChallenge'),
    enableOnContactUs: state.root.get('enableOnContactUs'),
    enableOnLogin: state.root.get('enableOnLogin'),
    enableOnNewsletter: state.root.get('enableOnNewsletter'),
    recaptchaType: state.root.get('recaptchaType'),
    isLoading: state.root.get('isLoading'),
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    handleRcSiteKeyChange: (value) => dispatch(handleRcSiteKeyChange(value)),
    handleRcSiteSecretChange: (value) => dispatch(handleRcSiteSecretChange(value)),
    handleDisplayNameChange: (value) => dispatch(handleDisplayNameChange(value)),
    handleNewDomainChange: (value) => dispatch(handleNewDomainChange(value)),
    handleAddDomain: () => dispatch(handleAddDomain()),
    handleDomainChange: (index, value) => dispatch(handleDomainChange(index, value)),
    handleDomainBlur: (index) => dispatch(handleDomainBlur(index)),
    handleEditDomain: (index) => dispatch(handleEditDomain(index)),
    handleRemoveDomain: (index) => dispatch(handleRemoveDomain(index)),
    handleUseCheckboxChallengeChange: (checked) => dispatch(handleUseCheckboxChallengeChange(checked)),
    handleEnableOnContactUsChange: (checked) => dispatch(handleEnableOnContactUsChange(checked)),
    handleEnableOnLoginChange: (checked) => dispatch(handleEnableOnLoginChange(checked)),
    handleEnableOnNewsletterChange: (checked) => dispatch(handleEnableOnNewsletterChange(checked)),
    handleRecaptchaTypeChange: (value) => dispatch(handleRecaptchaTypeChange(value)),
    install: () => dispatch(install()),
    generateRecaptchaCredentials: () => dispatch(generateRecaptchaCredentials()),
    dismissError: () => dispatch(dismissError()),
  };
};

export const ConnectedNoScriptInstalledView = (props) => {
  const handleSubmit = () => {
    if (props.rcSiteKey || props.rcSiteSecret) {
      const confirmed = window.confirm(
        'The reCAPTCHA credentials will be replaced. Are you sure you want to proceed?'
      );
      if (confirmed) {
        props.install();
      }
    } else {
      props.install();
    }
  };

  const handleDismissError = () => {
    props.dismissError();
  };

  const handleGenerateCredentials = () => {
    if (props.rcSiteKey || props.rcSiteSecret) {
      const confirmed = window.confirm(
        'The reCAPTCHA credentials will be replaced. Are you sure you want to proceed?'
      );
      if (confirmed) {
        props.generateRecaptchaCredentials();
      }
    } else {
      props.generateRecaptchaCredentials();
    }
  };

  return (
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <TextContainer>
            <p>
              Please provide the necessary details to set up reCAPTCHA Enterprise for your website or app.
            </p>
          </TextContainer>
          {props.errorMessage !== '' ? (
            <Card.Section>
              <Banner onDismiss={handleDismissError} status='critical'>
                <p>{props.errorMessage}</p>
              </Banner>
            </Card.Section>
          ) : null}
          <Form>
            <FormLayout>
              <TextField
                value={props.displayName}
                onChange={props.handleDisplayNameChange}
                label='Display name'
                helpText='A descriptive name to help identify the key within the list of keys.'
              />
              <FormLayout.Group>
                <TextField
                  value={props.newDomain}
                  onChange={props.handleNewDomainChange}
                  label='Domain'
                  placeholder='Enter a domain'
                />
                <Button onClick={props.handleAddDomain}>Add Domain</Button>
              </FormLayout.Group>
              {props.domainList && props.domainList.map((domain, index) => (
                <Card key={index} sectioned>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      {domain.editing ? (
                        <TextField
                          value={domain.value}
                          onChange={(value) => props.handleDomainChange(index, value)}
                          autoFocus
                          onBlur={() => props.handleDomainBlur(index)}
                        />
                      ) : (
                        <span>{domain.value}</span>
                      )}
                    </div>
                    <div>
                      {domain.editing ? (
                        <Button size='slim' onClick={() => props.handleDomainBlur(index)}>Done</Button>
                      ) : (
                        <>
                          <Button size='slim' icon={EditMinor} onClick={() => props.handleEditDomain(index)} />
                          <Button size='slim' icon={DeleteMinor} onClick={() => props.handleRemoveDomain(index)} />
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
              <Select
                label='reCAPTCHA Type'
                options={[
                    { label: 'reCAPTCHA Enterprise', value: 'Enterprise' },
                    { label: 'reCAPTCHA v3', value: 'v3' },
                ]}
                value={props.recaptchaType}
                onChange={props.handleRecaptchaTypeChange}
                />
              <TextField
                value={props.rcSiteKey}
                onChange={props.handleRcSiteKeyChange}
                label='reCAPTCHA site key'
              />
              <TextField
                value={props.rcSiteSecret}
                onChange={props.handleRcSiteSecretChange}
                label='reCAPTCHA secret key'
              />
            </FormLayout>
          </Form>
        </Card>
        <Card sectioned title='Additional Settings'>
          <FormLayout>
            <Stack vertical>
              <RadioButton
                label='Use checkbox challenge'
                helpText='Verifies users by requiring them to check "I am not a robot" checkbox. It can be changed after the key is created.'
                checked={props.useCheckboxChallenge}
                onChange={props.handleUseCheckboxChallengeChange}
              />
              <RadioButton
                label='Enable on Contact Us'
                helpText='Enables reCAPTCHA verification on the Contact Us form.'
                checked={props.enableOnContactUs}
                onChange={props.handleEnableOnContactUsChange}
              />
              <RadioButton
                label='Enable on Login'
                helpText='Enables reCAPTCHA verification on the Login form.'
                checked={props.enableOnLogin}
                onChange={props.handleEnableOnLoginChange}
              />
              <RadioButton
                label='Enable on Newsletter'
                helpText='Enables reCAPTCHA verification on the Newsletter subscription form.'
                checked={props.enableOnNewsletter}
                onChange={props.handleEnableOnNewsletterChange}
              />
            </Stack>
          </FormLayout>
        </Card>
      </Layout.Section>
      <Layout.Section secondary>
        <Card sectioned>
          <Button primary onClick={handleGenerateCredentials} loading={props.isLoading}>
            Generate reCAPTCHA Credentials
          </Button>
        </Card>
        <Card sectioned>
          <Button onClick={handleSubmit}>Install Spambuster</Button>
        </Card>
      </Layout.Section>
    </Layout>
  );
};

const NoScriptInstalledView = connect(mapStateToProps, mapDispatchToProps)(ConnectedNoScriptInstalledView);
export default NoScriptInstalledView;