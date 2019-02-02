import React, { Component } from "react";
import { Text, View } from "react-native";
import ListView from "../components/list-view";
import { Provider } from "react-redux";
import store from "../config/configure-store";

export default class AppContainer extends Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <Text>I am in the app container</Text>
          <ListView />
        </View>
      </Provider>
    );
  }
}
