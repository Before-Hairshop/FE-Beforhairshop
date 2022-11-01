import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import { scale, verticalScale } from "../utils/scale";

import GoBackIcon from "../assets/icons/goBack.svg";
import GoHomeIcon from "../assets/icons/goHome.svg";
import SearchIcon from "../assets/icons/search.svg";
import StarIcon from "../assets/icons/star.svg";

import DefaultDesignerImg from "../assets/images/default_designer.png";
import ComplexityHeader from "../components/common/ComplexityHeader";
import { getDesignerListThroughLocation } from "../api/getDesignerListThroughLocation";
import { getDesignerListThroughName } from "../api/getDesignerListThroughName";
import { useNavigation } from "@react-navigation/native";

const TagItem = (props: { value: string }) => (
  <View
    style={{
      borderRadius: 100,
      backgroundColor: "rgba(252, 42, 91, 0)",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#fc2a5b",
      justifyContent: "center",
      alignItems: "center",
      marginRight: verticalScale(5.4),
      paddingTop: verticalScale(3),
      paddingBottom: verticalScale(3),
      paddingLeft: scale(8),
      paddingRight: scale(8),
    }}>
    <Text
      style={{
        fontFamily: "Pretendard",
        fontSize: 10,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: -0.5,
        textAlign: "left",
        color: "#fc2a5b",
      }}>
      #{props.value}
    </Text>
  </View>
);

