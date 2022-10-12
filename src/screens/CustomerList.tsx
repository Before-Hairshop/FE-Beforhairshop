import {
  Alert,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { scale, verticalScale } from "../utils/scale";
import GoBackIcon from "../assets/icons/goBack.svg";
import DefaultCustomerImg from "../assets/images/customerList/default_customer_profile.png";
import HashTag from "../components/customerList/HashTag";
import SimpleHeader from "../components/common/SimpleHeader";
import { getCustomerList } from "../api/getCustomerList";

export default function CustomerList() {
  const [pageNum, setPageNum] = useState(0);
  const [customerList, setCustomerList] = useState([]);

  const navigation = useNavigation();

  const fetchCustomerList = async () => {
    try {
      const { data } = await getCustomerList(pageNum);
      console.log(data);
      if (data.status == "BAD_REQUEST") {
        Alert.alert("프로필을 먼저 등록해주세요.");
        navigation.goBack();
      } else {
        setCustomerList([...customerList, ...data.result]);
        setPageNum(pageNum + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomerList();
  }, []);

  const CustomerItem = ({ item }) => (
    <TouchableOpacity
      style={{
        width: "50%",
        alignItems: "center",
        marginTop: verticalScale(21),
      }}
      // onPress={() => navigation.navigate("UserProfileLookup")}
      onPress={() =>
        navigation.navigate({
          name: "UserProfileLookup",
        })
      }>
      <View>
        <Image
          source={{ uri: item.frontImageUrl }}
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
        <View style={{ marginLeft: scale(3) }}>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: 13,
              fontWeight: "normal",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "left",
              color: "#737373",
              marginTop: verticalScale(7),
            }}>
            {item.zipAddress}
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
              marginTop: verticalScale(7),
            }}>
            짱구
          </Text>
          <View style={{ flexDirection: "row", marginTop: verticalScale(7) }}>
            <HashTag />
            <HashTag />
            <HashTag />
          </View>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: 13,
              fontWeight: "normal",
              letterSpacing: 0,
              textAlign: "left",
              color: "#fc2a5b",
              marginTop: verticalScale(7),
            }}>
            {item.payableAmount.toLocaleString()}원
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.frame}>
      {/* <View
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
      /> */}
      <FlatList
        ListHeaderComponent={
          <>
            <SimpleHeader title="내 주변 고객 목록" />
            <View
              style={{
                width: "100%",
                height: verticalScale(1),
                opacity: 0.2,
                backgroundColor: "#eeeeee",
              }}
            />
          </>
        }
        data={customerList}
        renderItem={CustomerItem}
        keyExtractor={(item, index) => item.id}
        numColumns={2}
        style={{
          flexDirection: "column",
        }}
        onEndReached={() => {
          fetchCustomerList();
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        // contentContainerStyle={{ paddingBottom: 100 }}
      />
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
