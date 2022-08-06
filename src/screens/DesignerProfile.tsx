import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import React from "react";
import DefaultDesigner from "../assets/images/default_designer_profile.png";
import { verticalScale } from "../utils/scale";

import { Dimensions } from "react-native";
import Header from "../components/Header";
const { width, height } = Dimensions.get("window");
import GoBackIcon from "../assets/icons/goBack";
import MeatballIcon from "../assets/icons/meatball";
import StarIcon from "../assets/icons/star";
import CallIcon from "../assets/icons/call";
import LoveIcon from "../assets/icons/love";
import WriteIcon from "../assets/icons/write";
import DefaultMap from "../assets/images/default_map.png";

const HeaderContents = () => (
  <>
    <GoBackIcon />
    <MeatballIcon />
  </>
);

export default function Loading() {
  return (
    <ScrollView style={styles.profile}>
      <Header contents={<HeaderContents />} />
      <View style={{ width: "100%" }}>
        <Image source={DefaultDesigner} style={styles.designer_img} />
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
            paddingLeft: "8%",
            paddingRight: "8%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <View>
            <Text
              style={{
                fontFamily: "Pretendard",
                fontSize: 12,
                fontWeight: "500",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "left",
                color: "#999999",
              }}>
              헤어 디자이너
            </Text>
            <Text
              style={{
                fontFamily: "Pretendard",
                fontSize: 30,
                fontWeight: "bold",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "left",
                color: "#ffffff",
              }}>
              이안
            </Text>
            <View style={{ flexDirection: "row" }}>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </View>
          </View>
          <View>
            <CallIcon />
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
            <LoveIcon />
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
            <WriteIcon />
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
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: 20,
              fontWeight: "bold",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "left",
              color: "#ffffff",
            }}>
            자기소개
          </Text>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: 15,
              fontWeight: "300",
              fontStyle: "normal",
              lineHeight: 25,
              letterSpacing: 0,
              textAlign: "left",
              color: "rgba(255, 255, 255, 0.7)",
            }}>
            lovable lucid florence flutter you destiny seraphic purity
            adolescence fabulous girlish requiem lucid fabulous miracle miracle
            droplet girlish lucid droplet purity droplet flutter adolescence
            kitten fascinating.
          </Text>
          <View
            style={{ width: "100%", flexDirection: "row", flexWrap: "wrap" }}>
            <TouchableOpacity
              style={{
                width: verticalScale(54),
                height: verticalScale(22),
                borderRadius: 100,
                backgroundColor: "#fc2a5b",
              }}>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: 12,
                  fontWeight: "500",
                  fontStyle: "normal",
                  letterSpacing: -0.5,
                  textAlign: "left",
                  color: "#ffffff",
                }}>
                # 포마드
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: verticalScale(54),
                height: verticalScale(22),
                borderRadius: 100,
                backgroundColor: "#fc2a5b",
              }}>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: 12,
                  fontWeight: "500",
                  fontStyle: "normal",
                  letterSpacing: -0.5,
                  textAlign: "left",
                  color: "#ffffff",
                }}>
                # 바버샵
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: verticalScale(54),
                height: verticalScale(22),
                borderRadius: 100,
                backgroundColor: "#fc2a5b",
              }}>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: 12,
                  fontWeight: "500",
                  fontStyle: "normal",
                  letterSpacing: -0.5,
                  textAlign: "left",
                  color: "#ffffff",
                }}>
                # 포마드
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: verticalScale(54),
                height: verticalScale(22),
                borderRadius: 100,
                backgroundColor: "#fc2a5b",
              }}>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: 12,
                  fontWeight: "500",
                  fontStyle: "normal",
                  letterSpacing: -0.5,
                  textAlign: "left",
                  color: "#ffffff",
                }}>
                # 포마드
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: verticalScale(54),
                height: verticalScale(22),
                borderRadius: 100,
                backgroundColor: "#fc2a5b",
              }}>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: 12,
                  fontWeight: "500",
                  fontStyle: "normal",
                  letterSpacing: -0.5,
                  textAlign: "left",
                  color: "#ffffff",
                }}>
                # 포마드
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: verticalScale(54),
                height: verticalScale(22),
                borderRadius: 100,
                backgroundColor: "#fc2a5b",
              }}>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: 12,
                  fontWeight: "500",
                  fontStyle: "normal",
                  letterSpacing: -0.5,
                  textAlign: "left",
                  color: "#ffffff",
                }}>
                # 포마드
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: verticalScale(54),
                height: verticalScale(22),
                borderRadius: 100,
                backgroundColor: "#fc2a5b",
              }}>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: 12,
                  fontWeight: "500",
                  fontStyle: "normal",
                  letterSpacing: -0.5,
                  textAlign: "left",
                  color: "#ffffff",
                }}>
                # 포마드
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: verticalScale(54),
                height: verticalScale(22),
                borderRadius: 100,
                backgroundColor: "#fc2a5b",
              }}>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: 12,
                  fontWeight: "500",
                  fontStyle: "normal",
                  letterSpacing: -0.5,
                  textAlign: "left",
                  color: "#ffffff",
                }}>
                # 포마드
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: verticalScale(54),
                height: verticalScale(22),
                borderRadius: 100,
                backgroundColor: "#fc2a5b",
              }}>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: 12,
                  fontWeight: "500",
                  fontStyle: "normal",
                  letterSpacing: -0.5,
                  textAlign: "left",
                  color: "#ffffff",
                }}>
                # 포마드
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.button_container}>
        <TouchableOpacity style={styles.tab_button}>
          <Text style={styles.tab_button_text}>가격</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab_button}>
          <Text style={styles.tab_button_text}>위치</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab_button}>
          <Text style={styles.tab_button_text}>근무시간</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab_button}>
          <Text style={styles.tab_button_text}>리뷰</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%", padding: "8%" }}>
        <Text
          style={{
            fontFamily: "Pretendard",
            fontSize: 20,
            fontWeight: "bold",
            fontStyle: "normal",
            letterSpacing: 0,
            textAlign: "left",
            color: "#ffffff",
          }}>
          가격
        </Text>
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.hair_category}>컷</Text>
            <View>
              <Text>여자컷트 30000원</Text>
              <Text>남성컷트 30000원</Text>
              <Text>앞머리컷 30000원</Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.hair_category}>일반펌</Text>
            <View>
              <Text>일반펌 / 남자 30000원</Text>
              <Text>일반펌 / 여자 30000원</Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.hair_category}>열펌</Text>
            <View>
              <Text>볼륨매직 30000원</Text>
              <Text>매직셋팅 30000원</Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.hair_category}>염색</Text>
            <View>
              <Text>염색 30000원</Text>
              <Text>탈색 30000원</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          height: verticalScale(10),
          backgroundColor: "#232323",
        }}
      />
      <View style={{ width: "100%", padding: "8%" }}>
        <Text
          style={{
            fontFamily: "Pretendard",
            fontSize: 20,
            fontWeight: "bold",
            fontStyle: "normal",
            letterSpacing: 0,
            textAlign: "left",
            color: "#ffffff",
          }}>
          위치
        </Text>
        <Image
          source={DefaultMap}
          style={{
            width: verticalScale(334),
            height: verticalScale(200),
            borderRadius: 10,
          }}
        />
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
      <View
        style={{
          width: "100%",
          height: verticalScale(10),
          backgroundColor: "#232323",
        }}
      />
      <View style={{ width: "100%", padding: "8%" }}>
        <Text
          style={{
            fontFamily: "Pretendard",
            fontSize: 20,
            fontWeight: "bold",
            fontStyle: "normal",
            letterSpacing: 0,
            textAlign: "left",
            color: "#ffffff",
          }}>
          근무시간
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: 15,
              fontWeight: "bold",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "left",
              color: "#ffffff",
            }}>
            월요일
          </Text>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: 15,
              fontWeight: "normal",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "right",
              color: "#ffffff",
            }}>
            PM 17:00 - PM 21:00
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: 15,
              fontWeight: "bold",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "left",
              color: "#ffffff",
            }}>
            화요일
          </Text>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: 15,
              fontWeight: "normal",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "right",
              color: "#ffffff",
            }}>
            PM 17:00 - PM 21:00
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: 15,
              fontWeight: "bold",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "left",
              color: "#ffffff",
            }}>
            수요일
          </Text>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: 15,
              fontWeight: "normal",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "right",
              color: "#ffffff",
            }}>
            PM 17:00 - PM 21:00
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: 15,
              fontWeight: "bold",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "left",
              color: "#ffffff",
            }}>
            목요일
          </Text>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: 15,
              fontWeight: "normal",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "right",
              color: "#ffffff",
            }}>
            PM 17:00 - PM 21:00
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: 15,
              fontWeight: "bold",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "left",
              color: "#ffffff",
            }}>
            금ㆍ토ㆍ일
          </Text>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: 15,
              fontWeight: "normal",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "right",
              color: "#ffffff",
            }}>
            휴무
          </Text>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          height: verticalScale(10),
          backgroundColor: "#232323",
        }}
      />
      <View style={{ width: "100%", padding: "8%" }}>
        <Text
          style={{
            fontFamily: "Pretendard",
            fontSize: 20,
            fontWeight: "bold",
            fontStyle: "normal",
            letterSpacing: 0,
            textAlign: "left",
            color: "#ffffff",
          }}>
          디자이너 리뷰
        </Text>
        <Text>22.07.15</Text>
        <MeatballIcon />
        <Text>겁나 빠른 황소</Text>
        <View style={{ flexDirection: "row" }}>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </View>
        <Text>스타일 좋음</Text>
        <Text>서비스 보통</Text>
        <Text>
          진짜 잘 짤라줘요~ 강추! 진짜 잘 짤라줘요~ 강추! 진짜 잘 짤라줘요~
          강추! 진짜 잘 짤라줘요~ 강추! 진짜 잘 짤라줘요~ 강추! 진짜 잘
          짤라줘요~ 강추!{" "}
        </Text>
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
  button_container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  tab_button: {
    width: "25%",
    paddingTop: verticalScale(17),
    paddingBottom: verticalScale(17),
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
    fontFamily: "Pretendard",
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffffff",
  },
});
