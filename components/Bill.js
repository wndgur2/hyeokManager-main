import React from "react";
import { View, Text } from "react-native";
import { blacks } from "../colors";

export default function Bill({ cost, time, children }) {
  var expense = [];

  for (let i=0; i<5; i++)
    expense.push(<Text key={i}>{time[i]} </Text>);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection:"row",
      }}
    >
      <Text 
        style={{
          color:blacks[49],
          backgroundColor: cost>0? blacks[11]:blacks[7],
          fontSize:18,
          width:"40%",
          height:"100%",
          textAlign:"center",
          textAlignVertical:"center",
        }}
      >
        {cost} 원
        </Text>

      <Text 
      style={{
        color:blacks[45],
        backgroundColor:blacks[9],
        fontSize:16,
        width:"60%",
        paddingVertical:10,
        paddingHorizontal:10,
        textAlign:"center",
      }}
      >
        {expense}
      </Text>
    </View>
      );
    }