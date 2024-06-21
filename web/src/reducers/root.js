import { Map, fromJS } from 'immutable';
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
  RANGE_SLIDER_CHANGE,

  NETWORK_WARNING_SHOW,
  ERROR_DISMISS,
  SUCCESS_DISMISS,

  NETWORK_WARNING_SHOW_CONTACT,
  CONTACT_ERROR_DISMISS,
  CONTACT_SUCCESS_DISMISS,

  GET_RECAPTCHA_SETTINGS_START,
  GET_RECAPTCHA_SETTINGS_SUCCESS,
  GET_RECAPTCHA_SETTINGS_FAILURE,
  UPDATE_RECAPTCHA_SETTINGS_START,
  UPDATE_RECAPTCHA_SETTINGS_SUCCESS,
  UPDATE_RECAPTCHA_SETTINGS_FAILURE,
  GET_RECAPTCHA_ACTIVITY_START,
  GET_RECAPTCHA_ACTIVITY_SUCCESS,
  GET_RECAPTCHA_ACTIVITY_FAILURE,
  GENERATE_RECAPTCHA_CREDENTIALS_START,
  GENERATE_RECAPTCHA_CREDENTIALS_SUCCESS,
  GENERATE_RECAPTCHA_CREDENTIALS_FAILURE,
  RECAPTCHA_TYPE_CHANGE,
  DISPLAY_NAME_CHANGE,
  NEW_DOMAIN_CHANGE,
  ADD_DOMAIN,
  DOMAIN_CHANGE,
  DOMAIN_BLUR,
  EDIT_DOMAIN,
  REMOVE_DOMAIN,
} from '../constants.js';

export const getInitialState = () => {
  return Map({
    isLoading: true, // To avoid displaying data prematurely
    hasScriptTag: false,
    rcSiteKey: '',
    rcSiteSecret: '',
    recaptchaType: 'Enterprise',
    errorMessage: '',
    showKeySecretUpdateSuccess: false,
    contactEnabled: false,
    errorMessageContact: '',
    enablementLink: '',
    showContactUpdateSuccess: false,
    rangeSliderValue: .5,
    recaptchaActivity: [],
    isLoadingActivity: false,
    activityError: '',
    domainList: [],
    useCheckboxChallenge: false,
    enableOnContactUs: false,
    enableOnLogin: false,
    enableOnNewsletter: false,       
    displayName: '',
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
      state = state.set('rangeSliderValue', action.payload.rangeSliderValue)
      state = state.set('enablementLink', 'https://' + action.payload.shop+ '/admin/themes/current/editor?context=apps' + '&template=' + '$' +'&activateAppId=' + 'bfbda1cf-d162-41f6-9fc1-6d7890aa3e54' + '/' + 'reCAPTCHA-spambuster'),
      state = state.set('isLoading', false)
      return state
    case INSTALL_GET_DONE:
      state = state.set('hasScriptTag', true)    
      state = state.set('contactEnabled', action.payload.contactEnabled === true)
      state = state.set('rangeSliderValue', action.payload.rangeSliderValue)
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
    case RANGE_SLIDER_CHANGE:
        state = state.set('rangeSliderValue', action.payload.value)
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
    case GET_RECAPTCHA_SETTINGS_SUCCESS:
      state = state.set('isLoading', false)
      state = state.set('rcSiteKey', action.payload.rcSiteKey)
      state = state.set('rcSiteSecret', action.payload.rcSiteSecret)
      state = state.set('recaptchaType', action.payload.recaptchaType)
      return state
    case GET_RECAPTCHA_SETTINGS_FAILURE:
      state = state.set('isLoading', false)
      state = state.set('errorMessage', action.payload.message)
      return state
    case UPDATE_RECAPTCHA_SETTINGS_SUCCESS:
      state = state.set('isLoading', false)
      state = state.set('showKeySecretUpdateSuccess', true)
      return state
    case UPDATE_RECAPTCHA_SETTINGS_FAILURE:
      state = state.set('isLoading', false)
      state = state.set('errorMessage', action.payload.message)
      return state
    case GET_RECAPTCHA_ACTIVITY_START:
      state = state.set('isLoadingActivity', true)
      return state
    case GET_RECAPTCHA_ACTIVITY_SUCCESS:
      state = state.set('recaptchaActivity', action.payload)
      state = state.set('isLoadingActivity', false)
      return state
    case GET_RECAPTCHA_ACTIVITY_FAILURE:
      state = state.set('isLoadingActivity', false)
      state = state.set('activityError', action.payload.message)
      return state    
    case GET_RECAPTCHA_ACTIVITY_SUCCESS:
      state = state.set('recaptchaActivity', action.payload)
      state = state.set('isLoadingActivity', false)
      return state
    case GET_RECAPTCHA_SETTINGS_START:
      state = state.set('isLoading', true);
      return state;
    case UPDATE_RECAPTCHA_SETTINGS_START:
      state = state.set('isLoading', true);
      return state;      
    case GENERATE_RECAPTCHA_CREDENTIALS_START:
      state = state.set('isLoading', true);
      return state;
    case GENERATE_RECAPTCHA_CREDENTIALS_SUCCESS:
      state = state.set('rcSiteKey', action.payload.rcSiteKey);
      state = state.set('rcSiteSecret', action.payload.rcSiteSecret);
      state = state.set('isLoading', false);
      return state;
    case GENERATE_RECAPTCHA_CREDENTIALS_FAILURE:
      state = state.set('errorMessage', action.payload.error);
      state = state.set('isLoading', false);
      return state;  
    case RECAPTCHA_TYPE_CHANGE:
      state = state.set('recaptchaType', action.payload);
      return state;    
    case ADD_DOMAIN:
      return state.update('domainList', (list) =>
        list.push(fromJS({ value: state.get('newDomain'), editing: false }))
      ).set('newDomain', '');
    case DOMAIN_CHANGE:
      return state.updateIn(['domainList', action.payload.index], (domain) =>
        domain.set('value', action.payload.value)
      );
    case DOMAIN_BLUR:
      return state.updateIn(['domainList', action.payload], (domain) =>
        domain.set('editing', false)
      );
    case EDIT_DOMAIN:
      return state.updateIn(['domainList', action.payload], (domain) =>
        domain.set('editing', true)
      );
    case DISPLAY_NAME_CHANGE:
      return state.set('displayName', action.payload.value);
    
    case USE_CHECKBOX_CHALLENGE_CHANGE:
      return state.set('useCheckboxChallenge', action.payload.checked);
    
    case ENABLE_ON_CONTACT_US_CHANGE:
      return state.set('enableOnContactUs', action.payload.checked);
    
    case ENABLE_ON_LOGIN_CHANGE:
      return state.set('enableOnLogin', action.payload.checked);
    
    case ENABLE_ON_NEWSLETTER_CHANGE:
      return state.set('enableOnNewsletter', action.payload.checked);          

    case NEW_DOMAIN_CHANGE:
      return state.set('newDomain', action.payload);
    case REMOVE_DOMAIN:
      return state.update('domainList', (list) =>
        list.delete(action.payload)
      );
    default:
        return state
    }
  }
  
  export default rootReducer
