import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ImageBackground,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useEffect } from "react";
import GoBackIcon from "../assets/icons/goBack.svg";
import { useState } from "react";

import PlusIcon from "../assets/icons/plus.png";
import DesignerImage from "../assets/images/default_designer.png";
import { verticalScale, scale } from "../utils/scale";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
// import { AirbnbRating, Rating } from "react-native-ratings";
import { Rating, AirbnbRating } from "react-native-ratings";
import StarImage from "../assets/icons/star_empty.png";
import StarIcon from "../assets/icons/star.svg";
import { Platform } from "react-native";
import WantedStyleButton from "../components/common/WantedStyleButton";
import WantedStyleUploadButton from "../components/common/WantedStyleUploadButton";

import HairButton from "../components/UserProfile/HairButton";

import Icon from "react-native-vector-icons/Ionicons";

import StarRating from "../components/common/StarRating";
import ComplexityHeader from "../components/common/ComplexityHeader";
import { postReview } from "../api/postReview";
import { postReviewImg } from "../api/postReviewImg";
import Spinner from "../components/common/Spinner";

const BASEWIDTH = 375;
const BASEPADDING = 20;
const numberOfLines = 4;
const MAINCOLOR = "#fc2a5b";
const GRAYCOLOR = "#555555";
const TEXTCOLOR = "#CCCCCC";

const YellowStar = () => (
  <View style={styles.star}>
    <StarIcon fill="#ffce00" width={35} height={35}></StarIcon>
  </View>
);

const GreyStar = () => (
  <View style={styles.star}>
    <StarIcon fill="#191919" stroke="#555555" scale={22} />
  </View>
);

