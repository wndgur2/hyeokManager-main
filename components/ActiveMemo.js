import { LayoutAnimation, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { blacks } from "../colors";


export default function ActiveMemo({memo, tempMemo, setTempMemo, memos, clear, finishAdding}){
  return (
    <View style={{paddingHorizontal:10, margin:10, width:"100%", backgroundColor:blacks[49]}}>
      <TextInput
        style={{fontSize:20, margin:2, padding:8, width:"100%", letterSpacing:0.5, lineHeight:36}}
        multiline={true}
        placeholder="무슨 메모를 하시렵니까?"
        blurOnSubmit={true}
        value={tempMemo}
        onSubmitEditing={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          finishAdding(memos.findIndex(m=>m[0]==memo[0]))
        }}
        onChangeText={(text) => setTempMemo(text)}
        autoFocus={true}
        onBlur={()=>{
          clear();
        }}
      />
    </View>
  )
}