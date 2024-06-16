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
    install,
    generateRecaptchaCredentials
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
    dismissError: () => dispatch(dismissError()),
    registerCredentials: () => dispatch(generateRecaptchaCredentials())
  }
}

export const ConnectedNoScriptInstalledView = (props) => {
  const handleSubmit = () => {
    props.install()
  }

  const handleDismissError = () => {
    props.dismissError()
  }

  const handleRegisterCredentials = () => {
    props.registerCredentials()
  }

  return (
    <Layout>
        <Layout.Section>
        <Card sectioned>
            <TextContainer>
            <p>
                Please insert your reCAPTCHA Enterprise keys. IMPORTANT: This application only supports Enterprise.
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
        </Layout.Section>
        <Layout.Section secondary>
        <Card sectioned>
            <Button primary onClick={handleRegisterCredentials}>Register for Credentials</Button>
        </Card>
        </Layout.Section>
    </Layout>
  )
}

const NoScriptInstalledView = connect(mapStateToProps, mapDispatchToProps)(ConnectedNoScriptInstalledView)
export default NoScriptInstalledView