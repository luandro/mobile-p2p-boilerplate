import React, { Component } from 'react'
import {
  Button,
  StyleSheet,
  TextInput,
  Text,
  View,
} from 'react-native'
import graphFetch from '../utils/graphFetch'
import theme from '../utils/theme'

export default class Profile extends Component {
  state = {
    text: 'Your name',
    name: null
  }
  componentDidMount() {
    this.getProfile()
  }

  getProfile = () => {
    const profileQuery = `
      query Query {
        profile(id: "${this.props.whoami}") {
          name
        }
      }
    `
    graphFetch(this.props.uri, profileQuery)
      .then(res => {
        console.log('PROFILE', res)
        const { data: { profile: { name } } } = res
        if (name) {
          this.setState({
            name
          })
        } else {
          
        }
      })
      .catch(err => console.log('error', err))
  }

  publishAbout = () => {
    const mutation = `
      mutation Mutation {
        aboutMessage(input: {
          id: "${this.props.whoami}"
          name: "${this.state.text}"
        }) {
          name
        }
      }
    `
    graphFetch(this.props.uri, mutation)
      .then(res => {
        console.log('mutation data', res)
        this.setState({
          text: 'Your name',
          name: this.state.text
        })
      })
      .catch(err => {
        console.log('ERRR', err)
      })
  }

  render() {
    const { name, text } = this.state
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          {!name && <Text style={styles.text}>Public key: {this.props.whoami}</Text>}
          {name && <Text style={styles.main}>Welcome {name}</Text>}
          <TextInput
            placeholderTextColor={theme.dark}
            style={styles.input}
            onChangeText={(text) => this.setState({ text })}
            value={text}
          />
          <Button
            title="Change your name"
            color={theme.color3}
            onPress={() => this.publishAbout()}
          />
        </View>   
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.dark,
  },
  container: {
    maxWidth: '87%',
  },
  main: {
    fontSize: 22,
    color: theme.light,
    paddingBottom: 30
  },
  text: {
    color: theme.light,
    paddingBottom: 30
  },
  input: {
    height: 50,
    backgroundColor: theme.light,
    borderWidth: 1,
  },
})