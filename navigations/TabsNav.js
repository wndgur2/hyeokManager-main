import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, View } from "react-native";
import { StackView } from "@react-navigation/stack";
import TabIcon from "./TabIcon";
import {theme} from "../colors";
import Money from "../screens/money";
import Specifics from "../screens/expense";
import Memos from "../screens/memos";
import Expense from "../screens/expense";

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
        tabBarActiveTintColor: theme.c0,
        tabBarInactiveBackgroundColor: theme.c4,
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
          tabBarItemStyle:{
            borderTopRightRadius:24,
            borderBottomRightRadius:24,
          },
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
          tabBarItemStyle:{
            borderTopLeftRadius: 24,
            borderBottomLeftRadius: 24,
          },
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