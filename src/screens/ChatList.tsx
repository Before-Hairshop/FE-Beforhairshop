import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import { scale, verticalScale } from "../utils/scale";
import SimpleHeader from "../components/common/SimpleHeader";
import Contour from "../components/common/Contour";
import DefaultDesignerImg from "../assets/images/default_designer.png";

export default function ChatList() {
  const ChatItem = () => (
    <TouchableOpacity
      style={{ height: verticalScale(141), alignItems: "center" }}>
      <View
        style={{
          width: "88.2%",
          height: "100%",
          flexDirection: "row",
        }}>
        <View
          style={{ width: "23%", height: "100%", justifyContent: "center" }}>
          <Image
            source={DefaultDesignerImg}
            style={{
              width: scale(70),
              height: scale(70),
              borderRadius: scale(35),
              borderWidth: 1,
              borderColor: "#373737",
            }}
            resizeMode={"cover"}
          />
        </View>
        <View
          style={{
            width: "60%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <View style={{ width: "93%" }}>
            <Text
              style={{
                fontFamily: "Pretendard",
                fontSize: 15,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "left",
                color: "#ffffff",
              }}>
              홍길동
            </Text>
            <Text
              style={{
                fontFamily: "Pretendard",
                fontSize: 12,
                fontWeight: "normal",
                fontStyle: "normal",
                lineHeight: 16,
                letterSpacing: 0,
                textAlign: "left",
                color: "rgba(255, 255, 255, 0.7)",
                marginTop: verticalScale(8),
              }}>
              투블럭이 하고 싶어요
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "17%",
            height: "100%",
            paddingTop: verticalScale(29),
          }}>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: 10,
              fontWeight: "normal",
              fontStyle: "italic",
              lineHeight: 12,
              letterSpacing: 0,
              textAlign: "right",
              color: "rgba(255, 255, 255, 0.7)",
            }}>
            오후 11:30
          </Text>
          <View
            style={{
              width: "100%",
              marginTop: verticalScale(6),
              alignItems: "flex-end",
            }}>
            <View
              style={{
                width: scale(25),
                height: scale(25),
                borderRadius: scale(12.5),
                backgroundColor: "#fc2a5b",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: 12,
                  fontWeight: "normal",
                  fontStyle: "italic",
                  letterSpacing: 0,
                  color: "#ffffff",
                }}>
                2
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#191919",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowRadius: 4,
        shadowOpacity: 1,
      }}>
      <SimpleHeader title="채팅 목록" goBack="Main" />
      <Contour />
      <ScrollView>
        <ChatItem />
        <Contour style={{ opacity: 0.1 }} />
        <ChatItem />
        <Contour style={{ opacity: 0.1 }} />
        <ChatItem />
        <Contour style={{ opacity: 0.1 }} />
        <ChatItem />
        <Contour style={{ opacity: 0.1 }} />
        <ChatItem />
        <Contour style={{ opacity: 0.1 }} />
        <ChatItem />
        <Contour style={{ opacity: 0.1 }} />
        <ChatItem />
        <Contour style={{ opacity: 0.1 }} />
        <ChatItem />
        <Contour style={{ opacity: 0.1 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
