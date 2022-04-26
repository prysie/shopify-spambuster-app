import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Page,
  Spinner
} from '@shopify/polaris'

import {
  getAppStatus
} from '../actions/network.js'

import NoScriptInstalledView from './noscriptinstalledview.jsx'
import ScriptInstalledView from './scriptinstalledview.jsx'

export const mapStateToProps = (state, props) => {
  return {
    isLoading: state.root.get('isLoading'),
    hasScriptTag: state.root.get('hasScriptTag')
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    getAppStatus: () => dispatch(getAppStatus())
  }
}

export const ConnectedMain = (props) => {
  useEffect(() => {
    props.getAppStatus()
  }, [])

  if (props.isLoading === true) {
    return (
      <Spinner accessibilityLabel='Spinner example' size='large' color='teal' />
    )
  }

  return (
    <>
      <Page title='Spambuster'>
        {props.hasScriptTag === false ? (
          <NoScriptInstalledView />
        ) : (
          <ScriptInstalledView />
        )}
      </Page>
    </>
  )
}

const Main = connect(mapStateToProps, mapDispatchToProps)(ConnectedMain)
export default Main
