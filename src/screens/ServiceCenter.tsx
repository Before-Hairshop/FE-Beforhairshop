import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import SimpleHeader from "../components/common/SimpleHeader";
import Contour from "../components/common/Contour";
import { scale, verticalScale } from "../utils/scale";
import { UnderLineContent } from "../components/serviceCenter/UnderLineContent";
import { postUserFeedback } from "../api/postUserFeedback";
import { readData } from "../utils/asyncStorage";

export default function ServiceCenter() {
  const [feedback, setFeedback] = useState("");

  const navigation = useNavigation();

  const sendFeedback = async () => {
    postUserFeedback(await readData("@MEMBER_ID"), feedback).then(res => {
      if (res.data.result == undefined) {
        Alert.alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
        navigation.navigate("Loading", {
          reload: true,
        });
      } else if (res.data.status == "OK") {
        Alert.alert("전송이 완료되었습니다. 감사합니다.");
      } else {
        Alert.alert("전송 실패");
      }
    });
  };

  return (
    <SafeAreaView style={styles.frame}>
      <SimpleHeader title="고객센터" goBack="Main" />
      <Contour style={{ opacity: 0.1 }} />
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingTop: verticalScale(30),
          }}>
          <View style={{ width: "89%" }}>
            <Text style={styles.title}>안녕하세요</Text>
            <View style={{ flexDirection: "row" }}>
              <UnderLineContent value="비포헤어샵" />
              <Text style={styles.title}>입니다.</Text>
            </View>
            <View style={{ height: verticalScale(30) }} />
            <Text style={styles.description}>
              고객 센터에서는 비포헤어샵을 이용하면서
            </Text>
            <Text style={styles.description}>
              불편을 겪으신 고객님의 문제를 해결해 드립니다.
            </Text>
            <View style={{ height: verticalScale(20) }} />
            <Text style={styles.description}>
              문의사항 및 피드백은 전달해주시면
            </Text>
            <Text style={styles.description}>
              빠른 시일 내에 처리하겠습니다.
            </Text>
            <View style={{ height: verticalScale(30) }} />
            <Text style={styles.ask_title}>문의 및 피드백</Text>
            <View style={{ height: verticalScale(15) }} />
            <View
              style={{
                height: verticalScale(150),
                backgroundColor: "black",
                padding: verticalScale(11),
                borderRadius: verticalScale(7),
              }}>
              <TextInput
                placeholder="내용을 입력해주세요."
                placeholderTextColor="#555555"
                defaultValue={feedback}
                onChangeText={text => {
                  setFeedback(text);
                }}
                style={{ color: "#ffffff", flexShrink: 1 }}
                autoCorrect={false}
                multiline={true}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{ alignItems: "center" }}>
        <Pressable
          style={{
            width: "89%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FC2A5B",
            height: verticalScale(55),
            borderRadius: 10,
          }}
          onPress={() => {
            sendFeedback();
          }}>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: scale(16),
              fontWeight: "600",
              fontStyle: "normal",
              letterSpacing: -0.16,
              textAlign: "center",
              color: "#ffffff",
            }}>
            보내기
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: "#191919",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  title: {
    fontFamily: "Pretendard",
    fontSize: scale(22),
    fontWeight: "normal",
    fontStyle: "normal",
    textAlign: "left",
    color: "#ffffff",
  },
  description: {
    fontFamily: "Pretendard",
    fontSize: scale(14),
    fontWeight: "normal",
    fontStyle: "normal",
    textAlign: "left",
    color: "#eeeeee",
  },
  ask_title: {
    fontFamily: "Pretendard",
    fontSize: scale(20),
    fontWeight: "bold",
    fontStyle: "normal",
    textAlign: "left",
    color: "#ffffff",
  },
});
