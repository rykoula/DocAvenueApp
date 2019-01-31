import React, { Component } from "react";
import { Text, View } from "react-native";
import ListView from "../components/list-view";
export default class AppContainer extends Component {
  render() {
    return (
      <View>
        <Text>I am in the app container</Text>
        <ListView />
      </View>
    );
  }
}
