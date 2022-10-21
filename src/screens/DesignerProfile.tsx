import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
  PermissionsAndroid,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  Animated,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import DefaultDesigner from "../assets/images/default_designer_profile.png";
import { scale, verticalScale } from "../utils/scale";

import { Dimensions } from "react-native";
import Header from "../components/Header";
const { width, height } = Dimensions.get("window");
import GoBackIcon from "../assets/icons/goBack.svg";
import MeatballIcon from "../assets/icons/meatball.svg";
import StarIcon from "../assets/icons/star.svg";
import CallIcon from "../assets/icons/call.svg";
import LoveIcon from "../assets/icons/love.svg";
import WriteIcon from "../assets/icons/write.svg";
import DefaultMap from "../assets/images/default_map.png";
import DashedLine from "react-native-dashed-line";
import Map from "./Map";

import ModifyIcon from "../assets/icons/modify.svg";
import ReportIcon from "../assets/icons/report.svg";
import DeleteIcon from "../assets/icons/delete.svg";

import { useNavigation } from "@react-navigation/native";
import { getDesignerProfileById } from "../api/getDesignerProfileById";
import { UnderLineContent } from "../components/designerProfile/UnderLineContent";
import { getReviewList } from "../api/getReviewList";
import { readData } from "../utils/asyncStorage";
import { postRequest } from "../api/postRequest";
import { deleteReview } from "../api/deleteReview";

const workingdayDict = {};
workingdayDict["MON"] = "월요일";
workingdayDict["TUE"] = "화요일";
workingdayDict["WED"] = "수요일";
workingdayDict["THU"] = "목요일";
workingdayDict["FRI"] = "금요일";
workingdayDict["SAT"] = "토요일";
workingdayDict["SUN"] = "일요일";

const ratingDict = ["", "나쁨", "보통", "좋음"];

const DashedLineContent = () => (
  <View
    style={{
      flex: 1,
      paddingLeft: scale(10),
      paddingRight: scale(10),
    }}>
    <DashedLine
      dashLength={verticalScale(1)}
      dashThickness={scale(1)}
      dashGap={scale(1)}
      dashColor="#4e4e4e"
    />
  </View>
);

const YellowStar = () => (
  <View style={styles.star}>
    <StarIcon fill="#ffce00" />
  </View>
);

const GreyStar = () => (
  <View style={styles.star}>
    <StarIcon fill="#383838" />
  </View>
);

const DivisionSpace = () => (
  <View
    style={{
      width: "100%",
      height: verticalScale(10),
      backgroundColor: "#232323",
    }}
  />
);

