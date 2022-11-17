import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { scale, verticalScale } from "../utils/scale";
import DefaultPerson from "../assets/images/mypage/default_profile.png";
import ToggleSwitch from "toggle-switch-react-native";
// import DefaultPerson2 from "../assets/images/main/popular_thumbnail.jpeg";
import ChatIcon from "../assets/icons/main/chat.svg";
import RightArrowIcon from "../assets/icons/common/arrow.svg";
import DesignerIcon from "../assets/icons/main/designer.svg";
import VirtualIcon from "../assets/icons/main/virtual.svg";
import BigContour from "../components/common/BigContour";
import { readData, storeData } from "../utils/asyncStorage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getUserProfile } from "../api/getUserProfile";
import { getDesignerProfile } from "../api/getDesignerProfile";
import { patchUserMatchingActive } from "../api/patchUserMatchingActive";
import { patchUserMatchingDeactive } from "../api/patchUserMatchingDeactive";
import { getMemberInfo } from "../api/getMemberInfo";
import Spinner from "../components/common/Spinner";

const hairConditionType = ["", "많이 상했어요", "보통이에요", "매우 건강해요"];
const hairTendencyType = [
  "",
  "악성 곱슬",
  "심한 곱슬",
  "반곱슬",
  "반직모",
  "직모",
];

const Header = props => (
  <View
    style={{
      marginTop: Platform.OS === "ios" ? verticalScale(40) : verticalScale(0),
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
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("Mypage", {
            data: props.profileData,
          });
        }}>
        <Image
          source={{
            uri: props.profileImg + "?" + new Date(),
          }}
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
            borderColor: "#191919",
          }}
        />
      </TouchableOpacity>
    </View>
  </View>
);

