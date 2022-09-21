import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { scale, verticalScale } from "../utils/scale";
import GoBackIcon from "../assets/icons/goBack.svg";
import DefaultCustomerImg from "../assets/images/customerList/default_customer_profile.png";

export default function CustomerList() {
  const navigation = useNavigation();

  const CustomerItem = () => (
    <View>
      <Image
        source={DefaultCustomerImg}
        style={{
          width: scale(160),
          height: scale(160),
          borderRadius: 10,
          shadowColor: "rgba(0, 0, 0, 0.25)",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowRadius: 10,
          shadowOpacity: 1,
          borderWidth: 1,
          borderColor: "#222222",
        }}
      />
      <Text
        style={{
          fontFamily: "Pretendard",
          fontSize: 13,
          fontWeight: "normal",
          fontStyle: "normal",
          letterSpacing: 0,
          textAlign: "left",
          color: "#737373",
        }}>
        강남구 역삼동
      </Text>
      <Text
        style={{
          fontFamily: "Pretendard",
          fontSize: 15,
          fontWeight: "500",
          fontStyle: "normal",
          letterSpacing: 0,
          textAlign: "left",
          color: "#ffffff",
        }}>
        네모
      </Text>
      <Text
        style={{
          fontFamily: "Pretendard",
          fontSize: 13,
          fontWeight: "normal",
          fontStyle: "italic",
          letterSpacing: 0,
          textAlign: "left",
          color: "#fc2a5b",
        }}>
        30,000원
      </Text>
    </View>
  );

  return (
    <View style={styles.frame}>
      <View
        style={{
          marginTop:
            Platform.OS === "ios" ? verticalScale(40) : verticalScale(0),
          height: verticalScale(70),
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: verticalScale(15),
          paddingBottom: verticalScale(15),
          paddingLeft: verticalScale(8),
          paddingRight: verticalScale(8),
        }}>
        <TouchableOpacity
          style={{
            width: scale(40),
            height: verticalScale(40),
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("Main")}>
          <GoBackIcon />
        </TouchableOpacity>
        <View style={{ height: "100%", justifyContent: "center" }}>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: 18,
              fontWeight: "600",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "center",
              color: "#ffffff",
            }}>
            내 주변 고객 목록
          </Text>
        </View>
        <View style={{ width: scale(40), height: verticalScale(40) }} />
      </View>
      <View
        style={{
          width: "100%",
          height: verticalScale(1),
          opacity: 0.2,
          backgroundColor: "#eeeeee",
        }}
      />
      <ScrollView style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
        <CustomerItem />
        <CustomerItem />
        <CustomerItem />
      </ScrollView>
    </View>
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
});
