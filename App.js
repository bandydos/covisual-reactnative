import React from 'react';
import { AppLoading } from 'expo';
import FetchAndDisplay from './src/components/FetchAndDisplay';
import { Body, Container, Content, Header, Title } from 'native-base';
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
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container>
        <Header>
          <Body>
            <Title style={{ marginLeft: 10 }}>Covisual</Title>
          </Body>
        </Header>
        <Content style={{ margin: 20 }}>
          <FetchAndDisplay></FetchAndDisplay>
        </Content>
      </Container>
    );
  }
}
