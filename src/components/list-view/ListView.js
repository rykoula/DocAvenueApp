import React, { Component } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { fetchingPosts } from "../../actions/posts";
import fetch from "../../actions/posts";
import { connect } from "react-redux";

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this._fetchPosts();
  }

  _fetchPosts = () => {
    try {
      this.props.fetchingPosts();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    console.log(this.props);
    return (
      <FlatList
        data={this.props.posts.listPosts}
        renderItem={({ item }) => (
          <View style={styles.flatview}>
            <Text style={styles.title}> {item.title} </Text>
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
    paddingTop: 10,
    borderRadius: 2
  },
  identifier: {
    fontSize: 18
  },
  title: {
    fontFamily: "Verdana",
    fontSize: 20
  },
  body: {
    color: "blue"
  }
});

const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};

export default connect(
  mapStateToProps,
  { fetchingPosts }
)(ListView);
