import React, {useEffect, useState} from "react";
import { FlatList, Platform, Text, View, TouchableOpacity, LayoutAnimation, UIManager} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AntDesign} from "@expo/vector-icons";
import * as NavigationBar from 'expo-navigation-bar';
import { theme } from '../colors';
import ScreenLayout from "../auth/ScreenLayout";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles";
import Title from "../components/Title";

export default function Memos() {
  NavigationBar.setBackgroundColorAsync(theme.c5);

  const MEMO_STORAGE_KEY = '@memos__';

  const [memos, setMemos] = useState(new Array());
  const [tempMemo, setTempMemo] = useState();
  const [delettingMemo, setDelettingMemo] = useState();
  const [editingMemo, setEditingMemo] = useState();
  const [isRemoveMode, setRemoveMode] = useState(false);


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
  }, [memos]);

  const clear = () =>{
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setRemoveMode(false);

    var newMemos = memos;
    newMemos.forEach(mem =>{
      if(mem[1]=="")
        newMemos.splice(newMemos.findIndex(m=>m[0] == mem[0]), 1);
      else mem[2] = false;
    });
    setMemos(newMemos);
    setTempMemo("");
    saveAsyncStorage(newMemos, MEMO_STORAGE_KEY);
  }

  const addMemo = () => {
    clear();
    var newMemos = memos;
    const newMemo = [new Date().getTime(),"", true];
    if(memos.length != 0) newMemos = [...memos, newMemo];
    else newMemos = [newMemo];

    const index = newMemos.findIndex(m=>m[0]==newMemo[0]);

    for(let i=index; i>0; i--)
      newMemos[i] = newMemos[i-1];
      
    newMemos[0] = newMemo;
    newMemos[0][2] = true;
    setMemos(newMemos);
    setTempMemo(newMemo[1]);
    saveAsyncStorage(newMemos, MEMO_STORAGE_KEY);
  }

  const editMemo = (memo) => {
    clear();
    setEditingMemo(memo[0]);
    var newMemos = memos;
    const index = newMemos.findIndex(m=>m[0]==memo[0]);
    console.log(index);
    for(let i=index; i>0; i--){
      console.log("i=", i);
      newMemos[i] = newMemos[i-1];
    }
    newMemos[0] = memo;
    newMemos[0][2] = true;
    setMemos(newMemos);
    setTempMemo(memo[1]);
    saveAsyncStorage(newMemos, MEMO_STORAGE_KEY);
  }

  const removeMemo = (memo) => {
    var newMemos = memos;
    const index = newMemos.findIndex(m=>m[0]==memo[0])
    setDelettingMemo(newMemos[index][0]);
    newMemos.splice(index, 1);
    saveAsyncStorage(newMemos, MEMO_STORAGE_KEY);
    setMemos(newMemos);
  }

  const finishAdding = (index) => {
      var newMemos = memos;
      newMemos[index][1] = tempMemo;
      setMemos(newMemos);
      clear();
      saveAsyncStorage(newMemos, MEMO_STORAGE_KEY);
  }

  const deleteAllMemos = () => {
    clear();
    const newMemos = [];
    setMemos(newMemos);
    setRemoveMode(false);
    saveAsyncStorage(newMemos, MEMO_STORAGE_KEY);
  }
  
  const renderMemo = ({ item: memo }) => {
    return (
      <View style={{alignItems:"center", width:"100%"}}>{(memo[2]?
        <View style={{paddingHorizontal:10, margin:10, width:"90%", backgroundColor:theme.b0}}>
          <TextInput
            style={{fontSize:22, margin:3, padding:10, width:"90%", letterSpacing:1, lineHeight:36}}
            multiline={true}
            placeholder="무슨 메모를 하시렵니까?"
            blurOnSubmit={true}
            value={tempMemo}
            onSubmitEditing={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              finishAdding(memos.findIndex(m=>m[0]==memo[0]))
            }}
            onChangeText={(text) => setTempMemo(text)}
            autoFocus={true}
            onBlur={()=>{
              clear();
            }}
          />
        </View> 
        :
        <TouchableOpacity 
          style={{
            padding:5,
          }}
          
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            isRemoveMode?removeMemo(memo):editMemo(memo);
          }}>
          <Text style={{
              paddingVertical:5,
              paddingHorizontal:15,
              fontSize:20,
              lineHeight:32,
              letterSpacing:-1,
              backgroundColor:theme.c1_2,
            }} numberOfLines={1}>{memo[1]}</Text>
        </TouchableOpacity>
        )}
      </View>
    )
  };

  return (
    <ScreenLayout>
      <View style={{...styles.bottomLeft, backgroundColor:theme.c4}}></View>
      <View style={styles.roundedContainer}>
        <Title>memos</Title>
        <View style={{maxHeight:"90%"}}>
          <FlatList
            data={memos}
            renderItem={renderMemo}
            keyExtractor={(memo) => memo[0]}
            extraData={memos}
          />
        </View>
        
        <View style={{...styles.rects,
          backgroundColor:theme.c4,
          padding:3,
          marginTop:10,
        }}>
          <TouchableOpacity
            onPress={()=>{addMemo();}}>
            <AntDesign name="plus" color={theme.c5} size={32}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>{isRemoveMode? setRemoveMode(false):setRemoveMode(true)}}>
            <AntDesign name="minus" size={32} color={isRemoveMode? theme.c3: theme.c5} />
          </TouchableOpacity>
        </View>
      </View>
    </ScreenLayout>
  );
}