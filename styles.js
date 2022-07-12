import {StyleSheet} from "react-native";
import { theme} from "./colors";

export default styles = StyleSheet.create({
  container: {
    "flex": 1,
    backgroundColor: theme.c1,
    overflow:"hidden",
    margin:0,
    padding:0,
    borderWidth:0,
  },

  refresh:{
    width:"30%",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:theme.c5,
  },

  moneyContainer: {
    paddingVertical:"2%",
    paddingHorizontal:"6%",
    backgroundColor: theme.b0,
    margin:8,
  },

  moneyTitle:{
    fontStyle: "normal",
    fontSize: 20,
    color: "black",
    zIndex: 0,
  },

  money:{
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 28,
    letterSpacing: 2,
    color: "black",
    zIndex: 1,
  },

  rects:{
    alignItems:"center",
    flexDirection:"row",
    justifyContent:"space-evenly",
    width:"100%",
    paddingTop:10,
  },

  rect:{
    width:"20%",
    alignItems:"center",
    backgroundColor:theme.c4,
    padding:5,
    margin:5,
  },

  rectText:{
    fontStyle: "normal",
    fontWeight: "100",
    fontSize: 20,
    color: theme.c5,
    display: "flex",
  },

  billCard:{
    alignItems:"center",
    backgroundColor: theme.b0,
    margin:5,
  },

  billCardText:{
    fontSize:32,
    color:theme.c5,
  },
});