const baseImageURL = Image.resolveAssetSource(PlusIcon).uri;
const designerImageURL = Image.resolveAssetSource(DesignerImage).uri;
const HeaderContents = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={{ flex: 1 }}>
        <GoBackIcon />
      </View>
      <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "Pretendard-Bold",
            fontSize: verticalScale(18),
            fontWeight: "bold",
            fontStyle: "normal",
            letterSpacing: 0.07,
            textAlign: "left",
            color: "#ffffff",
          }}>
          리뷰 작성
        </Text>
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <Text style={{ color: MAINCOLOR }}>등록</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default function Review({ route }) {
  const resultLevel = ["별로에요", "그저 그랬어요", "만족스러워요"];
  const numHairRating = 3;
  const numDesignerRating = 3;
  const [hairRating, setHairRating] = useState(-1);
  const [starScore, setStarScore] = useState(0);
  const [designerRating, setDesignerRating] = useState(-1);
  const [review, setReview] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [hairTag, setHairTag] = useState([]);
  const [hairImage, setHairImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const HairTagButton = ({ index }) => {
    return (
      <TouchableOpacity
        style={{
          borderColor: MAINCOLOR,
          borderWidth: 1,
          borderRadius: scale(16),
          paddingHorizontal: scale(10),
          marginRight: scale(10),
        }}
        onPress={() => {
          let newArray = [...hairTag];
          newArray.splice(index, 1);
          setHairTag(newArray);
        }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}>
          <Text style={{ color: MAINCOLOR }}>{hairTag[index].hashtag}</Text>
          <Icon
            name="close-outline"
            color={MAINCOLOR}
            style={{ fontSize: verticalScale(35) }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  async function saveReview() {
    setLoading(true);
    console.log(starScore);
    console.log(hairRating);
    console.log(designerRating);
    console.log(review);
    console.log(hairTag);
    console.log(hairImage);
    if (starScore == 0) {
      Alert.alert("별점을 등록해주세요");
      setLoading(false);
    } else if (hairRating == -1) {
      Alert.alert("시술 만족도를 선택해주세요");
      setLoading(false);
    } else if (designerRating == -1) {
      Alert.alert("디자이너 만족도를 선택해주세요");
      setLoading(false);
    } else if (review == "") {
      Alert.alert("후기를 남겨주세요");
      setLoading(false);
    } else if (hairTag.length == 0) {
      Alert.alert("시술 받은 스타일을 입력해주세요");
      setLoading(false);
    } else {
      const result = await postReview(
        route.params.designerId,
        starScore,
        hairRating + 1,
        designerRating + 1,
        review,
        hairTag,
      );
      console.log(result);
      if (result.data.result == undefined) {
        Alert.alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
        navigation.navigate("Loading", {
          reload: true,
        });
      } else if (result.data.status == "OK") {
        const res = await postReviewImg(result.data.result.id, hairImage);
        console.log(res);
        if (res.data.status == "OK") {
          navigation.navigate("NewMain");
        } else {
          Alert.alert("요청에 실패했습니다.");
        }
      } else {
        Alert.alert("요청에 실패했습니다.");
      }
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.frame}>
      <ComplexityHeader
        title="리뷰 작성"
        goBack="Main"
        button={
          <TouchableOpacity
            onPress={() => {
              saveReview();
            }}>
            <Text
              style={{
                fontFamily: "Pretendard",
                fontSize: scale(16),
                fontWeight: "500",
                fontStyle: "normal",
                letterSpacing: -0.5,
                textAlign: "left",
                color: "#fc2a5b",
              }}>
              등록
            </Text>
          </TouchableOpacity>
        }
      />
      {/* <Header contents={<HeaderContents></HeaderContents>}></Header> */}
      <ScrollView>
        <View
          style={{ alignItems: "center", paddingBottom: verticalScale(300) }}>
          <View style={{ width: "88.9%" }}>
            <View style={{ alignItems: "center", margin: verticalScale(10) }}>
              <ImageBackground
                source={{ uri: route.params.designerImg }}
                style={{
                  width: scale(150),
                  aspectRatio: 1,
                  marginHorizontal: verticalScale(6),
                  borderRadius: 100,
                  overflow: "hidden",
                  borderWidth: 2,
                  borderColor: "#373737",
                }}>
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: verticalScale(13),
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}>
                  <Text style={styles.profileImageFont}>
                    {route.params.designerName}
                  </Text>
                </View>
              </ImageBackground>

              <View style={{ paddingTop: verticalScale(25) }}>
                <Text style={styles.profileImageFont}>
                  전체적인 서비스에 대해{" "}
                </Text>
                <Text style={[styles.profileImageFont, { fontWeight: "bold" }]}>
                  평가해주세요.<Text style={{ color: "red" }}> *</Text>
                </Text>
              </View>

              <StarRating
                size={scale(32)}
                containerStyle={{ marginTop: verticalScale(14) }}
                score={starScore}
                setScoreFunction={setStarScore}
                isTouchable={true}></StarRating>
            </View>

            <View style={{ marginTop: 12 }}>
              <Text style={[styles.itemTextStyle]}>
                헤어 시술 결과가 만족스러우신가요?
                <Text style={{ color: "red" }}> *</Text>
              </Text>

              <View style={{ flexDirection: "row" }}>
                {resultLevel.map((item, index) => {
                  return (
                    <HairButton
                      width={scale(
                        (BASEWIDTH - BASEPADDING * 2) / numHairRating,
                      )}
                      content={resultLevel[index]}
                      isActive={index == hairRating}
                      onPressActive={() => setHairRating(index)}
                      onPressDeactive={() => setHairRating(-1)}></HairButton>
                  );
                })}
              </View>
            </View>

            <View style={{ marginTop: 12 }}>
              <Text style={[styles.itemTextStyle]}>
                헤어디자이너가 친절했나요?
                <Text style={{ color: "red" }}> *</Text>
              </Text>

              <View style={{ flexDirection: "row" }}>
                {resultLevel.map((item, index) => {
                  return (
                    <HairButton
                      width={scale(
                        (BASEWIDTH - BASEPADDING * 2) / numDesignerRating,
                      )}
                      content={resultLevel[index]}
                      isActive={index == designerRating}
                      onPressActive={() => setDesignerRating(index)}
                      onPressDeactive={() =>
                        setDesignerRating(-1)
                      }></HairButton>
                  );
                })}
              </View>
            </View>

            <View style={{ marginTop: 12 }}>
              <Text style={styles.itemTextStyle}>
                후기<Text style={{ color: "red" }}> *</Text>
              </Text>
              <TextInput
                value={review}
                onChangeText={text => setReview(text)}
                placeholder="자유롭게 작성해주세요."
                multiline
                placeholderTextColor={GRAYCOLOR}
                numberOfLines={Platform.OS === "ios" ? null : numberOfLines}
                minHeight={
                  Platform.OS === "ios" && numberOfLines
                    ? 20 * numberOfLines
                    : null
                }
                textAlignVertical="top"
                style={styles.highlightText}
                autoCorrect={false}
              />
            </View>

            <View style={{ marginTop: 12, alignItems: "flex-start" }}>
              <Text style={styles.itemTextStyle}>
                시술 받은 스타일<Text style={{ color: "red" }}> *</Text>
              </Text>
              <View
                style={[
                  styles.userTextUnderline,
                  { flexDirection: "row", justifyContent: "space-between" },
                ]}>
                <TextInput
                  placeholder="#태그"
                  placeholderTextColor={GRAYCOLOR}
                  value={tagInput}
                  onChangeText={text => setTagInput(text)}
                  // onEndEditing={e => {
                  //   let newHairTagArray = [...hairTag];
                  //   newHairTagArray.push(e.nativeEvent.text);

                  //   setHairTag(newHairTagArray);
                  //   setTagInput("");
                  // }}
                  autoCorrect={false}
                  style={[styles.inputText]}
                />
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    paddingBottom: verticalScale(10),
                    paddingTop: verticalScale(15),
                  }}
                  onPress={() => {
                    let newHairTagArray = [...hairTag];
                    newHairTagArray.push({ hashtag: tagInput });
                    setHairTag(newHairTagArray);
                    setTagInput("");
                  }}>
                  <Text
                    style={{
                      fontFamily: "Pretendard",
                      fontSize: scale(14),
                      fontWeight: "bold",
                      fontStyle: "normal",
                      textAlign: "left",
                      color: "#fc2a5b",
                    }}>
                    + 추가
                  </Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  paddingTop: verticalScale(13),
                  margin: verticalScale(5),
                }}
                contentContainerStyle={{
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                {hairTag.map((item, index) => {
                  return <HairTagButton index={index}></HairTagButton>;
                })}
              </ScrollView>
            </View>

            <View style={{ marginTop: 12, alignItems: "flex-start" }}>
              <Text style={styles.itemTextStyle}>시술 후 이미지</Text>
              <View
                style={{ flexDirection: "row", marginTop: verticalScale(12) }}>
                {hairImage.map((item, index) => {
                  return (
                    <WantedStyleButton
                      index={index}
                      array={hairImage}
                      setArray={setHairImage}
                      style={styles.wantStyleImage}></WantedStyleButton>
                  );
                })}

                {hairImage.length < 3 ? (
                  <WantedStyleUploadButton
                    array={hairImage}
                    setArray={setHairImage}
                    style={styles.wantStyleImage}></WantedStyleUploadButton>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fc2a5b",

          marginTop: verticalScale(25),
          marginBottom: verticalScale(50),
          height: verticalScale(55),
          borderRadius: 10,
        }}
        onPress={() => {
          navigation.navigate("DesignerRegistration");
        }}>
        <Text style={{ fontSize: scale(16), color: "#ffffff" }}>
          메시지 보내기
        </Text>
      </TouchableOpacity> */}
      {loading && <Spinner />}
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
  mainView: {
    flex: 1,
    paddingHorizontal: 20,

    backgroundColor: "#191919",
  },

  profileImageFont: {
    fontFamily: "Pretendard",
    fontSize: scale(16),
    textAlign: "center",
    color: "#ffffff",
  },
  itemTextStyle: {
    fontFamily: "Pretendard",
    fontSize: scale(16),

    marginBottom: verticalScale(10),
    marginTop: verticalScale(15),

    letterSpacing: 0,

    color: "#ffffff",
  },

  highlightText: {
    fontFamily: "Pretendard",
    fontSize: scale(16),

    marginBottom: verticalScale(10),
    marginTop: verticalScale(15),
    color: TEXTCOLOR,
  },

  userTextUnderline: {
    borderBottomColor: "#373737",
    borderBottomWidth: 1,
    width: "100%",
  },

  inputText: {
    fontFamily: "Pretendard",
    fontSize: scale(16),

    margin: 0,
    padding: 0,
    // textAlignVertical: "baseline",

    marginBottom: verticalScale(10),
    marginTop: verticalScale(15),
    color: "#cccccc",
  },
  wantStyleImage: {
    width: "30%",
    aspectRatio: 1,
    marginHorizontal: verticalScale(6),
    borderRadius: 10,

    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#373737",
  },

  review_star_container: {
    flexDirection: "row",
    marginBottom: verticalScale(10),
  },

  star: {
    padding: verticalScale(3),
  },

  designerName: {
    fontFamily: "Pretendard",
    fontSize: scale(32),
    textAlign: "center",
    color: "#ffffff",
  },
});
