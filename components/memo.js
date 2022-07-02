import React from "react";
import { Text, View, TextInput } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Memo(memo) {
  return (
    <View>
      {memo[2]?
        <TextInput
        placeholder="input text."
        returnKeyType="done"
        value={watch("id")}
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("id", text)}
        /> :
        <Text style={{fontSize:30}}>{memo[1]}</Text>
      }
    </View>
      
  );
}