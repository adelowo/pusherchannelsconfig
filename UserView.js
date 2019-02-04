import React, { Component } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import SingleCardView from 'react-native-simple-card';

class UserView extends Component {
  render() {
    return (
      <View>
        <SingleCardView
          elevation={1}
          shadowColor="rgb(50,50,50)"
          shadowOpacity={1}
          marginTop={150}
          height={200}
        >
          <Text style={{ padding: 10, fontSize: 18 }}>
            Username : {this.props.user.login}
          </Text>
          <Text style={{ padding: 10, fontSize: 18 }}>
            Bio : {this.props.user.bio}
          </Text>
          <Text style={{ padding: 10, fontSize: 18 }}>
            Email: {this.props.user.email}
          </Text>
        </SingleCardView>

        <Button title="Go back" onPress={this.props.clear} />
      </View>
    );
  }
}

export default UserView;

