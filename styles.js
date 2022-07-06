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

  moneyContainer: {
    paddingVertical:"2%",
    paddingHorizontal:"1%",
  },

  moneyTitle:{
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 24,
    letterSpacing: 2,

    color: "white",
    zIndex: 0,
  },

  money:{
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 36,
    letterSpacing: 4,

    color: "black",
    zIndex: 1,
  },

  rects:{
    position: "absolute",
    bottom:0,
    width: "100%",
  },

  rect:{
    width: "100%",
    height: 67,
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
