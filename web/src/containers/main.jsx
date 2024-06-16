import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Page, Spinner } from '@shopify/polaris';

import { getAppStatus, getRecaptchaSettings } from '../actions/network.js';

import ScriptInstalledView from './scriptinstalledview';

export const mapStateToProps = (state) => {
  console.log('main.jsx - mapStateToProps - state.root:', state.root);
  return {
    isLoading: state.root.get('isLoading'),
    hasScriptTag: state.root.get('hasScriptTag'),
    recaptchaType: state.root.get('recaptchaType'),
    rcSiteKey: state.root.get('rcSiteKey'),
    rcSiteSecret: state.root.get('rcSiteSecret'),
    errorMessage: state.root.get('errorMessage'),
    showKeySecretUpdateSuccess: state.root.get('showKeySecretUpdateSuccess'),
    enablementLink: state.root.get('enablementLink'),
    recaptchaActivity: state.root.get('recaptchaActivity'),
  };
}

export const mapDispatchToProps = (dispatch) => {
  return {
    getAppStatus: () => dispatch(getAppStatus()),
    getRecaptchaSettings: () => dispatch(getRecaptchaSettings())
  };
}

export const ConnectedMain = (props) => {
  useEffect(() => {
    async function fetchData() {
      await props.getAppStatus();
      await props.getRecaptchaSettings();
      console.log('ConnectedMain - props:', props);
    }

    fetchData();
  }, [props]);

  if (props.isLoading) {
    return (
      <Spinner accessibilityLabel='Spinner example' size='large' color='teal' />
    );
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
  );
}

const Main = connect(mapStateToProps, mapDispatchToProps)(ConnectedMain);
export default Main;
