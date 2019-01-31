import React, { Component } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import fetch from "../../actions/posts";

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  async componentDidMount() {
    const data = await fetch.fetchPosts();
    this.setState({ data });
  }

  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={({ item }) => (
          <View style={styles.flatview}>
            <Text style={styles.identifier}> {item.id} </Text>
            <Text style={styles.title}> {item.title} </Text>
            <Text style={styles.body}> {item.body} </Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}

const styles = StyleSheet.create({
  flatview: {
    justifyContent: "center",
    paddingTop: 30,
    borderRadius: 2
  },
  identifier: {
    fontSize: 18
  },
  title: {
    fontFamily: "Verdana",
    fontSize: 12
  },
  body: {
    color: "blue"
  }
});

export default ListView;
