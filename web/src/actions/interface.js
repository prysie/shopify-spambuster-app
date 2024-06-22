import {
  RCSITEKEY_CHANGE,
  RCSITESECRET_CHANGE,
  RANGE_SLIDER_CHANGE,
  ERROR_DISMISS,
  SUCCESS_DISMISS,
  CONTACT_ERROR_DISMISS,
  CONTACT_SUCCESS_DISMISS,
  CHANGE_CONTACT,
  RECAPTCHA_TYPE_CHANGE,
  DISPLAY_NAME_CHANGE,
  NEW_DOMAIN_CHANGE,
  ADD_DOMAIN,
  DOMAIN_CHANGE,
  DOMAIN_BLUR,
  EDIT_DOMAIN,
  REMOVE_DOMAIN,
  USE_CHECKBOX_CHALLENGE_CHANGE,
  ENABLE_ON_CONTACT_US_CHANGE,
  ENABLE_ON_LOGIN_CHANGE,
  ENABLE_ON_NEWSLETTER_CHANGE,
  GENERATE_RECAPTCHA_CREDENTIALS_SUCCESS
} from '../constants.js';

export const handleRcSiteKeyChange = (value) => {
  return {
    type: RCSITEKEY_CHANGE,
    payload: {
      value: value
    }
  }
}

export const handleRcSiteSecretChange = (value) => {
  return {
    type: RCSITESECRET_CHANGE,
    payload: {
      value: value
    }
  }
}

export const handleRangeSliderChange = (newValue) => {
  return {
    type: RANGE_SLIDER_CHANGE,
    payload: {
      value: newValue
    }
  }
}

export const dismissError = () => {
  return {
    type: ERROR_DISMISS,
    payload: {}
  }
}

export const dismissSuccess = () => {
  return {
    type: SUCCESS_DISMISS,
    payload: {}
  }
}

export const dismissErrorContact = () => {
  return {
    type: CONTACT_ERROR_DISMISS,
    payload: {}
  }
}

export const dismissSuccessContact = () => {
  return {
    type: CONTACT_SUCCESS_DISMISS,
    payload: {}
  }
}

export const changeContact = (newChecked) => {
  return {
    type: CHANGE_CONTACT,
    payload: {
      newChecked: newChecked
    }
  }
}

export const handleRecaptchaTypeChange = (value) => {
  return {
    type: RECAPTCHA_TYPE_CHANGE,
    payload: {
      value: { value },
    }
  }
}
export const handleUseCheckboxChallengeChange = (checked) => ({
  type: USE_CHECKBOX_CHALLENGE_CHANGE,
  payload: { checked: checked }
});

export const handleEnableOnContactUsChange = (checked) => ({
  type: ENABLE_ON_CONTACT_US_CHANGE,
  payload: { checked: checked }
});

export const handleEnableOnLoginChange = (checked) => ({
  type: ENABLE_ON_LOGIN_CHANGE,
  payload: { checked: checked }
});

export const handleEnableOnNewsletterChange = (checked) => ({
  type: ENABLE_ON_NEWSLETTER_CHANGE,
  payload: { checked: checked }
});

export const handleDisplayNameChange = (value) => ({
  type: DISPLAY_NAME_CHANGE,
  payload: { value },
});

export const handleNewDomainChange = (value) => {
  console.log('handleNewDomainChange action creator called with:', value);
  return {
    type: NEW_DOMAIN_CHANGE,
    payload: { value },
  };
};

export const handleAddDomain = (newDomain) => {
  return {
    type: ADD_DOMAIN,
    payload: { newDomain },
  };
};

export const handleDomainChange = (index, value) => ({
  type: DOMAIN_CHANGE,
  payload: { index, value },
});

export const handleDomainBlur = (index) => ({
  type: DOMAIN_BLUR,
  payload: { index },
});

export const handleEditDomain = (index) => ({
  type: EDIT_DOMAIN,
  payload: { index },
});

export const handleRemoveDomain = (index) => ({
  type: REMOVE_DOMAIN,
  payload: { index },
});

export const generateRecaptchaCredentialsSuccess = (rcSiteKey, rcSiteSecret, serviceAccountEmail, displayName) => ({
  type: GENERATE_RECAPTCHA_CREDENTIALS_SUCCESS,
  rcSiteKey,
  rcSiteSecret,
  serviceAccountEmail,
  displayName
});