import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, View } from "react-native";
import { StackView } from "@react-navigation/stack";
import TabIcon from "./TabIcon";
import {theme} from "../colors";
import Money from "../screens/money";
import Memos from "../screens/memos";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function TabsNav() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown:false,
        tabBarInactiveTintColor: theme.c1,
        tabBarActiveBackgroundColor: theme.c1,
        tabBarActiveTintColor: theme.c5,
        tabBarInactiveBackgroundColor: theme.c5,
        tabBarLabelStyle:{
          fontSize:12,
          top:"-5%",
        },
        tabBarStyle:{
          borderTopWidth:0,
          backgroundColor:theme.c4,
          elevation: 0.0,
        },
      }}
    >
      <Tabs.Screen
        name="Finance"
        options={{
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
        name="Memos"
        options={{
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