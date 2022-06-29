import {StyleSheet} from "react-native";
import { theme} from "./colors";

export default styles = StyleSheet.create({
  container: {
    "flex": 1,
    backgroundColor: theme.bg,
    width: "100%",
  },

  moneyContainer:{
    width: "100%",
    marginBottom: "5%",
  },

  totalText:{
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 36,
    lineHeight: 48,
    letterSpacing: 5,
    textAlign: "right",

    color: "#FFFFFF",
    zIndex: 0,
  },

  totalMoney:{
    top: -30,
    width: "100%",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 60,
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
    left: 8,

    color: "#FFFFFF",
    zIndex: 0,
  },

  todayMoney:{
    top: -40,
    width: "120%",
    fontSize: 92,
    letterSpacing: 10,
    color: "#000000",
    zIndex: 1,
  },

  today:{
    top:46,
    paddingRight:14,
    display: "flex",
    width: "55%",
    height: 40,
    flexDirection:'row',
    justifyContent: "flex-end",
    zIndex: 2,
    marginBottom:-5,
  },

  rects:{
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0,
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
  
  btns:{
    fontStyle: "normal",
    fontWeight: "100",
    fontSize: 24,
    color: "#FFFFFF",
    display: "flex",
    bottom: 3,
  },

  reset:{
    position: "absolute",
    width: "100%",
    height: 50,
    left: 370,
    top: 50,
  },

  newDay:{
    position: "absolute",
    width: "10%",
    height: 50,
    left: 330,
    top: 320,
    alignItems: "center",
    justifyContent:"center",
    zIndex:2,
  },
  plus:{
    position: "absolute",
    width: "12%",
    height: 55,
    left: 16,
    top: 540,
    justifyContent:"center",
  },
  minus:{
    position: "absolute",
    width: "12%",
    height: 55,
    left: 352,
    top: 540,
    justifyContent:"center",
  },
});
