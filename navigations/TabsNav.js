import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, View } from "react-native";
import { StackView } from "@react-navigation/stack";
import TabIcon from "./TabIcon";
import {theme} from "../colors";
import Money from "../screens/money";
import Specifics from "../screens/specifics";
import Memos from "../screens/memos";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function TabsNav() {
  return (
    <Tabs.Navigator
      sceneContainerStyle={{
        borderWidth:0,
      }}
      screenOptions={{
        headerShown:false,
        tabBarInactiveTintColor: "black",
        tabBarActiveBackgroundColor: theme.c5,
        tabBarActiveTintColor: theme.c1,
        tabBarInactiveBackgroundColor: theme.c1,
        tabBarLabelStyle:{
          fontSize:12,
          top:"-5%",
        },        
        tabBarStyle:{
          height:"6%",
          borderTopWidth:0,
          backgroundColor:theme.c1,
          borderTopWidth:0,
          shadowOffset:{width:0, height:0},
        },
      }}
    >
      <Tabs.Screen
        name="Money"
        options={{
          tabBarItemStyle:{borderTopRightRadius:24, borderBottomRightRadius:24},
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"card"} color={color} focused={focused}/>
          ),
        }}
      >
        {() =>
        <Stack.Navigator>
          <Stack.Screen name="money" component={Money} options={{headerShown: false,}}/>
        </Stack.Navigator>}
      </Tabs.Screen>

      <Tabs.Screen
        name="Expense"
        options={{
          tabBarItemStyle:{borderRadius:24},
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"list-outline"} color={color} focused={focused} />
          ),
        }}
      >
        {() =>
        <Stack.Navigator>
          <Stack.Screen name="specifics" component={Specifics} options={{headerShown: false,}}/>
        </Stack.Navigator>}
      </Tabs.Screen>

      <Tabs.Screen
        name="Memos"
        options={{
          tabBarItemStyle:{borderTopLeftRadius: 24, borderBottomLeftRadius: 24},
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"create-outline"} color={color} focused={focused} />
          ),
        }}
      >
        {() =>
        <Stack.Navigator>
          <Stack.Screen name="memos" component={Memos} options={{headerShown: false,}}/>
        </Stack.Navigator>}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}