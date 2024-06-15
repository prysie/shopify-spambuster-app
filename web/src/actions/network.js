import {
  BACKEND_URL
} from '../config.js'
import {
  get,
  post
} from '../utilities.js'
import {
  NETWORK_WARNING_SHOW,
  APPSTATUS_GET_START,
  APPSTATUS_GET_DONE,
  INSTALL_GET_START,
  INSTALL_GET_DONE,
  UPDATE_POST_START,

  NETWORK_WARNING_SHOW_CONTACT,
  UPDATE_POST_DONE,
  UPDATECONTACT_POST_START,
  UPDATECONTACT_POST_DONE,

  GET_RECAPTCHA_SETTINGS_START,
  GET_RECAPTCHA_SETTINGS_SUCCESS,
  GET_RECAPTCHA_SETTINGS_FAILURE,
  UPDATE_RECAPTCHA_SETTINGS_START,
  UPDATE_RECAPTCHA_SETTINGS_SUCCESS,
  UPDATE_RECAPTCHA_SETTINGS_FAILURE
} from '../constants.js'

// Fetch reCAPTCHA settings actions
export const getRecaptchaSettingsStart = () => {
  return {
    type: GET_RECAPTCHA_SETTINGS_START,
    payload: {}
  }
}

export const getRecaptchaSettingsSuccess = (settings) => {
  return {
    type: GET_RECAPTCHA_SETTINGS_SUCCESS,
    payload: settings
  }
}

export const getRecaptchaSettingsFailure = (error) => {
  return {
    type: GET_RECAPTCHA_SETTINGS_FAILURE,
    payload: {
      message: error
    }
  }
}

export const updateRecaptchaSettingsStart = () => {
  return {
    type: UPDATE_RECAPTCHA_SETTINGS_START,
    payload: {}
  }
}

export const updateRecaptchaSettingsSuccess = () => {
  return {
    type: UPDATE_RECAPTCHA_SETTINGS_SUCCESS,
    payload: {}
  }
}


export const updateRecaptchaSettingsFailure = (error) => {
  return {
    type: UPDATE_RECAPTCHA_SETTINGS_FAILURE,
    payload: {
      message: error
    }
  }
}

export const getRecaptchaSettings = () => {
  return (dispatch) => {
    dispatch(getRecaptchaSettingsStart())
    get(BACKEND_URL + '/getRecaptchaSettings' + window.location.search)
      .then(json => {
        dispatch(getRecaptchaSettingsSuccess(json))
      })
      .catch(error => {
        dispatch(getRecaptchaSettingsFailure('Could not fetch reCAPTCHA settings.'))
      })
  }
}

export const changeRecaptchaType = (type) => {
  return {
    type: RECAPTCHA_TYPE_CHANGE,
    payload: {
      recaptchaType: type
    }
  }
}
// Explanation:
// This function dispatches updateRecaptchaSettingsStart to indicate the start of the update.
// It gathers the necessary data (including the reCAPTCHA type) from the state.
// It makes a POST request to update the reCAPTCHA settings.
// On success, it dispatches updateRecaptchaSettingsSuccess.
// On failure, it dispatches updateRecaptchaSettingsFailure with an error message.

export const updateRecaptchaSettings = () => {
  return (dispatch, getState) => {
    const rootState = getState().root
    const rcSiteKey = rootState.get('rcSiteKey')
    const rcSiteSecret = rootState.get('rcSiteSecret')
    const recaptchaType = rootState.get('recaptchaType') // Add new field for reCAPTCHA type

    const data = {
      rcSiteKey: rcSiteKey,
      rcSiteSecret: rcSiteSecret,
      recaptchaType: recaptchaType // Include reCAPTCHA type in the payload
    }

    dispatch(updateRecaptchaSettingsStart())
    post(BACKEND_URL + '/updateRecaptchaSettings' + window.location.search, data)
      .then(json => {
        if (json.success === true) {
          dispatch(updateRecaptchaSettingsSuccess())
        } else {
          dispatch(updateRecaptchaSettingsFailure('Connection error. Could not update reCAPTCHA settings.'))
        }
      })
      .catch(error => {
        dispatch(updateRecaptchaSettingsFailure('Connection error. Could not update reCAPTCHA settings.'))
      })
  }
}

