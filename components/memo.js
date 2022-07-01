import React from "react";
import { Text, View } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Memo(memo) {
  return (
      <Text style={{fontSize:30}}>{memo[1]}</Text>
  );
}