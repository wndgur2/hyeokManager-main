import { StatusBar } from 'expo-status-bar';
import { Platform, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { theme } from '../colors';
import * as NavigationBar from 'expo-navigation-bar';
import React, {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";
import styles from '../styles';

export default function Memo() {
  NavigationBar.setBackgroundColorAsync(theme.bg);

  const MEMO_STORAGE_KEY = '@memo';

  const [isAddMode, setAddMode] = useState(false);
  const [memos, setMemos] = useState([]); 

  const loadMemos = async () => {
    try{
      const memos_data = await AsyncStorage.getItem(MEMO_STORAGE_KEY);
      if(memos_data) setMemos(JSON.parse(memos_data));
    } catch(e){
      console.log(e);
      console.log('loadMemosError');
    }
  };
  
  const saveAsyncStorage = async (toSave, storageKey) => {
    await AsyncStorage.setItem(storageKey, JSON.stringify(toSave));
  };

  useEffect( () => {
    loadMemos();
  }, []);

  const addMemo = (adding) => {
    const newMemo = adding;
    const newMemos = {...memos, newMemo};
    setMemos(newMemos);
    saveAsyncStorage(newMemos, MEMO_STORAGE_KEY);
  }

  const deleteMemo = (deleting) => {
    const newMemos = [...memos.splice(memos.indexOf(deleting), 1)];
    setMemos(newMemos);
    saveAsyncStorage(newMemos, MEMO_STORAGE_KEY);
  }
  
  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={{...styles.plus, top: 740}} onPress={()=>{setAddMode(true)}}><AntDesign name="plus" size={40} /></TouchableOpacity>
      <TouchableOpacity style={{...styles.minus, top: 740}} onPress={()=>{setAddMode(false)}}><AntDesign name="minus" size={48} /></TouchableOpacity>
    </View>
  );
}