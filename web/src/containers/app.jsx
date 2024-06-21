import React from 'react'
import { connect } from 'react-redux'
import '@shopify/polaris/dist/styles.css'
import enTranslations from '@shopify/polaris/locales/en.json'
import { AppProvider } from '@shopify/polaris'

import Main from './main.jsx'

export const mapStateToProps = (state) => {
  console.log('Calling app mapStateToProps')
  return {
  }
}

export const mapDispatchToProps = (dispatch) => {
  console.log('Calling app mapDispatchToProps')
  return {
  }
}

export const ConnectedApp = (props) => {
  console.log('Calling ConnectedApp')
  const config = {
    apiKey: props.apiKey,
    shopOrigin: props.shop
  }
  return (
    <>
      <AppProvider i18n={enTranslations} config={config}>
        <Main />
      </AppProvider>
    </>
  )
}

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp)
export default App
