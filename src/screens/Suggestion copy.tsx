import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import GoBackIcon from "../assets/icons/goBack.svg";
import { verticalScale, scale } from "../utils/scale";
import Header from "../components/Header";
import { useState } from "react";
import PlusIcon from "../assets/icons/plus.png";

import { launchImageLibrary } from "react-native-image-picker";

const baseImageURL = Image.resolveAssetSource(PlusIcon).uri;

const MAINCOLOR = "#fc2a5b";
const HeaderContents = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={{ flex: 1 }}>
        <GoBackIcon />
      </View>
      <View
        style={{ flex: 10, justifyContent: "center", alignItems: "center" }}>
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
          [홍길동] 스타일 추천서
        </Text>
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}></View>
    </>
  );
};

export default function Suggestion() {
  const [suggestionList, setSuggestionList] = useState([
    {
      hairstyleName: "",
      reason: "",
      imageUrl: [],
      price: "",
    },
  ]);

  const SuggestionItem = props => {
    return (
      <>
        <Text style={styles.SuggestionTitleText}>
          추천 {props.itemIndex + 1}
        </Text>

        <Text style={styles.itemTextStyle}>
          추천 헤어스타일을 입력해주세요.
        </Text>

        <View style={styles.userTextUnderline}>
          <TextInput
            placeholder="예시) 포마드, 투블럭, C컬펌"
            placeholderTextColor="#555555"
            value={suggestionList[props.itemIndex].hairstyleName}
            onChangeText={text => {
              let newArray = [...suggestionList];
              console.log(newArray);
              newArray[props.itemIndex].hairstyleName = text;
              setSuggestionList(newArray);
            }}
            autoCorrect={false}
            style={styles.highlightText}></TextInput>
        </View>

        <Text style={styles.itemTextStyle}>
          해당 스타일을 추천한 이유를 적어주세요.
        </Text>

        <View style={styles.userTextUnderline}>
          <TextInput
            placeholder="추천 이유를 적어주세요."
            placeholderTextColor="#555555"
            autoCorrect={false}
            onChangeText={text => {
              let newArray = [...suggestionList];
              console.log(newArray);
              newArray[props.itemIndex].reason = text;
              setSuggestionList(newArray);
            }}
            style={styles.highlightText}></TextInput>
        </View>

        <Text style={styles.itemTextStyle}>
          (선택) 추천 헤어스타일 이미지를 첨부해주세요.
        </Text>

        <View style={{ flexDirection: "row" }}>
          {suggestionList[props.itemIndex].imageUrl.map((item, index) => {
            return (
              <HairImageButton
                itemIndex={index}
                suggestionIndex={props.itemIndex}></HairImageButton>
            );
          })}

          {suggestionList[props.itemIndex].imageUrl.length < 3 ? (
            <HairImageAddButton
              suggestionIndex={props.itemIndex}></HairImageAddButton>
          ) : null}
        </View>

        {/* <View style={styles.userTextUnderline}>
          <TextInput
            placeholder="추천 이유를 적어주세요."
            placeholderTextColor="#555555"
            style={styles.highlightText}></TextInput>
        </View> */}

        <Text style={styles.itemTextStyle}>제안 비용</Text>

        <View style={styles.userTextUnderline}>
          <TextInput
            autoCorrect={false}
            placeholder="예시) 30000"
            placeholderTextColor="#555555"
            style={styles.highlightText}
            onBlur={e => {
              console.log(e.nativeEvent.text);

              let newArray = [...suggestionList];
              console.log(newArray);
              newArray[props.itemIndex].price = e.nativeEvent.text;
              console.log(newArray);
              // setSuggestionList(newArray);
            }}
            // onChangeText={text => {
            //   let newArray = [...suggestionList];
            //   console.log(newArray);
            //   newArray[props.itemIndex].price = text;
            //   setSuggestionList(newArray);}}
          ></TextInput>
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
            uri: suggestionList[props.suggestionIndex].imageUrl[
              props.itemIndex
            ],
          }}
          style={{ width: "100%", aspectRatio: 1 }}
        />
      </TouchableOpacity>
    );
  };

  const HairImageAddButton = props => {
    return (
      <TouchableOpacity
        style={styles.wantStyleImage}
        onPress={async () => {
          const result = await launchImageLibrary();
          console.log(result);
          let newArray = [...suggestionList];
          console.log(props.suggestionIndex);
          console.log(newArray);
          newArray[props.suggestionIndex].imageUrl.push(result.assets[0].uri);
          setSuggestionList(newArray);
          console.log(props.suggestionIndex, props.itemIndex);
        }}>
        <Image
          source={{ uri: baseImageURL }}
          style={{ width: "100%", aspectRatio: 1 }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.mainView}>
      <Header contents={<HeaderContents></HeaderContents>}></Header>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={{ marginTop: 12, alignItems: "flex-start" }}>
          <Text style={styles.itemTextStyle}>인사말 </Text>

          <View style={styles.userTextUnderline}>
            <TextInput
              placeholder="인사말을 작성해주세요."
              placeholderTextColor="#555555"
              style={styles.highlightText}></TextInput>
          </View>

          <View style={{ width: "100%" }}>
            <>
              {suggestionList.map((item, index) => {
                return <SuggestionItem itemIndex={index} key={index} />;
              })}
              <TouchableOpacity
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
              </TouchableOpacity>
            </>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
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
          console.log(suggestionList);
        }}>
        <Text style={{ fontSize: scale(16), color: "#ffffff" }}>
          메시지 보내기
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    color: "#fc2a5b",
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
