import React from "react";
import { View, Text } from "react-native";
import { blacks } from "../colors";

export default function Title({ loading, children }) {
  return (
    <View
      style={{
        alignItems:"center",
        backgroundColor: blacks[3],
      }}
    >
      <Text 
        style={{
          color:blacks[49],
          fontSize:20,
          textAlign:"center",
        }}
      >
        {children}
      </Text>
    </View>
      );
    }