import { AppState, Alert } from "react-native";
import notifee, {
  AndroidImportance,
  AndroidColor,
} from "@notifee/react-native";

const displayNotification = async message => {
  console.log(message);

  await notifee.requestPermission();
  const channelAnoucement = await notifee.createChannel({
    id: "default",
    name: "비포헤어샵",
    importance: AndroidImportance.HIGH,
  });

  console.log(channelAnoucement);

  const result = await notifee.displayNotification({
    title: message.data.title,
    body: message.data.body,
    android: {
      channelId: channelAnoucement,
    },
  });
  console.log(result);
};

export default {
  displayNoti: remoteMessage => displayNotification(remoteMessage),
};
