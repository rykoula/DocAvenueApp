import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import ListView from "../components/list-view";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../config/configure-store";

export default class AppContainer extends Component {
  renderLoading = () => (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={this.renderLoading()}>
          <View>
            <ListView />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}
