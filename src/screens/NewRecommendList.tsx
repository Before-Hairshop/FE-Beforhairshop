import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { verticalScale } from "../utils/scale";
import SimpleHeader from "../components/common/SimpleHeader";
import Contour from "../components/common/Contour";
import Recommendation from "../components/recommendList/Recommendation";
import { getRecommendListByUser } from "../api/getRecommendListByUser";
import { readData } from "../utils/asyncStorage";
import { getRecommendListByDesigner } from "../api/getRecommendListByDesigner";
import { useNavigation } from "@react-navigation/native";

export default function NewRecommendList({ route }) {
  const [recommendList, setRecommendList] = useState(undefined);
  const [designerFlag, setDesignerFlag] = useState(undefined);
  const [currentTab, setCurrentTab] = useState("pending");

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
      setCurrentTab("accept");
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
      {recommendList != undefined &&
      designerFlag != undefined &&
      designerFlag == "1" ? (
        <SimpleHeader
          title={"스타일 추천서 " + "(" + recommendList.length + ")"}
          goBack="Main"
        />
      ) : (
        <SimpleHeader title="스타일 추천서" goBack="Main" />
      )}
      <Contour />
      <View style={styles.button_container}>
        {designerFlag != undefined && designerFlag == "1" && (
          <TouchableOpacity
            style={[
              currentTab == "accept"
                ? styles.tab_button_on
                : styles.tab_button_off,
              { width: "33.3%" },
            ]}
            onPress={() => {
              setCurrentTab("accept");
            }}>
            <Text style={styles.tab_button_text}>수락</Text>
          </TouchableOpacity>
        )}
        {designerFlag != undefined && (
          <TouchableOpacity
            style={[
              currentTab == "pending"
                ? styles.tab_button_on
                : styles.tab_button_off,
              { width: designerFlag == "1" ? "33.3%" : "50%" },
            ]}
            onPress={() => {
              setCurrentTab("pending");
            }}>
            <Text style={styles.tab_button_text}>대기중</Text>
          </TouchableOpacity>
        )}
        {designerFlag != undefined && designerFlag == "0" && (
          <TouchableOpacity
            style={[
              currentTab == "accept"
                ? styles.tab_button_on
                : styles.tab_button_off,
              { width: "50%" },
            ]}
            onPress={() => {
              setCurrentTab("accept");
            }}>
            <Text style={styles.tab_button_text}>수락</Text>
          </TouchableOpacity>
        )}
        {designerFlag != undefined && designerFlag == "1" && (
          <TouchableOpacity
            style={[
              currentTab == "reject"
                ? styles.tab_button_on
                : styles.tab_button_off,
              { width: "33.3%" },
            ]}
            onPress={() => {
              setCurrentTab("reject");
            }}>
            <Text style={styles.tab_button_text}>거절</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView>
        <View
          style={{
            paddingTop: verticalScale(20),
            paddingBottom: verticalScale(60),
          }}>
          {currentTab == "accept" &&
            recommendList != undefined &&
            designerFlag != undefined && (
              <>
                {recommendList
                  .filter(
                    (item: { recommendDto: { recommendStatus: number } }) =>
                      item.recommendDto.recommendStatus == 2,
                  )
                  .map((res: any, index: any) => (
                    <Recommendation
                      data={res}
                      recommendList={recommendList}
                      setRecommendList={setRecommendList}
                      designerFlag={designerFlag}
                      status="accept"
                    />
                  ))}
              </>
            )}
          {currentTab == "pending" &&
            recommendList != undefined &&
            designerFlag != undefined && (
              <>
                {recommendList
                  .filter(
                    (item: { recommendDto: { recommendStatus: number } }) =>
                      item.recommendDto.recommendStatus == 1,
                  )
                  .map((res: any, index: any) => (
                    <Recommendation
                      data={res}
                      recommendList={recommendList}
                      setRecommendList={setRecommendList}
                      designerFlag={designerFlag}
                      status="pending"
                    />
                  ))}
              </>
            )}
          {currentTab == "reject" &&
            recommendList != undefined &&
            designerFlag != undefined && (
              <>
                {recommendList
                  .filter(
                    (item: { recommendDto: { recommendStatus: number } }) =>
                      item.recommendDto.recommendStatus == 0,
                  )
                  .map((res: any, index: any) => (
                    <Recommendation
                      data={res}
                      recommendList={recommendList}
                      setRecommendList={setRecommendList}
                      designerFlag={designerFlag}
                      status="reject"
                    />
                  ))}
              </>
            )}
        </View>
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
  button_container: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#191919",
  },
  tab_button_on: {
    paddingTop: verticalScale(17),
    paddingBottom: verticalScale(17),
    borderBottomColor: "#FC2A5B",
    borderBottomWidth: verticalScale(2),
  },
  tab_button_off: {
    paddingTop: verticalScale(17),
    paddingBottom: verticalScale(17),
    borderBottomColor: "#333333",
    borderBottomWidth: verticalScale(1),
  },
  tab_button_text: {
    fontFamily: "Pretendard",
    fontSize: verticalScale(16),
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#ffffff",
  },
});
