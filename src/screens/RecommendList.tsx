import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";

import { scale, verticalScale } from "../utils/scale";
import SimpleHeader from "../components/common/SimpleHeader";
import Contour from "../components/common/Contour";
import ListContour from "../components/recommendList/Contour";
import DownArrowIcon from "../assets/icons/common/down_arrow.svg";
import UpArrowIcon from "../assets/icons/common/up_arrow.svg";
import Recommendation from "../components/recommendList/Recommendation";
import { getRecommendList } from "../api/getRecommendList";

export default function RecommendList() {
  const [approveIsOpen, setApproveIsOpen] = useState(false);
  const [pendingIsOpen, setPendingIsOpen] = useState(false);
  const [rejectIsOpen, setRejectIsOpen] = useState(false);
  const [recommendList, setRecommendList] = useState([]);
  const [approveList, setApproveList] = useState([1, 2]);
  const [pendingList, setPendingList] = useState([1, 2]);
  const [rejectList, setRejectList] = useState([1, 2]);
  const [pageNum, setPageNum] = useState(0);

  async function fetchRecommendList() {
    const response = await getRecommendList(pageNum);
    console.log(response);
  }

  useEffect(() => {
    fetchRecommendList();
  }, []);

  return (
    <SafeAreaView style={styles.frame}>
      <SimpleHeader title="스타일 추천서" goBack="Main" />
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
                  수락된{" "}
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
        {approveIsOpen && <Recommendation />}
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
        {pendingIsOpen && <Recommendation />}
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
                  거절된{" "}
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
        {rejectIsOpen && <Recommendation />}
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
