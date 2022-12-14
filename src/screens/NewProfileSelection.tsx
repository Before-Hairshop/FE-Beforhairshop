import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "@rneui/themed";
import { scale, verticalScale } from "../utils/scale";
import ProfileImage from "../components/profileSelection/ProfileImage";
import { useNavigation } from "@react-navigation/native";
import HighlightText from "react-native-highlight-underline-text";
import { setSelectedImage } from "../store/actions/profile_actions";
import { useDispatch, useStore } from "react-redux";
import Modal from "react-native-modal";
import ComplexityHeader from "../components/common/ComplexityHeader";
import ProfileRegistration from "./ProfileRegistration";
import { getVirtualStylingImg } from "../api/getVirtualStylingImg";
import { deleteVirtualStylingImg } from "../api/deleteVirtualStylingImg";
import Spinner from "../components/common/Spinner";
import TestW from "../assets/images/virtual/test_w.jpeg";
import TestM from "../assets/images/virtual/test_m.jpeg";

const BASE = "base";
const EDIT = "edit";
const SELECTED = "selected";
const ADD = "add";

const placeholderUrl =
  "https://user-images.githubusercontent.com/55876368/199949845-66656d25-1c84-4445-8cc1-4ce13ff14ce3.png";
// "https://user-images.githubusercontent.com/55876368/199634630-db396173-517d-4e9a-939a-53f5cdb23228.png";
// "https://via.placeholder.com/300.png/09f/fffC/O%20https://placeholder.com/";
// const addedPlaceholderUrl =
//   "https://via.placeholder.com/150/0000FF/808080%20?Text=Digital.com";

