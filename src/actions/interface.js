import {
  RCSITEKEY_CHANGE,
  RCSITESECRET_CHANGE,
  RANGE_SLIDER_CHANGE,

  ERROR_DISMISS,
  SUCCESS_DISMISS,

  CONTACT_ERROR_DISMISS,
  CONTACT_SUCCESS_DISMISS,
  CHANGE_CONTACT
} from '../constants.js'

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

export const handleRangeSliderChange = (value) => {
  return {
    type: RANGE_SLIDER_CHANGE,
    payload: {
      value: value
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