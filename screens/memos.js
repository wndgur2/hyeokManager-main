import React, {useEffect, useState} from "react";
import { FlatList, Text, View, TouchableOpacity, LayoutAnimation} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AntDesign} from "@expo/vector-icons";
import * as NavigationBar from 'expo-navigation-bar';
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles";
import ActiveMemo from "../components/ActiveMemo";
import InactiveMemo from "../components/InactiveMemo";
import { blacks } from "../colors";

export default function Memos() {
  NavigationBar.setBackgroundColorAsync(blacks[6]);

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
    for(let i=index; i>0; i--){
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
        <ActiveMemo memo={memo} tempMemo={tempMemo} setTempMemo={setTempMemo} memos={memos} clear={clear} finishAdding={finishAdding} />
        :
        <InactiveMemo isRemoveMode={isRemoveMode} removeMemo={removeMemo} memo={memo} editMemo={editMemo} />
        )}
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <View style={{height:"85%"}}>
        <FlatList
          data={memos}
          renderItem={renderMemo}
          keyExtractor={(memo) => memo[0]}
          extraData={memos}
        />
      </View>
      
      <View style={{
        flexDirection:"row",
        justifyContent:"space-between",
        flex:1,
        alignItems:"flex-end",
        paddingVertical:10,
        paddingHorizontal:3,
      }}>
        <TouchableOpacity
          style={styles.memoOperator}
          onPress={()=>{addMemo();}}>
          <AntDesign name="plus" color={blacks[49]} size={28}/>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.memoOperator}
          onPress={()=>{isRemoveMode? setRemoveMode(false):setRemoveMode(true)}}>
          <AntDesign name="minus" size={28} color={isRemoveMode? "red": blacks[49]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}