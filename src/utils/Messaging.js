import React, {useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import DropdownAlert from 'react-native-dropdownalert';
import Axios from 'axios';

const Messaging = () => {
  dropDownAlertRef = null;
  async function registerAppWithFCM() {
    try {
      await messaging().registerDeviceForRemoteMessages();
    } catch (error) {}
  }
  async function requestPermission() {
    try {
      const granted = messaging().requestPermission();

      if (granted) {
        console.log('User granted messaging permissions!');
      } else {
        console.log('User declined messaging permissions :(');
      }
    } catch (error) {}
  }
  const mess = async () => {
    try {
      const token = await messaging().getToken();
      console.log('token of user is ' + token);

      await requestPermission();
      await registerAppWithFCM();
      await messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log('Message handled in the background!', remoteMessage);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    mess();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log(remoteMessage);

      dropDownAlertRef.alertWithType(
        'info',
        remoteMessage.notification.title,
        remoteMessage.notification.body,
      );
    });

    return unsubscribe;
  }, []);
  return <DropdownAlert ref={(ref) => (dropDownAlertRef = ref)} />;
};

export default Messaging;
