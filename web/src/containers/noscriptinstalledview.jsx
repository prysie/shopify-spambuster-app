import React from 'react'
import { connect } from 'react-redux'
import {
  Card,
  Form,
  FormLayout,
  TextField,
  Button,
  Banner,
  TextContainer
} from '@shopify/polaris'

import {
  handleRcSiteKeyChange,
  handleRcSiteSecretChange,
  dismissError
} from '../actions/interface.js'
import {
  install
} from '../actions/network.js'

export const mapStateToProps = (state, props) => {
  return {
    rcSiteKey: state.root.get('rcSiteKey'),
    rcSiteSecret: state.root.get('rcSiteSecret'),
    errorMessage: state.root.get('errorMessage')
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    handleRcSiteKeyChange: (value) => dispatch(handleRcSiteKeyChange(value)),
    handleRcSiteSecretChange: (value) => dispatch(handleRcSiteSecretChange(value)),
    install: () => dispatch(install()),
    dismissError: () => dispatch(dismissError())
  }
}

export const ConnectedNoScriptInstalledView = (props) => {
  const handleSubmit = () => {
    props.install()
  }

  const handleDismissError = () => {
    props.dismissError()
  }

  return (
    <Card sectioned>
      <TextContainer>
        <p>
          Please insert your reCAPTCHA v3 keys. IMPORTANT: This application only supports v3.
        </p>
        <p>
          Please get your keys here: <a href='https://www.google.com/recaptcha/admin/create' target='_blank' rel='noopener noreferrer'>https://www.google.com/recaptcha/admin/create</a>.
        </p>
      </TextContainer>
      {props.errorMessage !== '' ? (
        <Card.Section>
          <Banner onDismiss={handleDismissError} status='critical'>
            <p>{props.errorMessage}</p>
          </Banner>
        </Card.Section>
      ) : null}
      <Form onSubmit={handleSubmit}>
        <FormLayout>
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
          <Button submit>Install Spambuster</Button>
        </FormLayout>
      </Form>
    </Card>
  )
}

const NoScriptInstalledView = connect(mapStateToProps, mapDispatchToProps)(ConnectedNoScriptInstalledView)
export default NoScriptInstalledView