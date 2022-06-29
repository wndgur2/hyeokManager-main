import { StatusBar } from 'expo-status-bar';
import { Platform, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { theme } from '../colors';
import * as NavigationBar from 'expo-navigation-bar';
import React, {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AntDesign, Feather, MaterialCommunityIcons} from "@expo/vector-icons";
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
      <Text style={{textAlign:"center", fontSize:30, paddingTop:39,}}>D-{typeof(dDay) == "number"? dDay : "Loading..."}</Text>

      <TouchableOpacity style={styles.reset} onPress={reset}><AntDesign name="exclamationcircle" size={22} /></TouchableOpacity>

      <View style={{...styles.moneyContainer, marginTop: "3%",}}>
        <Text style={styles.totalText}>TOTAL</Text>
        <Text style={styles.totalMoney}>{typeof(todayMoney) == "number" ? totalMoney : "NAN"}</Text>
      </View>
      
      <View style={styles.today}>
        <TouchableOpacity onPress={newDay}><MaterialCommunityIcons color={"white"} name="autorenew" size={36} /></TouchableOpacity>
      </View>

      <View style={styles.moneyContainer}>
        <Text style={styles.todayText}>TODAY</Text>
        <Text style={styles.todayMoney}>{typeof(todayMoney) == "number" ? todayMoney : "NAN"}</Text>
      </View>

      <TouchableOpacity style={{...styles.plus}} onPress={()=>{setAddMode(true)}}><AntDesign name="plus" size={40} style={{opacity: isAddMode? 1: 0.3}} /></TouchableOpacity>
      <TouchableOpacity style={styles.minus} onPress={()=>{setAddMode(false)}}><AntDesign name="minus" size={48} style={{opacity: isAddMode? 0.3: 1}} /></TouchableOpacity>
      <View style={styles.rects}>
        <TouchableOpacity style={{...styles.rect, backgroundColor: theme.green}} onPress={()=>{isAddMode? addMoney(1000) : spendMoney(1000);}}><Text style={styles.rectText}>\</Text></TouchableOpacity>
        <TouchableOpacity style={{...styles.rect, backgroundColor: theme.pink}} onPress={()=>{isAddMode? addMoney(5000) : spendMoney(5000);}}><Text style={styles.rectText}>\ \ \ \ \</Text></TouchableOpacity>
        <TouchableOpacity style={{...styles.rect, backgroundColor: theme.red}} onPress={()=>{isAddMode? addMoney(10000) : spendMoney(10000);}}><Text style={styles.rectText}>\ \ \ \ \ \ \ \ \ \</Text></TouchableOpacity>
      </View>
    </View>
  );
}