export default function NewProfileSelection() {
  const dispatch = useDispatch();
  const store = useStore();
  const navigation = useNavigation();

  const [imageInfo, setImageInfo] = useState([]);
  const [imageModal, setImageModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedImageId, setSelectedImageId] = useState("");
  const [selectedImageUri, setSelectedImageUri] = useState("");
  const [screenStatus, setScreenStatus] = useState(BASE);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const startEdit = () => {
    setScreenStatus(EDIT);
    let newArray = [...imageInfo];
    let arrayLength = newArray.length;
    for (let i = 0; i < arrayLength; i++) {
      if (newArray[i].status != ADD) {
        newArray[i].status = EDIT;
      }
    }
    setImageInfo(newArray);
  };

  const finishEdit = () => {
    setScreenStatus(BASE);
    let newArray = [...imageInfo];
    let arrayLength = newArray.length;
    for (let i = 0; i < arrayLength; i++) {
      if (newArray[i].status != ADD) {
        newArray[i].status = BASE;
      }
    }
    setImageInfo(newArray);
  };

  const deleteSelectedImage = async () => {
    setIsModalVisible(false);
    setLoading(true);
    const result = await deleteVirtualStylingImg(selectedImageUri);
    console.log(result);
    if (result.data.result == undefined) {
      setLoading(false);
      Alert.alert("????????? ?????????????????????. ?????? ????????? ????????????.");
      navigation.navigate("Loading", {
        reload: true,
      });
    } else if (result.data.status == "OK") {
      let newArray = [...imageInfo];
      newArray = newArray.filter(item => item.id != selectedImageId);
      setImageInfo(newArray);
      setLoading(false);
    } else {
      setLoading(false);
      Alert.alert("?????? ??????");
    }
  };

  const handleSelection = async (id, status, uri, inferenceStatus) => {
    if (status == ADD) {
      setImageModal(true);
    } else {
      if (screenStatus == EDIT) {
        setSelectedImageId(id);
        setSelectedImageUri(uri);
        if (id == 0.1 || id == 0.2) {
          Alert.alert("?????? ???????????? ????????? ??? ????????????.");
        } else if (inferenceStatus == 1)
          [Alert.alert("???????????? ???????????? ????????? ??? ????????????.")];
        else {
          setIsModalVisible(true);
        }
      } else {
        if (inferenceStatus == 1) {
          Alert.alert(`????????? ?????? ??????????????????. ${"\n"}????????? ??????????????????.`);
        } else if (inferenceStatus == 0) {
          Alert.alert(
            `????????? ????????? ??????????????????. ${"\n"}?????? ???????????? ??????????????????.`,
          );
        } else {
          setSelectedImageId(id);
          setSelectedImageUri(uri);
          imageInfo.forEach((item, index) => {
            if (item.status == ADD) {
              //
            } else if (item.id != id) {
              //reset image selection
              imageInfo[index].status = BASE;
            } else if (
              item.id == id &&
              item.id != store.getState().Profile.selectedImage
            ) {
              //when user choose new image
              console.log(item);
              let newArray = [...imageInfo];
              newArray[index].status = SELECTED;
              setImageInfo(newArray);
              setScreenStatus(SELECTED);
              // dispatch(setSelectedImage(item));
            } else {
              console.log(item);
              //when user choose already selected image
              let newArray = [...imageInfo];
              imageInfo[index].status = BASE;
              setImageInfo(newArray);
              setScreenStatus(BASE);
              // dispatch(setSelectedImage(item));
            }
          });
        }
      }
    }
  };

  const HeaderButton = () => {
    if (screenStatus == SELECTED) {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("NewVirtualStyling", {
              id: selectedImageId,
              uri: selectedImageUri,
            });
          }}>
          <Text style={styles.next_text}>??????</Text>
        </TouchableOpacity>
      );
    } else if (screenStatus == BASE) {
      return (
        <TouchableOpacity
          onPress={() => {
            startEdit();
          }}>
          <Text style={styles.edit_text}>??????</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            finishEdit();
          }}>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: scale(16),
              fontWeight: "500",
              fontStyle: "normal",
              letterSpacing: -0.5,
              textAlign: "left",
              color: "#fc2a5b",
            }}>
            ??????
          </Text>
        </TouchableOpacity>
      );
    }
  };

  const renderItem = ({ item }) => {
    return (
      <ProfileImage
        thumbnail={item.uri}
        status={item.status}
        id={item.id}
        onPressImage={() =>
          handleSelection(item.id, item.status, item.uri, item.inferenceStatus)
        }
        inferenceStatus={item.inferenceStatus}
      />
    );
  };

  useEffect(() => {
    setProfileImage(null);
  }, [imageInfo]);

  useEffect(() => {
    async function fetchData() {
      const res = await getVirtualStylingImg();
      if (res.data.result == undefined) {
        Alert.alert("????????? ?????????????????????. ?????? ????????? ????????????.");
        navigation.navigate("Loading", {
          reload: true,
        });
      } else if (res.data.status == "OK") {
        console.log(res);
        let newArray = [];
        newArray.push({
          id: 0.1,
          uri: Image.resolveAssetSource(TestM).uri,
          status: BASE,
          inferenceStatus: 2,
        });
        newArray.push({
          id: 0.2,
          uri: Image.resolveAssetSource(TestW).uri,
          status: BASE,
          inferenceStatus: 2,
        });
        res.data.result.map(item => {
          newArray.push({
            id: item.id,
            uri: item.imageUrl,
            status: BASE,
            inferenceStatus: item.inferenceStatus,
          });
        });
        if (
          res.data.result.length >= 2 ||
          res.data.result.filter(item => item.inferenceStatus == 1).length > 0
        ) {
          setImageInfo(newArray);
        } else {
          setImageInfo([
            ...newArray,
            ...[
              {
                id: "58694a0f-3daasadfsadffsdfasdas1-471f-bd9sd6-145571e29d72",
                uri: placeholderUrl,
                status: ADD,
                inferenceStatus: 2,
              },
            ],
          ]);
        }
      } else {
        Alert.alert("???????????? ??????????????? ??????????????????.");
      }
    }
    fetchData();
  }, [imageModal]);

  return (
    <SafeAreaView style={styles.frame}>
      <ProfileRegistration
        isVisible={imageModal}
        setIsVisible={setImageModal}
        profileImage={profileImage}
        setProfileImage={setProfileImage}
        imageInfo={imageInfo}
        setImageInfo={setImageInfo}
      />
      <Modal
        isVisible={isModalVisible}
        animationIn="fadeIn"
        animationOut="fadeOut">
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <View
            style={{
              width: scale(330),
              height: verticalScale(130),
              borderRadius: 10,
              backgroundColor: "#fff",
              borderColor: "#fff",
            }}>
            <View style={{ height: "65%", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: verticalScale(18),
                  fontWeight: "600",
                  fontStyle: "normal",
                  textAlign: "left",
                  color: "#000000",
                  marginTop: verticalScale(33),
                }}>
                ??? ???????????? ?????????????????????????
              </Text>
            </View>
            <View style={{ height: "35%", flexDirection: "row" }}>
              <View style={{ width: "50%", justifyContent: "center" }}>
                <Button
                  title="??????"
                  type="clear"
                  titleStyle={[styles.headerRightButton, { color: "black" }]}
                  onPress={() => setIsModalVisible(false)}
                />
              </View>
              <View style={{ width: "50%", justifyContent: "center" }}>
                <Button
                  title="??????"
                  type="clear"
                  titleStyle={styles.headerRightButton}
                  onPress={deleteSelectedImage}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
        ListHeaderComponent={
          <>
            <ComplexityHeader
              title=""
              goBack="Main"
              button={<HeaderButton />}
            />
            <View style={{ alignItems: "center" }}>
              <View style={{ width: "88.9%" }}>
                <View style={{ paddingBottom: verticalScale(18) }}>
                  <Text
                    style={{
                      fontFamily: "Pretendard",
                      fontSize: verticalScale(22),
                      color: "white",
                      marginBottom: verticalScale(5),
                    }}>
                    ?????? ????????? ?????????
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginBottom: verticalScale(18),
                    }}>
                    <HighlightText
                      isFixed={false}
                      ratio={0.26}
                      underlineColor="rgba(252, 42, 91, 0.5)"
                      textStyle={styles.title}
                      text="???????????? ??????"
                    />
                    <Text>
                      <Text
                        style={{
                          fontFamily: "Pretendard-Regular",
                          fontSize: verticalScale(22),
                          color: "white",
                        }}>
                        ????????????
                      </Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}>
                    <View
                      style={{
                        width: verticalScale(10),
                        height: verticalScale(10),
                        borderRadius: verticalScale(10),
                        backgroundColor: "#47CE5F",
                        opacity: 0.8,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: "Pretendard",
                        fontSize: scale(11),
                        fontWeight: "500",
                        fontStyle: "normal",
                        letterSpacing: -0.5,
                        textAlign: "left",
                        color: "#ffffff",
                      }}>
                      {"  "}
                      ????????? ?????? ??????
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: verticalScale(3),
                      alignItems: "center",
                    }}>
                    <View
                      style={{
                        width: verticalScale(10),
                        height: verticalScale(10),
                        borderRadius: verticalScale(10),
                        backgroundColor: "#F2B53C",
                        opacity: 0.8,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: "Pretendard",
                        fontSize: scale(11),
                        fontWeight: "500",
                        fontStyle: "normal",
                        letterSpacing: -0.5,
                        textAlign: "left",
                        color: "#ffffff",
                      }}>
                      {"  "}
                      ????????? ?????? ?????????
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: verticalScale(3),
                      alignItems: "center",
                    }}>
                    <View
                      style={{
                        width: verticalScale(10),
                        height: verticalScale(10),
                        borderRadius: verticalScale(10),
                        backgroundColor: "#F2382D",
                        opacity: 0.8,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: "Pretendard",
                        fontSize: scale(11),
                        fontWeight: "500",
                        fontStyle: "normal",
                        letterSpacing: -0.5,
                        textAlign: "left",
                        color: "#ffffff",
                      }}>
                      {"  "}
                      ????????? ?????? ??????
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </>
        }
        data={imageInfo}
        extraData={Object.values(imageInfo)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginHorizontal: verticalScale(20),
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      />
      {loading && <Spinner />}
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
  headerRightButton: {
    fontFamily: "Pretendard",
    fontWeight: "500",
    fontStyle: "normal",
    textAlign: "left",
    fontSize: verticalScale(16),
    color: "#fc2a5b",
  },
  next_text: {
    fontFamily: "Pretendard",
    fontSize: scale(16),
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: -0.5,
    textAlign: "left",
    color: "#fc2a5b",
  },
  edit_text: {
    fontFamily: "Pretendard",
    fontSize: scale(16),
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: -0.5,
    textAlign: "left",
    color: "#fc2a5b",
  },
  title: {
    fontFamily: "Pretendard",
    fontSize: verticalScale(22),
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffffff",
  },
});
