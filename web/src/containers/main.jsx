import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Page,
  Spinner
} from '@shopify/polaris';

import {
  getAppStatus,
  getRecaptchaSettings
} from '../actions/network.js';

import ScriptInstalledView from './scriptinstalledview.jsx';

export const mapStateToProps = (state) => {
  return {
    isLoading: state.root.get('isLoading'),
    hasScriptTag: state.root.get('hasScriptTag'),
    recaptchaType: state.root.get('recaptchaType')
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    getAppStatus: () => dispatch(getAppStatus()),
    getRecaptchaSettings: () => dispatch(getRecaptchaSettings())
  }
}

export const ConnectedMain = (props) => {
  useEffect(() => {
    async function fetchData() {
      await props.getAppStatus();
      await props.getRecaptchaSettings();
    }

    fetchData();
  }, []);

  if (props.isLoading) {
    return (
      <Spinner accessibilityLabel='Spinner example' size='large' color='teal' />
    )
  }

  return (
    <>
      <Page title='Spambuster'>
        <ScriptInstalledView
          recaptchaType={props.recaptchaType}
          rcSiteKey={props.rcSiteKey}
          rcSiteSecret={props.rcSiteSecret}
          errorMessage={props.errorMessage}
          showKeySecretUpdateSuccess={props.showKeySecretUpdateSuccess}
          enablementLink={props.enablementLink}
          recaptchaActivity={props.recaptchaActivity}
        />
      </Page>
    </>
  )
}

const Main = connect(mapStateToProps, mapDispatchToProps)(ConnectedMain);
export default Main;
