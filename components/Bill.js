import React from "react";
import { View, Text } from "react-native";
import { theme } from "../colors";

export default function Bill({ cost, time, children }) {
  var expense = [];

  for (let i=0; i<5; i++)
    expense.push(<Text key={i}>{time[i]} </Text>);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 25,
        marginVertical:12,
        marginHorizontal:20,
        backgroundColor: theme.b0,
        flexDirection:"row",
      }}
    >
      <Text 
        style={{
          color:theme.c5,
          backgroundColor:theme.b0,
          fontSize:18,
          width:"50%",
          borderBottomLeftRadius:25,
          borderTopLeftRadius:25,
          paddingHorizontal:20,
          textAlign:"center",
        }}
      >
        {cost} 원
        </Text>

      <Text 
      style={{
        color:theme.c5,
        backgroundColor:theme.c1,
        fontSize:16,
        width:"50%",
        borderBottomRightRadius:25,
        borderTopRightRadius:25,
        paddingHorizontal:20,
        paddingVertical:10,
        textAlign:"center",
      }}
      >
        {expense}
      </Text>
    </View>
      );
    }