import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Platform,
  PermissionsAndroid,
  Modal,
  Pressable,
  Alert,
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
import HighlightText from "react-native-highlight-underline-text";
import DashedLine from "react-native-dashed-line";
import axios from "axios";
import Map from "./Map";

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

const UnderLineContent = (props: { value: string }) => (
  <HighlightText
    isFixed={false}
    ratio={0.26}
    underlineColor="rgba(252, 42, 91, 0.5)"
    textStyle={{
      fontFamily: "Pretendard",
      fontSize: 20,
      fontWeight: "bold",
      fontStyle: "normal",
      letterSpacing: 0,
      textAlign: "left",
      color: "#ffffff",
    }}
    text={props.value}
  />
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

const ReviewPhoto = () => (
  <ScrollView
    horizontal={true}
    style={{
      marginBottom: verticalScale(20),
      flexDirection: "row",
    }}>
    <View
      style={{
        width: 120,
        height: 120,
        opacity: 0.15,
        borderRadius: 10,
        backgroundColor: "#d9d9d9",
      }}
    />
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
    </View>
  </ScrollView>
);

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Loading() {
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

  const [isModalVisible, setIsModalVisible] = useState(false);

  const HeaderContents = () => (
    <>
      <GoBackIcon />
      <TouchableOpacity
        onPress={() => {
          console.log("open!!!");
          setIsModalVisible(true);
        }}>
        <MeatballIcon />
      </TouchableOpacity>
    </>
  );

  const fetchData = async () => {
    try {
      setError(null);
      setLoading(true);

      const response = await axios.get(
        "http://localhost:8080/api/v1/hair-designers?id=1",
      );

      console.log(response.data.result);
      setData(response.data.result);
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

  const ReviewItem = () => (
    <View>
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
          22.07.15
        </Text>
        <MeatballIcon />
      </View>
      <Text style={styles.user_name}>겁나 빠른 황소</Text>
      <View style={styles.review_star_container}>
        <YellowStar />
        <YellowStar />
        <YellowStar />
        <YellowStar />
        <GreyStar />
      </View>
      <View style={styles.review_preference_container}>
        <View style={styles.review_preference_element}>
          <Text style={styles.review_preference}>스타일</Text>
          <Text style={styles.review_preference_contents}>좋음</Text>
        </View>
        <View style={styles.review_preference_element}>
          <Text style={styles.review_preference}>서비스</Text>
          <Text style={styles.review_preference_contents}>보통</Text>
        </View>
      </View>
      <ReviewPhoto />
      <Text style={styles.review_contents}>
        진짜 잘 짤라줘요~ 강추! 진짜 잘 짤라줘요~ 강추! 진짜 잘 짤라줘요~ 강추!
        진짜 잘 짤라줘요~ 강추! 진짜 잘 짤라줘요~ 강추! 진짜 잘 짤라줘요~ 강추!{" "}
      </Text>
      <View style={{ width: "100%", flexDirection: "row", flexWrap: "wrap" }}>
        <View style={styles.review_tag}>
          <Text style={styles.review_tag_text}>#다움펌</Text>
        </View>
        <View style={styles.review_tag}>
          <Text style={styles.review_tag_text}>#남성컷</Text>
        </View>
      </View>
    </View>
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
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
      }}
      stickyHeaderIndices={[6]}>
      <Modal //모달창
        animationType={"slide"}
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
          console.log("modal appearance");
        }}
        style={{ alignItems: "center" }}>
        <View style={{ width: "100%", backgroundColor: "red" }}>
          <Text style={{ fontSize: 20 }}>모달창!</Text>
          <TouchableOpacity
            style={{ margin: 3 }}
            onPress={() => setIsModalVisible(false)}>
            <Text>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Image source={DefaultDesigner} style={styles.designer_img} />
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
          <Text style={styles.designer_name}>이안</Text>
          {/* <Text style={styles.designer_name}>
            {data.hairDesigner.member.name}
          </Text> */}
          <View style={styles.designer_star_container}>
            <YellowStar />
            <YellowStar />
            <YellowStar />
            <YellowStar />
            <GreyStar />
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
                Linking.openURL(`tel:${phoneNumber}`).catch(err =>
                  console.error("An error occurred", err),
                );
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
            <View style={styles.action_icon}>
              <LoveIcon width={scale(19.1)} height={verticalScale(19.1)} />
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
                찜하기
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.action_icon}>
              <WriteIcon width={scale(19.1)} height={verticalScale(19.1)} />
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
          lovable lucid florence flutter you destiny seraphic purity adolescence
          fabulous girlish requiem lucid fabulous miracle miracle droplet
          girlish lucid droplet purity droplet flutter adolescence kitten
          fascinating.
        </Text>
        {/* <Text style={styles.introduction_contents}>
          {data.hairDesigner.description}
        </Text> */}
        <View style={{ width: "100%", flexDirection: "row", flexWrap: "wrap" }}>
          <View style={styles.introduction_tag}>
            <Text style={styles.introduction_tag_text}># 포마드</Text>
          </View>
          <View style={styles.introduction_tag}>
            <Text style={styles.introduction_tag_text}># 바버샵</Text>
          </View>
          <View style={styles.introduction_tag}>
            <Text style={styles.introduction_tag_text}># 포마드</Text>
          </View>
          <View style={styles.introduction_tag}>
            <Text style={styles.introduction_tag_text}># 포마드</Text>
          </View>
          <View style={styles.introduction_tag}>
            <Text style={styles.introduction_tag_text}># 포마드</Text>
          </View>
          <View style={styles.introduction_tag}>
            <Text style={styles.introduction_tag_text}># 포마드</Text>
          </View>
          <View style={styles.introduction_tag}>
            <Text style={styles.introduction_tag_text}># 포마드</Text>
          </View>
          <View style={styles.introduction_tag}>
            <Text style={styles.introduction_tag_text}># 포마드</Text>
          </View>
          <View style={styles.introduction_tag}>
            <Text style={styles.introduction_tag_text}># 포마드</Text>
          </View>
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
            <View style={styles.hair_price_element}>
              <Text style={styles.hair_name}>여자컷트</Text>
              <DashedLineContent />
              <Text style={styles.hair_price}>{numberWithCommas(30000)}원</Text>
            </View>
            <View style={styles.hair_price_element}>
              <Text style={styles.hair_name}>남성컷트</Text>
              <DashedLineContent />
              <Text style={styles.hair_price}>{numberWithCommas(30000)}원</Text>
            </View>
            <View style={styles.hair_price_element_last}>
              <Text style={styles.hair_name}>앞머리컷</Text>
              <DashedLineContent />
              <Text style={styles.hair_price}>{numberWithCommas(30000)}원</Text>
            </View>
          </View>
        </View>
        <View style={styles.hair_category}>
          <Text style={styles.hair_category_text}>일반펌</Text>
          <View style={{ width: "80%" }}>
            <View style={styles.hair_price_element}>
              <Text style={styles.hair_name}>일반펌 / 남자</Text>
              <DashedLineContent />
              <Text style={styles.hair_price}>{numberWithCommas(10000)}원</Text>
            </View>
            <View style={styles.hair_price_element_last}>
              <Text style={styles.hair_name}>일반펌 / 여자</Text>
              <DashedLineContent />
              <Text style={styles.hair_price}>{numberWithCommas(5000)}원</Text>
            </View>
          </View>
        </View>
        <View style={styles.hair_category}>
          <Text style={styles.hair_category_text}>열펌</Text>
          <View style={{ width: "80%" }}>
            <View style={styles.hair_price_element}>
              <Text style={styles.hair_name}>셋팅펌</Text>
              <DashedLineContent />
              <Text style={styles.hair_price}>{numberWithCommas(70000)}원</Text>
            </View>
            <View style={styles.hair_price_element}>
              <Text style={styles.hair_name}>매직</Text>
              <DashedLineContent />
              <Text style={styles.hair_price}>{numberWithCommas(70000)}원</Text>
            </View>
            <View style={styles.hair_price_element}>
              <Text style={styles.hair_name}>볼륨매직</Text>
              <DashedLineContent />
              <Text style={styles.hair_price}>{numberWithCommas(80000)}원</Text>
            </View>
            <View style={styles.hair_price_element_last}>
              <Text style={styles.hair_name}>매직셋팅</Text>
              <DashedLineContent />
              <Text style={styles.hair_price}>
                {numberWithCommas(130000)}원
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.hair_category_last}>
          <Text style={styles.hair_category_text}>염색</Text>
          <View style={{ width: "80%" }}>
            <View style={styles.hair_price_element}>
              <Text style={styles.hair_name}>염색</Text>
              <DashedLineContent />
              <Text style={styles.hair_price}>{numberWithCommas(60000)}원</Text>
            </View>
            <View style={styles.hair_price_element_last}>
              <Text style={styles.hair_name}>탈색</Text>
              <DashedLineContent />
              <Text style={styles.hair_price}>{numberWithCommas(60000)}원</Text>
            </View>
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
          <Map />
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
          미용실 이름
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
          울산 남구 수암로 148 홈플러스 울산남구점 옥상층(5층)
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
        <View style={styles.office_hours}>
          <Text style={styles.working_day}>월요일</Text>
          <Text style={styles.working_time}>PM 17:00 - PM 21:00</Text>
        </View>
        <View style={styles.office_hours}>
          <Text style={styles.working_day}>화요일</Text>
          <Text style={styles.working_time}>PM 17:00 - PM 21:00</Text>
        </View>
        <View style={styles.office_hours}>
          <Text style={styles.working_day}>수요일</Text>
          <Text style={styles.working_time}>PM 17:00 - PM 21:00</Text>
        </View>
        <View style={styles.office_hours}>
          <Text style={styles.working_day}>목요일</Text>
          <Text style={styles.working_time}>PM 17:00 - PM 21:00</Text>
        </View>
        <View style={styles.office_hours_last}>
          <Text style={styles.working_day}>금ㆍ토ㆍ일</Text>
          <Text style={styles.working_time}>휴무</Text>
        </View>
      </View>
      <DivisionSpace />
      <View
        style={styles.designer_review}
        onLayout={event => {
          const { layout } = event.nativeEvent;
          console.log(layout);
          setReviewViewY(layout.y);
        }}>
        <View style={styles.underline_content_container}>
          <UnderLineContent value="디자이너 리뷰" />
        </View>
        <View style={{ marginBottom: verticalScale(30) }}>
          <ReviewItem />
          <View style={{ width: "100%", alignItems: "center" }}>
            <View
              style={{
                width: "89%",
                height: verticalScale(1),
                backgroundColor: "#333333",
              }}
            />
          </View>
          <ReviewItem />
          <View style={{ width: "100%", alignItems: "center" }}>
            <View
              style={{
                width: "89%",
                height: verticalScale(1),
                backgroundColor: "#333333",
              }}
            />
          </View>
          <ReviewItem />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 30,
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
