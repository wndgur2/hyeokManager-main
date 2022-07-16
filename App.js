import { Platform, StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert, StatusBar, LayoutAnimation } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { blacks } from './colors';
import * as NavigationBar from 'expo-navigation-bar';
import React, {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AntDesign, Feather, MaterialCommunityIcons} from "@expo/vector-icons";
import TabsNav from './navigations/TabsNav';
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';
import styles from './styles';

const Stack = createStackNavigator();

export default function App() {
  NavigationBar.setBackgroundColorAsync(blacks[6]);  
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={blacks[3]} barStyle="light-content" />
      <Stack.Navigator screenOptions={{presentation:"card", headerShown:false}}>
        <Stack.Screen name="Tabs" component={TabsNav}/>
      </Stack.Navigator>

    </NavigationContainer>
  );
}
