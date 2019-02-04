import React, { Component } from 'react';
import { Alert, Button, TextInput, View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const USERNAME = 'adelowo';

class Search extends Component {
  state = {
    useKey: true,
  };

  fetchProfile = () => {
    const config = this.state.useKey
      ? { auth: { username: USERNAME, password: this.props.authKey } }
      : {};

    return axios.get(`https://api.github.com/users/${this.state.text}`, config);
  };

  render() {
    return (
      <View>
        <TextInput
          style={{ height: 40 }}
          placeholder="Type here to search for a GitHub user!"
          onChangeText={text => this.setState({ text })}
        />
        <Button
          onPress={() => {
            this.fetchProfile()
              .then(res => {
                this.props.cb(res.data);
              })
              .catch(err => {
                if (err.response) {
                  if (err.response.data.message === 'Bad credentials') {
                    this.setState({ useKey: false });
                    this.fetchProfile().then(res => {
                      this.props.cb(res.data);
                    });

                    return;
                  }
                }
                Alert.alert(
                  'an error occurred while fetching the user profile'
                );
              });
          }}
          title="Press Me"
        />
      </View>
    );
  }
}

export default Search;
