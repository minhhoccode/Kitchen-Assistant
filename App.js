import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import CameraTabs from "./src/tabs/CameraTabs/CameraTabs";
import Home from "./src/tabs/Home/Home";
import Explorer from "./src/tabs/Explorer/Explorer";
import Settings from "./src/tabs/Settings/Settings";
import ChatBot from "./src/tabs/ChatBot/ChatBot";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Explorer" component={Explorer} />
      <Tab.Screen name="Camera" component={CameraTabs} />
      <Tab.Screen name="ChatBot" component={ChatBot} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignContent: "center",
    padding: 20,
  },
});
