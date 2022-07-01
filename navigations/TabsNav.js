import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, View } from "react-native";
import { StackView } from "@react-navigation/stack";
import TabIcon from "./TabIcon";
import {theme} from "../colors";
import Money from "../screens/money";
import Specifics from "../screens/specifics";
import Memo from "../screens/memo";

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
        name="메모"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"create-outline"} color={color} focused={focused} />
          ),
        }}
      >
        {() =>
        <Stack.Navigator>
          <Stack.Screen name="memo" component={Memo} options={{headerShown: false,}}/>
        </Stack.Navigator>}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}