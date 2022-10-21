import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  FlatList,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

import { scale, verticalScale } from "../utils/scale";
import SimpleHeader from "../components/common/SimpleHeader";
import Contour from "../components/common/Contour";
import ListContour from "../components/recommendList/Contour";
import DownArrowIcon from "../assets/icons/common/down_arrow.svg";
import UpArrowIcon from "../assets/icons/common/up_arrow.svg";
import Recommendation from "../components/recommendList/Recommendation";
import { getRecommendListByUser } from "../api/getRecommendListByUser";
import { readData } from "../utils/asyncStorage";
import { getRecommendListByDesigner } from "../api/getRecommendListByDesigner";
import { useNavigation } from "@react-navigation/native";

export default function RecommendList({ route }) {
  const [approveIsOpen, setApproveIsOpen] = useState(false);
  const [pendingIsOpen, setPendingIsOpen] = useState(false);
  const [rejectIsOpen, setRejectIsOpen] = useState(false);
  const [recommendList, setRecommendList] = useState(undefined);
  const [designerFlag, setDesignerFlag] = useState(undefined);

  const navigation = useNavigation();

  async function fetchRecommendList() {
    setDesignerFlag(await readData("@DESIGNER_FLAG"));
    if ((await readData("@DESIGNER_FLAG")) == "0") {
      const response = await getRecommendListByUser();
      if (response.data.result == undefined) {
        Alert.alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
        navigation.navigate("Loading");
      } else if (response.data.status == "OK") {
        setRecommendList(response.data.result);
        console.log(response.data.result);
      }
    } else {
      const response = await getRecommendListByDesigner();
      if (response.data.result == undefined) {
        Alert.alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
        navigation.navigate("Loading");
      } else if (response.data.status == "OK") {
        setRecommendList(response.data.result);
        console.log(response.data.result);
      }
    }
  }

  useEffect(() => {
    fetchRecommendList();
  }, [route]);

  return (
    <SafeAreaView style={styles.frame}>
      {recommendList != undefined && (
        <SimpleHeader
          title={"스타일 추천서 " + "(" + recommendList.length + ")"}
          goBack="Main"
        />
      )}
      <Contour />
      <ScrollView>
        <TouchableOpacity
          style={{ height: verticalScale(65), alignItems: "center" }}
          onPress={() => {
            setApproveIsOpen(!approveIsOpen);
          }}>
          <View
            style={{
              width: "88.8%",
              height: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <View style={{ justifyContent: "center" }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontFamily: "Pretendard",
                    fontSize: scale(16),
                    fontWeight: "normal",
                    fontStyle: "normal",
                    textAlign: "left",
                    color: "#94D774",
                  }}>
                  {designerFlag != undefined &&
                    designerFlag == "1" &&
                    "수락된 "}
                  {designerFlag != undefined &&
                    designerFlag == "0" &&
                    "수락한 "}
                </Text>
                <Text
                  style={{
                    fontFamily: "Pretendard",
                    fontSize: scale(16),
                    fontWeight: "normal",
                    fontStyle: "normal",
                    textAlign: "left",
                    color: "#c8c8c8",
                  }}>
                  스타일 추천서
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: "center" }}>
              {approveIsOpen ? <UpArrowIcon /> : <DownArrowIcon />}
            </View>
          </View>
        </TouchableOpacity>
        {approveIsOpen && recommendList != undefined && (
          <>
            {recommendList
              .filter(item => item.recommendDto.recommendStatus == 2)
              .map((res, index) => (
                <Recommendation data={res} />
              ))}
          </>
        )}
        {/* {approveIsOpen &&
          approveList.map((data, index) => <Recommendation data={data} />)} */}
        <ListContour />
        <TouchableOpacity
          style={{ height: verticalScale(65), alignItems: "center" }}
          onPress={() => {
            setPendingIsOpen(!pendingIsOpen);
          }}>
          <View
            style={{
              width: "88.8%",
              height: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <View style={{ justifyContent: "center" }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontFamily: "Pretendard",
                    fontSize: scale(16),
                    fontWeight: "normal",
                    fontStyle: "normal",
                    textAlign: "left",
                    color: "#8097D2",
                  }}>
                  대기중인{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: "Pretendard",
                    fontSize: scale(16),
                    fontWeight: "normal",
                    fontStyle: "normal",
                    textAlign: "left",
                    color: "#c8c8c8",
                  }}>
                  스타일 추천서
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: "center" }}>
              {pendingIsOpen ? <UpArrowIcon /> : <DownArrowIcon />}
            </View>
          </View>
        </TouchableOpacity>
        {pendingIsOpen && recommendList != undefined && (
          <>
            {recommendList
              .filter(item => item.recommendDto.recommendStatus == 1)
              .map((res, index) => (
                <Recommendation data={res} />
              ))}
          </>
        )}
        {/* {pendingIsOpen && <Recommendation />} */}
        <ListContour />
        <TouchableOpacity
          style={{ height: verticalScale(65), alignItems: "center" }}
          onPress={() => {
            setRejectIsOpen(!rejectIsOpen);
          }}>
          <View
            style={{
              width: "88.8%",
              height: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <View style={{ justifyContent: "center" }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontFamily: "Pretendard",
                    fontSize: scale(16),
                    fontWeight: "normal",
                    fontStyle: "normal",
                    textAlign: "left",
                    color: "#9D2323",
                  }}>
                  {designerFlag != undefined &&
                    designerFlag == "1" &&
                    "거절된 "}
                  {designerFlag != undefined &&
                    designerFlag == "0" &&
                    "거절한 "}
                </Text>
                <Text
                  style={{
                    fontFamily: "Pretendard",
                    fontSize: scale(16),
                    fontWeight: "normal",
                    fontStyle: "normal",
                    textAlign: "left",
                    color: "#c8c8c8",
                  }}>
                  스타일 추천서
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: "center" }}>
              {rejectIsOpen ? <UpArrowIcon /> : <DownArrowIcon />}
            </View>
          </View>
        </TouchableOpacity>
        {rejectIsOpen && recommendList != undefined && (
          <>
            {recommendList
              .filter(item => item.recommendDto.recommendStatus == 0)
              .map((res, index) => (
                <Recommendation data={res} />
              ))}
          </>
        )}
        {/* {rejectIsOpen && <Recommendation />} */}
      </ScrollView>
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
