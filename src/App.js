import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import AppNavigator from './navigation/Routes'
import reducers from './reducers'
import ReduxThunk from 'redux-thunk'
import React, { Component } from 'react';
import { LogBox, View } from 'react-native';
import { Root } from 'native-base'
import { AlertDialog, ProgressDialog } from './components/common';
import { Portal, } from 'react-native-paper'
import { Provider as PaperProvider } from 'react-native-paper';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import SelectionView from './components/common/SelectionView'
import { SnackProvider } from 'react-native-snackbar-material';
import NotifService from './utils/NotifService'
import { setSessionField } from './reducers/SessionReducer'

const store = createStore(
  reducers,
  applyMiddleware(ReduxThunk),
);
export const pStore = persistStore(store)

export { store }
export default class App extends Component {

  notif = new NotifService(
    this.onRegister.bind(this),
    this.onNotif.bind(this),
  );

  onRegister(token) {
    console.log("Fcm token", token)
    store.dispatch(setSessionField("deviceToken", token.token))
  }

  onNotif(notif) {
    console.log("notif---", notif)
    if (notif.notification && notif.notification.body) {
      const { body, title } = notif.notification
      this.notif.localNotif(body, title)
      // Alert.alert(title, body);
    }
  }

  componentDidMount() {

    // EStyleSheet.build(lightTheme)
    LogBox.ignoreAllLogs(true)
  }
  render() {

    return (

      <Provider store={store}>
        <PersistGate persistor={pStore}>
          <SnackProvider>
            <PaperProvider>
              <Root>
                <ProgressDialog onRef={c => {
                  if (c)
                    ProgressDialog.dialogInstance = c;
                }} />
                <SelectionView onRef={c => {
                  if (c)
                    SelectionView.dialogInstance = c;
                }} />
                <AlertDialog onRef={c => {
                  if (c)
                    AlertDialog.dialogInstance = c;
                }} />
                <AppNavigator />
              </Root>
            </PaperProvider>
          </SnackProvider>
        </PersistGate>
      </Provider>
    );
  }
};