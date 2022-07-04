import {StyleSheet} from "react-native";
import { theme} from "./colors";

export default styles = StyleSheet.create({
  container: {
    "flex": 1,
    backgroundColor: theme.bg,
    width: "100%",
    overflow:"hidden",
    margin:0,
    padding:0,
  },

  totalText:{
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 32,
    lineHeight: 48,
    letterSpacing: 5,
    textAlign: "right",

    color: "#FFFFFF",
    zIndex: 0,
  },

  totalMoney:{
    top: -20,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 52,
    letterSpacing: 10,
    textAlign: "right",

    color: "#2b2b2b",
    zIndex: 1,
  },

  todayText:{
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 40,
    letterSpacing: 5,

    color: "#FFFFFF",
  },

  todayMoney:{
    top: -20,
    width: "120%",
    fontSize: 72,
    letterSpacing: 10,
    color: "#000000",
    zIndex: 1,
  },

  rects:{
    position: "absolute",
    bottom:0,
    width: "100%",
  },

  rect:{
    width: "100%",
    height: 70,
    left: 0,
    justifyContent: "center",
    alignItems:"center",
  },

  rectText:{
    fontStyle: "normal",
    fontWeight: "100",
    fontSize: 32,
    display: "flex",
  },

  operators:{
    bottom:5,
    flexDirection:"row",
    justifyContent:"space-between",
    paddingHorizontal:15
  }
});
