import React, {useEffect, useRef, useState} from "react";
import { Platform, Text, View, TouchableOpacity, FlatList, LayoutAnimation} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import { blacks } from '../colors';
import styles from '../styles';
import Title from "../components/Title";
import Bill from "../components/Bill";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import PaymentInput from "../components/PaymentInput";

export default function Money() {

  const TOTAL_MONEY_STORAGE_KEY = '@total';
  const TODAY_MONEY_STORAGE_KEY = '@today';
  const LAST_DATE_STORAGE_KEY = '@lastDate';
  const EXPENSES_STORAGE_KEY = '@expenses';
  const PAYMENT_STORAGE_KEY = "@payment";
  const PAYDAY_STORAGE_KEY = "@payTerm";

  NavigationBar.setBackgroundColorAsync(blacks[3]);
  const [todayMoney, setTodayMoney] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [date, setDate] = useState(0);
  const [dDay, setDDay] = useState(0);
  const [isAddMode, setAddMode] = useState(false);  
  const [expenses, setExpenses] = useState([]);
  const [payment, setPayment] = useState(0);
  const [payday, setPayday] = useState(1);
  const [isEdittingPayment, setEdittingPayment] = useState(false);
  const [newPayment, setNewPayment] = useState("");
  const [newPayday, setNewPayday] = useState("");

  const expenseFlist = useRef();

  const loadData = async () => {
    try{
      const totalStr = await AsyncStorage.getItem(TOTAL_MONEY_STORAGE_KEY);
      const todayStr = await AsyncStorage.getItem(TODAY_MONEY_STORAGE_KEY);
      const tExpenses = await AsyncStorage.getItem(EXPENSES_STORAGE_KEY);
      const tPayment = await AsyncStorage.getItem(PAYMENT_STORAGE_KEY);
      const tPayday = await AsyncStorage.getItem(PAYDAY_STORAGE_KEY);

      if(totalStr) setTotalMoney(parseInt(totalStr));
      if(todayStr) setTodayMoney(parseInt(todayStr));
      if(tExpenses) setExpenses(JSON.parse(tExpenses));
      if(tPayment) setPayment(parseInt(tPayment));
      if(tPayday) setPayday(parseInt(tPayday));
    } catch(e){
      console.log(e);
      console.log('loadDataError');
    }
  };
  
  const saveAsyncStorage = async (toSave, storageKey) => {
    await AsyncStorage.setItem(storageKey, JSON.stringify(toSave));
  };

  const getDays = (year, month) => { return new Date(year, month, 0). getDate(); };

  useEffect( () => {
    loadData();
    const tempDate = new Date().getDate();
    const daysInMonth = getDays(new Date().getFullYear(), new Date().getMonth());

    setDate(tempDate);
    setDDay(payday-tempDate > 0 ? payday - tempDate : payday + daysInMonth - tempDate);
  }, []);

  const newDay = () =>{
    const tempDate = new Date().getDate();
    const daysInMonth = getDays(new Date().getFullYear(), new Date().getMonth());

    setDate(tempDate);
    setDDay(payday-tempDate > 0 ? payday - tempDate : payday + daysInMonth - tempDate);

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

  const reset = ()=>{
    setTotalMoney(payment);
    saveAsyncStorage(payment, TOTAL_MONEY_STORAGE_KEY);
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

  const startEditting = () =>{
    setNewPayday(payday.toString());
    setNewPayment(payment.toString());
    setEdittingPayment(true);
  }

  const finishEditting = () =>{
    setEdittingPayment(false);

    const intNewPayment = parseInt(newPayment);
    setPayment(intNewPayment);
    saveAsyncStorage(intNewPayment, PAYMENT_STORAGE_KEY);

    const intNewPayday = parseInt(newPayday);
    if(intNewPayday<32 && intNewPayday>0){
      setPayday(intNewPayday);
      saveAsyncStorage(intNewPayday, PAYDAY_STORAGE_KEY);
}

    const daysInMonth = getDays(new Date().getFullYear(), new Date().getMonth());
    setDDay(intNewPayday-date > 0 ? intNewPayday - date : intNewPayday + daysInMonth - date);
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={{
          paddingHorizontal:20,
          flexDirection:"row",
          justifyContent:"space-evenly",
        }}>
          <Text style={{
            fontSize:18,
            color:blacks[49],
            textAlignVertical:"center"
          }}>
            {typeof(dDay) == "number"? dDay : "Loading..."} day{dDay==1?"":"s"} left
          </Text>
          <TouchableOpacity style={styles.button} onPress={()=>{reset()}}>
            <Text style={styles.button}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{...styles.section, flexDirection:"row", justifyContent:"space-evenly", 
    backgroundColor: blacks[3],}}>
        <View>
          <Text style={styles.moneyTitle}>TOTAL</Text>
          <Text style={styles.money}>{typeof(todayMoney) == "number" ? totalMoney : "NAN"}</Text>
        </View>

        <View>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.moneyTitle}>TODAY</Text>
            <TouchableOpacity style={styles.refresh} onPress={()=>{newDay()}}><MaterialCommunityIcons color={blacks[40]} name="autorenew" size={24} /></TouchableOpacity>
          </View>
          <Text style={styles.money}>{typeof(todayMoney) == "number" ? todayMoney : "NAN"}</Text>
        </View>
      </View>

      <View style={styles.rects}>
        <TouchableOpacity style={{...styles.rect, backgroundColor:blacks[10]}} onPress={()=>{isAddMode? setAddMode(false):setAddMode(true)}}><Text style={{fontSize:18, color:blacks[49], textAlignVertical:"bottom"}}>{isAddMode? "ADD":"SPEND"}</Text></TouchableOpacity>
        <TouchableOpacity style={styles.rect} onPress={()=>{isAddMode? fixMoney(1000) : fixMoney(-1000);}}><Text style={styles.rectText}>1</Text></TouchableOpacity>
        <TouchableOpacity style={styles.rect} onPress={()=>{isAddMode? fixMoney(5000) : fixMoney(-5000);}}><Text style={styles.rectText}>5</Text></TouchableOpacity>
        <TouchableOpacity style={styles.rect} onPress={()=>{isAddMode? fixMoney(10000) : fixMoney(-10000);}}><Text style={styles.rectText}>10</Text></TouchableOpacity>
      </View>

      <FlatList
        style={{
          minHeight:0,
          maxHeight:400,
          backgroundColor:blacks[5],
        }}
        data={[...expenses].reverse()}
        renderItem={renderExpense}
        keyExtractor={(expense) => expense[2]}
        extraData={expenses}
        ref={expenseFlist}
      />

      <TouchableOpacity onPress={()=>{deleteExpesnses();}} style={{alignItems:"center", alignSelf:"center", width:"40%"}}>
        <Text style={{
          fontSize:14,
          marginTop:10,
          padding:10,
          backgroundColor:blacks[10],
          color:blacks[49],
          textAlign:"center",
          width:"100%",
          }}>Delete all records</Text>
      </TouchableOpacity>
    </View>
  );
}
