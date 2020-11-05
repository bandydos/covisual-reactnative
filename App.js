import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FetchAndDisplay from './src/components/FetchAndDisplay';
import Header from './src/components/Header';


export default function App() {
  return (
    <ScrollView>
      <View style={styles.container, styles.mt}>
        <Header></Header>
        <FetchAndDisplay scope="state"></FetchAndDisplay>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mt: {
    marginTop: 32
  }
});
