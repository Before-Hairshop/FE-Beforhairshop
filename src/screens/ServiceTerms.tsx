import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { verticalScale } from "../utils/scale";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function ServiceTerms() {
  const navigation = useNavigation();

  return (
    <View style={styles.frame}>
      <View style={styles.container}>
        <Text style={styles.title}>이용약관</Text>
        <View style={styles.division} />
        <ScrollView style={styles.contents_container}>
          <Text style={styles.contents}>
            비포헤어샵('beforehairshop.com'이하 'beforehairshop')은(는)
            「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고
            이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여
            다음과 같이 개인정보 처리방침을 수립·공개합니다. ○ 이
            개인정보처리방침은 2022년 6월 28부터 적용됩니다. 제1조(개인정보의
            처리 목적) 비포헤어샵('beforehairshop.com'이하
            'beforehairshop')은(는) 다음의 목적을 위하여 개인정보를 처리합니다.
            처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며
            이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라
            별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다. 1. 홈페이지
            회원가입 및 관리 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인
            식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 각종 고지·통지
            목적으로 개인정보를 처리합니다. 2. 민원사무 처리 민원인의 신원 확인,
            사실조사를 위한 연락·통지, 처리결과 통보 목적으로 개인정보를
            처리합니다. 비포헤어샵('beforehairshop.com'이하
            'beforehairshop')은(는) 「개인정보 보호법」 제30조에 따라 정보주체의
            개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수
            있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
            ○ 이 개인정보처리방침은 2022년 6월 28부터 적용됩니다.
            제1조(개인정보의 처리 목적) 비포헤어샵('beforehairshop.com'이하
            'beforehairshop')은(는) 다음의 목적을 위하여 개인정보를 처리합니다.
            처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며
            이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라
            별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다. 1. 홈페이지
            회원가입 및 관리 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인
            식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 각종 고지·통지
            목적으로 개인정보를 처리합니다. 2. 민원사무 처리 민원인의 신원 확인,
            사실조사를 위한 연락·통지, 처리결과 통보 목적으로 개인정보를
            처리합니다.
          </Text>
        </ScrollView>
        <TouchableOpacity
          style={styles.accept_button}
          onPress={() => navigation.navigate("UserCheck")}>
          <Text style={styles.accept_text}>동의 후 서비스 이용하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
  },
  container: {
    width: "89%",
    height: verticalScale(600),
    backgroundColor: "#1d1d1d",
    alignItems: "center",
    borderRadius: 15,
    padding: verticalScale(20),
  },
  title: {
    fontFamily: "Pretendard",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffffff",
  },
  division: {
    width: "100%",
    height: verticalScale(1),
    backgroundColor: "#343434",
    marginTop: verticalScale(20),
  },
  contents_container: {
    width: "100%",
    marginTop: verticalScale(19),
  },
  contents: {
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "600",
    fontStyle: "italic",
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffffff",
  },
  accept_button: {
    width: "100%",
    height: verticalScale(55),
    borderRadius: 10,
    backgroundColor: "#fc2a5b",
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(19),
  },
  accept_text: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffffff",
  },
});
