import React from "react";
import { View, Text } from "react-native";
import { theme } from "../colors";

export default function Title({ loading, children }) {
  return (
    <View
      style={{
        alignItems:"center",
        backgroundColor: theme.c5,
        paddingBottom:5,
        marginBottom:5,
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