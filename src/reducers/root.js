import { Map } from 'immutable'

import {
  APPSTATUS_GET_START,
  APPSTATUS_GET_DONE,
  INSTALL_GET_START,
  INSTALL_GET_DONE,
  UPDATE_POST_START,
  UPDATE_POST_DONE,
  UPDATECONTACT_POST_START,
  UPDATECONTACT_POST_DONE,

  RCSITEKEY_CHANGE,
  RCSITESECRET_CHANGE,

  CHANGE_CONTACT,

  NETWORK_WARNING_SHOW,
  ERROR_DISMISS,
  SUCCESS_DISMISS,

  NETWORK_WARNING_SHOW_CONTACT,
  CONTACT_ERROR_DISMISS,
  CONTACT_SUCCESS_DISMISS
} from '../constants.js'

export const getInitialState = () => {
  return Map({
    isLoading: true, // To avoid displaying data prematurely

    hasScriptTag: false,

    rcSiteKey: '',
    rcSiteSecret: '',

    errorMessage: '',
    showKeySecretUpdateSuccess: false,

    contactEnabled: false,

    errorMessageContact: '',
    enablementLink: '',
    showContactUpdateSuccess: false,
    rangeSliderValue: .5
  })
}

const rootReducer = (state, action) => {
  if (!state) {
    state = getInitialState()
  }
  switch (action.type) {
    case APPSTATUS_GET_START:
    case INSTALL_GET_START:
    case UPDATE_POST_START:
    case UPDATECONTACT_POST_START:
      state = state.set('isLoading', true)
      return state
    case APPSTATUS_GET_DONE:
      state = state.set('hasScriptTag', action.payload.hasScriptTag)
      state = state.set('contactEnabled', action.payload.contactEnabled === true)
      state = state.set('enablementLink', 'https://' + action.payload.shop+ '/admin/themes/current/editor?context=apps' + '&template=' + '$' +'&activateAppId=' + 'bfbda1cf-d162-41f6-9fc1-6d7890aa3e54' + '/' + 'reCAPTCHA-spambuster'),
      state = state.set('isLoading', false)
      return state
    case INSTALL_GET_DONE:
      state = state.set('hasScriptTag', true)    
      state = state.set('contactEnabled', action.payload.contactEnabled === true)
      state = state.set('rcSiteKey', '')
      state = state.set('rcSiteSecret', '')
      state = state.set('isLoading', false)
      return state
    case UPDATE_POST_DONE:
      state = state.set('rcSiteKey', '')
      state = state.set('rcSiteSecret', '')
      state = state.set('showKeySecretUpdateSuccess', true)
      state = state.set('isLoading', false)
      return state
    case UPDATECONTACT_POST_DONE:
      state = state.set('showContactUpdateSuccess', true)
      state = state.set('isLoading', false)
      return state
    case RCSITEKEY_CHANGE:
      state = state.set('rcSiteKey', action.payload.value)
      return state
    case RCSITESECRET_CHANGE:
      state = state.set('rcSiteSecret', action.payload.value)
      return state
    case CHANGE_CONTACT:
      state = state.set('contactEnabled', action.payload.newChecked)
      return state
      case RANGE_SLIDER:
        state = state.set('rangeSliderValue', action.payload.rangeSliderValue)
        return state  
    case NETWORK_WARNING_SHOW:
      state = state.set('errorMessage', action.payload.message)
      state = state.set('isLoading', false)
      return state
    case ERROR_DISMISS:
      state = state.set('errorMessage', '')
      return state
    case SUCCESS_DISMISS:
      state = state.set('showKeySecretUpdateSuccess', false)
      return state
    case NETWORK_WARNING_SHOW_CONTACT:
      state = state.set('errorMessageContact', action.payload.message)
      state = state.set('isLoading', false)
      return state
    case CONTACT_ERROR_DISMISS:
      state = state.set('errorMessageContact', '')
      return state
    case CONTACT_SUCCESS_DISMISS:
      state = state.set('showContactUpdateSuccess', false)
      return state
  }
  return state
}

export default rootReducer
