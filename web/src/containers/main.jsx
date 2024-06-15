import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Page,
  Spinner
} from '@shopify/polaris'

import {
  getAppStatus,
  getRecaptchaSettings
} from '../actions/network.js'

import ScriptInstalledView from './scriptinstalledview.jsx'

export const mapStateToProps = (state, props) => {
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
    props.getAppStatus()
    props.getRecaptchaSettings()
  }, [])

  if (props.isLoading === true) {
    return (
      <Spinner accessibilityLabel='Spinner example' size='large' color='teal' />
    )
  }

  return (
    <>
      <Page title='Spambuster'>
        <ScriptInstalledView recaptchaType={props.recaptchaType} />
      </Page>
    </>
  )
}

const Main = connect(mapStateToProps, mapDispatchToProps)(ConnectedMain)
export default Main
