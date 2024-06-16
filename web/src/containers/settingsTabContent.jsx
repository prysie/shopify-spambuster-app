import React from 'react';
import { Card, Layout, TextContainer, Form, FormLayout, TextField, Button, Select, Banner } from '@shopify/polaris';

class SettingsTabContent extends React.Component {
  render() {
    const {
      rcSiteKey,
      rcSiteSecret,
      errorMessage,
      showKeySecretUpdateSuccess,
      enablementLink,
      showSecret,
      toggleShowSecret,
      handleUpdateKeySecret,
      handleDismissError,
      handleDismissSuccess,
      handleRcSiteKeyChange,
      handleRcSiteSecretChange,
      handleRecaptchaTypeChange,
      recaptchaType
    } = this.props;

    return (
      <>
        <Layout.Section>
          <Card sectioned title="Enable ReCAPTCHA spambuster">
            <TextContainer>
              <p>ReCAPTCHA spambuster is now installed.</p>
              <p>
                To enable the app please click the following <a href={enablementLink} target='_blank' rel='noopener noreferrer'>Enablement Link</a>, or you can manually enable it from the app embed function within the theme editor for your store.
              </p>
            </TextContainer>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card sectioned title="Learn more about Google reCAPTCHA Enterprise">
            <TextContainer>
              <p>
                reCAPTCHA Enterprise is a new version that detects abusive traffic on your website without user friction.
              </p>
              <p>
                It offers enhanced security with options like adaptive risk analysis and managed service, making it suitable for high-security needs.
              </p>
              <p>
                Statistics on SPAM visits will update after a few days on the Google reCAPTCHA <a href="https://www.google.com/recaptcha/admin" target="_blank" rel="noopener noreferrer">Dashboard</a>.
              </p>
            </TextContainer>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card sectioned title="Blog comments forms">
            <TextContainer>
              <p>Your blog comment form on article pages will now include reCAPTCHA v3 invisible verification. This can be confirmed by the text added under the submit button, which is mandated by the Google reCAPTCHA v3 licence.</p>
              <p>Any comments that do not pass the reCAPTCHA verification will not be submitted.</p>
              <p>It is a reCAPTCHA requirement that the text "This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply." appears in the forms. The text can be stylized via CSS by adding rules for the class ".mssb-rc-text".</p>
            </TextContainer>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card title='Contact forms' sectioned>
            {/* Add contact forms content */}
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card title='Update reCAPTCHA details' sectioned>
            <Form onSubmit={handleUpdateKeySecret}>
              <FormLayout>
                {errorMessage && (
                  <Banner onDismiss={handleDismissError} status='critical'>
                    <p>{errorMessage}</p>
                  </Banner>
                )}
                {showKeySecretUpdateSuccess && (
                  <Banner onDismiss={handleDismissSuccess} status='success'>
                    <p>Updated successfully</p>
                  </Banner>
                )}
                <TextField
                  value={rcSiteKey || ''}
                  onChange={handleRcSiteKeyChange}
                  label='reCAPTCHA site key'
                  placeholder="Your reCAPTCHA site key"
                />
                <TextField
                  value={showSecret ? rcSiteSecret || '' : '***'}
                  onChange={handleRcSiteSecretChange}
                  label='reCAPTCHA secret key'
                  type={showSecret ? 'text' : 'password'}
                  placeholder="Your reCAPTCHA secret key"
                />
                <Button onClick={toggleShowSecret} plain>
                  {showSecret ? 'Hide Secret' : 'Show Secret'}
                </Button>
                <Select
                  label="ReCAPTCHA Type"
                  options={[
                    { label: 'ReCAPTCHA v3', value: 'v3' },
                    { label: 'ReCAPTCHA Enterprise', value: 'enterprise' }
                  ]}
                  value={recaptchaType || 'enterprise'}
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
      </>
    );
  }
}

export default SettingsTabContent;