import React, {useEffect, useRef, useState} from "react";
import { FlatList, Platform, Text, View, TouchableOpacity, LayoutAnimation, KeyboardAvoidingView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../colors';
import memoStyles from '../memoStyles';
import ScreenLayout from "../auth/ScreenLayout";
import Memo from "../components/memo";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export default function Memos() {
  NavigationBar.setBackgroundColorAsync(theme.bg);

  const MEMO_STORAGE_KEY = '@memos__';

  const [isRemoveMode, setRemoveMode] = useState(false);
  const [memos, setMemos] = useState(new Array());
  const [tempMemo, setTempMemo] = useState();
  const [delettingMemo, setDelettingMemo] = useState();
  const [isAlerted, setAlerted] = useState(false);

  const flatList = useRef();

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

  const clear = () =>{
    setAlerted(false);

    var newMemos = memos;
    newMemos.forEach(mem =>{
      if(mem[1]==""){
        newMemos.splice(newMemos.indexOf(mem), 1);
      }
      mem[2] = false;
    });
    setMemos(newMemos);
    setTempMemo("");
    saveAsyncStorage(newMemos, MEMO_STORAGE_KEY);
  }

  const addMemo = (newMemo) => {
    clear();
    var newMemos = memos;
    if(memos.length != 0) newMemos = [...memos, newMemo];
    else newMemos = [newMemo];
    setMemos(newMemos);
    saveAsyncStorage(newMemos, MEMO_STORAGE_KEY);
  }

  const editMemo = (memo) => {
    clear();
    var newMemos = memos;
    newMemos[newMemos.indexOf(memo)][2] = true;
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
    setAlerted(false);
    saveAsyncStorage(newMemos, MEMO_STORAGE_KEY);
  }
  
  const renderMemo = ({ item: memo }) => {
    return (
      <TouchableOpacity 
        style={{padding:5}}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          editMemo(memo);
        }}
      >
      {(memo[2]?
        <View style={{left:-5, margin:0, padding:0, backgroundColor: theme.pink, flexDirection:"row", justifyContent:"space-between", width:"100%"}}>
          <TextInput
            style={{fontSize:26, margin:5, padding:0, width:"90%", letterSpacing:1, lineHeight:36}}
            multiline={true}
            placeholder="input text."
            returnKeyType="done"
            value={tempMemo}
            onSubmitEditing={() => finishAdding(memos.indexOf(memo))}
            onChangeText={(text) => setTempMemo(text)}
            autoFocus={true}
          />
          <TouchableOpacity style={{alignItems: 'flex-end', backgroundColor:theme.red, justifyContent:"center", width:"10%"}} onPress={()=>{removeMemo(memo)}}><Ionicons name={"close-outline"} color={"white"} size={42}/></TouchableOpacity>
        </View> :
        <Text style={{fontSize:24, letterSpacing:-2}} numberOfLines={1}>{memo[1]}</Text>
      )}
      </TouchableOpacity>
    )
  };

  return (
    <ScreenLayout>
      <View style={{ backgroundColor:theme.darkBg , paddingTop:20, paddingBottom:12}}><Text style={{fontSize:32, textAlign:"center", color:theme.pink}}>MEMOS</Text></View>
      <View style={{height:"83%"}}>
        <KeyboardAvoidingView
          style={{ flex: 1}}
          behavior="padding"
          keyboardVerticalOffset={-100}
        >
          <ScrollView
            nestedScrollEnabled={true}
          >
            <FlatList
              inverted={false}
              ref={flatList}
              data={memos}
              renderItem={renderMemo}
              keyExtractor={(memo) => memo[0]}
              extraData={delettingMemo}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      <View style={{flex:1, bottom:30, left:2, zIndex:2, flexDirection:"row", justifyContent:"space-between", backgroundColor:theme.bg, paddingHorizontal:13, alignItems:"center"}}>
        <TouchableOpacity style={memoStyles.plus} onPress={()=>{addMemo([new Date().getTime(),"", true]);}}><AntDesign name="plus" size={40}/></TouchableOpacity>
        {isAlerted? <Text style={{color:"red", fontSize:20, letterSpacing:-1.5, top:7}}>Press Again to DELETE ALL MEMOS</Text>:<View></View>}
        <TouchableOpacity onPress={()=>{isAlerted? deleteAllMemos():setAlerted(true)}}><AntDesign name="minus" size={44} color={isAlerted? "red": "black"} /></TouchableOpacity>
      </View>
    </ScreenLayout>
  );
}