const MainProfile = props => (
  <>
    <TouchableOpacity
      style={{ alignItems: "center" }}
      onPress={() => {
        if (props.designerFlag == "1") {
          props.navigation.navigate("DesignerProfile", {
            designerId: props.profileData.hairDesignerId,
          });
        } else {
          props.navigation.navigate("UserProfileLookup", {
            userProfileId: props.profileData.id,
          });
        }
      }}>
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
          {props.profileData.name}
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: verticalScale(15),
              fontWeight: "bold",
              fontStyle: "normal",
              textAlign: "left",
              color: "#ffffff",
            }}>
            {props.designerFlag == "1" ? " 디자이너 " : ""}
          </Text>
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: verticalScale(20),
          }}>
          <View style={{ width: "27%" }}>
            <Image
              // key={props.profileImg + new Date().getTime()}
              source={{
                uri: props.profileImg + "?" + new Date(),
              }}
              style={{
                width: scale(70),
                height: scale(70),
                borderRadius: scale(35),
                borderWidth: scale(1),
                borderColor: "#323232",
              }}
            />
          </View>
          <View style={{ width: "73%", justifyContent: "space-around" }}>
            {props.designerFlag == "1" ? (
              <>
                <Text
                  style={{
                    fontFamily: "Pretendard",
                    fontSize: scale(15),
                    fontWeight: "500",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    textAlign: "left",
                    color: "#c8c8c8",
                  }}>
                  {props.profileData.hairShopName}
                </Text>
                <Text
                  style={{
                    fontFamily: "Pretendard",
                    fontSize: scale(15),
                    fontWeight: "500",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    textAlign: "left",
                    color: "#c8c8c8",
                  }}>
                  {props.profileData.zipAddress}
                </Text>
              </>
            ) : (
              <>
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
                      {hairConditionType[props.profileData.hairCondition]}
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
                      {hairTendencyType[props.profileData.hairTendency]}
                    </Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  </>
);

export default function NewMain({ route }) {
  const [toggle, setToggle] = useState(undefined);
  const [designerFlag, setDesignerFlag] = useState(undefined);
  const [profileData, setProfileData] = useState(undefined);
  const [profileImg, setProfileImg] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  // const isFocused = useIsFocused();

  function changeToggleStatus(value) {
    setToggle(value);
    if (value) {
      patchUserMatchingActive();
    } else {
      patchUserMatchingDeactive();
    }
  }

  const SubProfile = props => (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          width: "89.4%",
          height: verticalScale(61),
          justifyContent: "center",
        }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
          {/* <View style={{ flexDirection: "row" }}> */}
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
              {props.profileData.desiredHairstyle != null &&
              props.profileData.desiredHairstyle.length != 0
                ? props.profileData.desiredHairstyle
                : "스타일을 추천받고 싶어요"}
            </Text>
          </View>
          {/* </View> */}
        </View>
      </View>
      <View
        style={{
          width: "89.4%",
          height: verticalScale(1),
          backgroundColor: "#232323",
        }}
      />
      <View
        style={{
          width: "89.4%",
          height: verticalScale(61),
          justifyContent: "center",
        }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
            원하는 스타일링 비용
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
            {props.profileData.payableAmount.toLocaleString()}원
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
      <View
        style={{
          width: "89.4%",
          height: verticalScale(61),
          justifyContent: "center",
        }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
            onColor="#FF2B64"
            offColor="#0C0C0C"
            size="medium"
            onToggle={value => {
              console.log(value);
              changeToggleStatus(value);
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
  );

  useEffect(() => {
    async function fetchData() {
      setDesignerFlag(await readData("@DESIGNER_FLAG"));
      const { data } = await getMemberInfo();
      console.log(data);
      if (data.result == undefined) {
        Alert.alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
        navigation.navigate("Loading", {
          reload: true,
        });
      }
      console.log(data.result.designerFlag);
      storeData("@MEMBER_ID", String(data.result.id));
      if (data.result.designerFlag == 1) {
        const result = await getDesignerProfile();
        console.log(result);
        if (result.data.status == "OK") {
          console.log(result.data.status);
          setProfileData(result.data.result);
          setProfileImg(result.data.result.imageUrl);
        }
        setLoading(false);
      } else {
        const result = await getUserProfile();
        console.log(result);
        if (result.data.status == "OK" && result.data.result != null) {
          setProfileData(result?.data.result.memberProfileDto);
          setProfileImg(result?.data.result.memberProfileDto.frontImageUrl);
          setToggle(
            result.data.result.memberProfileDto.matchingActivationFlag == 1
              ? true
              : false,
          );
        }
        setLoading(false);
      }
    }
    fetchData();
  }, [route]);

  return (
    <ScrollView style={styles.frame}>
      {profileImg != undefined && profileData != undefined ? (
        <Header
          profileImg={profileImg}
          profileData={profileData}
          navigation={navigation}
        />
      ) : (
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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Mypage", {
                  data: profileData,
                });
              }}>
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
                  borderColor: "#191919",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {designerFlag != undefined &&
      profileData != undefined &&
      profileImg != undefined ? (
        <MainProfile
          designerFlag={designerFlag}
          profileData={profileData}
          profileImg={profileImg}
          navigation={navigation}
        />
      ) : (
        <View
          style={{ alignItems: "center", paddingVertical: verticalScale(20) }}>
          <TouchableOpacity
            style={{
              width: "89.4%",
              height: verticalScale(90),
              justifyContent: "center",
              paddingTop: verticalScale(20),
              paddingBottom: verticalScale(20),
              alignItems: "center",
              backgroundColor: "#0c0c0c",
              borderRadius: 15,
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
            }}
            onPress={() => {
              if (designerFlag == "1") {
                navigation.navigate("DesignerRegistration");
              } else {
                navigation.navigate("UserProfile");
              }
            }}>
            <Text
              style={{
                fontFamily: "Pretendard",
                fontSize: verticalScale(16),
                fontWeight: "bold",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "left",
                color: "#ffffff",
              }}>
              프로필 등록하기
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {designerFlag != undefined && designerFlag == "0" && <BigContour />}
      {designerFlag != undefined && designerFlag == "1" && (
        <BigContour style={{ height: verticalScale(2) }} />
      )}
      {designerFlag != undefined &&
        profileData != undefined &&
        toggle != undefined &&
        designerFlag == "0" && (
          <SubProfile profileData={profileData} toggle={toggle} />
        )}
      <View style={{ alignItems: "center", marginTop: verticalScale(20) }}>
        <TouchableOpacity
          style={{
            width: "89.4%",
            height: verticalScale(90),
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
            alignItems: "center",
          }}
          onPress={() => {
            if (profileData != undefined) {
              navigation.navigate("NewRecommendList");
            } else {
              Alert.alert("프로필을 먼저 등록해주세요.");
            }
          }}>
          <View
            style={{
              width: "88%",
              height: "100%",
              flexDirection: "row",
            }}>
            <View
              style={{
                width: "22%",
                justifyContent: "center",
              }}>
              <ChatIcon width={scale(50)} height={scale(50)} />
            </View>
            <View style={{ width: "68%", justifyContent: "center" }}>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: verticalScale(12),
                  fontWeight: "normal",
                  fontStyle: "normal",
                  letterSpacing: -0.06,
                  textAlign: "left",
                  color: "rgba(255, 255, 255, 0.5)",
                }}>
                {designerFlag != undefined && designerFlag == "1"
                  ? "고객에게 제안한"
                  : "헤어 디자이너들의"}
              </Text>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: verticalScale(16),
                  fontWeight: "bold",
                  fontStyle: "normal",
                  letterSpacing: 0,
                  textAlign: "left",
                  color: "#ffffff",
                }}>
                스타일 추천서
              </Text>
            </View>
            <View
              style={{
                width: "10%",
                justifyContent: "center",
                alignItems: "center",
                opacity: 0.34,
              }}>
              <RightArrowIcon />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "89.4%",
            height: verticalScale(90),
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
            alignItems: "center",
            marginTop: verticalScale(10),
          }}
          onPress={() => {
            if (profileData != undefined) {
              if (designerFlag == "1") {
                navigation.navigate("CustomerList");
              } else {
                navigation.navigate("DesignerList");
              }
            } else {
              if (designerFlag == "1") {
                Alert.alert("프로필을 먼저 등록해주세요.");
              } else {
                navigation.navigate("AllDesignerList");
              }
            }
          }}>
          <View
            style={{
              width: "88%",
              height: "100%",
              flexDirection: "row",
            }}>
            <View
              style={{
                width: "22%",
                justifyContent: "center",
              }}>
              <DesignerIcon width={scale(50)} height={scale(50)} />
            </View>
            <View style={{ width: "68%", justifyContent: "center" }}>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: verticalScale(12),
                  fontWeight: "normal",
                  fontStyle: "normal",
                  letterSpacing: -0.06,
                  textAlign: "left",
                  color: "rgba(255, 255, 255, 0.5)",
                }}>
                {designerFlag != undefined && designerFlag == "1"
                  ? "맞춤형 서비스를 위한"
                  : "믿을 수 있는"}
              </Text>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: verticalScale(16),
                  fontWeight: "bold",
                  fontStyle: "normal",
                  letterSpacing: 0,
                  textAlign: "left",
                  color: "#ffffff",
                }}>
                {designerFlag != undefined && designerFlag == "1"
                  ? "주변 고객 조회"
                  : "주변 디자이너 조회"}
              </Text>
            </View>
            <View
              style={{
                width: "10%",
                justifyContent: "center",
                alignItems: "center",
                opacity: 0.34,
              }}>
              <RightArrowIcon />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "89.4%",
            height: verticalScale(90),
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
            alignItems: "center",
            marginTop: verticalScale(10),
          }}
          onPress={() => {
            navigation.navigate("NewProfileSelection");
          }}>
          <View
            style={{
              width: "88%",
              height: "100%",
              flexDirection: "row",
            }}>
            <View
              style={{
                width: "22%",
                justifyContent: "center",
              }}>
              <VirtualIcon width={scale(50)} height={scale(50)} />
            </View>
            <View style={{ width: "68%", justifyContent: "center" }}>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: verticalScale(12),
                  fontWeight: "normal",
                  fontStyle: "normal",
                  letterSpacing: -0.06,
                  textAlign: "left",
                  color: "rgba(255, 255, 255, 0.5)",
                }}>
                나에게 어울리는 스타일을 찾아
              </Text>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: "green",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: verticalScale(3),
                    paddingRight: verticalScale(3),
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontFamily: "Pretendard",
                      fontSize: verticalScale(12),
                      fontWeight: "700",
                      fontStyle: "normal",
                      letterSpacing: -0.5,
                      color: "#ffffff",
                    }}>
                    BETA
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: "Pretendard",
                    fontSize: verticalScale(16),
                    fontWeight: "bold",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    textAlign: "left",
                    color: "#ffffff",
                  }}>
                  {" "}
                  헤어스타일 체험
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "10%",
                justifyContent: "center",
                alignItems: "center",
                opacity: 0.34,
              }}>
              <RightArrowIcon />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {/* {loading && (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            opacity: 0.6,
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <ActivityIndicator color={"#ffffff"} />
        </View>
      )} */}
      {loading && <Spinner />}
    </ScrollView>
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
