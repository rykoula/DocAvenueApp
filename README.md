# DocAvenueApp

React Native app to render first 50 posts fetched on the URL: https://jsonplaceholder.typicode.com/posts

Posts are sort alphabeticaly on title and there is a pagination 10 by 10.
It is possible to see the list of posts offline.

## Getting Started

```
git clone git@github.com:rykoula/DocAvenueApp.git
cd DocAvenueApp
npm install
```

## Running the application

```
//Depending if you want to launch the app on iOS or Android platform
react-native run-ios // react-native run-android
```

### User Interface

The application is only composed of one screen with a FlatList rendering fetched posts.

### State Management

[Redux](https://redux.js.org/) is used for the state management of this app.
The cache is persisted thanks to [redux-persist](https://github.com/rt2zz/redux-persist) so data are not lost when app is killed.
