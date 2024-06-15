import React from 'react';
import { Card, Layout, TextContainer } from '@shopify/polaris';

export const settingsTabContent = (
  <>
    <Layout.Section>
      <Card sectioned title="Enable ReCAPTCHA spambuster">
        <TextContainer>
          <p>ReCAPTCHA spambuster is now installed.</p>
          <p>
            To enable the app, please click the following <a href={props.enablementLink} target="_blank" rel="noopener noreferrer">Enablement Link</a>, or you can manually enable it from the app embed function within the theme editor for your store.
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
      <Card title="Contact forms" sectioned>
        {/* ... contact forms content ... */}
      </Card>
    </Layout.Section>

    <Layout.Section>
      <Card title="Update reCAPTCHA details" sectioned>
        {/* ... update reCAPTCHA details form ... */}
      </Card>
    </Layout.Section>
  </>
);