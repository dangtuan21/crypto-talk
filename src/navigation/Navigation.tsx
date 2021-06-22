import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName, View } from "react-native";
import {
  Octicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";

import NotFoundScreen from "../screens/NotFoundScreen";
import FriendListScreen from "../screens/FriendListScreen";
import { RootStackParamList } from "../types";
import MainTabNavigator from "./MainTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import Colors from "../constants/Colors";
import ContactListScreen from "../screens/ContactListScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "../screens/LoginScreen";

const Drawer = createDrawerNavigator();

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    // <NavigationContainer
    //   linking={LinkingConfiguration}
    //   theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    // >
    //   <RootNavigator />
    // </NavigationContainer>

    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Drawer.Navigator>
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Talk" component={RootNavigator} />
        {/* <Drawer.Screen name="About" component={AboutNavigator} /> */}
      </Drawer.Navigator>
    </NavigationContainer>    
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light.tint,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTintColor: Colors.light.background,
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Root"
        component={MainTabNavigator}
        options={{
          title: "Crypto Message",
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                width: 60,
                justifyContent: "space-between",
                marginRight: 10,
              }}
            >
              <Octicons name="search" size={22} color={"white"} />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={22}
                color={"white"}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Friends"
        component={FriendListScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                width: 100,
                justifyContent: "space-between",
                marginRight: 10,
              }}
            >
              <FontAwesome5 name="video" size={22} color={"white"} />
              <MaterialIcons name="call" size={22} color={"white"} />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={22}
                color={"white"}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen name="Contacts" component={ContactListScreen} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
