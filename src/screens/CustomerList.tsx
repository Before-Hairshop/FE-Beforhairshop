import {
  Alert,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-swiper";

import { scale, verticalScale } from "../utils/scale";
import GoBackIcon from "../assets/icons/goBack.svg";
import DefaultCustomerImg from "../assets/images/customerList/default_customer_profile.png";
import HashTag from "../components/customerList/HashTag";
import SimpleHeader from "../components/common/SimpleHeader";
import { getCustomerList } from "../api/getCustomerList";
import { getRequestList } from "../api/getRequestList";
import SwiperItem from "../components/customerList/SwiperItem";

export default function CustomerList() {
  const [pageNum, setPageNum] = useState(0);
  const [customerList, setCustomerList] = useState([]);
  const [requestList, setRequestList] = useState([]);

  const navigation = useNavigation();

  const fetchCustomerList = async () => {
    try {
      const { data } = await getCustomerList(pageNum);
      console.log(data);
      if (data.result == undefined) {
        Alert.alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
        navigation.navigate("Loading");
      } else if (data.status == "OK") {
        setCustomerList([...customerList, ...data.result]);
        setPageNum(pageNum + 1);
      } else {
        Alert.alert("데이터를 불러오는데 실패했습니다.");
      }
      const result = await getRequestList();
      console.log(result);
      if (result.data.status == "OK") {
        setRequestList(result.data.result);
      } else {
        Alert.alert("데이터를 불러오는데 실패했습니다.");
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
        padding: scale(14),
      }}
      onPress={() =>
        navigation.navigate("UserProfileLookup", {
          userProfileId: item.id,
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
            {item.zipAddress.length > 16
              ? item.zipAddress.substring(0, 15) + "..."
              : item.zipAddress}
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
            {item.name}
          </Text>
          <View style={{ flexDirection: "row", marginTop: verticalScale(7) }}>
            {item.desiredHairstyle == null ? (
              <HashTag value="#스타일을 추천받고 싶어요" />
            ) : (
              <HashTag value={`#${item.desiredHairstyle}`} />
            )}
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
    <SafeAreaView style={styles.frame}>
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
            <View
              style={{ paddingHorizontal: scale(14), paddingTop: scale(14) }}>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: scale(16),
                  fontWeight: "normal",
                  fontStyle: "normal",
                  textAlign: "left",
                  color: "#ffffff",
                  paddingBottom: verticalScale(14),
                }}>
                추천서 요청 고객
              </Text>
              <View
                style={{
                  height: verticalScale(140),
                  backgroundColor: "#0c0c0c",
                  borderRadius: 10,
                  alignItems: "center",
                  marginBottom: verticalScale(25),
                }}>
                {requestList != undefined && requestList.length != 0 ? (
                  <Swiper loop={false} showsPagination={false}>
                    {requestList.map((item, index) => (
                      <SwiperItem data={item} />
                    ))}
                  </Swiper>
                ) : (
                  <View style={{ height: "100%", justifyContent: "center" }}>
                    <Text
                      style={{
                        fontFamily: "Pretendard",
                        fontSize: verticalScale(16),
                        fontWeight: "bold",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        textAlign: "left",
                        color: "#2e2e2e",
                      }}>
                      추천서 요청 고객이 없습니다.
                    </Text>
                  </View>
                )}
              </View>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: scale(16),
                  fontWeight: "normal",
                  fontStyle: "normal",
                  textAlign: "left",
                  color: "#ffffff",
                }}>
                내 주변 고객
              </Text>
            </View>
            {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    width: "88.8%",
                    height: verticalScale(140),
                    backgroundColor: "red",
                  }}>
                  <Text>하하하하하</Text>
                </View>
              </View>
            </ScrollView> */}
          </>
        }
        data={customerList}
        renderItem={CustomerItem}
        keyExtractor={item => item.id}
        numColumns={2}
        onEndReached={() => {
          fetchCustomerList();
        }}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
      />
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
});
