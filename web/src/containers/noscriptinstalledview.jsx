import React from 'react';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
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
  const root = state.root;
  console.log('domainList:', root.get('domainList'));
  console.log('domainList type:', typeof root.get('domainList'));
  console.log('Is domainList an Immutable List?', List.isList(root.get('domainList')));

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
    newDomain: state.root.get('newDomain'),
    domainList: state.root.get('domainList') || List(),
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    handleRcSiteKeyChange: (value) => dispatch(handleRcSiteKeyChange(value)),
    handleRcSiteSecretChange: (value) => dispatch(handleRcSiteSecretChange(value)),
    handleDisplayNameChange: (value) => dispatch(handleDisplayNameChange(value)),
    handleNewDomainChange: (value) => dispatch(handleNewDomainChange(value)),
    handleAddDomain: () => {
      console.log('handleAddDomain dispatched');
      dispatch(handleAddDomain());
    },
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
                onChange={(value) => props.handleDisplayNameChange(value)}
                label='Display name'
                helpText='A descriptive name to help identify the key within the list of keys.'
              />
            <FormLayout.Group>
              <TextField
                value={props.newDomain}
                onChange={(value) => {
                  console.log('New domain value:', value); // For debugging
                  props.handleNewDomainChange(value);
                }}
                label='Domain'
                placeholder='Enter a domain'
              />
            <Button onClick={(e) => {
              e.preventDefault();
              console.log('Add Domain button clicked');
              console.log('Current newDomain value:', props.newDomain);
              props.handleAddDomain();
            }}>
              Add Domain
            </Button>
            </FormLayout.Group>
            {props.domainList && List.isList(props.domainList) && props.domainList.size > 0 ? (
              props.domainList.map((domain, index) => (
                <Card key={index} sectioned>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      {domain.get('editing') ? (
                        <TextField
                          value={domain.get('value')}
                          onChange={(value) => props.handleDomainChange(index, value)}
                          autoFocus
                          onBlur={() => props.handleDomainBlur(index)}
                        />
                      ) : (
                        <span>{domain.get('value')}</span>
                      )}
                    </div>
                    <div>
                      {domain.get('editing') ? (
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
              ))
            ) : (
              <TextContainer>No domains added yet.</TextContainer>
            )}
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
              <Checkbox
                label='Use checkbox challenge'
                helpText='Verifies users by requiring them to check "I am not a robot checkbox. It can be changed after the key is created.'
                checked={props.useCheckboxChallenge}
                onChange={(checked) => props.handleUseCheckboxChallengeChange(checked)}
              />
              <Checkbox
                label='Enable on Contact Us'
                helpText='Enables reCAPTCHA verification on the Contact Us form.'
                checked={props.enableOnContactUs}
                onChange={(checked) => props.handleEnableOnContactUsChange(checked)}
              />
              <Checkbox
                label='Enable on Login'
                helpText='Enables reCAPTCHA verification on the Login form.'
                checked={props.enableOnLogin}
                onChange={(checked) => props.handleEnableOnLoginChange(checked)}
              />
              <Checkbox
                label='Enable on Newsletter'
                helpText='Enables reCAPTCHA verification on the Newsletter subscription form.'
                checked={props.enableOnNewsletter}
                onChange={(checked) => props.handleEnableOnNewsletterChange(checked)}
              />
            </Stack>
          </FormLayout>
          <div style={{ marginTop: '1rem', textAlign: 'right' }}>
            <Button primary onClick={handleSubmit}>Install Spambuster</Button>
          </div>
        </Card>
      </Layout.Section>
      <Layout.Section secondary>
        <Card sectioned>
          <Button primary onClick={handleGenerateCredentials} loading={props.isLoading}>
            Generate reCAPTCHA Credentials
          </Button>
        </Card>
      </Layout.Section>
    </Layout>
  );
};

const NoScriptInstalledView = connect(mapStateToProps, mapDispatchToProps)(ConnectedNoScriptInstalledView);
export default NoScriptInstalledView;