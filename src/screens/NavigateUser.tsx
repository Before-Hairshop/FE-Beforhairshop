import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar } from "@rneui/themed";

import MainNavigateButton from "../components/main/MainNavigateButton";
import { Switch } from "react-native-switch";
import Header from "../components/Header";
import { scale, verticalScale } from "../utils/scale";
const MAINCOLOR = "#fc2a5b";

export default function Main(props) {
  const [isSuggestionEnabled, setIsSuggestionEnabled] = useState(true);
  const HeaderContents = () => (
    <>
      <Text
        style={{
          width: scale(164),
          height: verticalScale(21),
          fontFamily: "Pretendard-Bold",
          fontSize: verticalScale(18),
          fontWeight: "bold",
          fontStyle: "normal",
          letterSpacing: 0.07,
          textAlign: "left",
          color: "#ffffff",
        }}>
        BEFORE HAIRSHOP
      </Text>
      <Avatar
        activeOpacity={0.2}
        avatarStyle={{}}
        containerStyle={{ backgroundColor: "#BDBDBD" }}
        icon={{}}
        iconStyle={{}}
        imageProps={{}}
        onLongPress={() => alert("onLongPress")}
        onPress={() => alert("onPress")}
        overlayContainerStyle={{}}
        placeholderStyle={{}}
        rounded
        title="P"
        titleStyle={{}}
      />
    </>
  );

  return (
    <View style={styles.mainView}>
      <Header contents={<HeaderContents></HeaderContents>}></Header>

      <View style={styles.tabMenu}>
        <Text style={styles.profileText}>원하는 헤어스타일</Text>
        <View
          style={{
            borderColor: MAINCOLOR,
            borderWidth: 1,
            borderRadius: scale(16),
            paddingHorizontal: scale(10),
            marginRight: scale(10),
            backgroundColor: MAINCOLOR,
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}>
            <Text style={{ color: "#ffffff" }}>{"asdf"}</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          width: 335,

          height: 1,

          backgroundColor: "#232323",
        }}></View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: verticalScale(23),
        }}>
        <Text style={styles.profileText}>지불 가능 비용 </Text>
        <Text style={[styles.profileText, { fontWeight: "bold" }]}>
          159,000원
        </Text>
      </View>

      <View
        style={{
          width: "100%",

          height: 1,

          backgroundColor: "#232323",
        }}></View>

      <View style={styles.tabMenu}>
        <Text style={styles.profileText}>매칭 제안 받기</Text>
        <Switch
          value={isSuggestionEnabled}
          onValueChange={val => console.log(val)}
          disabled={false}
          activeText={"On"}
          inActiveText={"Off"}
          circleSize={30}
          barHeight={1}
          circleBorderWidth={3}
          backgroundActive={"green"}
          backgroundInactive={"gray"}
          circleActiveColor={"#30a566"}
          circleInActiveColor={"#000000"}
          changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
          innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
          outerCircleStyle={{}} // style for outer animated circle
          renderActiveText={false}
          renderInActiveText={false}
          switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
          switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
          switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
          switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
        />
      </View>

      <MainNavigateButton
        text={["나에게 어울리는 스타일을 찾아", "헤어스타일 체험"]}
        icon={require(`../assets/images/main/VirtualStylingIcon.png`)}></MainNavigateButton>

      <MainNavigateButton
        text={["맞춤형 서비스를 위한", "헤어 디자이너"]}
        icon={require(`../assets/images/main/HairDesignerIcon.png`)}></MainNavigateButton>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingHorizontal: 20,

    backgroundColor: "#191919",
  },

  profileText: {
    fontFamily: "Pretendard",

    fontSize: scale(15),

    textAlign: "left",

    color: "#c8c8c8",
  },

  tabMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: verticalScale(23),
  },
});
