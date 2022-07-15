import { TextInput } from "react-native-gesture-handler";
import { blacks } from "../colors";

export default function PaymentInput({newPay, setNewPay}){
  return (<TextInput
      style={{
        color: blacks[40],
        fontSize: 16,
      }}
      blurOnSubmit={true}
      value={newPay}
      onSubmitEditing={() => {
        setNewPay(newPay);
      }}
      onChangeText={(text) => setNewPay(text)}
    />)
}