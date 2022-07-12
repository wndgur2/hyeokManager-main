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
        marginVertical:8.5,
        marginHorizontal:20,
        flexDirection:"row",
      }}
    >
      <Text 
        style={{
          color:theme.c5,
          backgroundColor: parseInt(cost)>0?theme.c2:theme.c4,
          fontSize:18,
          width:"50%",
          height:"100%",
          paddingHorizontal:20,
          textAlign:"center",
          textAlignVertical:"center",
        }}
      >
        {cost} 원
        </Text>

      <Text 
      style={{
        color:theme.c5,
        backgroundColor:theme.c0,
        fontSize:16,
        width:"50%",
        paddingHorizontal:20,
        paddingVertical:3,
        textAlign:"center",
      }}
      >
        {expense}
      </Text>
    </View>
      );
    }