export default function DesignerList() {
  const [designerList, setDesignerList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNum, setPageNum] = useState(0);
  const [keyword, setKeyword] = useState("");

  const navigation = useNavigation();

  const DesignerItem = ({ item }) => (
    <View>
      <TouchableOpacity
        style={{
          width: "100%",
          height: verticalScale(141),
          paddingRight: scale(20),
          paddingLeft: scale(22),
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => {
          navigation.navigate("DesignerProfile", {
            designerId: item.hairDesignerProfileDto.hairDesignerId,
          });
        }}>
        <Image
          source={{ uri: item.hairDesignerProfileDto.imageUrl }}
          style={{
            width: verticalScale(70),
            height: verticalScale(70),
            borderRadius: verticalScale(70),
            borderWidth: 1,
            borderColor: "#373737",
          }}
          resizeMode={"cover"}
        />
        <View
          style={{
            width: "74%",
            paddingLeft: scale(15),
            paddingRight: scale(30),
          }}>
          <View
            style={{ flexDirection: "row", marginBottom: verticalScale(8) }}>
            <Text
              style={{
                fontFamily: "Pretendard",
                fontStyle: "normal",
                fontWeight: "700",
                fontSize: 15,
                textAlign: "left",
                color: "#FFFFFF",
                marginRight: scale(5),
              }}>
              {item.hairDesignerProfileDto.name}
            </Text>
            <Text
              style={{
                fontFamily: "Pretendard",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: 15,
                textAlign: "left",
                color: "#737373",
              }}>
              {item.hairDesignerProfileDto.hairShopName}
            </Text>
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: 12,
                  textAlign: "left",
                  color: "#FC2A5B",
                }}>
                {" "}
                {item.distance > 1000
                  ? (item.distance / 1000).toFixed(1) + "km"
                  : item.distance + "m"}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: 12,
              textAlign: "left",
              color: "rgba(255, 255, 255, 0.7)",
              marginBottom: verticalScale(8),
            }}>
            {item.hairDesignerProfileDto.zipAddress +
              " " +
              item.hairDesignerProfileDto.detailAddress}
          </Text>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              flexWrap: "wrap",
            }}>
            {item.hairDesignerHashtagDtoList.length == 0 ? (
              <TagItem value="등록된 태그가 없습니다." />
            ) : (
              <>
                {item.hairDesignerHashtagDtoList.map(
                  (hashtag: { tag: string }, index: any) => (
                    <TagItem value={hashtag.tag} />
                  ),
                )}
              </>
            )}
          </View>
        </View>
        <View style={{ width: "5%", paddingTop: verticalScale(3), top: -25 }}>
          <StarIcon fill="#ffce00" width={17} height={17} />
          <Text
            style={{
              fontFamily: "Pretendard",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: 10,
              textAlign: "left",
              color: "rgba(255, 255, 255, 0.7);",
            }}>
            {item.averageStarRating == null
              ? "0.0"
              : item.averageStarRating.toFixed(1)}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          width: "100%",
          height: verticalScale(1),
          backgroundColor: "#333333",
        }}
      />
    </View>
  );

  const fetchDesignerList = async (prev: any, page: number) => {
    try {
      // setError(null);
      // setLoading(true);
      const { data } = await getDesignerListThroughLocation(page);
      if (data.result == undefined) {
        Alert.alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
        navigation.navigate("Loading");
      } else if (data.status == "OK") {
        console.log(pageNum);
        console.log([...prev, ...data.result]);
        setDesignerList([...prev, ...data.result]);
        setPageNum(page + 1);
      } else {
        Alert.alert("데이터를 불러오는데 실패했습니다.");
      }
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const fetchDesignerListThroughName = async (
    keyw: string,
    prev: never[],
    page: number,
  ) => {
    try {
      const { data } = await getDesignerListThroughName(keyw, page);
      if (data.result == undefined) {
        Alert.alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
        navigation.navigate("Loading");
      } else if (data.status == "OK") {
        console.log(data);
        console.log([...prev, ...data.result]);
        setDesignerList([...prev, ...data.result]);
        setPageNum(page + 1);
      } else {
        Alert.alert("데이터를 불러오는데 실패했습니다.");
      }
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    // setDesignerList([]);
    // setPageNum(0);
    console.log(keyword, keyword.length);
    if (keyword == "") {
      console.log("no", keyword);
      fetchDesignerList([], 0);
    } else {
      console.log("yes", keyword);
      fetchDesignerListThroughName(keyword, [], 0);
    }
  }, [keyword]);

  return (
    <SafeAreaView style={styles.frame}>
      {/* <ComplexityHeader
        title="헤어 디자이너 목록"
        goBack="NewMain"
        button={
          <TouchableOpacity
            onPress={() => {
              console.log();
            }}>
            <GoHomeIcon />
          </TouchableOpacity>
        }
      /> */}
      {/* <View style={{ width: width, backgroundColor: "#191919" }}> */}
      {/* <View
        style={{
          position: "relative",
          paddingTop:
            Platform.OS === "ios" ? verticalScale(45) : verticalScale(20),
          alignItems: "center",
        }}>
        <Text
          style={{
            fontFamily: "Pretendard",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center",
            color: "#FFFFFF",
          }}>
          헤어 디자이너 목록
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          position: "absolute",
        }}>
        <Header contents={<HeaderContents />} />
      </View> */}
      {/* <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: verticalScale(24),
            paddingTop: verticalScale(10),
            paddingBottom: verticalScale(10),
          }}>
          <View
            style={{
              width: "89%",
              height: verticalScale(45),
              backgroundColor: "#272728",
              borderRadius: 15,
              flexDirection: "row",
              paddingTop: verticalScale(13),
              paddingBottom: verticalScale(13),
              paddingLeft: scale(18),
            }}>
            <SearchIcon style={{ marginRight: scale(10) }} />
            <Text style={{ color: "#C8C8C8" }}>키워드를 검색해 주세요</Text>
          </View>
        </View> */}
      {/* <View style={{ flex: 1 }}> */}
      <FlatList
        ListHeaderComponent={
          <>
            <ComplexityHeader
              title="헤어 디자이너 목록"
              goBack="NewMain"
              button={
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("NewMain");
                  }}>
                  <GoHomeIcon />
                </TouchableOpacity>
              }
            />
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                // marginTop: verticalScale(24),
                paddingTop: verticalScale(10),
                paddingBottom: verticalScale(10),
              }}>
              <View
                style={{
                  width: "89%",
                  height: verticalScale(45),
                  backgroundColor: "#272728",
                  borderRadius: 15,
                  flexDirection: "row",
                  paddingTop: verticalScale(13),
                  paddingBottom: verticalScale(13),
                  paddingLeft: scale(18),
                }}>
                <SearchIcon style={{ marginRight: scale(10) }} />
                {/* <Text style={{ color: "#C8C8C8" }}>키워드를 검색해 주세요</Text> */}
                <TextInput
                  placeholder="키워드를 검색해 주세요"
                  placeholderTextColor="#C8C8C8"
                  value={keyword}
                  onChangeText={text => {
                    setKeyword(text);
                  }}
                  style={{ color: "#cccccc" }}
                  autoCorrect={false}
                />
              </View>
            </View>
          </>
        }
        data={designerList}
        renderItem={DesignerItem}
        keyExtractor={(item, index) => item.id}
        onEndReached={() => {
          if (keyword == "") {
            fetchDesignerList(designerList, pageNum);
          } else {
            fetchDesignerListThroughName(keyword, designerList, pageNum);
          }
        }}
        // onEndReachedThreshold={1} //위로 올렸을 때 새로 로딩할지
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      {/* </View> */}
      {/* </View> */}
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
