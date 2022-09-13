import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import GoBackIcon from "../assets/icons/goBack.svg";
import { useState } from "react";
import { Platform } from "react-native";
import PlusIcon from "../assets/icons/plus.png";
import { verticalScale, scale } from "../utils/scale";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import ProfileUploadButton from "../components/common/ProfileUploadButton";

import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const BASEWIDTH = 375;
const BASEPADDING = 20;
const numberOfLines = 4;
const MAINCOLOR = "#fc2a5b";
const GRAYCOLOR = "#555555";

const baseImageURL = Image.resolveAssetSource(PlusIcon).uri;
const HeaderContents = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={{ flex: 1 }}>
        <GoBackIcon />
      </View>
      <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
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
          프로필
        </Text>
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <Text style={{ color: MAINCOLOR }}>저장</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default function Loading() {
  const [profileImage, setProfileImage] = useState([baseImageURL]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [tagInput, setTagInput] = useState("");
  const [hairTag, setHairTag] = useState([]);
  const [shopName, setShopName] = useState("");
  const [location, setLocation] = useState("");
  const [specificLocation, setSpecificLocation] = useState("");

  const [menuInfo, setMenuInfo] = useState([]);
  const [styleName, setStyleName] = useState("");
  const [price, setPrice] = useState("");

  const [schedule, setSchedule] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [category, setCategory] = useState("");
  const [categoryItem, setCategoryItem] = useState([
    {
      label: "컷",
      value: "컷",
    },
    {
      label: "펌",
      value: "펌",
    },
    {
      label: "염색",
      value: "염색",
    },
  ]);

  const [workingDayItem, setWorkingDayItem] = useState([
    {
      label: "월요일",
      value: "MON",
    },
    {
      label: "화요일",
      value: "TUE",
    },
    {
      label: "수요일",
      value: "WED",
    },
    {
      label: "목요일",
      value: "THU",
    },
    {
      label: "금요일",
      value: "FRI",
    },
    {
      label: "토요일",
      value: "SAT",
    },
    {
      label: "일요일",
      value: "SUN",
    },
  ]);

  const workingdayDict = {};
  workingdayDict["MON"] = "월요일";
  workingdayDict["TUE"] = "화요일";
  workingdayDict["WED"] = "수요일";
  workingdayDict["THU"] = "목요일";
  workingdayDict["FRI"] = "금요일";
  workingdayDict["SAT"] = "토요일";
  workingdayDict["SUN"] = "일요일";

  const [selectedWeek, setSelectedWeek] = useState("");

  const [isBeginTime, setIsBeginTime] = useState(false);
  const [beginTime, setBeginTime] = useState("영업 시작 시간");

  const [isEndTime, setIsEndTime] = useState(false);
  const [endTime, setEndTime] = useState("영업 종료 시간");

  const [isDatepickerShown, setIsDatePickerShown] = useState(false);

  const HairTagButton = ({ index }) => {
    return (
      <TouchableOpacity
        style={{
          borderColor: MAINCOLOR,
          borderWidth: 1,
          borderRadius: scale(16),
          paddingHorizontal: scale(10),
          marginRight: scale(10),
        }}
        onPress={() => {
          let newArray = [...hairTag];
          newArray.splice(index, 1);
          setHairTag(newArray);
        }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}>
          <Text style={{ color: MAINCOLOR }}>{hairTag[index]}</Text>
          <Icon
            name="close-outline"
            color={MAINCOLOR}
            style={{ fontSize: verticalScale(35) }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const SetTimeButton = ({ isBeginButton }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (isBeginButton) {
            setIsBeginTime(true);
          } else {
            setIsEndTime(true);
          }

          setIsDatePickerShown(true);
        }}>
        <View
          style={[
            styles.inputText,
            styles.dropdownStyle,
            { justifyContent: "center" },
          ]}>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: scale(16),
              color: "#cccccc",
            }}>
            {isBeginButton ? beginTime.substr(0, 5) : endTime.substr(0, 5)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainView}>
      <Header contents={<HeaderContents></HeaderContents>}></Header>

      <ScrollView>
        <View style={{ alignItems: "center", margin: verticalScale(10) }}>
          <View style={{ flexDirection: "row" }}>
            {profileImage.map((item, index) => {
              return (
                <View
                  style={{
                    width: "30%",
                    alignItems: "center",
                    margin: verticalScale(10),
                  }}>
                  <ProfileUploadButton
                    index={index}
                    toChangeArray={profileImage}
                    toChangeFunction={setProfileImage}
                    style={styles.userProfileImage}></ProfileUploadButton>
                </View>
              );
            })}
          </View>
        </View>

        <View style={{ marginTop: 12, alignItems: "flex-start" }}>
          <Text style={styles.itemTextStyle}>이름</Text>

          <View style={styles.userTextUnderline}>
            <TextInput
              placeholder="이름을 작성해주세요."
              placeholderTextColor={GRAYCOLOR}
              defaultValue={name}
              onEndEditing={e => {
                setName(e.nativeEvent.text);
              }}
              autoCorrect={false}
              style={styles.inputText}></TextInput>
          </View>
        </View>

        <View style={{ marginTop: 12, alignItems: "flex-start" }}>
          <Text style={styles.itemTextStyle}>자기 소개 </Text>

          <View style={styles.userTextUnderline}>
            <TextInput
              autoCorrect={false}
              placeholder="프로필에 들어갈 자기소개를 작성해주세요."
              placeholderTextColor={GRAYCOLOR}
              defaultValue={description}
              onEndEditing={e => {
                setDescription(e.nativeEvent.text);
              }}
              multiline
              numberOfLines={Platform.OS === "ios" ? null : numberOfLines}
              minHeight={
                Platform.OS === "ios" && numberOfLines
                  ? 20 * numberOfLines
                  : null
              }
              textAlignVertical="top"
              style={styles.inputText}></TextInput>
          </View>
        </View>

        <View style={{ marginTop: 12, alignItems: "flex-start" }}>
          <Text style={styles.itemTextStyle}>주요 헤어스타일(선택) </Text>

          <View style={styles.userTextUnderline}>
            <TextInput
              placeholder="#태그"
              placeholderTextColor={GRAYCOLOR}
              value={tagInput}
              onChangeText={text => setTagInput(text)}
              onEndEditing={e => {
                let newHairTagArray = [...hairTag];
                newHairTagArray.push(e.nativeEvent.text);

                setHairTag(newHairTagArray);
                setTagInput("");
              }}
              autoCorrect={false}
              style={[styles.inputText]}></TextInput>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ paddingTop: verticalScale(13), margin: verticalScale(5) }}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}>
            {hairTag.map((item, index) => {
              return <HairTagButton index={index}></HairTagButton>;
            })}
          </ScrollView>
        </View>

        <View style={{ marginTop: 12, alignItems: "flex-start" }}>
          <Text style={styles.itemTextStyle}>헤어 목록</Text>

          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <View style={{ flex: 1, marginRight: scale(10) }}>
              <View style={[styles.userTextUnderline]}>
                <Dropdown
                  style={[styles.inputText, styles.dropdownStyle]}
                  placeholderStyle={{ color: GRAYCOLOR }}
                  selectedTextStyle={{ color: "#cccccc" }}
                  data={categoryItem}
                  labelField="label"
                  valueField="value"
                  placeholder="카테고리"
                  value={category}
                  onChange={item => {
                    setCategory(item.value);
                  }}
                />
              </View>
            </View>
            <View style={{ flex: 1, marginRight: scale(10) }}>
              <View style={styles.userTextUnderline}>
                <TextInput
                  placeholder="스타일 명"
                  placeholderTextColor={GRAYCOLOR}
                  // textAlignVertical="center"
                  value={styleName}
                  onChangeText={text => {
                    setStyleName(text);
                  }}
                  style={[styles.inputText, styles.dropdownStyle]}></TextInput>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.userTextUnderline}>
                <TextInput
                  placeholder="가격"
                  value={price}
                  onChangeText={text => {
                    setPrice(text);
                  }}
                  placeholderTextColor={GRAYCOLOR}
                  style={[styles.inputText, styles.dropdownStyle]}></TextInput>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: "#2e2e2e",
              padding: 10,
              marginTop: verticalScale(25),
              borderRadius: 10,
              width: "100%",
            }}
            onPress={() => {
              let newArray = JSON.parse(JSON.stringify(menuInfo));
              newArray.push({
                category,
                styleName,
                price,
              });
              setMenuInfo(newArray);
              setCategory("");
              setStyleName("");
              setPrice("");
            }}>
            <Text style={{ fontSize: scale(14), color: "#a0a0a0" }}>
              추가 +
            </Text>
          </TouchableOpacity>

          {menuInfo.map((item, index) => {
            return (
              <>
                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                  <View style={{ flex: 1, marginRight: scale(10) }}>
                    <Text style={styles.inputText}>
                      {menuInfo[index].category}
                    </Text>
                  </View>
                  <View style={{ flex: 1, marginRight: scale(10) }}>
                    <Text style={styles.inputText}>
                      {menuInfo[index].styleName}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: 0,
                      padding: 0,
                    }}>
                    <Text style={styles.inputText}>
                      {menuInfo[index].price}
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        let newArray = JSON.parse(JSON.stringify(menuInfo));
                        newArray.splice(index, 1);
                        setMenuInfo(newArray);
                      }}>
                      <Icon
                        name="remove-circle-outline"
                        color={MAINCOLOR}
                        size={scale(20)}></Icon>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            );
          })}
        </View>

        <View style={{ marginTop: 12, alignItems: "flex-start", zIndex: 0 }}>
          <Text style={styles.itemTextStyle}>헤어샵 이름</Text>

          <View style={styles.userTextUnderline}>
            <TextInput
              placeholder="헤어샵 이름을 입력해주세요."
              placeholderTextColor={GRAYCOLOR}
              value={shopName}
              onChangeText={text => {
                setShopName(text);
              }}
              style={styles.inputText}></TextInput>
          </View>
        </View>

        <View style={{ marginTop: 12, alignItems: "flex-start" }}>
          <Text style={styles.itemTextStyle}>헤어샵 위치</Text>

          <View style={styles.userTextUnderline}>
            <TextInput
              placeholder="우편 번호로 찾기"
              placeholderTextColor={GRAYCOLOR}
              style={styles.inputText}></TextInput>
          </View>
        </View>

        <View style={{ marginTop: 12, alignItems: "flex-start" }}>
          <Text style={styles.itemTextStyle}>상세 주소 입력</Text>

          <View style={styles.userTextUnderline}>
            <TextInput
              placeholder="상세 주소를 입력해주세요."
              placeholderTextColor={GRAYCOLOR}
              value={specificLocation}
              onChangeText={text => {
                setSpecificLocation(text);
              }}
              style={styles.inputText}></TextInput>
          </View>
        </View>

        <View style={{ marginTop: 12, alignItems: "flex-start" }}>
          <Text style={styles.itemTextStyle}>영업 시간</Text>

          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <View style={{ flex: 1, marginRight: scale(10) }}>
              <View style={[styles.userTextUnderline]}>
                <Dropdown
                  style={[styles.inputText, styles.dropdownStyle]}
                  placeholderStyle={{ color: GRAYCOLOR }}
                  selectedTextStyle={{ color: "#cccccc" }}
                  data={workingDayItem}
                  labelField="label"
                  valueField="value"
                  placeholder="근무 요일"
                  value={selectedWeek}
                  onChange={item => {
                    setSelectedWeek(item.value);
                  }}></Dropdown>
              </View>
            </View>
            <View style={{ flex: 1, marginRight: scale(10) }}>
              <View style={[styles.userTextUnderline]}>
                <SetTimeButton isBeginButton={true} />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.userTextUnderline}>
                <SetTimeButton isBeginButton={false} />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: "#2e2e2e",
              padding: 10,
              marginTop: verticalScale(25),
              borderRadius: 10,
              width: "100%",
            }}
            onPress={() => {
              let newArray = JSON.parse(JSON.stringify(schedule));
              newArray.push({
                selectedWeek,
                beginTime,
                endTime,
              });
              setSchedule(newArray);
            }}>
            <Text style={{ fontSize: scale(14), color: "#a0a0a0" }}>
              추가 +
            </Text>
          </TouchableOpacity>

          {schedule.map((item, index) => {
            return (
              <>
                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                  <View style={{ flex: 1, marginRight: scale(10) }}>
                    <Text style={styles.inputText}>
                      {workingdayDict[schedule[index].selectedWeek]}
                    </Text>
                  </View>
                  <View style={{ flex: 1, marginRight: scale(10) }}>
                    <Text style={styles.inputText}>
                      {schedule[index].beginTime.substr(0, 5)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: 0,
                      padding: 0,
                    }}>
                    <Text style={styles.inputText}>
                      {schedule[index].endTime.substr(0, 5)}
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        let newArray = JSON.parse(JSON.stringify(schedule));
                        newArray.splice(index, 1);
                        setSchedule(newArray);
                      }}>
                      <Icon
                        name="remove-circle-outline"
                        color={MAINCOLOR}
                        size={scale(20)}></Icon>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            );
          })}
        </View>

        <View style={{ marginTop: 12, alignItems: "flex-start" }}>
          <Text style={styles.itemTextStyle}>전화 번호</Text>

          <View style={styles.userTextUnderline}>
            <TextInput
              placeholder="전화 번호를 입력해주세요."
              placeholderTextColor={GRAYCOLOR}
              value={phoneNumber}
              onChangeText={text => {
                setPhoneNumber(text);
              }}
              keyboardType="phone-pad"
              style={styles.inputText}></TextInput>
          </View>
        </View>
      </ScrollView>
      <DateTimePickerModal
        isVisible={isDatepickerShown}
        locale="en_GB"
        mode={"time"}
        onConfirm={value => {
          value.setSeconds(0);
          let timeString = value.toLocaleTimeString("en-US", { hour12: false });
          if (isBeginTime) {
            setBeginTime(timeString);
          } else {
            setEndTime(timeString);
          }
          setIsDatePickerShown(false);
          setIsBeginTime(false);
          setIsEndTime(false);
        }}
        onCancel={() => {
          setIsDatePickerShown(false);
          setIsBeginTime(false);
          setIsEndTime(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingHorizontal: 20,

    backgroundColor: "#191919",
  },

  userProfileImage: {
    width: "100%",
    aspectRatio: 1,
    marginHorizontal: verticalScale(6),
    borderRadius: 100,

    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#373737",
  },

  userTextUnderline: {
    borderBottomColor: "#373737",
    borderBottomWidth: 1,
    width: "100%",
  },

  itemTextStyle: {
    fontFamily: "Pretendard",
    fontSize: scale(16),

    marginBottom: verticalScale(10),
    marginTop: verticalScale(15),

    letterSpacing: 0,

    color: "#ffffff",
  },

  inputText: {
    fontFamily: "Pretendard",
    fontSize: scale(16),

    margin: 0,
    padding: 0,
    // textAlignVertical: "baseline",

    marginBottom: verticalScale(10),
    marginTop: verticalScale(15),
    color: "#cccccc",
  },

  dropdownStyle: {
    height: verticalScale(35),
  },
});
