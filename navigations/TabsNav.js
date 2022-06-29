import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, View } from "react-native";
import { StackView } from "@react-navigation/stack";
import Money from "../screens/money";
import Routines from "../screens/routines";
import Specifics from "../screens/specifics";
import TabIcon from "./TabIcon";
import {theme} from "../colors";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function TabsNav() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown:false,
        activeTintColor: "white",
        tabBarInactiveTintColor: "black",
        tabBarActiveBackgroundColor: theme.bg,
        tabBarActiveTintColor: "white",
        tabBarInactiveBackgroundColor: theme.darkBg,
        tabBarShowLabel:false,
        tabBarStyle:{
          borderTopColor:theme.darkBg,
        }
      }}
    >
      <Tabs.Screen
        name="돈"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"card"} color={color} focused={focused}  />
          ),
        }}
      >
        {() =>
        <Stack.Navigator>
          <Stack.Screen name="money" component={Money} options={{headerShown: false,}}/>
        </Stack.Navigator>}
      </Tabs.Screen>

      <Tabs.Screen
        name="내역"
        options={{
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
        name="루틴"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"alarm"} color={color} focused={focused} />
          ),
        }}
      >
        {() =>
        <Stack.Navigator>
          <Stack.Screen name="routines" component={Routines} options={{headerShown: false,}}/>
        </Stack.Navigator>}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}