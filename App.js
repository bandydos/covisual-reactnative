import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FetchAndDisplay from './src/components/FetchAndDisplay';

export default function App() {
  return (
    <ScrollView>
      <FetchAndDisplay scope="total"></FetchAndDisplay>
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
});
