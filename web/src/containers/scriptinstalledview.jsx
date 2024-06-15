import React from 'react'
import { connect } from 'react-redux'
import YouTube from 'react-youtube'
import {
  Card,
  Form,
  FormLayout,
  TextField,
  Button,
  Banner,
  TextContainer,
  Checkbox,
  RangeSlider,
  Select,
  Layout
} from '@shopify/polaris'

import {
  handleRcSiteKeyChange,
  handleRcSiteSecretChange,
  handleRangeSliderChange,
  dismissError,
  dismissSuccess,
  dismissErrorContact,
  dismissSuccessContact,
  changeContact,
  handleRecaptchaTypeChange
} from '../actions/interface.js'
import {
  updateContact,
  update,
  getAppStatus,
  getRecaptchaSettings,
  updateRecaptchaSettings
} from '../actions/network.js'

export const mapStateToProps = (state, props) => {
  return {
    rcSiteKey: state.root.get('rcSiteKey'),
    rcSiteSecret: state.root.get('rcSiteSecret'),
    errorMessage: state.root.get('errorMessage'),
    showKeySecretUpdateSuccess: state.root.get('showKeySecretUpdateSuccess'),
    contactEnabled: state.root.get('contactEnabled'),
    errorMessageContact: state.root.get('errorMessageContact'),
    showContactUpdateSuccess: state.root.get('showContactUpdateSuccess'),
    enablementLink: state.root.get('enablementLink'),
    rangeSliderValue: state.root.get('rangeSliderValue'),
    recaptchaType: state.root.get('recaptchaType')
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
    handleRcSiteSecretChange: (value) => dispatch(handleRcSiteSecretChange(value)),
    handleRangeSliderChange: (newValue) => dispatch(handleRangeSliderChange(newValue)),
    changeRecaptchaType: (type) => dispatch(handleRecaptchaTypeChange(type)),
    updateRecaptchaSettings: () => dispatch(updateRecaptchaSettings())
  }
}

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
  
  const handleRangeSliderChange = (newValue) => {
    props.handleRangeSliderChange(newValue)
  }

  const handleRecaptchaTypeChange = (value) => {
    props.changeRecaptchaType(value)
    props.updateRecaptchaSettings()
  }

  return (
    <Layout>
      <Layout.Section>
        <Card sectioned title="Enable ReCAPTCHA spambuster">
          <TextContainer>
            <p>ReCAPTCHA spambuster is now installed.</p>
            <p>
              To enable the app please click the following <a href={props.enablementLink} target='_blank' rel='noopener noreferrer'>Enablement Link</a>, or you can manually enable it from the app embed function within the theme editor for your store.
            </p>
          </TextContainer>
        </Card>
      </Layout.Section>      

      <Layout.Section>
        <Card sectioned title="Learn more about Google reCAPTCHA Enterprise">
          <TextContainer title='Learn more about Google reCAPTCHA Enterprise'>
            <YouTube videoId="y6NSnpiVSaQ" />
            <p>
              reCAPTCHA Enterprise is a new version that detects abusive traffic on your website without user friction.
            </p>
            <p>
              It offers enhanced security with options like adaptive risk analysis and managed service, making it suitable for high-security needs.
            </p>
            <p>
              reCAPTCHA Enterprise is non-invasive, supports mobile and web applications, and provides the ability to escalate to manual puzzles or two-factor authentication (2FA) if needed.
            </p>
            <p>
              Statistics on SPAM visits will update after a few days on the Google reCAPTCHA <a href='https://www.google.com/recaptcha/admin' target='_blank' rel='noopener noreferrer'>Dashboard</a>.
            </p>
          </TextContainer>
        </Card>
      </Layout.Section>

      <Layout.Section>
        <Card sectioned title="Blog comments forms">
          <TextContainer>
            <p>Your blog comment form on article pages will now include reCAPTCHA v3 invisible verification. This can be confirmed by the text added under the submit button, which is mandated by the Google reCAPTCHA v3 licence. Any comments that do not pass the reCAPTCHA verification will not be submitted.</p>
            <p>Any comments that are not created by submission via the Shopify comment form displayed on blog article pages will be marked as spam. Bots typically go around the form avoiding reCAPTCHA. The best we can do is to mark them as spam accordingly.</p>
            <p>It is a reCAPTCHA requirement that the text "This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply." appears in the forms. The text can be stylized via CSS by adding rules for the class ".mssb-rc-text".</p>
          </TextContainer>
        </Card>
      </Layout.Section>

      <Layout.Section>
        <Card title='Contact forms' sectioned>
          <Form onSubmit={handleUpdateContact}>
            <FormLayout>
              {props.errorMessageContact && (
                <Banner onDismiss={handleDismissErrorContact} status='critical'>
                  <p>{props.errorMessageContact}</p>
                </Banner>
              )}
              {props.showContactUpdateSuccess && (
                <Banner onDismiss={handleDismissSuccessContact} status='success'>
                  <p>Updated successfully</p>
                </Banner>
              )}
              <Checkbox
                label='Enable reCAPTCHA Enterprise on contact forms'
                checked={props.contactEnabled}
                onChange={handleChangeContact}
              />
              <Card.Section title='Tune reCAPTCHA Enterprise'>
                <RangeSlider
                  output
                  label="SPAM Score Threshold"
                  helpText="Select the appropriate reCAPTCHA Enterprise SPAM score threshold for rejecting comments"
                  min={0}
                  step={.1}
                  max={1}
                  value={props.rangeSliderValue}
                  onChange={handleRangeSliderChange}
                  prefix={<p>0</p>}
                  suffix={<p>1</p>}
                />
              </Card.Section>   
              <Button submit>Save</Button>
            </FormLayout>
          </Form>
          <TextContainer>
            <p>NOTE: Remember to disable Shopify's default reCAPTCHA for contact forms in your online store settings to avoid users having to pass a verification twice.</p>
          </TextContainer>
        </Card>
      </Layout.Section>

      <Layout.Section>
        <Card title='Update reCAPTCHA details' sectioned>
          <Form onSubmit={handleUpdateKeySecret}>
            <FormLayout>
              {props.errorMessage && (
                <Banner onDismiss={handleDismissError} status='critical'>
                  <p>{props.errorMessage}</p>
                </Banner>
              )}
              {props.showKeySecretUpdateSuccess && (
                <Banner onDismiss={handleDismissSuccess} status='success'>
                  <p>Updated successfully</p>
                </Banner>
              )}
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
              <Select
                label="ReCAPTCHA Type"
                options={[
                  { label: 'ReCAPTCHA v3', value: 'v3' },
                  { label: 'ReCAPTCHA Enterprise', value: 'enterprise' }
                ]}
                value={props.recaptchaType || 'enterprise'}
                onChange={handleRecaptchaTypeChange}
              />
              <Button submit>Update</Button>
            </FormLayout>
          </Form>
          <TextContainer>
            <p>For security purposes the current key and secret are not displayed. If in doubt simply update with your current key and secret.</p>
          </TextContainer>
        </Card>
      </Layout.Section>
    </Layout>
  )
}

const ScriptInstalledView = connect(mapStateToProps, mapDispatchToProps)(ConnectedScriptInstalledView)
export default ScriptInstalledView
