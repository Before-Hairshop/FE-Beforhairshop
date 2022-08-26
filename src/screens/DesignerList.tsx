import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";

import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import { scale, verticalScale } from "../utils/scale";

import Header from "../components/Header";
import GoBackIcon from "../assets/icons/goBack.svg";
import GoHomeIcon from "../assets/icons/goHome.svg";
import SearchIcon from "../assets/icons/search.svg";
import StarIcon from "../assets/icons/star.svg";

import DefaultDesignerImg from "../assets/images/default_designer.png";
import axios from "axios";

const HeaderContents = () => (
  <>
    <GoBackIcon />
    <GoHomeIcon />
  </>
);

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

const DesignerItem = data => (
  <View
    style={{
      width: "100%",
      height: verticalScale(141),
      paddingRight: scale(20),
      paddingLeft: scale(22),
      flexDirection: "row",
      alignItems: "center",
    }}>
    <Image
      source={DefaultDesignerImg}
      style={{
        width: "21%",
        height: verticalScale(70),
        borderRadius: 70,
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
      <View style={{ flexDirection: "row", marginBottom: verticalScale(8) }}>
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
          이안
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
          헤어샵 이름
        </Text>
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
        울산 남구 수암로 148 홈플러스 울산남구점 옥상층(5층)
      </Text>
      <View style={{ width: "100%", flexDirection: "row", flexWrap: "wrap" }}>
        <TagItem value="다운펌" />
        <TagItem value="남성컷" />
        <TagItem value="커트" />
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
        4.7
      </Text>
    </View>
  </View>
);

export default function Loading() {
  const [designerList, setDesignerList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDesignerList = async () => {
    try {
      setError(null);

      setLoading(true);

      const response = await axios.get(
        "http://localhost:8080/api/v1/hair-designers/list",
      );
      console.log(response.data.result.content);
      setDesignerList(response.data.result.content);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDesignerList();
  }, []);

  return (
    <ScrollView style={{ width: width, backgroundColor: "#191919" }}>
      <View
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
      </View>
      <View
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
          {/* <TextInput
            placeholder={"키워드를 검색해 주세요"}
            placeholderTextColor="#C8C8C8"
          /> */}
        </View>
      </View>
      <View>
        {designerList.map(item => (
          <DesignerItem data={item} />
        ))}
        <DesignerItem />
        <View
          style={{
            width: "100%",
            height: verticalScale(1),
            backgroundColor: "#333333",
          }}
        />
        <DesignerItem />
        <View
          style={{
            width: "100%",
            height: verticalScale(1),
            backgroundColor: "#333333",
          }}
        />
        <DesignerItem />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
