import { View, Text, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    priority: Notifications.AndroidNotificationPriority.HIGH,
  }),
});

const TokenGenerator = (): JSX.Element => {
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();
  const [token, setToken] = useState("");

  const storeToken = async (fcmToken: string) => {
    try {
      await AsyncStorage.setItem("fcmToken", fcmToken);
      setToken(fcmToken);
    } catch (error) {
      console.log("Error storing FCM Token", error);
    }
  };

  const handleRegistrationError = (errorMessage: string) => {
    alert(errorMessage);
    throw new Error(errorMessage);
  };

  const registerForPushNotificationsAsync = async () => {
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    const unsubscribeOnMessage = messaging().onMessage(
      async (remoteMessage) => {
        Notifications.scheduleNotificationAsync({
          identifier: "test",
          content: {
            title: remoteMessage.notification?.title,
            body: remoteMessage.notification?.body,
            sound: "default",
            priority: "high",
            badge: 1,
            vibrate: [100, 50, 100],
            launchImageName: "default",
          },
          trigger: null, // Immediate trigger
        });

        console.log("Message Received in foreground!", remoteMessage);
      }
    );

    const unsubscribeOnTokenRefresh = messaging().onTokenRefresh(
      async (newToken) => {
        console.log("FCM Token refreshed:", newToken);
        await storeToken(newToken);
      }
    );

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnTokenRefresh();
    };
  }, []);

  useEffect(() => {
    const getTokenFunc = async () => {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken);
        await storeToken(fcmToken);
      } else {
        console.log("Failed", "No token received");
      }
    };

    getTokenFunc();
  }, []);

  return (
    <View>
      <Text>FCM Token: {token}</Text>
    </View>
  );
};

export default TokenGenerator;
