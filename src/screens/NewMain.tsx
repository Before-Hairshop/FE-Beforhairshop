import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import MainNavigateButton from "../components/main/MainNavigateButton";
import { scale, verticalScale } from "../utils/scale";
import DefaultPerson from "../assets/images/main/default_person.png";
import ToggleSwitch from "toggle-switch-react-native";
// import DefaultPerson2 from "../assets/images/main/popular_thumbnail.jpeg";

export default function NewMain() {
  const [toggle, setToggle] = useState(false);

  return (
    <View style={styles.frame}>
      <View
        style={{
          marginTop:
            Platform.OS === "ios" ? verticalScale(40) : verticalScale(0),
          height: verticalScale(70),
          alignItems: "center",
          justifyContent: "center",
        }}>
        <View
          style={{
            width: "89.4%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <View style={{ justifyContent: "center" }}>
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
              BEFORE HAIRSHOP
            </Text>
          </View>
          <TouchableOpacity>
            <Image
              source={DefaultPerson}
              style={{
                width: scale(40),
                height: scale(40),
                borderRadius: scale(20),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowRadius: 10,
                shadowOpacity: 1,
                borderWidth: 1,
                borderColor: "#545454",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={{ alignItems: "center" }}>
        <View
          style={{
            width: "89.4%",
            paddingTop: verticalScale(20),
            paddingBottom: verticalScale(20),
          }}>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: verticalScale(18),
              fontWeight: "bold",
              fontStyle: "normal",
              textAlign: "left",
              color: "#ffffff",
            }}>
            홍길동
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: verticalScale(20),
            }}>
            <View style={{ width: "27%" }}>
              <Image
                source={DefaultPerson}
                style={{ width: scale(70), height: scale(70) }}
              />
            </View>
            <View style={{ width: "73%", justifyContent: "space-around" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <View style={{ justifyContent: "center" }}>
                  <Text
                    style={{
                      fontFamily: "Pretendard",
                      fontSize: scale(15),
                      fontWeight: "500",
                      fontStyle: "normal",
                      letterSpacing: 0,
                      textAlign: "center",
                      color: "#c8c8c8",
                    }}>
                    모 발
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: 100,
                    backgroundColor: "#383838",
                    paddingTop: verticalScale(4),
                    paddingBottom: verticalScale(4),
                    paddingLeft: scale(7),
                    paddingRight: scale(7),
                  }}>
                  <Text
                    style={{
                      fontFamily: "Pretendard",
                      fontSize: scale(12),
                      fontWeight: "500",
                      fontStyle: "normal",
                      letterSpacing: -0.5,
                      textAlign: "center",
                      color: "#ffffff",
                    }}>
                    매우 건강
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <View style={{ justifyContent: "center" }}>
                  <Text
                    style={{
                      fontFamily: "Pretendard",
                      fontSize: scale(15),
                      fontWeight: "500",
                      fontStyle: "normal",
                      letterSpacing: 0,
                      textAlign: "center",
                      color: "#c8c8c8",
                    }}>
                    머리성향
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: 100,
                    backgroundColor: "#383838",
                    paddingTop: verticalScale(4),
                    paddingBottom: verticalScale(4),
                    paddingLeft: scale(7),
                    paddingRight: scale(7),
                  }}>
                  <Text
                    style={{
                      fontFamily: "Pretendard",
                      fontSize: scale(12),
                      fontWeight: "500",
                      fontStyle: "normal",
                      letterSpacing: -0.5,
                      textAlign: "center",
                      color: "#ffffff",
                    }}>
                    곱슬
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          width: "100%",
          height: verticalScale(10),
          backgroundColor: "#232323",
        }}
      />
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: "89.4%",
            height: verticalScale(61),
            justifyContent: "center",
          }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text
              style={{
                fontFamily: "Pretendard",
                fontSize: verticalScale(15),
                fontWeight: "500",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "left",
                color: "#c8c8c8",
              }}>
              원하는 헤어 스타일
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  borderRadius: 100,
                  backgroundColor: "#ff2b64",
                  paddingTop: verticalScale(4),
                  paddingBottom: verticalScale(4),
                  paddingLeft: scale(7),
                  paddingRight: scale(7),
                  justifyContent: "center",
                }}>
                <Text
                  style={{
                    fontFamily: "Pretendard",
                    fontSize: scale(12),
                    fontWeight: "500",
                    fontStyle: "normal",
                    letterSpacing: -0.5,
                    textAlign: "center",
                    color: "#ffffff",
                  }}>
                  CS 컬펌
                </Text>
              </View>
              <View
                style={{
                  borderRadius: 100,
                  backgroundColor: "#ff2b64",
                  paddingTop: verticalScale(4),
                  paddingBottom: verticalScale(4),
                  paddingLeft: scale(7),
                  paddingRight: scale(7),
                  justifyContent: "center",
                }}>
                <Text
                  style={{
                    fontFamily: "Pretendard",
                    fontSize: scale(12),
                    fontWeight: "500",
                    fontStyle: "normal",
                    letterSpacing: -0.5,
                    textAlign: "center",
                    color: "#ffffff",
                  }}>
                  세팅펌
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "89.4%",
            height: verticalScale(1),
            backgroundColor: "#232323",
          }}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: "89.4%",
            height: verticalScale(61),
            justifyContent: "center",
          }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text
              style={{
                fontFamily: "Pretendard",
                fontSize: verticalScale(15),
                fontWeight: "500",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "left",
                color: "#c8c8c8",
              }}>
              원하는 헤어 스타일
            </Text>
            <Text
              style={{
                fontFamily: "Pretendard",
                fontSize: verticalScale(15),
                fontWeight: "bold",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "right",
                color: "#c8c8c8",
              }}>
              159,000원
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "89.4%",
            height: verticalScale(1),
            backgroundColor: "#232323",
          }}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: "89.4%",
            height: verticalScale(61),
            justifyContent: "center",
          }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text
              style={{
                fontFamily: "Pretendard",
                fontSize: verticalScale(15),
                fontWeight: "500",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "left",
                color: "#c8c8c8",
              }}>
              매칭 제안 받기
            </Text>
            <ToggleSwitch
              isOn={toggle}
              onColor="green"
              offColor="red"
              size="medium"
              onToggle={() => {
                console.log("change state");
                setToggle(!toggle);
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: "89.4%",
            height: verticalScale(1),
            backgroundColor: "#232323",
          }}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={{
            borderRadius: 15,
            backgroundColor: "#0c0c0c",
            shadowColor: "rgba(0, 0, 0, 0.25)",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowRadius: 10,
            shadowOpacity: 1,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0)",
          }}></TouchableOpacity>
      </View>
    </View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Title: {
    width: 164,
    height: 21,
    fontFamily: "Pretendard-Bold",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.07,
    textAlign: "left",
    color: "#ffffff",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#e4dcca",
  },
  slide2: {
    flex: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fcf1f0",
  },
  slide3: {
    flex: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
