import React from 'react'
import { connect } from 'react-redux'
import {
  Card,
  Form,
  FormLayout,
  TextField,
  Button,
  Banner,
  TextContainer,
  Checkbox
} from '@shopify/polaris'

import {
  handleRcSiteKeyChange,
  handleRcSiteSecretChange,
  dismissError,
  dismissSuccess,
  dismissErrorContact,
  dismissSuccessContact,
  changeContact
} from '../actions/interface.js'
import {
  update,
  updateContact
} from '../actions/network.js'

export const mapStateToProps = (state, props) => {
  return {
    rcSiteKey: state.root.get('rcSiteKey'),
    rcSiteSecret: state.root.get('rcSiteSecret'),
    errorMessage: state.root.get('errorMessage'),
    showKeySecretUpdateSuccess: state.root.get('showKeySecretUpdateSuccess'),
    contactEnabled: state.root.get('contactEnabled'),
    errorMessageContact: state.root.get('errorMessageContact'),
    showContactUpdateSuccess: state.root.get('showContactUpdateSuccess')
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    updateContact: () => dispatch(updateContact()),
    dismissErrorContact: () => dispatch(dismissErrorContact()),
    dismissSuccessContact: () => dispatch(dismissSuccessContact()),
    changeContact: (newChecked) => dispatch(changeContact(newChecked)),
    updateKeySecret: () => dispatch(update()),
    dismissError: () => dispatch(dismissError()),
    dismissSuccess: () => dispatch(dismissSuccess()),
    handleRcSiteKeyChange: (value) => dispatch(handleRcSiteKeyChange(value)),
    handleRcSiteSecretChange: (value) => dispatch(handleRcSiteSecretChange(value))
  }
}

// TODO: Test case of bad recaptcha keys
export const ConnectedScriptInstalledView = (props) => {
  const handleUpdateContact = () => {
    props.updateContact()
  }

  const handleDismissErrorContact = () => {
    props.dismissErrorContact()
  }

  const handleDismissSuccessContact = () => {
    props.dismissSuccessContact()
  }

  const handleUpdateKeySecret = () => {
    props.updateKeySecret()
  }

  const handleDismissError = () => {
    props.dismissError()
  }

  const handleDismissSuccess = () => {
    props.dismissSuccess()
  }

  const handleRcSiteKeyChange = (value) => {
    props.handleRcSiteKeyChange(value)
  }

  const handleRcSiteSecretChange = (value) => {
    props.handleRcSiteSecretChange(value)
  }

  const handleChangeContact = (newChecked) => {
    props.changeContact(newChecked)
  }

  return (
    <>
      <Card sectioned>
        <TextContainer>
          <p>
            ReCAPTCHA spambuster is installed.
          </p>
          <p>
            To enable the app, you will need to edit the app embed from the theme editor, or click the following <Link to={props.enablementLink}>enablement-link</Link>. 
          </p>
          <p>
            Your blog comment form on article pages will now include reCAPTCHA v3 invisible verification. This can be confirmed by the text added under the submit button, which is mandated by the Google reCAPTCHA v3 licence. Any comments that do not pass the recaptcha verification will not be submitted.
          </p>
          <p>
            Any comments that are not created by submission via the Shopify comment form displayed on blog article pages will be marked as spam. Bots typically go around the form avoiding reCAPTCHA. The best we can do is to mark them as spam accordingly.
          </p>
          <p>
            It is a reCAPTCHA requirement that the text "This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply." appears in the forms. The text can be stylized via CSS by adding rules for the class ".mssb-rc-text".
          </p>
        </TextContainer>
      </Card>

      <Card title='Contact forms' sectioned>
        <Card.Section>
          <Form onSubmit={handleUpdateContact}>
            <FormLayout>
              {props.errorMessageContact !== '' ? (
                <Card.Section>
                  <Banner onDismiss={handleDismissErrorContact} status='critical'>
                    <p>{props.errorMessageContact}</p>
                  </Banner>
                </Card.Section>
              ) : null}
              {props.showContactUpdateSuccess === true ? (
                <Card.Section>
                  <Banner onDismiss={handleDismissSuccessContact} status='success'>
                    <p>Updated successfully</p>
                  </Banner>
                </Card.Section>
              ) : null}
              <Checkbox
                label='Enable reCAPTCHA on contact forms'
                checked={props.contactEnabled}
                onChange={handleChangeContact}
              />
              <Button submit>Save</Button>
            </FormLayout>
          </Form>
        </Card.Section>
        <Card.Section>
          <TextContainer>
            <p>NOTE: Remember to disable Shopify's default reCAPTCHA for contact forms in your online store settings to avoid users having to pass a verification twice.</p>
          </TextContainer>
        </Card.Section>
      </Card>

      <Card title='Update reCAPTCHA details' sectioned>
        <Card.Section>
          <Form onSubmit={handleUpdateKeySecret}>
            <FormLayout>
              {props.errorMessage !== '' ? (
                <Card.Section>
                  <Banner onDismiss={handleDismissError} status='critical'>
                    <p>{props.errorMessage}</p>
                  </Banner>
                </Card.Section>
              ) : null}
              {props.showKeySecretUpdateSuccess === true ? (
                <Card.Section>
                  <Banner onDismiss={handleDismissSuccess} status='success'>
                    <p>Updated successfully</p>
                  </Banner>
                </Card.Section>
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
              <Button submit>Update</Button>
            </FormLayout>
          </Form>
        </Card.Section>
        <Card.Section>
          <TextContainer>
            <p>For security purposes the current key and secret are not displayed. If in doubt simply update with your current key and secret.</p>
          </TextContainer>
        </Card.Section>
      </Card>
    </>
  )
}

const ScriptInstalledView = connect(mapStateToProps, mapDispatchToProps)(ConnectedScriptInstalledView)
export default ScriptInstalledView
