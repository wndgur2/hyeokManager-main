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
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export default function Money() {

  const TOTAL_MONEY_STORAGE_KEY = '@total';
  const TODAY_MONEY_STORAGE_KEY = '@today';
  const LAST_DATE_STORAGE_KEY = '@lastDate';
  const EXPENSES_STORAGE_KEY = '@expenses';
  const PAYMENT_STORAGE_KEY = "@payment";
  const PAYDAY_STORAGE_KEY = "@payTerm";

  NavigationBar.setBackgroundColorAsync(theme.c5);
  const [todayMoney, setTodayMoney] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [date, setDate] = useState(0);
  const [dDay, setDDay] = useState(0);
  const [isAddMode, setAddMode] = useState(false);  
  const [isLoading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const [payment, setPayment] = useState(0);
  const [payday, setPayday] = useState(1);
  const [isEdittingPayment, setEdittingPayment] = useState(false);

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
      <View style={styles.roundedContainer}>
        <Title>finance</Title>

        <ScrollView nestedScrollEnabled>

          <View style={{backgroundColor:theme.c0_2}}>
            <View style={{
              paddingHorizontal:10,
              flexDirection:"row",
              justifyContent:"space-between",
            }}>
              <Text style={{
                fontSize:18,
                paddingVertical:"2%",
                color:theme.c5,
                textAlignVertical:"center"
              }}>
                {typeof(dDay) == "number"? dDay : "Loading..."} day{dDay==1?"":"s"} left
              </Text>
              <TouchableOpacity style={{
                justifyContent:"center",
                backgroundColor:theme.c4_3,
                paddingVertical:10,
              }} onPress={()=>{reset()}}>
                <Text style={{color:theme.b0, padding:5}}>Reset</Text>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection:"row", width:"100%", justifyContent:"center"}}>
              <View style={{flexDirection:"row", justifyContent:"space-around", padding:10, alignItems:"center"}}>
                <Text>매월 </Text>
                {isEdittingPayment? 
                <TextInput
                  blurOnSubmit={true}
                  value={payday.toString()}
                  onSubmitEditing={() => {
                    setPayday(payday);
                    saveAsyncStorage(payday, PAYDAY_STORAGE_KEY);
                  }}
                  onChangeText={(text) => setPayday(parseInt(text))}
                  placeholder={payday.toString()}
                /> :
                <Text>
                  {payday}
                </Text>
                }
                <Text> 일  </Text>
                {isEdittingPayment? 
                <TextInput
                  blurOnSubmit={true}
                  value={payment.toString()}
                  onSubmitEditing={() => {
                    setPayment(payment);
                    saveAsyncStorage(payment, PAYMENT_STORAGE_KEY);
                  }}
                  onChangeText={(text) => setPayment(parseInt(text))}
                  placeholder={payment.toString()}
                /> :
                <Text>
                  {payment}
                </Text>
                }
                <Text> 원 지급</Text>
              </View>
              <TouchableOpacity onPress={()=>{isEdittingPayment? setEdittingPayment(false):setEdittingPayment(true)}} style={{alignSelf:"center"}}><Ionicons name="create-outline" size={16}></Ionicons></TouchableOpacity>
            </View>
          </View>

          <View style={{ paddingBottom:30, paddingTop:15,}}>
            <View style={{flexDirection:"row", justifyContent:"space-around"}}>
              <View style={{...styles.moneyContainer, width:"44%"}}>
                <Text style={styles.moneyTitle}>TOTAL</Text>
                <Text style={styles.money}>{typeof(todayMoney) == "number" ? totalMoney : "NAN"}</Text>
                </View>

              <View style={{...styles.moneyContainer, width:"44%"}}>
                <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                  <Text style={styles.moneyTitle}>TODAY</Text>
                  <TouchableOpacity style={styles.refresh} onPress={()=>{newDay()}}><MaterialCommunityIcons color={theme.b0} name="autorenew" size={24} /></TouchableOpacity>
                </View>
                <Text style={styles.money}>{typeof(todayMoney) == "number" ? todayMoney : "NAN"}</Text>
              </View>
            </View>

            <View style={styles.rects}>
              <TouchableOpacity style={{...styles.rect, backgroundColor: isAddMode? theme.c2_2:theme.c4}} onPress={()=>{isAddMode? setAddMode(false):setAddMode(true)}}><AntDesign color={theme.c5} name={isAddMode? "plus":"minus"} size={28} /></TouchableOpacity>
              <TouchableOpacity style={{...styles.rect, backgroundColor: isAddMode? theme.c2_2:theme.c4}} onPress={()=>{isAddMode? fixMoney(1000) : fixMoney(-1000);}}><Text style={styles.rectText}>1</Text></TouchableOpacity>
              <TouchableOpacity style={{...styles.rect, backgroundColor: isAddMode? theme.c2_2:theme.c4}} onPress={()=>{isAddMode? fixMoney(5000) : fixMoney(-5000);}}><Text style={styles.rectText}>5</Text></TouchableOpacity>
              <TouchableOpacity style={{...styles.rect, backgroundColor: isAddMode? theme.c2_2:theme.c4}} onPress={()=>{isAddMode? fixMoney(10000) : fixMoney(-10000);}}><Text style={styles.rectText}>10</Text></TouchableOpacity>
            </View>

            <FlatList
              style={{maxHeight:320}}
              nestedScrollEnabled
              data={[...expenses].reverse()}
              renderItem={renderExpense}
              keyExtractor={(expense) => expense[2]}
              extraData={expenses}
              ref={expenseFlist}
              showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity onPress={()=>{deleteExpesnses();}} style={{alignItems:"center", alignSelf:"center", width:"40%"}}>
              <Text style={{
                fontSize:14,
                marginTop:5,
                padding:10,
                backgroundColor:theme.c5,
                color:theme.b0,
                textAlign:"center",
                width:"100%",
                }}>Delete all records</Text>
            </TouchableOpacity>
          </View>
          
        </ScrollView>
      </View>
    </View>
  );
}
