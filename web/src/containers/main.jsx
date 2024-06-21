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

import ScriptInstalledView from './scriptinstalledview';
import NoScriptInstalledView from './noscriptinstalledview';

export const mapStateToProps = (state) => {
  console.log('mapStateToProps - state.root:', state.root);
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
        {/*continue to use the hasScriptTag property to support backward compatiability, it basically means isInstalled.*/}
        {props.hasScriptTag === false ? (
          <NoScriptInstalledView />
        ) : (
          <ScriptInstalledView />
        )}
      </Page>
    </>
  )
}

const Main = connect(mapStateToProps, mapDispatchToProps)(ConnectedMain);
export default Main;
