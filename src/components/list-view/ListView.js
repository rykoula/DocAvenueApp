import React, { Component } from "react";
import {
  TouchableOpacity,
  FlatList,
  View,
  Text,
  StyleSheet
} from "react-native";
import { fetchingPosts } from "../../actions/posts";
import fetch from "../../actions/posts";
import { connect } from "react-redux";
import { PAGINATION_MAX } from "../../config/constances";

class ListView extends Component {
  state = {
    pageSize: 10
  };
  constructor(props) {
    super(props);
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
  _loadMoreData() {
    this.state.pageSize < PAGINATION_MAX &&
      this.setState({
        pageSize: this.state.pageSize + 10
      });
  }
  _renderFooter() {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this._loadMoreData.bind(this)}
          style={styles.loadMoreBtn}
        >
          <Text>Load More</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    console.log(this.props);
    return (
      <FlatList
        data={this.props.posts.listPosts.slice(0, this.state.pageSize)}
        renderItem={({ item }) => (
          <View style={styles.flatview}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={this._renderFooter.bind(this)}
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
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: "#800000",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
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
