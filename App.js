import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Auth Screen
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";

// Home Screen
import HomeScreen from "./screens/home/HomeScreen";

// Carparking
import CarparkingScreen from "./screens/carparking/CarparkingScreen";
import CarparkingDetailScreen from "./screens/carparking/CarparkingDetailScreen";
import CarparkingCreateScreen from "./screens/carparking/CarparkingCreateScreen";
import CarparkingMangeScreen from "./screens/carparking/CarparkingMangeScreen";

// Booking
import BookingScreen from "./screens/booking/BookingScreen";
import BookingDetailScreen from "./screens/booking/BookingDetailScreen";
import BookingHistoryScreen from "./screens/booking/BookingHistoryScreen";
import BookingHistoryDetailScreen from "./screens/booking/BookingHistoryDetailScreen";
import BookingFinishScreen from "./screens/booking/BookingFinishScreen";
import BookingPaymentScreen from "./screens/booking/BookingPaymentScreen";
import BookingPaymentDetailScreen from "./screens/booking/BookingPaymentDetailScreen";

// Owner
import DasboardOwner from "./screens/owner/DasboardOwner";
import BookingHistoryOwnerScreen from "./screens/booking/BookingHistoryOwnerScreen";

// Admin
import AdminHomeScreen from "./screens/admin/AdminHomeScreen";
import AdminMangeUserScreen from "./screens/admin/AdminMangeUserScreen";
// Super Admin
import SuperAdminHomeScreen from "./screens/superadmin/SuperAdminHomeScreen";
import CreateCarparkingScreen from "./screens/superadmin/CreateCarparkingScreen";
import MangeCarparkingScreen from "./screens/superadmin/MangeCarparkingScreen";
import UpdateRoleScreen from "./screens/superadmin/UpdateRoleScreen";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Register'
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Carparking'
          component={CarparkingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='CarparkingDetail'
          component={CarparkingDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='CarparkingCreate'
          component={CarparkingCreateScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='CarparkingMange'
          component={CarparkingMangeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Booking'
          component={BookingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='BookingDetail'
          component={BookingDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='BookingPayment'
          component={BookingPaymentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='BookingPaymentDetail'
          component={BookingPaymentDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='BookingFinish'
          component={BookingFinishScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='History'
          component={BookingHistoryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='HistoryBooking'
          component={BookingHistoryDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='DasboardOwner'
          component={DasboardOwner}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='AdminMangeUser'
          component={AdminMangeUserScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='BookingHistoryOwner'
          component={BookingHistoryOwnerScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
