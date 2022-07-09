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

  NavigationBar.setBackgroundColorAsync(theme.c5);
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
      <View style={{...styles.bottomLeft, backgroundColor:theme.c5}}></View>
      <View style={styles.roundedContainer}>

        <View style={styles.moneyContainer}>
          <Text style={styles.moneyTitle}>TOTAL</Text>
          <Text style={styles.money}>{typeof(todayMoney) == "number" ? totalMoney : "NAN"}</Text>
        </View>
        
        <View style={styles.moneyContainer}>
          <View style={{flexDirection:'row', justifyContent:"space-between"}}>
            <Text style={styles.moneyTitle}>TODAY</Text>
            <TouchableOpacity style={styles.refresh} onPress={()=>{newDay()}}><MaterialCommunityIcons color={theme.b0} name="autorenew" size={28} /></TouchableOpacity>
          </View>
          <Text style={styles.money}>{typeof(todayMoney) == "number" ? todayMoney : "NAN"}</Text>
        </View>

        <View style={{paddingHorizontal:10, display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <View style={{width:"7%"}}></View>
          <Text style={{textAlign:"center", fontSize:24, paddingTop:"2%",}}>{typeof(dDay) == "number"? dDay : "Loading..."} day{dDay==1?"":"s"} to go</Text>
          <TouchableOpacity style={{paddingTop:"4%", width:"7%"}} onPress={()=>{reset()}}><AntDesign name="exclamationcircle" size={22} /></TouchableOpacity>
        </View>

        <View style={styles.rects}>
          <TouchableOpacity style={styles.operator} onPress={()=>{isAddMode? setAddMode(false):setAddMode(true)}}><AntDesign name={isAddMode? "plus":"minus"} size={32} /></TouchableOpacity>
          <TouchableOpacity style={styles.rect} onPress={()=>{isAddMode? addMoney(1000) : spendMoney(1000);}}><Text style={styles.rectText}>1</Text></TouchableOpacity>
          <TouchableOpacity style={styles.rect} onPress={()=>{isAddMode? addMoney(5000) : spendMoney(5000);}}><Text style={styles.rectText}>5</Text></TouchableOpacity>
          <TouchableOpacity style={styles.rect} onPress={()=>{isAddMode? addMoney(10000) : spendMoney(10000);}}><Text style={styles.rectText}>10</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
