import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  FlatList,
  View,
  Text,
  Animated
} from "react-native";
import { fetchingPosts } from "../../actions/posts";
import { connect } from "react-redux";
import styles from "./style";
import config from "../../config/config.dist";

class ListView extends Component {
  state = {
    pageSize: 10
  };

  //icons to expand details for each title
  icons = {
    up: require("../../assets/up-arrow.png")
  };

  items = [];

  minHeight = 50;

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

  //Return boolean to know if the page maximum was reached
  _isPageMaxReached = () => {
    return this.state.pageSize < config.PAGINATION_MAX;
  };

  //called by loadMoreBtn to manage pagination
  _loadMoreData = () => {
    this._isPageMaxReached() &&
      this.setState({
        pageSize: this.state.pageSize + 10
      });
  };

  //Toggle for animation, to set the initial and final value for expanding and start animation
  _toggle = index => {
    const finalValue = this.items[index].isExpanded
      ? this.minHeight
      : this.maxHeight + this.minHeight;

    const degreeValue = this.items[index].isExpanded ? 0 : 1;

    this.items[index].isExpanded = this.items[index].isExpanded ? false : true;

    Animated.parallel([
      Animated.spring(this.items[index].currentValue, {
        toValue: finalValue
      }),
      Animated.spring(this.items[index].iconRotationDregree, {
        toValue: degreeValue
      })
    ]).start();
  };

  //Event listener to set the max height of the view for animation
  _setMaxHeight = event => {
    this.maxHeight =
      this.maxHeight > event.nativeEvent.layout.height
        ? this.maxHeight
        : event.nativeEvent.layout.height;
  };

  _renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.h1text}>POSTS FETCHED FROM</Text>
        <Text style={styles.h2text}>{config.api_url}</Text>
      </View>
    );
  };

  //Rendering footer to set Button at the bottom of the FlatList
  _renderFooter = () => {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this._loadMoreData}
          disabled={this._isPageMaxReached() ? false : true}
          style={
            this._isPageMaxReached() ? styles.loadMoreBtn : styles.noLoadMoreBtn
          }
        >
          <Text style={styles.loadMoreTxt}>Load More</Text>
        </TouchableOpacity>
      </View>
    );
  };

  //Rendering each item of the flat list
  _renderItem = ({ item, index }) => {
    this.items[index] = {
      currentValue: new Animated.Value(this.minHeight),
      iconRotationDregree: new Animated.Value(0),
      isExpanded: false
    };
    return (
      <Animated.View
        style={[styles.flatview, { height: this.items[index].currentValue }]}
      >
        <View style={styles.flatview1}>
          <Text numberOfLines={1} style={styles.title}>
            {item.title}
          </Text>
          <TouchableOpacity
            style={styles.buttonArrow}
            onPress={() => {
              this._toggle(index);
            }}
          >
            <Animated.Image
              style={[
                styles.buttonImage,
                {
                  transform: [
                    {
                      rotate: this.items[index].iconRotationDregree.interpolate(
                        {
                          inputRange: [0, 1],
                          outputRange: ["0deg", "180deg"]
                        }
                      )
                    }
                  ]
                }
              ]}
              source={this.icons.up}
            />
          </TouchableOpacity>
        </View>
        <View onLayout={this._setMaxHeight}>
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
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.posts.listPosts.slice(0, this.state.pageSize)}
        renderItem={this._renderItem}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={this._renderHeader}
        ListFooterComponent={this._renderFooter}
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
