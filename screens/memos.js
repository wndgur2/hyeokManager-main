import React, {useEffect, useState} from "react";
import { FlatList, Platform, Text, View, TouchableOpacity, LayoutAnimation} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../colors';
import styles from '../styles';
import ScreenLayout from "../auth/ScreenLayout";
import Memo from "../components/memo";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export default function Memos() {
  NavigationBar.setBackgroundColorAsync(theme.bg);

  const MEMO_STORAGE_KEY = '@memos__';

  const [isRemoveMode, setRemoveMode] = useState(false);
  const [memos, setMemos] = useState(new Array());
  const [tempMemo, setTempMemo] = useState();
  const [delettingMemo, setDelettingMemo] = useState();

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
    var newMemos;
    if(memos.length != 0) newMemos = [...memos, newMemo];
    else newMemos = [newMemo];
    
    setMemos(newMemos);
  }

  const editMemo = (memo) => {
    var newMemos = memos;
    newMemos.forEach(mem => mem[2] = false);
    newMemos[memos.indexOf(memo)][2] = true;
    setMemos(newMemos);
    setTempMemo(memo[1]);
  }

  const removeMemo = (memo) => {
    setDelettingMemo(memo[0]);
    const index = memos.indexOf(memo);
    var newMemos = memos;
    newMemos.splice(index, 1);
    saveAsyncStorage(newMemos, MEMO_STORAGE_KEY);
    setMemos(newMemos);
  }

  const finishAdding = (index) => {
    if(tempMemo==""){
      removeMemo(memos[index]);
    } else{
      var newMemos = memos;
      newMemos[index][1] = tempMemo;
      newMemos[index][2] = false;
      setTempMemo("");
      setMemos(newMemos);
      saveAsyncStorage(newMemos, MEMO_STORAGE_KEY);
    }
  }
  
  const renderMemo = ({ item: memo }) => {
    return (
      <TouchableOpacity 
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            editMemo(memo);
          }}
      >
      {(memo[2]?
        <View style={{backgroundColor: theme.darkBg, flexDirection:"row", justifyContent:"space-between", width:"90%"}}>
          <TextInput style={{fontSize:30}}
          multiline={true}
          placeholder="input text."
          returnKeyType="done"
          value={tempMemo}
          onSubmitEditing={() => finishAdding(memos.indexOf(memo))}
          onChangeText={(text) => setTempMemo(text)}
          />
          <TouchableOpacity style={{alignItems: 'flex-end', backgroundColor:"red", justifyContent:"center"}} onPress={()=>{removeMemo(memo)}}><Ionicons name={"close-outline"} color={"white"} size={42}/></TouchableOpacity>
        </View> :
        <Text style={{fontSize:30}} numberOfLines={1}>{memo[1]}</Text>
      )}
      </TouchableOpacity>
    )

  };

  return (
    <ScreenLayout>
      <FlatList
        style={{ width: "100%", top:50}}
        data={memos}
        extraData={delettingMemo}
        renderItem={renderMemo}
        keyExtractor={(memo) => memo[0]}
      />
      <TouchableOpacity style={{...styles.plus, top: 740}} onPress={()=>{addMemo([new Date().getTime(),"", true])}}><AntDesign name="plus" size={40}/></TouchableOpacity>
    </ScreenLayout>
  );
}