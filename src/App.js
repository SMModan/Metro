import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import AppNavigator from './navigation/Routes'
import reducers from './reducers'
import ReduxThunk from 'redux-thunk'
import React, { Component } from 'react';
import { LogBox, View } from 'react-native';
import { Root } from 'native-base'
import { AlertDialog } from './components/common';
import { Portal, } from 'react-native-paper'
import { Provider as PaperProvider } from 'react-native-paper';

const store = createStore(
  reducers,
  applyMiddleware(ReduxThunk),
);

export { store }
export default class App extends Component {

  componentDidMount() {

    // EStyleSheet.build(lightTheme)
    LogBox.ignoreAllLogs(true)
  }
  render() {

    return (

      <Provider store={store}>
        <PaperProvider>
          <Root>
            <AlertDialog onRef={c => {
              if (c)
                AlertDialog.dialogInstance = c;
            }} />
            <AppNavigator />
          </Root>
        </PaperProvider>

      </Provider>
    );
  }
};