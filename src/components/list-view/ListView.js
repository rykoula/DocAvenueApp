import React, { Component } from "react";
import {
  TouchableOpacity,
  TouchableHighlight,
  Image,
  FlatList,
  View,
  Text,
  Animated
} from "react-native";
import { fetchingPosts } from "../../actions/posts";
import { connect } from "react-redux";
import styles from "./style";
// import config from "../../config/config.dist";
import { PAGINATION_MAX } from "../../config/constances";

class ListView extends Component {
  state = {
    pageSize: 10,
    expanded: true,
    animation: new Animated.Value()
  };

  //icons to expand details for each title
  icons = {
    up: require("../../assets/up-arrow.png"),
    down: require("../../assets/down-arrow.png")
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //Fetching post asynchrononously
    this._fetchPosts();
  }

  //calling action fetchingPosts
  _fetchPosts = () => {
    try {
      this.props.fetchingPosts();
    } catch (error) {
      console.log(error);
    }
  };

  _paginationMaxReached = () => {
    return this.state.pageSize < PAGINATION_MAX;
  };

  //called by loadMoreBtn to manage pagination
  _loadMoreData() {
    this._paginationMaxReached() &&
      this.setState({
        pageSize: this.state.pageSize + 10
      });
  }

  //Toggle for animation, to set the initial and final value for expanding and start animation
  _toggle() {
    let initialValue = this.state.expanded
      ? this.state.maxHeight + this.state.minHeight
      : this.state.minHeight;
    let finalValue = this.state.expanded
      ? this.state.minHeight
      : this.state.maxHeight + this.state.minHeight;

    this.setState({
      expanded: !this.state.expanded
    });

    this.state.animation.setValue(initialValue);
    Animated.spring(this.state.animation, {
      toValue: finalValue
    }).start();
  }

  //Event listener to set the max height of the view for animation
  _setMaxHeight(event) {
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    });
  }

  //Event listener to set the min height of the view for animation
  _setMinHeight(event) {
    this.setState({
      minHeight: event.nativeEvent.layout.height
    });
  }

  //Rendering footer to set Button at the bottom of the FlatList
  _renderFooter() {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this._loadMoreData.bind(this)}
          disabled={this._paginationMaxReached() ? false : true}
          style={
            this._paginationMaxReached()
              ? styles.loadMoreBtn
              : styles.noLoadMoreBtn
          }
        >
          <Text style={styles.loadMoreTxt}>Load More</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // <Text style={styles.h1text}>POSTS FETCHED FROM</Text>
  // <Text style={styles.h2text}>{config.api_url}</Text>
  render() {
    let icon = this.icons["down"];
    if (this.state.expanded) {
      icon = this.icons["up"];
    }
    return (
      <FlatList
        data={this.props.posts.listPosts.slice(0, this.state.pageSize)}
        renderItem={({ item }) => (
          <Animated.View
            style={[styles.flatview, { height: this.state.animation }]}
          >
            <View
              style={styles.flatview1}
              onLayout={this._setMinHeight.bind(this)}
            >
              <Text numberOfLines={1} style={styles.title}>
                {item.title}
              </Text>
              <TouchableHighlight
                style={styles.buttonArrow}
                onPress={this._toggle.bind(this)}
              >
                <Image style={styles.buttonImage} source={icon} />
              </TouchableHighlight>
            </View>
            <View onLayout={this._setMaxHeight.bind(this)}>
              <Text>
                <Text style={styles.subTitle}>Id: </Text>
                <Text style={styles.details}>{item.id}</Text>
              </Text>
              <Text>
                <Text style={styles.subTitle}>Title: </Text>
                <Text style={styles.details}>{item.title}</Text>
              </Text>
              <Text style={styles.subTitle}>Body: </Text>
              <Text style={styles.details}>{item.body}</Text>
            </View>
          </Animated.View>
        )}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={this._renderFooter.bind(this)}
      />
    );
  }
}

//REDUX: Mapping state to props
const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};

export default connect(
  mapStateToProps,
  { fetchingPosts }
)(ListView);
