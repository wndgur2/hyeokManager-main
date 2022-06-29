import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { theme } from '../colors';
import * as NavigationBar from 'expo-navigation-bar';
import React, {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Specifics() {
  NavigationBar.setBackgroundColorAsync(theme.bg);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text>
          Specifics
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.bg,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
});