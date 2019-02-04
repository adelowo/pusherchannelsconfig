import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet } from 'react-native';
import Search from './Search';
import UserView from './UserView';
import Pusher from 'pusher-js/react-native';

const appKey = 'PUSHER_CHANNELS_APP_KEY'
const cluster = 'PUSHER_CHANNELS_CLUSTER';

const channelName = 'gh-key-swap';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      key: 'GITHUB_PERSONAL_ACCESS_TOKEN',
      showUserProfile: false,
      user: null,
    };
    this.pusher = new Pusher(appKey, { cluster });
    this.listenForChanges();
  }

  listenForChanges = () => {
    const channel = this.pusher.subscribe(channelName);

    channel.bind('key-change', data => {
      Alert.alert('Reloading Authentication key', 'Press ok to continue');
      this.setState({ user: null, showUserProfile: false, key: data.key });
    });
  };

  onCallBack = user => {
    this.setState({ user: user, showUserProfile: true });
  };

  onReset = () => {
    this.setState({ user: null, showUserProfile: false });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ padding: 10 }}>
          {this.state.showUserProfile ? (
            <UserView clear={this.onReset} user={this.state.user} />
          ) : (
            <Search cb={this.onCallBack} authKey={this.state.key} />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
