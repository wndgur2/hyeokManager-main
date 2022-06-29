import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { theme } from '../colors';
import * as NavigationBar from 'expo-navigation-bar';
import React, {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TimePicker} from 'react-native-simple-time-picker';

export default function Routines() {
  // const routine = {
  //   startingTime : {
  //     hour: 0,
  //     minute: 0
  //   },
  //   endingTime: {}
  // };
  NavigationBar.setBackgroundColorAsync(theme.bg);
  const [selectedHours, setSelectedHours] = useState(0);
  const [selectedMinutes, setSelectedMinutes] = useState(0);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text>
          Selected Time: {selectedHours}:{selectedMinutes}
        </Text>
        <TimePicker
          selectedHours={selectedHours}
          selectedMinutes={selectedMinutes}
          onChange={(time) => {
            setSelectedHours(time.hours);
            setSelectedMinutes(time.minutes);
          }}
        />
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