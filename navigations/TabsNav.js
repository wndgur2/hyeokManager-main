import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, View } from "react-native";
import { StackView } from "@react-navigation/stack";
import TabIcon from "./TabIcon";
import Money from "../screens/money";
import Memos from "../screens/memos";
import { blacks } from "../colors";
import Setting from "../screens/Setting";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function TabsNav() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown:false,
        tabBarInactiveTintColor: blacks[45],
        tabBarActiveBackgroundColor: blacks[6],
        tabBarActiveTintColor: blacks[49],
        tabBarInactiveBackgroundColor: blacks[6],
        tabBarStyle:{
          borderTopWidth:0,
        },
        tabBarLabelStyle:{
          fontSize:12,
          top:"-5%",
        },
      }}
    >
      <Tabs.Screen
        name="Finance"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={focused?"card":"card-outline"} color={color} focused={focused}/>
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
            <TabIcon iconName={focused?"create":"create-outline"} color={color} focused={focused} />
          ),
        }}
      >
        {() =>
        <Stack.Navigator>
          <Stack.Screen name="memos" component={Memos} options={{headerShown: false,}}/>
        </Stack.Navigator>}
      </Tabs.Screen>
      
      <Tabs.Screen
        name="Setting"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={focused?"settings":"settings-outline"} color={color} focused={focused} />
          ),
        }}
      >
        {() =>
        <Stack.Navigator>
          <Stack.Screen name="setting" component={Setting} options={{headerShown: false,}}/>
        </Stack.Navigator>}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}