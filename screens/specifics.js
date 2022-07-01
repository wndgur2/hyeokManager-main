import React, {useEffect, useState} from "react";
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NavigationBar from 'expo-navigation-bar';
import { theme } from '../colors';

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