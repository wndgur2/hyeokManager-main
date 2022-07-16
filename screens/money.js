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
  const PAYDAY_STORAGE_KEY = "@payDay";
  const PAID_STORAGE_KEY = "@paid";

  NavigationBar.setBackgroundColorAsync(blacks[6]);
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
  const [isPaid, setPaid] = useState(false);

  const expenseFlist = useRef();

  const loadData = async () => {
    try{
      const totalStr = parseInt(await AsyncStorage.getItem(TOTAL_MONEY_STORAGE_KEY));
      const todayStr = parseInt(await AsyncStorage.getItem(TODAY_MONEY_STORAGE_KEY));
      const tExpenses = JSON.parse(await AsyncStorage.getItem(EXPENSES_STORAGE_KEY));
      const tPayment = parseInt(await AsyncStorage.getItem(PAYMENT_STORAGE_KEY));
      const tPayday = parseInt(await AsyncStorage.getItem(PAYDAY_STORAGE_KEY));
      const tPaid = (await AsyncStorage.getItem(PAID_STORAGE_KEY)=="true"? true:false);

      if(totalStr) setTotalMoney(totalStr);
      if(todayStr) setTodayMoney(todayStr);
      if(tExpenses) setExpenses(tExpenses);
      if(tPayment) setPayment(tPayment);
      if(tPayday) setPayday(tPayday);
      if(tPaid) setPaid(tPaid);

      const tempDate = new Date().getDate();
      if((tempDate!=tPayday) && tPaid){
        setPaid(false);
        saveAsyncStorage(false, PAID_STORAGE_KEY);
      }
      if((tempDate==tPayday) && (!tPaid)){
        fixMoney(tPayment);
        setPaid(true);
        saveAsyncStorage(true, PAID_STORAGE_KEY);
        console.log("Paid");
      }
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
    setDDay(payday-tempDate > 0 ? payday - tempDate : payday==tempDate? 0 : payday + daysInMonth - tempDate);
  }, []);

  const newDay = () =>{
    const tempDate = new Date().getDate();
    const daysInMonth = getDays(new Date().getFullYear(), new Date().getMonth());

    setDate(tempDate);
    setDDay(payday-tempDate > 0 ? payday - tempDate : payday==tempDate? 0 : payday + daysInMonth - tempDate);

    var tmpTodayMoney;
    if(dDay==0){
      tmpTodayMoney = totalMoney;
    } else{
      tmpTodayMoney = Math.floor(totalMoney/(dDay*100))*100;
    }
    setTodayMoney(tmpTodayMoney);
    saveAsyncStorage(tmpTodayMoney, TODAY_MONEY_STORAGE_KEY);
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
      <View style={{flexDirection:"row", width:"100%", justifyContent:"center"}}>
        <Text style={{color:blacks[49], textAlignVertical:"center"}}>매월 </Text>
        {isEdittingPayment? 
        <TextInput
          style={{color:blacks[50], fontSize:17, backgroundColor:blacks[7],}}
          blurOnSubmit={true}
          value={newPayday}
          onSubmitEditing={() => {
            setNewPayday(newPayday);
          }}
          onChangeText={(text) => setNewPayday(text)}
        /> :
        <Text style={{fontSize:16, color:blacks[49], textAlignVertical:"center"}}>
          {payday}
        </Text>
        }
        <Text style={{color:blacks[49], textAlignVertical:"center"}}> 일  </Text>
        {isEdittingPayment? 
        <TextInput
          style={{color:blacks[50], fontSize:17, backgroundColor:blacks[7],}}
          blurOnSubmit={true}
          value={newPayment}
          onSubmitEditing={() => {
            setNewPayment(newPayment);
          }}
          onChangeText={(text) => setNewPayment(text)}
        /> :
        <Text style={{fontSize:16, color:blacks[49], textAlignVertical:"center"}}>
          {payment}
        </Text>
        }
        <Text style={{color:blacks[49], textAlignVertical:"center"}}> 원 지급 </Text>
        <TouchableOpacity style={{justifyContent:"center"}} onPress={()=>{isEdittingPayment? finishEditting():startEditting()}}>
          <Ionicons name={isEdittingPayment? "checkmark": "create-outline"} size={16} color={isEdittingPayment? "lightgreen" : blacks[49]}></Ionicons>
        </TouchableOpacity>
      </View>
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
            {dDay==0? "HoOraY!" : (dDay==1? (dDay+" day left"):(dDay+" days left"))}
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
        <TouchableOpacity style={{...styles.rect, backgroundColor:isAddMode? blacks[11]:blacks[7]}} onPress={()=>{isAddMode? setAddMode(false):setAddMode(true)}}><Text style={{fontSize:18, color:blacks[49], textAlignVertical:"bottom"}}>{isAddMode? "ADD":"SPEND"}</Text></TouchableOpacity>
        <TouchableOpacity style={styles.rect} onPress={()=>{isAddMode? fixMoney(1000) : fixMoney(-1000);}}><Text style={styles.rectText}>1</Text></TouchableOpacity>
        <TouchableOpacity style={styles.rect} onPress={()=>{isAddMode? fixMoney(5000) : fixMoney(-5000);}}><Text style={styles.rectText}>5</Text></TouchableOpacity>
        <TouchableOpacity style={styles.rect} onPress={()=>{isAddMode? fixMoney(10000) : fixMoney(-10000);}}><Text style={styles.rectText}>10</Text></TouchableOpacity>
      </View>

      <FlatList
        style={{
          minHeight:0,
          maxHeight:450,
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
