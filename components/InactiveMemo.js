import { LayoutAnimation, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { blacks } from "../colors";


export default function InactiveMemo({isRemoveMode, removeMemo, memo, editMemo}){
  return(
    <TouchableOpacity
      style={{width:"100%"}}
      onPress={() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        isRemoveMode?removeMemo(memo):editMemo(memo);
    }}>
      <Text style={{
        paddingVertical:5,
        paddingHorizontal:5,
        marginVertical:2,
        fontSize:20,
        lineHeight:32,
        letterSpacing:-1,
        backgroundColor:blacks[10],
        color:blacks[45]
      }} numberOfLines={1}>{memo[1]}</Text>
    </TouchableOpacity>
  )
}