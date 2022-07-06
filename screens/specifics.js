import React, {useEffect, useState} from "react";
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NavigationBar from 'expo-navigation-bar';
import styles from '../styles';
import { theme } from '../colors';

export default function Specifics() {
  NavigationBar.setBackgroundColorAsync(theme.c5);
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