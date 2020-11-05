import React from 'react';
import { AppLoading } from 'expo';
import { StyleSheet } from 'react-native';
import FetchAndDisplay from './src/components/FetchAndDisplay';
import { Body, Button, Container, Content, Footer, FooterTab, Header, Title } from 'native-base';
import { Switch, Link, NativeRouter, Route } from 'react-router-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {

    const style = StyleSheet.create({
      m: {
        margin: 20
      }
    })

    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container>
        <Header>
          <Body>
            <Title>Covisual</Title>
          </Body>
        </Header>
        <Content style={style.m}>
          <FetchAndDisplay></FetchAndDisplay>
        </Content>
      </Container>
    );
  }
}
