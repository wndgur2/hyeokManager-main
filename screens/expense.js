import React, {useEffect, useState} from "react";
import { SafeAreaView, Text, View, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NavigationBar from 'expo-navigation-bar';
import styles from '../styles';
import { theme } from '../colors';
import Title from "../components/Title";
import Bill from "../components/Bill";

export default function Expense() {
  NavigationBar.setBackgroundColorAsync(theme.c5);

  const EXPENSES_STORAGE_KEY = '@expenses';
  const [expenses, setExpenses] = useState(new Array());

  const loadData = async () => {
    try{
      const tExpenses = await AsyncStorage.getItem(EXPENSES_STORAGE_KEY);
      if(tExpenses) setExpenses(JSON.parse(tExpenses));
    } catch(e){
      console.log(e);
      console.log('loadDataError');
    }
  };

  useEffect(()=>{
      loadData();
    }
  )

  const renderExpense = ({ item: expense }) =>{
    return (
      <Bill key={expense[2]} cost={expense[0]} time={expense[1]} />
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.roundedContainer}>
        <Title>expenses</Title>
        <View style={{flexDirection:"row", justifyContent:"space-evenly", paddingBottom:10,}}>
          <Text style={styles.rowIndex}>Cost</Text>
          <View/>
          <Text style={styles.rowIndex}>Date</Text>
        </View>
        <View
          style={{
            maxHeight:"86%",
            borderBottomLeftRadius:25,
            borderBottomRightRadius:25,
            overflow:"hidden",
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
      </View>

    </View>
  );
}