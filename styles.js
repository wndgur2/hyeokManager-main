import {StyleSheet} from "react-native";
import { theme} from "./colors";

export default styles = StyleSheet.create({
  tabNavBackgroundContainer:{
    flex:1,
    display:"flex",
    position:"absolute",
    backgroundColor:"blue",
    width:"100%",
    height:"6%",
    bottom:0,
  },

  tabNavBackground:{
    position:"absolute",
    width:"100%",
    height:"3%",
    flex:1,
    bottom:0,
  },

  container: {
    "flex": 1,
    backgroundColor: theme.c1,
    overflow:"hidden",
    margin:0,
    padding:0,
    borderWidth:0,
  },

  roundedContainer:{
    borderBottomLeftRadius:25,
    borderBottomRightRadius:25,
    "flex": 1,
    backgroundColor: theme.c0,
    width: "100%",
    borderWidth:0,
  },

  bottomLeft:{
    position:"absolute",
    width:"50%",
    height:"50%",
    bottom:-5,
    borderWidth:0,
  },

  bottomRight:{
    position:"absolute",
    width:"50%",
    height:"50%",
    bottom:-5,
    right:0,
    borderWidth:0,
  },

  topLeft:{
    position:"absolute",
    width:"50%",
    height:"50%",
  },

  topRight:{
    position:"absolute",
    width:"50%",
    height:"50%",
    right:0,
  },

  refresh:{
    width:"14%",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:20,
    backgroundColor:theme.c5,
  },

  moneyContainer: {
    paddingVertical:"2%",
    paddingHorizontal:"3%",
    backgroundColor: theme.b0,
    borderRadius:23,
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
    position: "absolute",
    bottom:0,
    right:0,
    
    paddingHorizontal:"2%",
    paddingVertical: 10,

    backgroundColor:theme.c1,
    borderTopLeftRadius:16,
    justifyContent:"center",
    alignItems:"center",
  },

  rect:{
    marginVertical:5,
    paddingVertical:6,
    width:"80%",
    justifyContent: "center",
    alignItems:"center",
    backgroundColor:theme.c0_2,
  },

  rectText:{
    fontStyle: "normal",
    fontWeight: "100",
    fontSize: 20,
    color: theme.c5,
    display: "flex",
  },

  operator:{
    alignItems:"center",
    justifyContent:"center",
    paddingVertical:5,
  },

  billCard:{
    alignItems:"center",
    backgroundColor: theme.b0,
    borderRadius:25,
    margin:5,
  },

  billCardText:{
    fontSize:32,
    color:theme.c5,
  },

  rowIndex: {
    fontSize:20,

  },
});
