import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Form,
  FormLayout,
  TextField,
  Button,
  Banner,
  TextContainer
} from '@shopify/polaris';

import {
  handleRcSiteKeyChange,
  handleRcSiteSecretChange,
  dismissError
} from '../actions/interface.js';
import {
  install
} from '../actions/network.js';

export const mapStateToProps = (state, props) => {
  return {
    rcSiteKey: state.root.get('rcSiteKey'),
    rcSiteSecret: state.root.get('rcSiteSecret'),
    errorMessage: state.root.get('errorMessage')
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    handleRcSiteKeyChange: (value) => dispatch(handleRcSiteKeyChange(value)),
    handleRcSiteSecretChange: (value) => dispatch(handleRcSiteSecretChange(value)),
    install: () => dispatch(install()),
    dismissError: () => dispatch(dismissError())
  };
};

export const ConnectedNoScriptInstalledView = (props) => {
  const handleInstall = (event) => {
    event.preventDefault();
    props.install();
  };

  const handleDismissError = () => {
    props.dismissError();
  };

  const handleRcSiteKeyChange = (value) => {
    props.handleRcSiteKeyChange(value);
  };

  const handleRcSiteSecretChange = (value) => {
    props.handleRcSiteSecretChange(value);
  };

  return (
    <div>
      <TextContainer>
        <h1>Spambuster</h1>
        <p>Please insert your reCAPTCHA keys. You can choose between reCAPTCHA v3 and Enterprise.</p>
        <p>
          Learn more about the differences between reCAPTCHA v3 and Enterprise:
          <ul>
            <li><strong>reCAPTCHA v3:</strong> Detects abusive traffic without user interaction. Best for user experience but less secure against sophisticated bots.</li>
            <li><strong>reCAPTCHA Enterprise:</strong> Offers enhanced security with options like adaptive risk analysis and managed service. Suitable for high-security needs.</li>
          </ul>
        </p>
        <p>
          Register for a reCAPTCHA account and get your keys from <a href='https://www.google.com/recaptcha/admin/create' target='_blank' rel='noopener noreferrer'>Google reCAPTCHA Admin</a>.
        </p>
      </TextContainer>
      <Form onSubmit={handleInstall}>
        <FormLayout>
          {props.errorMessage !== '' ? (
            <Banner status='critical' onDismiss={handleDismissError}>
              <p>{props.errorMessage}</p>
            </Banner>
          ) : null}
          <TextField
            value={props.rcSiteKey}
            onChange={handleRcSiteKeyChange}
            label='reCAPTCHA site key'
          />
          <TextField
            value={props.rcSiteSecret}
            onChange={handleRcSiteSecretChange}
            label='reCAPTCHA secret key'
          />
          <Button submit>Install Spambuster</Button>
        </FormLayout>
      </Form>
    </div>
  );
};

const NoScriptInstalledView = connect(mapStateToProps, mapDispatchToProps)(ConnectedNoScriptInstalledView);
export default NoScriptInstalledView;