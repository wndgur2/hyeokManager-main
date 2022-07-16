import {StyleSheet} from "react-native";
import { blacks } from "./colors";

export default styles = StyleSheet.create({
  container: {
    "flex": 1,
    backgroundColor: blacks[0],
    overflow:"hidden",
  },

  section:{
    paddingVertical:5,
    marginBottom:5,
  },

  button:{
    padding:5,
    backgroundColor:blacks[10],
    color:blacks[50],
  },

  refresh:{
    alignItems:"center",
    justifyContent:"center",
    paddingLeft:3
  },

  moneyContainer: {
    paddingVertical:"2%",
  },

  moneyTitle:{
    fontSize: 20,
    color: blacks[42],
    zIndex: 0,
  },

  money:{
    fontWeight:"bold",
    fontSize: 32,
    letterSpacing: 4,
    color: blacks[49],
    zIndex: 1,
  },

  rects:{
    flexDirection:"row",
    justifyContent:"space-between",
  },

  rect:{
    alignItems:"center",
    paddingVertical:5,
    paddingHorizontal:27,
    marginTop:8,
  },

  rectText:{
    fontStyle: "normal",
    fontWeight: "100",
    fontSize: 20,
    color: blacks[49],
  },

  memoOperator:{
    paddingVertical:8,
    paddingHorizontal:20,
  }
});