const ReviewPhoto = props => (
  <ScrollView
    horizontal={true}
    style={{
      marginBottom: verticalScale(20),
      flexDirection: "row",
    }}>
    {/* <View
      style={{
        width: 120,
        height: 120,
        opacity: 0.15,
        borderRadius: 10,
        backgroundColor: "#d9d9d9",
        marginRight: scale(10),
      }}> */}
    <Image
      style={{
        width: 120,
        height: 120,
        // opacity: 0.15,
        borderRadius: 10,
        backgroundColor: "#d9d9d9",
        marginRight: scale(10),
      }}
      source={{ uri: props.imageDtoList[0].imageUrl }}
    />
    {/* </View> */}
    {props.imageDtoList.map((item, index) => {
      if (index != 0) {
        return (
          <View style={{ justifyContent: "flex-end", marginRight: scale(10) }}>
            <Image
              style={{
                width: 87.8,
                height: 78.9,
                // opacity: 0.15,
                borderRadius: 10,
                backgroundColor: "#d9d9d9",
              }}
              source={{ uri: item.imageUrl }}
            />
          </View>
        );
      }
    })}
    {/* <View style={{ justifyContent: "flex-end", marginRight: scale(10) }}>
      <View
        style={{
          width: 87.8,
          height: 78.9,
          opacity: 0.15,
          borderRadius: 10,
          backgroundColor: "#d9d9d9",
        }}
      />
    </View>
    <View style={{ justifyContent: "flex-end", marginRight: scale(10) }}>
      <View
        style={{
          width: 87.8,
          height: 78.9,
          opacity: 0.15,
          borderRadius: 10,
          backgroundColor: "#d9d9d9",
        }}
      />
    </View>
    <View style={{ justifyContent: "flex-end" }}>
      <View
        style={{
          width: 87.8,
          height: 78.9,
          opacity: 0.15,
          borderRadius: 10,
          backgroundColor: "#d9d9d9",
        }}
      />
    </View> */}
  </ScrollView>
);

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function DesignerProfile({ route }) {
  const [profileData, setProfileData] = useState(undefined);
  const [reviewData, setReviewData] = useState(undefined);
  const [reviewPageNum, setReviewPageNum] = useState(0);
  const [yellowStar, setYellowStar] = useState([]);
  const [grayStar, setGrayStar] = useState([]);
  const [memberId, setMemberId] = useState(undefined);
  const [designerFlag, setDesignerFlag] = useState(undefined);
  const [reviewId, setReviewId] = useState(undefined);
  const [reviewerId, setReviewerId] = useState(undefined);
  const [reviewIndex, setReviewIndex] = useState(undefined);

  const phoneNumber = "010-1234-1234";

  const [ref, setRef] = useState(null);

  const [priceViewY, setPriceViewY] = useState();
  const [locationViewY, setLocationViewY] = useState();
  const [officeHoursViewY, setOfficeHoursViewY] = useState();
  const [reviewViewY, setReviewViewY] = useState();

  const [currentTab, setCurrentTab] = useState("price");

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isDesignerModalVisible, setIsDesignerModalVisible] = useState(false);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);

  const navigation = useNavigation();

  const HeaderContents = () => (
    <>
      <TouchableOpacity
        style={{
          width: scale(40),
          height: verticalScale(40),
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          navigation.goBack();
        }}>
        <GoBackIcon />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: scale(40),
          height: verticalScale(40),
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          console.log("open!!!");
          setIsDesignerModalVisible(true);
        }}>
        <View style={{ height: 20, justifyContent: "center" }}>
          <MeatballIcon />
        </View>
      </TouchableOpacity>
    </>
  );

  const fetchStar = (value: any) => {
    console.log(value);
    if (value == null) {
      let newStar = [];
      for (let i = 0; i < 5; i++) {
        newStar.push(<GreyStar />);
      }
      setGrayStar(newStar);
    } else {
      let newStar = [];
      for (let i = 0; i < Math.round(value); i++) {
        newStar.push(<YellowStar />);
      }
      setYellowStar(newStar);
      let newStar2 = [];
      for (let i = 0; i < 5 - Math.round(value); i++) {
        newStar2.push(<GreyStar />);
      }
      setGrayStar(newStar2);
    }
  };

  const fetchReview = async (prev, page) => {
    try {
      const result = await getReviewList(
        page,
        profileData.hairDesignerProfileDto.id,
      );
      console.log(result);
      if (result.data.status == "OK") {
        console.log(reviewPageNum);
        console.log([...prev, ...result.data.result]);
        setReviewData([...prev, ...result.data.result]);
        setReviewPageNum(reviewPageNum + 1);
      } else {
        Alert.alert("데이터를 불러오는데 실패했습니다");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await getDesignerProfileById(route.params.designerId);
      if (response.data.result == undefined) {
        Alert.alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
        navigation.navigate("Loading");
      } else if (response.data.status != "OK") {
        Alert.alert("데이터를 불러오는데 실패했습니다.");
      }
      console.log(response.data.result);
      setProfileData(response.data.result);
      fetchStar(response.data.result.averageStarRating);
      const response2 = await getReviewList(
        reviewPageNum,
        response.data.result.hairDesignerProfileDto.id,
        // route.params.designerId,
      );
      if (response2.data.status != "OK") {
        Alert.alert("데이터를 불러오는데 실패했습니다.");
      }
      console.log(response2);
      setReviewData(response2.data.result);
      setReviewPageNum(reviewPageNum + 1);
      setMemberId(await readData("@MEMBER_ID"));
      setDesignerFlag(await readData("@DESIGNER_FLAG"));
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const TabMenu = () => (
    <View style={styles.button_container}>
      <TouchableOpacity
        style={
          currentTab == "price" ? styles.tab_button_on : styles.tab_button_off
        }
        onPress={() => {
          ref.scrollTo({
            x: 0,
            y: priceViewY,
            animated: true,
          });
        }}>
        <Text style={styles.tab_button_text}>가격</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          currentTab == "location"
            ? styles.tab_button_on
            : styles.tab_button_off
        }
        onPress={() => {
          ref.scrollTo({
            x: 0,
            y: locationViewY,
            animated: true,
          });
        }}>
        <Text style={styles.tab_button_text}>위치</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          currentTab == "office_hours"
            ? styles.tab_button_on
            : styles.tab_button_off
        }
        onPress={() => {
          ref.scrollTo({
            x: 0,
            y: officeHoursViewY,
            animated: true,
          });
        }}>
        <Text style={styles.tab_button_text}>근무시간</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          currentTab == "review" ? styles.tab_button_on : styles.tab_button_off
        }
        onPress={() => {
          ref.scrollTo({
            x: 0,
            y: reviewViewY,
            animated: true,
          });
        }}>
        <Text style={styles.tab_button_text}>리뷰</Text>
      </TouchableOpacity>
    </View>
  );

  const ReviewItem = props => (
    <View
      style={{
        paddingTop: verticalScale(40),
        paddingBottom: verticalScale(30),
      }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Text
          style={{
            fontFamily: "Pretendard",
            fontSize: 11,
            fontWeight: "normal",
            fontStyle: "normal",
            lineHeight: 12,
            letterSpacing: 0,
            textAlign: "left",
            color: "#999999",
          }}>
          {props.data.reviewDto.createDate.substring(0, 4) +
            "." +
            props.data.reviewDto.createDate.substring(5, 7) +
            "." +
            props.data.reviewDto.createDate.substring(8, 10)}
        </Text>
        <TouchableOpacity
          style={{ height: verticalScale(24), justifyContent: "center" }}
          onPress={() => {
            setReviewId(props.data.reviewDto.id);
            setReviewerId(props.data.reviewDto.reviewerId);
            setReviewIndex(props.index);
            setIsReviewModalVisible(true);
          }}>
          <MeatballIcon />
        </TouchableOpacity>
      </View>
      <Text style={styles.user_name}>{props.data.name}</Text>
      <View style={styles.review_star_container}>
        {props.tempY}
        {props.tempG}
      </View>
      <View style={styles.review_preference_container}>
        <View style={styles.review_preference_element}>
          <Text style={styles.review_preference}>스타일</Text>
          <Text style={styles.review_preference_contents}>
            {ratingDict[props.data.reviewDto.styleRating]}
          </Text>
        </View>
        <View style={styles.review_preference_element}>
          <Text style={styles.review_preference}>서비스</Text>
          <Text style={styles.review_preference_contents}>
            {ratingDict[props.data.reviewDto.serviceRating]}
          </Text>
        </View>
      </View>
      {props.data.imageDtoList.length != 0 && (
        <ReviewPhoto imageDtoList={props.data.imageDtoList} />
      )}

      <Text style={styles.review_contents}>{props.data.reviewDto.content}</Text>
      <View style={{ width: "100%", flexDirection: "row", flexWrap: "wrap" }}>
        {props.data.hashtagDtoList.map((item, index) => (
          <View style={styles.review_tag}>
            <Text style={styles.review_tag_text}>#{item.hashtag}</Text>
          </View>
        ))}
        {/* <View style={styles.review_tag}>
          <Text style={styles.review_tag_text}>#다움펌</Text>
        </View>
        <View style={styles.review_tag}>
          <Text style={styles.review_tag_text}>#남성컷</Text>
        </View> */}
      </View>
    </View>
  );

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  useEffect(() => {
    console.log(route.params.designerId);
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.frame}>
      <ScrollView
        style={styles.profile}
        ref={ref => {
          setRef(ref);
        }}
        onScroll={event => {
          const scroll = event.nativeEvent.contentOffset.y;
          if (scroll < locationViewY) {
            setCurrentTab("price");
          } else if (scroll >= locationViewY && scroll < officeHoursViewY) {
            setCurrentTab("location");
          } else if (scroll >= officeHoursViewY && scroll < reviewViewY) {
            setCurrentTab("office_hours");
          } else if (scroll >= reviewViewY) {
            setCurrentTab("review");
          }
          if (isCloseToBottom(event.nativeEvent)) {
            fetchReview(reviewData, reviewPageNum);
            console.log("add review");
          }
        }}
        stickyHeaderIndices={[7]}
        scrollEventThrottle={400}>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={isDesignerModalVisible}
          onRequestClose={() => {
            setIsDesignerModalVisible(!isDesignerModalVisible);
          }}
          statusBarTranslucent>
          <View
            style={{
              flex: 1,
            }}>
            <TouchableWithoutFeedback
              onPress={() => {
                setIsDesignerModalVisible(false);
              }}>
              <View style={{ flex: 1 }} />
            </TouchableWithoutFeedback>
            <Animated.View
              style={{
                width: "100%",
                height: verticalScale(292),
                backgroundColor: "#0c0c0c",
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                paddingTop: verticalScale(40),
              }}>
              {memberId != undefined &&
                parseInt(memberId) == route.params.designerId && (
                  <>
                    <TouchableOpacity
                      style={{
                        height: verticalScale(60),
                        flexDirection: "row",
                        paddingTop: verticalScale(20),
                        paddingBottom: verticalScale(20),
                        paddingLeft: scale(25),
                      }}
                      onPress={() => {
                        setIsDesignerModalVisible(false);
                        navigation.navigate("DesignerModify");
                      }}>
                      <View
                        style={{
                          width: scale(35),
                          height: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: scale(10),
                        }}>
                        <ModifyIcon />
                      </View>
                      <View
                        style={{ height: "100%", justifyContent: "center" }}>
                        <Text
                          style={{
                            fontFamily: "Pretendard",
                            fontSize: 15,
                            fontWeight: "500",
                            fontStyle: "normal",
                            letterSpacing: -1,
                            textAlign: "left",
                            color: "rgba(255, 255, 255, 0.7)",
                          }}>
                          수정하기
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View style={{ width: "100%", alignItems: "center" }}>
                      <View
                        style={{
                          width: "89%",
                          height: verticalScale(1),
                          backgroundColor: "#333333",
                        }}
                      />
                    </View>
                  </>
                )}
              <TouchableOpacity
                style={{
                  height: verticalScale(60),
                  flexDirection: "row",
                  paddingTop: verticalScale(20),
                  paddingBottom: verticalScale(20),
                  paddingLeft: scale(25),
                }}
                onPress={() => {
                  Alert.alert("준비중");
                }}>
                <View
                  style={{
                    width: scale(35),
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: scale(10),
                  }}>
                  <ReportIcon />
                </View>
                <View style={{ height: "100%", justifyContent: "center" }}>
                  <Text
                    style={{
                      fontFamily: "Pretendard",
                      fontSize: 15,
                      fontWeight: "500",
                      fontStyle: "normal",
                      letterSpacing: -1,
                      textAlign: "left",
                      color: "rgba(255, 255, 255, 0.7)",
                    }}>
                    신고하기
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={{ width: "100%", alignItems: "center" }}>
                <View
                  style={{
                    width: "89%",
                    height: verticalScale(1),
                    backgroundColor: "#333333",
                  }}
                />
              </View>
              {memberId != undefined &&
                parseInt(memberId) == route.params.designerId && (
                  <>
                    <TouchableOpacity
                      style={{
                        height: verticalScale(60),
                        flexDirection: "row",
                        paddingTop: verticalScale(20),
                        paddingBottom: verticalScale(20),
                        paddingLeft: scale(25),
                      }}>
                      <View
                        style={{
                          width: scale(35),
                          height: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: scale(10),
                        }}>
                        <DeleteIcon />
                      </View>
                      <View
                        style={{ height: "100%", justifyContent: "center" }}>
                        <Text
                          style={{
                            fontFamily: "Pretendard",
                            fontSize: 15,
                            fontWeight: "500",
                            fontStyle: "normal",
                            letterSpacing: -1,
                            textAlign: "left",
                            color: "rgba(255, 255, 255, 0.7)",
                          }}>
                          삭제하기
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View style={{ width: "100%", alignItems: "center" }}>
                      <View
                        style={{
                          width: "89%",
                          height: verticalScale(1),
                          backgroundColor: "#333333",
                        }}
                      />
                    </View>
                  </>
                )}
            </Animated.View>
          </View>
        </Modal>
        <Image
          source={
            profileData != undefined &&
            profileData.hairDesignerProfileDto.imageUrl != null
              ? { uri: profileData.hairDesignerProfileDto.imageUrl }
              : null
          }
          style={styles.designer_img}
        />
        <View style={{ width: "100%", position: "absolute" }}>
          <Header contents={<HeaderContents />} />
        </View>
        <View
          style={{
            width: "100%",
            backgroundColor: "#191919",
            height: verticalScale(30),
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            position: "absolute",
            top: verticalScale(345),
          }}
        />
        <View
          style={{
            width: "100%",
            paddingLeft: scale(30),
            paddingRight: scale(30),
            paddingBottom: scale(30),
            flexDirection: "row",
          }}>
          <View style={{ width: "44%" }}>
            <Text style={styles.designer}>헤어 디자이너</Text>
            <Text style={styles.designer_name}>
              {profileData != undefined &&
                profileData.hairDesignerProfileDto.name}
            </Text>
            {/* <Text style={styles.designer_name}>
            {data.hairDesigner.member.name}
          </Text> */}
            <View style={styles.designer_star_container}>
              {yellowStar}
              {grayStar}
              {/* <YellowStar />
              <YellowStar />
              <YellowStar />
              <YellowStar />
              <GreyStar /> */}
            </View>
          </View>
          <View
            style={{
              width: "56%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  if (profileData != undefined) {
                    Linking.openURL(
                      `tel:${profileData.hairDesignerProfileDto.phoneNumber}`,
                    ).catch(err => console.error("An error occurred", err));
                  }
                }}>
                <View style={styles.action_icon}>
                  <CallIcon width={scale(19.1)} height={verticalScale(19.1)} />
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{
                      fontFamily: "Pretendard",
                      fontSize: 12,
                      fontWeight: "500",
                      fontStyle: "normal",
                      letterSpacing: 0,
                      textAlign: "left",
                      color: "#ffffff",
                    }}>
                    전화걸기
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.action_icon}
                onPress={() => {
                  if (
                    profileData != undefined &&
                    designerFlag != undefined &&
                    designerFlag == "0"
                  ) {
                    postRequest(profileData.hairDesignerProfileDto.id).then(
                      res => {
                        console.log(res);
                        if (res.data.result == undefined) {
                          Alert.alert(
                            "세션이 만료되었습니다. 다시 로그인 해주세요.",
                          );
                          navigation.navigate("Loading");
                        } else if (res.data.status == "OK") {
                          Alert.alert("추천서 요청이 완료되었습니다.");
                        } else if (res.data.status == "CONFLICT") {
                          Alert.alert("이미 추천서 요청을 보냈습니다.");
                        } else {
                          Alert.alert("추천서 요청에 실패했습니다.");
                        }
                      },
                    );
                  } else {
                    Alert.alert("추천서 요청은 고객만 가능합니다.");
                  }
                }}>
                <LoveIcon width={scale(19.1)} height={verticalScale(19.1)} />
              </TouchableOpacity>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: "Pretendard",
                    fontSize: 12,
                    fontWeight: "500",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    textAlign: "left",
                    color: "#ffffff",
                  }}>
                  추천서요청
                </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={styles.action_icon}
                onPress={() => {
                  if (profileData != undefined && designerFlag == "0") {
                    console.log(
                      profileData.hairDesignerProfileDto.hairDesignerId,
                    );
                    console.log(profileData.hairDesignerProfileDto.name);
                    navigation.navigate("Review", {
                      designerId:
                        profileData.hairDesignerProfileDto.hairDesignerId,
                      designerName: profileData.hairDesignerProfileDto.name,
                      designerImg: profileData.hairDesignerProfileDto.imageUrl,
                    });
                  } else {
                    Alert.alert("리뷰 작성은 고객만 가능합니다.");
                  }
                }}>
                <WriteIcon width={scale(19.1)} height={verticalScale(19.1)} />
              </TouchableOpacity>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: "Pretendard",
                    fontSize: 12,
                    fontWeight: "500",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    textAlign: "left",
                    color: "#ffffff",
                  }}>
                  리뷰작성
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <View
            style={{
              width: "89%",
              height: verticalScale(1),
              backgroundColor: "#333333",
            }}
          />
        </View>
        <View
          style={{
            padding: "8%",
            width: "100%",
          }}>
          <Text style={styles.introduction}>자기소개</Text>
          <Text style={styles.introduction_contents}>
            {profileData != undefined &&
              profileData.hairDesignerProfileDto.description}
          </Text>
          {/* <Text style={styles.introduction_contents}>
          {data.hairDesigner.description}
        </Text> */}
          <View
            style={{ width: "100%", flexDirection: "row", flexWrap: "wrap" }}>
            {profileData != undefined && (
              <>
                {profileData.hairDesignerHashtagDtoList.map((item, index) => (
                  <View style={styles.introduction_tag}>
                    <Text style={styles.introduction_tag_text}>
                      # {item.tag}
                    </Text>
                  </View>
                ))}
              </>
            )}
          </View>
        </View>
        <TabMenu />
        <View
          style={{
            width: "100%",
            paddingTop: verticalScale(30),
            paddingLeft: scale(30),
            paddingRight: scale(30),
            paddingBottom: verticalScale(40),
          }}
          onLayout={event => {
            const { layout } = event.nativeEvent;
            console.log(layout);
            setPriceViewY(layout.y);
          }}>
          <View style={styles.underline_content_container}>
            <UnderLineContent value="가격" />
          </View>
          <View style={styles.hair_category}>
            <Text style={styles.hair_category_text}>컷</Text>
            <View style={{ width: "80%" }}>
              {profileData != undefined && (
                <>
                  {profileData.hairDesignerPriceDtoList
                    .filter(item => item.hairCategory == "컷")
                    .map((res, index) => (
                      <View style={styles.hair_price_element}>
                        <Text style={styles.hair_name}>
                          {res.hairStyleName}
                        </Text>
                        <DashedLineContent />
                        <Text style={styles.hair_price}>
                          {numberWithCommas(res.price)}원
                        </Text>
                      </View>
                    ))}
                </>
              )}
            </View>
          </View>
          <View style={styles.hair_category}>
            <Text style={styles.hair_category_text}>펌</Text>
            <View style={{ width: "80%" }}>
              {profileData != undefined && (
                <>
                  {profileData.hairDesignerPriceDtoList
                    .filter(item => item.hairCategory == "펌")
                    .map((res, index) => (
                      <View style={styles.hair_price_element}>
                        <Text style={styles.hair_name}>
                          {res.hairStyleName}
                        </Text>
                        <DashedLineContent />
                        <Text style={styles.hair_price}>
                          {numberWithCommas(res.price)}원
                        </Text>
                      </View>
                    ))}
                </>
              )}
            </View>
          </View>
          <View style={styles.hair_category_last}>
            <Text style={styles.hair_category_text}>염색</Text>
            <View style={{ width: "80%" }}>
              {profileData != undefined && (
                <>
                  {profileData.hairDesignerPriceDtoList
                    .filter(item => item.hairCategory == "염색")
                    .map((res, index) => (
                      <View style={styles.hair_price_element}>
                        <Text style={styles.hair_name}>
                          {res.hairStyleName}
                        </Text>
                        <DashedLineContent />
                        <Text style={styles.hair_price}>
                          {numberWithCommas(res.price)}원
                        </Text>
                      </View>
                    ))}
                </>
              )}
            </View>
          </View>
        </View>
        <DivisionSpace />
        <View
          style={{
            width: "100%",
            paddingTop: verticalScale(40),
            paddingLeft: scale(30),
            paddingRight: scale(30),
            paddingBottom: verticalScale(40),
          }}
          onLayout={event => {
            const { layout } = event.nativeEvent;
            console.log(layout);
            setLocationViewY(layout.y);
          }}>
          <View style={styles.underline_content_container}>
            <UnderLineContent value="위치" />
          </View>
          {/* <Image
          source={DefaultMap}
          style={{
            width: "100%",
            height: verticalScale(200),
            borderRadius: 10,
            marginBottom: verticalScale(20),
          }}
        /> */}
          <View
            style={{
              width: "100%",
              height: verticalScale(200),
              borderRadius: 10,
              marginBottom: verticalScale(20),
            }}>
            {profileData != undefined && (
              <Map
                coord={{
                  latitude: profileData.hairDesignerProfileDto.latitude,
                  longitude: profileData.hairDesignerProfileDto.longitude,
                }}
              />
            )}
          </View>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: 18,
              fontWeight: "bold",
              fontStyle: "normal",
              lineHeight: 28,
              letterSpacing: 0.6,
              textAlign: "left",
              color: "#ffffff",
            }}>
            {profileData != undefined &&
              profileData.hairDesignerProfileDto.hairShopName}
          </Text>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: 11,
              fontWeight: "500",
              fontStyle: "normal",
              lineHeight: 12,
              letterSpacing: 0,
              textAlign: "left",
              color: "#fc2a5b",
            }}>
            {profileData != undefined &&
              profileData.hairDesignerProfileDto.zipAddress +
                " " +
                profileData.hairDesignerProfileDto.detailAddress}
          </Text>
        </View>
        <DivisionSpace />
        <View
          style={{
            width: "100%",
            paddingTop: verticalScale(40),
            paddingLeft: scale(30),
            paddingRight: scale(30),
            paddingBottom: verticalScale(40),
          }}
          onLayout={event => {
            const { layout } = event.nativeEvent;
            console.log(layout);
            setOfficeHoursViewY(layout.y);
          }}>
          <View style={styles.underline_content_container}>
            <UnderLineContent value="근무시간" />
          </View>
          {profileData != undefined && (
            <>
              {profileData.hairDesignerWorkingDayDtoList.map((data, index) => (
                <View style={styles.office_hours}>
                  <Text style={styles.working_day}>
                    {workingdayDict[data.workingDay]}
                  </Text>
                  <Text
                    style={styles.working_time}>{`PM ${data.startTime.substring(
                    0,
                    5,
                  )} - PM ${data.endTime.substring(0, 5)}`}</Text>
                </View>
              ))}
            </>
          )}
        </View>
        <DivisionSpace />
        <View
          style={styles.designer_review}
          onLayout={event => {
            const { layout } = event.nativeEvent;
            console.log(layout);
            setReviewViewY(layout.y);
          }}>
          <Modal
            animationType={"slide"}
            transparent={true}
            visible={isReviewModalVisible}
            onRequestClose={() => {
              setIsReviewModalVisible(!isReviewModalVisible);
            }}
            statusBarTranslucent>
            <View
              style={{
                flex: 1,
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setIsReviewModalVisible(false);
                }}>
                <View style={{ flex: 1 }} />
              </TouchableWithoutFeedback>
              <Animated.View
                style={{
                  width: "100%",
                  height: verticalScale(292),
                  backgroundColor: "#0c0c0c",
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  paddingTop: verticalScale(40),
                }}>
                <TouchableOpacity
                  style={{
                    height: verticalScale(60),
                    paddingTop: verticalScale(20),
                    paddingBottom: verticalScale(20),
                    paddingLeft: scale(35),
                  }}
                  onPress={() => {
                    if (reviewerId == parseInt(memberId)) {
                      console.log(reviewerId, memberId);
                      console.log(reviewData[reviewIndex]);
                      navigation.navigate("ReviewModify", {
                        data: reviewData[reviewIndex],
                        designerName: profileData.hairDesignerProfileDto.name,
                        designerImg:
                          profileData.hairDesignerProfileDto.imageUrl,
                      });
                      setIsReviewModalVisible(false);
                    } else {
                      Alert.alert("작성자만 수정 가능합니다.");
                    }
                  }}>
                  <View style={{ height: "100%", justifyContent: "center" }}>
                    <Text
                      style={{
                        fontFamily: "Pretendard",
                        fontSize: 15,
                        fontWeight: "500",
                        fontStyle: "normal",
                        letterSpacing: -1,
                        textAlign: "left",
                        color: "rgba(255, 255, 255, 0.7)",
                      }}>
                      수정하기
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={{ width: "100%", alignItems: "center" }}>
                  <View
                    style={{
                      width: "89%",
                      height: verticalScale(1),
                      backgroundColor: "#333333",
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    height: verticalScale(60),
                    paddingTop: verticalScale(20),
                    paddingBottom: verticalScale(20),
                    paddingLeft: scale(35),
                  }}
                  onPress={() => {
                    Alert.alert("준비중");
                  }}>
                  <View style={{ height: "100%", justifyContent: "center" }}>
                    <Text
                      style={{
                        fontFamily: "Pretendard",
                        fontSize: 15,
                        fontWeight: "500",
                        fontStyle: "normal",
                        letterSpacing: -1,
                        textAlign: "left",
                        color: "rgba(255, 255, 255, 0.7)",
                      }}>
                      신고하기
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={{ width: "100%", alignItems: "center" }}>
                  <View
                    style={{
                      width: "89%",
                      height: verticalScale(1),
                      backgroundColor: "#333333",
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    height: verticalScale(60),
                    paddingTop: verticalScale(20),
                    paddingBottom: verticalScale(20),
                    paddingLeft: scale(35),
                  }}
                  onPress={() => {
                    if (reviewerId == parseInt(memberId)) {
                      console.log(reviewerId, memberId);
                      deleteReview(reviewId).then(res => {
                        console.log(res);
                        if (res.data.result == undefined) {
                          Alert.alert(
                            "세션이 만료되었습니다. 다시 로그인 해주세요.",
                          );
                          navigation.navigate("Loading");
                        } else if (res.data.status == "OK") {
                          setReviewData(
                            reviewData.filter(
                              item => item.reviewDto.id != reviewId,
                            ),
                          );
                          Alert.alert("삭제 완료 했습니다.");
                        } else {
                          Alert.alert("삭제 실패");
                        }
                      });
                      setIsReviewModalVisible(false);
                    } else {
                      Alert.alert("작성자만 삭제 가능합니다.");
                    }
                  }}>
                  <View style={{ height: "100%", justifyContent: "center" }}>
                    <Text
                      style={{
                        fontFamily: "Pretendard",
                        fontSize: 15,
                        fontWeight: "500",
                        fontStyle: "normal",
                        letterSpacing: -1,
                        textAlign: "left",
                        color: "rgba(255, 255, 255, 0.7)",
                      }}>
                      삭제하기
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={{ width: "100%", alignItems: "center" }}>
                  <View
                    style={{
                      width: "89%",
                      height: verticalScale(1),
                      backgroundColor: "#333333",
                    }}
                  />
                </View>
              </Animated.View>
            </View>
          </Modal>
          <View style={styles.underline_content_container}>
            <UnderLineContent value="디자이너 리뷰" />
          </View>
          <View style={{ marginBottom: verticalScale(30) }}>
            {reviewData != undefined && (
              <>
                {reviewData.map((review, index) => {
                  // console.log(review.reviewDto.totalRating);
                  let tempY = [];
                  for (
                    let i = 0;
                    i < Math.round(review.reviewDto.totalRating);
                    i++
                  ) {
                    tempY.push(<YellowStar />);
                  }
                  let tempG = [];
                  for (
                    let i = 0;
                    i < 5 - Math.round(review.reviewDto.totalRating);
                    i++
                  ) {
                    tempG.push(<GreyStar />);
                  }
                  return (
                    <ReviewItem
                      data={review}
                      tempY={tempY}
                      tempG={tempG}
                      index={index}
                    />
                  );
                })}
              </>
            )}
            {reviewData != undefined && reviewData.length == 0 && (
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: scale(15),
                  fontWeight: "bold",
                  fontStyle: "normal",
                  lineHeight: 28,
                  letterSpacing: 0.6,
                  textAlign: "left",
                  color: "#888888",
                }}>
                등록된 리뷰가 없습니다.
              </Text>
            )}
            {/* <ReviewItem />
            <View style={{ width: "100%", alignItems: "center" }}>
              <View
                style={{
                  width: scale(334),
                  height: verticalScale(1),
                  backgroundColor: "#333333",
                }}
              />
            </View>
            <ReviewItem />
            <View style={{ width: "100%", alignItems: "center" }}>
              <View
                style={{
                  width: scale(334),
                  height: verticalScale(1),
                  backgroundColor: "#333333",
                }}
              />
            </View>
            <ReviewItem /> */}
          </View>
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
  profile: {
    width: width,
    backgroundColor: "#191919",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  designer_img: {
    width: "100%",
    height: verticalScale(375),
    position: "relative",
  },
  designer: {
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#999999",
    marginBottom: verticalScale(5),
  },
  designer_name: {
    fontFamily: "Pretendard",
    fontSize: verticalScale(28),
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffffff",
    marginBottom: verticalScale(10),
  },
  designer_star_container: {
    flexDirection: "row",
  },
  star: {
    padding: verticalScale(3),
  },
  action_icon: {
    alignItems: "center",
    padding: verticalScale(11),
  },
  introduction: {
    fontFamily: "Pretendard",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffffff",
    marginBottom: verticalScale(10),
  },
  introduction_contents: {
    fontFamily: "Pretendard",
    fontSize: 15,
    fontWeight: "300",
    fontStyle: "normal",
    lineHeight: 25,
    letterSpacing: 0,
    textAlign: "left",
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: verticalScale(10.5),
  },
  introduction_tag: {
    width: verticalScale(54),
    height: verticalScale(22),
    borderRadius: 100,
    backgroundColor: "#fc2a5b",
    alignItems: "center",
    justifyContent: "center",
    marginRight: verticalScale(8),
    marginBottom: verticalScale(8),
  },
  introduction_tag_text: {
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: -0.5,
    textAlign: "left",
    color: "#ffffff",
  },
  underline_content_container: {
    marginBottom: verticalScale(21),
  },
  button_container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#191919",
  },
  tab_button_on: {
    width: "25%",
    paddingTop: verticalScale(17),
    paddingBottom: verticalScale(17),
    borderBottomColor: "#ffffff",
    borderBottomWidth: verticalScale(2),
  },
  tab_button_off: {
    width: "25%",
    paddingTop: verticalScale(17),
    paddingBottom: verticalScale(17),
    borderBottomColor: "#333333",
    borderBottomWidth: verticalScale(1),
  },
  tab_button_text: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#ffffff",
  },
  hair_category: {
    width: "100%",
    flexDirection: "row",
    marginBottom: verticalScale(30),
  },
  hair_category_last: {
    width: "100%",
    flexDirection: "row",
  },
  hair_category_text: {
    width: "20%",
    fontFamily: "Pretendard",
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffffff",
  },
  hair_price_element: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(8),
  },
  hair_price_element_last: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hair_name: {
    fontFamily: "Pretendard",
    fontSize: 15,
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "rgba(255, 255, 255, 0.6)",
  },
  hair_price: {
    fontFamily: "Pretendard",
    fontSize: 15,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "right",
    color: "#ffffff",
  },
  office_hours: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(8),
  },
  office_hours_last: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  working_day: {
    fontFamily: "Pretendard",
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffffff",
  },
  working_time: {
    fontFamily: "Pretendard",
    fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "right",
    color: "#ffffff",
  },
  designer_review: {
    width: "100%",
    paddingTop: verticalScale(40),
    paddingLeft: scale(30),
    paddingRight: scale(30),
    paddingBottom: verticalScale(40),
  },
  user_name: {
    fontFamily: "Pretendard",
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffffff",
  },
  review_star_container: {
    flexDirection: "row",
    marginBottom: verticalScale(10),
  },
  review_preference_container: {
    marginBottom: verticalScale(20),
  },
  review_preference_element: {
    flexDirection: "row",
    width: scale(92.2),
    justifyContent: "space-between",
  },
  review_preference: {
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#888888",
  },
  review_preference_contents: {
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#888888",
  },
  review_contents: {
    fontFamily: "Pretendard",
    fontSize: 13,
    fontWeight: "300",
    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: "left",
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: verticalScale(14.6),
  },
  review_tag: {
    width: verticalScale(47),
    height: verticalScale(18),
    borderRadius: 100,
    backgroundColor: "rgba(252, 42, 91, 0)",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#fc2a5b",
    justifyContent: "center",
    alignItems: "center",
    marginRight: verticalScale(5.4),
    marginBottom: verticalScale(5.4),
  },
  review_tag_text: {
    fontFamily: "Pretendard",
    fontSize: 10,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: -0.5,
    textAlign: "left",
    color: "#fc2a5b",
  },
});
