import React from 'react'
import { connect } from 'react-redux'
import YouTube from 'react-youtube'
import {
  Card,
  MediaCard,
  Form,
  FormLayout,
  TextField,
  Button,
  Banner,
  TextContainer,
  Checkbox,
  VideoThumbnail,
  RangeSlider,
  Select
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
  changeRecaptchaType,
  updateRecaptchaSettings
} from '../actions/network.js'
import youtubetn from '../images/youthumb_reCAPTC.png'

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
    handleEnablementLink: (enablementLink) => dispatch(handleEnablementLink(enablementLink)),
    handleRangeSliderChange: (newValue) => dispatch(handleRangeSliderChange(newValue)),
    changeRecaptchaType: (type) => dispatch(changeRecaptchaType(type)),
    updateRecaptchaSettings: () => dispatch(updateRecaptchaSettings()),
    handleRecaptchaTypeChange: (value) => dispatch(handleRecaptchaTypeChange(value))
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
  
  const handleRangeSliderChange = (newValue) => {
    props.handleRangeSliderChange(newValue)
  }

  const handleRecaptchaTypeChange = (value) => {
    props.changeRecaptchaType(value)
    props.updateRecaptchaSettings()
  }

  return (
    <>      
    <Card sectioned title="Enable ReCAPTCHA spambuster">
      <TextContainer>
        <p>
          ReCAPTCHA spambuster is now installed.
        </p>
        <p>
          To enable the app please click the following <a href={props.enablementLink} target='_blank' rel='noopener noreferrer'>Enablement Link</a>, or you can manually enable it from the app embed function within the theme editor for your store.
        </p>
      </TextContainer>
    </Card>
    <Card sectioned title="Register for a reCAPTCHA Account">
      <TextContainer>
        <p>
          To use reCAPTCHA, you need to register for an account. Visit the <a href="https://www.google.com/recaptcha/admin/create" target="_blank" rel="noopener noreferrer">reCAPTCHA Admin Console</a> to create your account and obtain your site key and secret key.
        </p>
      </TextContainer>
    </Card>
    <Card sectioned title="ReCAPTCHA v3 vs. ReCAPTCHA Enterprise">
      <TextContainer>
        <h3>ReCAPTCHA v3</h3>
        <p>
          reCAPTCHA v3 detects abusive traffic on your website without user friction. It returns a score for each request you send to reCAPTCHA and gives you more flexibility to fight against spam and abuse in your own way.
        </p>
        <h3>ReCAPTCHA Enterprise</h3>
        <p>
          ReCAPTCHA Enterprise provides enhanced security and performance, especially for large-scale applications. It includes advanced risk analysis and customizable protection thresholds, and can integrate with other Google Cloud products for a more comprehensive security solution.
        </p>
        <p>
          Note: ReCAPTCHA Enterprise is free for up to 10,000 requests per month. After that, you will be charged based on your usage.
        </p>
      </TextContainer>
    </Card>
    <Card sectioned title="Learn more about Google reCAPTCHA v3">
      <TextContainer>
        <YouTube videoId="tbvxFW4UJdU"/>
        <p>
          reCAPTCHA v3 is a new version that detects abusive traffic on your website without user friction. 
        </p>
        <p>
          It returns a score for each request you send to reCAPTCHA and gives you more flexibility to fight against spam and abuse in your own way.
        </p>
        <p>
          reCAPTCHA V3 needs to adjust to the traffic on your individual site, this will take sometime during which you will continue to receive SPAM. 
          Statistics on SPAM visits will update after a few days on the google recaptcha <a href='https://www.google.com/recaptcha/admin' target='_blank' rel='noopener noreferrer'>Dashboard</a> 
        </p>
      </TextContainer>
    </Card>

    <Card sectioned title="Blog comments forms">
      <TextContainer>
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
              label='Enable reCAPTCHA V3 on contact forms'
              checked={props.contactEnabled}
              onChange={handleChangeContact}
            />
            <Card.Section title='Tune reCAPTCHA V3'>
              <RangeSlider
              output
              label="SPAM Score Threshold"
              helpText="Select the appropriate reCAPTCHA V3 SPAM score threshold for rejecting comments"
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
            <Select
              label="ReCAPTCHA Type"
              options={[
                { label: 'ReCAPTCHA v3', value: 'v3' },
                { label: 'ReCAPTCHA Enterprise', value: 'enterprise' }
              ]}
              value={props.recaptchaType}
              onChange={handleRecaptchaTypeChange}
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