export const handleError = (error, warningText) => {
  // if (process && process.env.NODE_ENV !== 'test') {
  console.error(error)
  // }
  return {
    type: NETWORK_WARNING_SHOW,
    payload: {
      message: warningText
    }
  }
}

export const handleContactError = (error, warningText) => {
  // if (process && process.env.NODE_ENV !== 'test') {
  console.error(error)
  // }
  return {
    type: NETWORK_WARNING_SHOW_CONTACT,
    payload: {
      message: warningText
    }
  }
}

export const getAppStatusStart = () => {
  return {
    type: APPSTATUS_GET_START,
    payload: {}
  }
}

export const getAppStatusDone = (statusData) => {
  return {
    type: APPSTATUS_GET_DONE,
    payload: {
      hasScriptTag: statusData.hasScriptTag,
      contactEnabled: statusData.contactEnabled,
      rangeSliderValue: statusData.spamThreshold,
      shop: statusData.shop
    }
  }
}

export const getAppStatus = () => {
  return (dispatch) => {
    dispatch(getAppStatusStart())
    get(BACKEND_URL + '/status' + window.location.search)
      .then(json => {
        if (json.isSubscribed === false) {
          window.top.location.href = json.confirmationURL
          return
        }
        dispatch(getAppStatusDone(json))
      })
      .catch(error => {
        dispatch(handleError(error, 'Could not get status.'))
      })
  }
}

export const installStart = () => {
  return {
    type: INSTALL_GET_START,
    payload: {}
  }
}

export const installDone = () => {
  return {
    type: INSTALL_GET_DONE,
    payload: {}
  }
}

export const install = () => {
  return (dispatch, getState) => {
    const rootState = getState().root
    const rcSiteKey = rootState.get('rcSiteKey')
    const rcSiteSecret = rootState.get('rcSiteSecret')
    const enablementLink = rootState.get('enablementLink')
    const data = {
      rcSiteKey: rcSiteKey,
      rcSiteSecret: rcSiteSecret
    }
    dispatch(installStart())
    post(BACKEND_URL + '/setuprc' + window.location.search, data)
      .then(json => {
        if (json.success === true) {
          dispatch(installDone())
        } else {
          dispatch(handleError({}, 'Could not install.'))
        }
      })
      .catch(error => {
        dispatch(handleError(error, 'Could not install.'))
      })
  }
}

export const updateStart = () => {
  return {
    type: UPDATE_POST_START,
    payload: {}
  }
}

export const updateDone = () => {
  return {
    type: UPDATE_POST_DONE,
    payload: {}
  }
}

export const update = () => {
  return (dispatch, getState) => {
    const rootState = getState().root
    const rcSiteKey = rootState.get('rcSiteKey')
    const rcSiteSecret = rootState.get('rcSiteSecret')

    const data = {
      rcSiteKey: rcSiteKey,
      rcSiteSecret: rcSiteSecret
    }
    dispatch(updateStart())
    post(BACKEND_URL + '/update' + window.location.search, data)
      .then(json => {
        if (json.success === true) {
          dispatch(updateDone())
        } else {
          dispatch(handleError({}, 'Connection error. Could not update.'))
        }
      })
      .catch(error => {
        dispatch(handleError(error, 'Connection error. Could not update.'))
      })
  }
}

export const updateContactStart = () => {
  return {
    type: UPDATECONTACT_POST_START,
    payload: {}
  }
}

export const updateContactDone = () => {
  return {
    type: UPDATECONTACT_POST_DONE,
    payload: {}
  }
}

export const updateContact = () => {
  return (dispatch, getState) => {
    const rootState = getState().root
    const contactEnabled = rootState.get('contactEnabled')
    const rangeSliderValue = rootState.get('rangeSliderValue')
    
    const data = {
      contactEnabled: contactEnabled,
      rangeSliderValue: rangeSliderValue
    }
    dispatch(updateContactStart())
    post(BACKEND_URL + '/updatecontact' + window.location.search, data)
      .then(json => {
        if (json.success === true) {
          dispatch(updateContactDone())
        } else {
          dispatch(handleContactError({}, 'Connection error. Could not update contact recaptcha.'))
        }
      })
      .catch(error => {
        dispatch(handleContactError(error, 'Connection error. Could not update contact recaptcha.'))
      })
  }
}
