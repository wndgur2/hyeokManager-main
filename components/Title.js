import React from "react";
import { View, Text } from "react-native";
import { theme } from "../colors";

export default function Title({ loading, children }) {
  return (
    <View
      style={{
        alignSelf:"flex-end",
        right:"5%",
        alignItems:"center",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: theme.c5,
        padding:10,
        paddingTop:20,
        marginBottom:10,
      }}
    >
      <Text 
        style={{
          color:theme.b0,
          fontSize:20,
          textAlign:"center",
        }}
      >
        {children}
      </Text>
    </View>
      );
    }