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
  UPDATECONTACT_POST_DONE
} from '../constants.js'

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
    const data = {
      contactEnabled: contactEnabled
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
