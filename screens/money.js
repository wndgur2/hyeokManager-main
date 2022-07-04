import React, {useEffect, useState} from "react";
import { Platform, Text, View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../colors';
import styles from '../styles';

export default function Money() {

  const TOTAL_MONEY_STORAGE_KEY = '@total';
  const TODAY_MONEY_STORAGE_KEY = '@today';
  const LAST_DATE_STORAGE_KEY = '@lastDate';

  NavigationBar.setBackgroundColorAsync(theme.bg);
  const [todayMoney, setTodayMoney] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [date, setDate] = useState(0);
  const [dDay, setDDay] = useState(0);
  const [isAddMode, setAddMode] = useState(false);  
  const [isLoading, setLoading] = useState(true);

  const loadData = async () => {
    try{
      const totalStr = await AsyncStorage.getItem(TOTAL_MONEY_STORAGE_KEY);
      const todayStr = await AsyncStorage.getItem(TODAY_MONEY_STORAGE_KEY);
      if(totalStr) setTotalMoney(parseInt(totalStr));
      if(todayStr) setTodayMoney(parseInt(todayStr));
    } catch(e){
      console.log(e);
      console.log('loadDataError');
    }
  };
  
  const saveAsyncStorage = async (toSave, storageKey) => {
    await AsyncStorage.setItem(storageKey, JSON.stringify(toSave));
  };

  useEffect( () => {
    loadData();
    const tempDate = new Date().getDate();
    setDate(tempDate);
    setDDay(25-tempDate > 0 ? 25-tempDate : 55-tempDate);
    setLoading(false);
  }, []);

  const newDay = () =>{
    const tempDate = new Date().getDate();
    setDate(tempDate);
    setDDay(25-tempDate > 0 ? 25-tempDate : 55-tempDate);

    const todayMoney = Math.floor(totalMoney/(dDay*100))*100;
    setTodayMoney(todayMoney);
    saveAsyncStorage(todayMoney, TODAY_MONEY_STORAGE_KEY);
  }

  const addMoney = (adding) => {
    const tmpTotal = totalMoney + adding;
    const tmpToday = todayMoney + adding;

    setTotalMoney(tmpTotal);
    setTodayMoney(tmpToday);
    saveAsyncStorage(tmpTotal, TOTAL_MONEY_STORAGE_KEY);
    saveAsyncStorage(tmpToday, TODAY_MONEY_STORAGE_KEY);
  }

  const spendMoney = (spending) => {
    const tmpTotal = totalMoney - spending;
    const tmpToday = todayMoney - spending;

    setTotalMoney(tmpTotal);
    setTodayMoney(tmpToday);
    saveAsyncStorage(tmpTotal, TOTAL_MONEY_STORAGE_KEY);
    saveAsyncStorage(tmpToday, TODAY_MONEY_STORAGE_KEY);
  }

  const reset = ()=>{
    setTotalMoney(500000);
    saveAsyncStorage(500000, TOTAL_MONEY_STORAGE_KEY);
    newDay();
  }
  
  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal:10, display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
        <View style={{width:"7%"}}></View>
        <Text style={{textAlign:"center", fontSize:30, paddingTop:9,}}>D-{typeof(dDay) == "number"? dDay : "Loading..."}</Text>
        <TouchableOpacity style={{top:20, width:"7%"}} onPress={reset}><AntDesign name="exclamationcircle" size={22} /></TouchableOpacity>
      </View>

      <View style={{paddingTop: "3%",}}>
        <Text style={styles.totalText}>TOTAL</Text>
        <Text style={styles.totalMoney}>{typeof(todayMoney) == "number" ? totalMoney : "NAN"}</Text>
      </View>
      
      <View style= {{paddingVertical:"20%",}}>
        <View style={{ padding:8, flexDirection:'row', justifyContent:"flex-start"}}>
          <Text style={styles.todayText}>TODAY</Text>
          <TouchableOpacity style={{ top:"3%" }} onPress={newDay}><MaterialCommunityIcons color={"white"} name="autorenew" size={32} /></TouchableOpacity>
          <View></View>
        </View>
        <Text style={styles.todayMoney}>{typeof(todayMoney) == "number" ? todayMoney : "NAN"}</Text>
      </View>

      <View style={styles.rects}>
        <View style={styles.operators}>
          <TouchableOpacity onPress={()=>{setAddMode(true)}}><AntDesign name="plus" size={40} style={{top:2, opacity: isAddMode? 1: 0.3}} /></TouchableOpacity>
          <TouchableOpacity onPress={()=>{setAddMode(false)}}><AntDesign name="minus" size={46} style={{top: -2, opacity: isAddMode? 0.3: 1}} /></TouchableOpacity>
        </View>
        <TouchableOpacity style={{...styles.rect, backgroundColor: theme.green}} onPress={()=>{isAddMode? addMoney(1000) : spendMoney(1000);}}><Text style={styles.rectText}>\</Text></TouchableOpacity>
        <TouchableOpacity style={{...styles.rect, backgroundColor: theme.pink}} onPress={()=>{isAddMode? addMoney(5000) : spendMoney(5000);}}><Text style={styles.rectText}>\ \ \ \ \</Text></TouchableOpacity>
        <TouchableOpacity style={{...styles.rect, backgroundColor: theme.red}} onPress={()=>{isAddMode? addMoney(10000) : spendMoney(10000);}}><Text style={styles.rectText}>\ \ \ \ \ \ \ \ \ \</Text></TouchableOpacity>
      </View>
    </View>
  );
}
