import React, {useEffect, useState} from "react";
import { FlatList, Platform, Text, View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../colors';
import styles from '../styles';
import ScreenLayout from "../auth/ScreenLayout";
import Memo from "../components/memo";

export default function Memos() {
  NavigationBar.setBackgroundColorAsync(theme.bg);

  const MEMO_STORAGE_KEY = '@memos_';

  const [isRemoveMode, setRemoveMode] = useState(false);
  const [memos, setMemos] = useState(new Array()); 

  const loadMemos = async () => {
    try{
      const memos_data = await AsyncStorage.getItem(MEMO_STORAGE_KEY);
      if(memos_data) setMemos(JSON.parse(memos_data));
      console.log(memos);
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
    console.log(memos);
  }, []);

  useEffect( () => {
    console.log(memos);
  }, [memos]);

  const addMemo = (newMemo) => {
    console.log("adding");
    console.log(memos);
    var newMemos;
    if(memos.length != 0) newMemos = [...memos, newMemo];
    else newMemos = [newMemo];
    
    setMemos(newMemos);
    saveAsyncStorage(newMemos, MEMO_STORAGE_KEY);
  }

  const removeMemo = (id) => {
    const index = memos.indexOf(memos.filter(memo => memo[0]==id));
    const newMemos = memos.splice(index, 1);
    setMemos(newMemos);
    saveAsyncStorage(newMemos, MEMO_STORAGE_KEY);
    console.log("removed",memos);
  }
  
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);
  const renderMemo = ({ item: memo }) => {
    return (
      <TouchableOpacity onPress={() => removeMemo(memo[0])}>
        <Memo {...memo} />
      </TouchableOpacity>
    )

  };

  return (
    <ScreenLayout>
      <FlatList
        style={{ width: "100%", top:50}}
        data={memos}
        renderItem={renderMemo}
        keyExtractor={(memo) => memo[0]}
      />
      <TouchableOpacity style={{...styles.plus, top: 740}} onPress={()=>{addMemo([new Date().getTime(),"new Memo23"])}}><AntDesign name="plus" size={40} /></TouchableOpacity>
      <TouchableOpacity style={{...styles.minus, top: 740}} onPress={()=>{setRemoveMode( isRemoveMode? false : true)}}><AntDesign name="minus" size={48} style={{ opacity: isRemoveMode? 1: 0.3}} /></TouchableOpacity>
    </ScreenLayout>
  );
}