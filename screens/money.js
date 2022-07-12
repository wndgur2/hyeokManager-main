import React, {useEffect, useRef, useState} from "react";
import { Platform, Text, View, TouchableOpacity, FlatList, LayoutAnimation} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../colors';
import styles from '../styles';
import Title from "../components/Title";
import Bill from "../components/Bill";

export default function Money() {

  const TOTAL_MONEY_STORAGE_KEY = '@total';
  const TODAY_MONEY_STORAGE_KEY = '@today';
  const LAST_DATE_STORAGE_KEY = '@lastDate';
  const EXPENSES_STORAGE_KEY = '@expenses';

  NavigationBar.setBackgroundColorAsync(theme.c5);
  const [todayMoney, setTodayMoney] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [date, setDate] = useState(0);
  const [dDay, setDDay] = useState(0);
  const [isAddMode, setAddMode] = useState(false);  
  const [isLoading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState([]);

  const expenseFlist = useRef();

  const loadData = async () => {
    try{
      const totalStr = await AsyncStorage.getItem(TOTAL_MONEY_STORAGE_KEY);
      const todayStr = await AsyncStorage.getItem(TODAY_MONEY_STORAGE_KEY);
      const tExpenses = await AsyncStorage.getItem(EXPENSES_STORAGE_KEY);
      if(totalStr) setTotalMoney(parseInt(totalStr));
      if(todayStr) setTodayMoney(parseInt(todayStr));
      if(tExpenses) setExpenses(JSON.parse(tExpenses));
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

  const fixMoney = (fix) => {
    const tmpTotal = totalMoney + fix;
    const tmpToday = todayMoney + fix;

    setTotalMoney(tmpTotal);
    setTodayMoney(tmpToday);
    saveAsyncStorage(tmpTotal, TOTAL_MONEY_STORAGE_KEY);
    saveAsyncStorage(tmpToday, TODAY_MONEY_STORAGE_KEY);

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const date = new Date();
    const tExpenses = [...expenses, [fix>0?"+"+fix:fix, date.toString().split(' '), date.getTime()]];
    setExpenses(tExpenses);
    saveAsyncStorage(tExpenses, EXPENSES_STORAGE_KEY);

    expenseFlist.current.scrollToOffset({ animated: true, offset: 0 });
  }

  console.log("expenses:", expenses);

  const reset = ()=>{
    setTotalMoney(500000);
    saveAsyncStorage(500000, TOTAL_MONEY_STORAGE_KEY);
    newDay();
    setExpenses([]);
    saveAsyncStorage([], EXPENSES_STORAGE_KEY);
  }

  const deleteExpesnses = async() =>{
    setExpenses([]);
    saveAsyncStorage([], EXPENSES_STORAGE_KEY);
  }

  const renderExpense = ({ item: expense }) =>{
    return (
      <Bill key={expense[2]} cost={expense[0]} time={expense[1]} />
    )
  }
  
  return (
    <View style={styles.container}>
      <View style={{...styles.bottomLeft, backgroundColor:theme.c5}}></View>
      <View style={styles.roundedContainer}>
        <Title>finance</Title>
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
          <Text style={{textAlign:"center", fontSize:24, paddingVertical:"2%",}}>{typeof(dDay) == "number"? dDay : "Loading..."} day{dDay==1?"":"s"} to go</Text>
          <TouchableOpacity style={{paddingTop:"4%", width:"7%"}} onPress={()=>{reset()}}><AntDesign name="exclamationcircle" size={22} /></TouchableOpacity>
        </View>

        <View
          style={{
            maxHeight:"50%",
            overflow:"hidden",
            backgroundColor:theme.c0,
            }}
        >
          <FlatList
            data={[...expenses].reverse()}
            renderItem={renderExpense}
            keyExtractor={(expense) => expense[2]}
            extraData={expenses}
            ref={expenseFlist}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <TouchableOpacity onPress={()=>{deleteExpesnses();}} style={{alignItems:"center"}}>
          <Text style={{
            fontSize:16,
            marginTop:14,
            padding:10,
            borderRadius:25,
            backgroundColor:theme.c5,
            color:theme.b0,
            textAlign:"center",
            width:"50%",
            }}>Delete all records</Text>
        </TouchableOpacity>

        <View style={styles.rects}>
          <TouchableOpacity style={{...styles.rect, backgroundColor:theme.c4_3}} onPress={()=>{isAddMode? setAddMode(false):setAddMode(true)}}><AntDesign color={theme.b0} name={isAddMode? "plus":"minus"} size={32} /></TouchableOpacity>
          <TouchableOpacity style={styles.rect} onPress={()=>{isAddMode? fixMoney(1000) : fixMoney(-1000);}}><Text style={styles.rectText}>1</Text></TouchableOpacity>
          <TouchableOpacity style={styles.rect} onPress={()=>{isAddMode? fixMoney(5000) : fixMoney(-5000);}}><Text style={styles.rectText}>5</Text></TouchableOpacity>
          <TouchableOpacity style={styles.rect} onPress={()=>{isAddMode? fixMoney(10000) : fixMoney(-10000);}}><Text style={styles.rectText}>10</Text></TouchableOpacity>
        </View>
        <View style={{
          position:"absolute",
          width: "87%",
          backgroundColor:theme.c0,
          bottom:0,
          right:"13%",
          height:"3%",
          zIndex: -1,
          borderBottomLeftRadius:25,
          borderBottomRightRadius:25,
        }} />
        <View style={{
          position:"absolute",
          width: "10%",
          backgroundColor:theme.c4,
          bottom:0,
          right:"13%",
          height:"3%",
          zIndex: -2,
        }} />
      </View>
    </View>
  );
}
