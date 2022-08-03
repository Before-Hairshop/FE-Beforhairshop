import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  ScrollView,
  FlatList,
} from "react-native";

import React, { useState, useEffect } from "react";
import { Avatar } from "@rneui/themed";
import { Button } from "@rneui/themed";
import { verticalScale } from "../utils/scale";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/Ionicons";
import ProfileImage from "../components/ProfileImage";
import { useNavigation } from "@react-navigation/native";

const HeaderContents = () => {
  const navigation = useNavigation();
  return (
    <>
      <Icon
        name="chevron-back-outline"
        color="#ffffff"
        size={verticalScale(40)}
        onPress={() => navigation.navigate("Main")}></Icon>

      <Button
        title="편집"
        type="clear"
        titleStyle={{
          fontFamily: "Pretendard-Bold",
          fontSize: verticalScale(16),
          color: "#fc2a5b",
        }}
      />
    </>
  );
};

export default function ProfileSelection(props) {
  return (
    <View style={styles.mainView}>
      <Header contents={<HeaderContents></HeaderContents>}></Header>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingTop: 15 }}>
          <View style={{ flex: 6 }}>
            <Text
              style={{
                fontFamily: "Pretendard",
                fontSize: verticalScale(22),
                color: "white",
              }}>
              가상 헤어를 적용 할
            </Text>
            <Text>
              <Text
                style={{
                  fontFamily: "Pretendard-Bold",
                  fontSize: verticalScale(22),
                  color: "white",
                  textDecorationLine: "underline",
                  textDecorationColor: "#8a2139",
                }}>
                프로필을 선택
              </Text>
              <Text
                style={{
                  fontFamily: "Pretendard-Regular",
                  fontSize: verticalScale(22),
                  color: "white",
                }}>
                해주세요.
              </Text>
            </Text>

            {/* <View
              style={{
                flexDirection: "row",
              }}>
              <View
                style={{
                  borderColor: "#191919",
                  borderBottomColor: "#8a2139",
                  borderWidth: 3,

                  alignSelf: "flex-start",
                }}>
                <Text
                  style={{
                    fontFamily: "Pretendard-Bold",
                    fontSize: verticalScale(22),
                    color: "white",
                  }}>
                  프로필을 선택
                </Text>
              </View>

              <View>
                <Text
                  style={{
                    fontFamily: "Pretendard-Regular",
                    fontSize: verticalScale(22),
                    color: "white",
                  }}>
                  해주세요.
                </Text>
              </View>
            </View> */}
          </View>
        </View>
      </View>

      <View style={{ flex: 5 }}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />

        {/* <ProfileImage></ProfileImage>
        <ProfileImage></ProfileImage> */}
      </View>
    </View>
  );
}

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0ff71f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd9sd6-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96fas-145571e29d72",
    title: "Third Item",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0ff71f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd9sd6-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96fas-145571e29d72",
    title: "Third Item",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0ff71f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd9sd6-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96fas-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const renderItem = ({ item }) => (
  <ProfileImage
    thumbnail={require("../assets/images/popular_thumbnail.jpeg")}
  />
);

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingHorizontal: verticalScale(20),

    backgroundColor: "#191919",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
