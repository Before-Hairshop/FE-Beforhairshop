import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  SafeAreaView,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { verticalScale, scale } from "../utils/scale";
import { useState } from "react";
import PlusIcon from "../assets/icons/plus.png";

import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import SimpleHeader from "../components/common/SimpleHeader";
import { postRecommendation } from "../api/postRecommendation";
import { postRecommendationImg } from "../api/postRecommendationImg";
import { resizeImage } from "../utils/resizeImage";
import Spinner from "../components/common/Spinner";
import CameraIcon from "../assets/icons/common/camera.png";
import GalleryIcon from "../assets/icons/common/gallery.png";

const baseImageURL = Image.resolveAssetSource(PlusIcon).uri;

export default function Answer({ route }) {
  const [suggestionList, setSuggestionList] = React.useState([
    {
      hairstyleName: "",
      reason: "",
      imageUrl: [],
      price: "",
    },
  ]);
  const [greetings, setGreetings] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();

  function sendRecommendation() {
    setLoading(true);
    console.log(greetings);
    console.log(suggestionList);
    console.log(route.params);
    console.log(route.params.treatmentDate.substring(0, 16));
    if (greetings == "") {
      Alert.alert("인사말을 적어주세요");
      setLoading(false);
    } else if (suggestionList[0].hairstyleName == "") {
      Alert.alert("추천 헤어스타일을 입력해주세요");
      setLoading(false);
    } else if (suggestionList[0].reason == "") {
      Alert.alert("추천 이유를 적어주세요");
      setLoading(false);
    } else if (suggestionList[0].price == "") {
      Alert.alert("제안 비용을 입력해주세요");
      setLoading(false);
    } else {
      suggestionList.map((data, index) => {
        console.log(data);
        postRecommendation(
          route.params.memberProfileId,
          greetings,
          data.hairstyleName,
          data.reason,
          data.price,
          route.params.treatmentDate.substring(0, 16),
        ).then(res => {
          console.log(res);
          if (res.data.result == undefined) {
            Alert.alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
            navigation.navigate("Loading", {
              reload: true,
            });
          } else if (res.data.status == "OK") {
            postRecommendationImg(res.data.result.id, data.imageUrl);
            // navigation.navigate("NewMain");
            navigation.reset({
              routes: [
                {
                  name: "NewMain",
                  params: { reload: true },
                },
              ],
            });
          } else {
            Alert.alert("요청에 실패했습니다.");
          }
          setLoading(false);
        });
      });
    }
  }

  const SuggestionItem = props => {
    return (
      <>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.SuggestionTitleText}>
            {/* 추천 {props.itemIndex + 1} */}
            추천
          </Text>

          {props.itemIndex == 0 ? null : (
            <TouchableOpacity
              style={{ marginVertical: verticalScale(42) }}
              onPress={() => {
                let newArray = [...suggestionList];
                newArray.splice(props.itemIndex, 1);
                setSuggestionList(newArray);
              }}>
              <Image
                source={require("../assets/icons/delete_icon.png")}
                style={{ width: verticalScale(300), aspectRatio: 1 }}></Image>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.itemTextStyle}>
          추천 헤어스타일을 입력해주세요<Text style={{ color: "red" }}> *</Text>
        </Text>

        <View style={styles.userTextUnderline}>
          <TextInput
            placeholder="예시) 포마드"
            placeholderTextColor="#555555"
            defaultValue={suggestionList[props.itemIndex].hairstyleName}
            onChangeText={text => {
              suggestionList[props.itemIndex].hairstyleName = text;
            }}
            style={styles.highlightText}
            autoCorrect={false}
          />
        </View>

        <Text style={styles.itemTextStyle}>
          해당 스타일을 추천한 이유를 적어주세요
          <Text style={{ color: "red" }}> *</Text>
        </Text>

        <View style={styles.userTextUnderline}>
          <TextInput
            placeholder="추천 이유를 적어주세요."
            placeholderTextColor="#555555"
            autoCorrect={false}
            defaultValue={suggestionList[props.itemIndex].reason}
            onChangeText={text => {
              suggestionList[props.itemIndex].reason = text;
              // let newArray = [...suggestionList];
              // console.log(newArray);
              // newArray[props.itemIndex].reason = text;
              // setSuggestionList(newArray);
            }}
            style={styles.highlightText}
          />
        </View>

        <Text style={styles.itemTextStyle}>
          추천 헤어스타일 이미지를 첨부해주세요
        </Text>

        <View style={{ flexDirection: "row" }}>
          {suggestionList[props.itemIndex].imageUrl.map((item, index) => {
            return (
              <HairImageButton
                itemIndex={index}
                suggestionIndex={props.itemIndex}
              />
            );
          })}

          {suggestionList[props.itemIndex].imageUrl.length < 3 ? (
            <HairImageAddButton suggestionIndex={props.itemIndex} />
          ) : null}
        </View>

        <Text style={styles.itemTextStyle}>
          제안 비용 (단위: 원)<Text style={{ color: "red" }}> *</Text>
        </Text>

        <View style={styles.userTextUnderline}>
          <TextInput
            autoCorrect={false}
            placeholder="예시) 30000"
            placeholderTextColor="#555555"
            style={styles.highlightText}
            // value={suggestionList[props.itemIndex].price}
            // onChangeText={e => {
            //   console.log(e);
            //   let newArray = [...suggestionList];
            //   newArray[props.itemIndex].price = e;
            //   setSuggestionList(newArray);
            // }}
            defaultValue={suggestionList[props.itemIndex].price}
            onChangeText={text => {
              suggestionList[props.itemIndex].price = text;
              // let newArray = [...suggestionList];
              // newArray[props.itemIndex].price = text;
              // setSuggestionList(newArray);
            }}
            keyboardType="numeric"
          />
        </View>
      </>
    );
  };

  const HairImageButton = props => {
    return (
      <TouchableOpacity
        style={styles.wantStyleImage}
        onPress={() => {
          let newArray = [...suggestionList];
          console.log(
            `index is ${props.itendex} suggestionIndex is ${props.suggestionIndex}`,
          );
          newArray[props.suggestionIndex].imageUrl.splice(props.itemIndex, 1);
          setSuggestionList(newArray);
          console.log(props.suggestionIndex, props.itemIndex);
        }}>
        <Image
          source={{
            uri: suggestionList[props.suggestionIndex].imageUrl[props.itemIndex]
              .uri,
          }}
          style={{ width: "100%", aspectRatio: 1 }}
        />
      </TouchableOpacity>
    );
  };

  const HairImageAddButton = props => {
    return (
      <>
        <Modal visible={visible} transparent={true}>
          <Pressable
            style={{
              backgroundColor: "rgba(12, 12, 12, 0.8)",
              width: "100%",
              height: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
            onPress={() => {
              setVisible(false);
            }}>
            <TouchableOpacity
              style={{
                width: "35%",
                height: verticalScale(70),
                borderRadius: 10,
                backgroundColor: "#2e2e2e",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
              onPress={async () => {
                const result = await launchCamera({
                  cameraType: "front",
                  presentationStyle: "fullScreen",
                  maxWidth: 1024,
                  maxHeight: 1024,
                });
                setVisible(false);
                const resize_result = await resizeImage(result.assets[0].uri);
                console.log(resize_result);
                let newArray = [...suggestionList];
                // const res = await fetch(result.assets[0].uri);
                // const blob = await res.blob();
                const res = await fetch(resize_result.uri);
                const blob = await res.blob();
                newArray[props.suggestionIndex].imageUrl.push({
                  // uri: result.assets[0].uri,
                  uri: resize_result.uri,
                  blob: blob,
                });
                setSuggestionList(newArray);
              }}>
              <Image
                source={CameraIcon}
                style={{ width: verticalScale(20), height: verticalScale(20) }}
              />
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: verticalScale(14),
                  fontWeight: "500",
                  fontStyle: "normal",
                  textAlign: "center",
                  color: "#a0a0a0",
                }}>
                {"  "}
                사진 촬영
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "35%",
                height: verticalScale(70),
                borderRadius: 10,
                backgroundColor: "#2e2e2e",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
              onPress={async () => {
                const result = await launchImageLibrary();
                setVisible(false);
                const resize_result = await resizeImage(result.assets[0].uri);
                console.log(resize_result);
                let newArray = [...suggestionList];
                // const res = await fetch(result.assets[0].uri);
                // const blob = await res.blob();
                const res = await fetch(resize_result.uri);
                const blob = await res.blob();
                newArray[props.suggestionIndex].imageUrl.push({
                  // uri: result.assets[0].uri,
                  uri: resize_result.uri,
                  blob: blob,
                });
                setSuggestionList(newArray);
              }}>
              <Image
                source={GalleryIcon}
                style={{ width: verticalScale(20), height: verticalScale(20) }}
              />
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: verticalScale(14),
                  fontWeight: "500",
                  fontStyle: "normal",
                  textAlign: "center",
                  color: "#a0a0a0",
                }}>
                {"  "}
                앨범 선택
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Modal>
        <TouchableOpacity
          style={styles.wantStyleImage}
          onPress={async () => {
            setVisible(true);
            // const result = await launchImageLibrary();
            // const resize_result = await resizeImage(result.assets[0].uri);
            // console.log(resize_result);
            // let newArray = [...suggestionList];
            // // const res = await fetch(result.assets[0].uri);
            // // const blob = await res.blob();
            // const res = await fetch(resize_result.uri);
            // const blob = await res.blob();
            // newArray[props.suggestionIndex].imageUrl.push({
            //   // uri: result.assets[0].uri,
            //   uri: resize_result.uri,
            //   blob: blob,
            // });
            // setSuggestionList(newArray);
          }}>
          <Image
            source={{ uri: baseImageURL }}
            style={{ width: "100%", aspectRatio: 1 }}
          />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.frame}>
      <SimpleHeader title="스타일 추천서" goBack="Main" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              marginTop: 12,
              alignItems: "flex-start",
              width: "88.9%",
              paddingBottom: verticalScale(300),
            }}>
            <Text style={styles.itemTextStyle}>
              인사말<Text style={{ color: "red" }}> *</Text>
            </Text>
            <View style={styles.userTextUnderline}>
              <TextInput
                placeholder="인사말을 작성해주세요."
                placeholderTextColor="#555555"
                defaultValue={greetings}
                onChangeText={text => {
                  setGreetings(text);
                }}
                style={styles.highlightText}
                autoCorrect={false}
              />
            </View>
            <Text style={styles.itemTextStyle}>
              시술 일정<Text style={{ color: "#cccccc" }}> * </Text>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: scale(10),
                  color: "#cccccc",
                }}>
                고객이 선택한 날짜이므로 변경은 불가합니다.
              </Text>
            </Text>
            <View style={styles.userTextUnderline}>
              <Text style={[styles.highlightText]}>
                {route.params.treatmentDate.substring(0, 4) +
                  "년 " +
                  route.params.treatmentDate.substring(5, 7) +
                  "월 " +
                  route.params.treatmentDate.substring(8, 10) +
                  "일 " +
                  route.params.treatmentDate.substring(11, 16)}
                {/* 2022년 5월 30일 PM 1:00 */}
              </Text>
            </View>
            <View style={{ width: "100%" }}>
              <>
                {suggestionList.map((item, index) => (
                  <SuggestionItem itemIndex={index} />
                ))}
                {/* <TouchableOpacity
                  style={{
                    alignItems: "center",
                    backgroundColor: "#2e2e2e",
                    padding: 10,
                    marginTop: verticalScale(25),
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    let newArray = [...suggestionList];
                    newArray.push({
                      hairstyleName: "",
                      reason: "",
                      imageUrl: [],
                      price: "",
                    });
                    setSuggestionList(newArray);
                  }}>
                  <Text style={{ fontSize: scale(14), color: "#a0a0a0" }}>
                    스타일 추천서 추가 +
                  </Text>
                </TouchableOpacity> */}
              </>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{ alignItems: "center", paddingBottom: verticalScale(20) }}>
        <TouchableOpacity
          style={{
            width: "88.9%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fc2a5b",
            height: verticalScale(55),
            borderRadius: 10,
          }}
          onPress={() => {
            sendRecommendation();
          }}>
          <Text style={{ fontSize: scale(16), color: "#ffffff" }}>보내기</Text>
        </TouchableOpacity>
      </View>
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
  itemTextStyle: {
    fontFamily: "Pretendard",
    fontSize: scale(16),

    marginBottom: verticalScale(10),
    marginTop: verticalScale(15),

    letterSpacing: 0,

    color: "#ffffff",
  },

  userTextUnderline: {
    borderBottomColor: "#373737",
    borderBottomWidth: 1,
    width: "100%",
  },

  highlightText: {
    fontFamily: "Pretendard",
    fontSize: scale(16),

    marginBottom: verticalScale(10),
    marginTop: verticalScale(15),
    color: "#ffffff",
  },

  SuggestionTitleText: {
    fontFamily: "Pretendard",
    fontSize: scale(25),

    color: "#ffffff",
    marginVertical: verticalScale(42),
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
});
