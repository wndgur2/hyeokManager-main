import React, {useEffect, useState} from "react";
import { SafeAreaView, Text, View, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NavigationBar from 'expo-navigation-bar';
import styles from '../styles';
import { theme } from '../colors';
import Title from "../components/Title";
import Bill from "../components/Bill";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Expense() {
  NavigationBar.setBackgroundColorAsync(theme.c5);

  const EXPENSES_STORAGE_KEY = '@expenses';
  const [expenses, setExpenses] = useState([]);

  const loadExpenses = async () => {
    try{
      const tExpenses = await AsyncStorage.getItem(EXPENSES_STORAGE_KEY);
      if(tExpenses) setExpenses(JSON.parse(tExpenses));
    } catch(e){
      console.log(e);
      console.log('loadExpensesError');
    }
    console.log("expenses: ", expenses);
  };

  useEffect(()=>{
      loadExpenses();
    },[]);

  const renderExpense = ({ item: expense }) =>{
    return (
      <Bill key={expense[2]} cost={expense[0]} time={expense[1]} />
    )
  }

  const deleteExpesnses = async() =>{
    setExpenses([]);
    await AsyncStorage.removeItem(EXPENSES_STORAGE_KEY);
  }

  return (
    <View style={styles.container}>
      <View style={styles.roundedContainer}>
        <Title>expenses</Title>
        <View style={{ flexDirection:"row", justifyContent:"space-evenly", paddingBottom:15,}}>
          <Text style={styles.rowIndex}>Cost</Text>
          <View/>
          <Text style={styles.rowIndex}>Date</Text>
        </View>
        <View
          style={{
            maxHeight:"72%",
            overflow:"hidden",
            backgroundColor:theme.c1,
            }}
        >
          <FlatList
            inverted={true}
            data={expenses}
            renderItem={renderExpense}
            keyExtractor={(expense) => expense[2]}
            extraData={expenses}
          />
        </View>
        <TouchableOpacity onPress={()=>{deleteExpesnses();}} style={{alignItems:"center"}}><Text style={{fontSize:20, margin:20, padding:8, backgroundColor:theme.c5, color:theme.c3, width: "70%", textAlign:"center"}}>Delete all expenses</Text></TouchableOpacity>
      </View>

    </View>
  );
}