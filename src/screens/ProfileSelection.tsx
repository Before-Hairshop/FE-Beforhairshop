import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  ScrollView,
  FlatList,
} from "react-native";

import React, { useState, useEffect } from "react";
import { Avatar } from "@rneui/themed";
import { Button } from "@rneui/themed";
import { scale, verticalScale } from "../utils/scale";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/Ionicons";
import ProfileImage from "../components/ProfileImage";
import { useNavigation } from "@react-navigation/native";

import uuid from "react-native-uuid";

import { getSelectedImage } from "../store/actions/profile_actions";
import { useDispatch, useStore } from "react-redux";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import Modal from "react-native-modal";

const BASE = "base";
const EDIT = "edit";
const SELECTED = "selected";
const ADD = "add";

export default function ProfileSelection(props) {
  const dispatch = useDispatch();
  const store = useStore();
  const navigation = useNavigation();

  let [imageInfo, setImageInfo] = useState([
    {
      id: "bd7acbeafasd3abb28ba",
      // uri: require("../assets/images/popular_thumbnail.jpeg"),
      uri: "https://s3-alpha-sig.figma.com/img/ae62/dbb6/f714655497814bc586db89e86864ed36?Expires=1660521600&Signature=CyxSWf-oAwiXPK0A~cUsri26txfwKPLDJeidzb87DU1iusSgNXN27Trr2J2ppz8jGTVAn5fjubDHM7Ngy-qVVqH7BI6H5-D0JvWqplNl6IBrsTIj~O29GcrhMGdqDm8b1x7di0lKYpO7u9UK3mg-FmuH3z-t99dh5EC0axtqOD3GVJnCmP4hbpnnADvTddY-iSo1w1EMOqoXdNJW7q2KXRKgXq36BbO7SaOKAxAkQ5KD0Q3ftf33oj-x56-r1VQsIQoYyyq1OwQZNDMHKw99~JcghWIigU05DhdUtRQ10vBnRssH8qgZpsuaAJAsEdKN2yvYvCWtUULdS06TDK3oAg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      title: "1 Item",
      status: BASE,
    },
    {
      id: "3ac68afc-c605-48d3-aafsdfasdf4f8-fbd91aa97f63",
      // uri: require("../assets/images/popular_thumbnail.jpeg"),
      uri: "https://s3-alpha-sig.figma.com/img/ae62/dbb6/f714655497814bc586db89e86864ed36?Expires=1660521600&Signature=CyxSWf-oAwiXPK0A~cUsri26txfwKPLDJeidzb87DU1iusSgNXN27Trr2J2ppz8jGTVAn5fjubDHM7Ngy-qVVqH7BI6H5-D0JvWqplNl6IBrsTIj~O29GcrhMGdqDm8b1x7di0lKYpO7u9UK3mg-FmuH3z-t99dh5EC0axtqOD3GVJnCmP4hbpnnADvTddY-iSo1w1EMOqoXdNJW7q2KXRKgXq36BbO7SaOKAxAkQ5KD0Q3ftf33oj-x56-r1VQsIQoYyyq1OwQZNDMHKw99~JcghWIigU05DhdUtRQ10vBnRssH8qgZpsuaAJAsEdKN2yvYvCWtUULdS06TDK3oAg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      title: "2 Item",
      status: BASE,
    },
    {
      id: "58694a0f-3da1-471f-asdfasdfbd96-145571e29d72",
      // uri: require("../assets/images/popular_thumbnail.jpeg"),
      uri: "https://s3-alpha-sig.figma.com/img/ae62/dbb6/f714655497814bc586db89e86864ed36?Expires=1660521600&Signature=CyxSWf-oAwiXPK0A~cUsri26txfwKPLDJeidzb87DU1iusSgNXN27Trr2J2ppz8jGTVAn5fjubDHM7Ngy-qVVqH7BI6H5-D0JvWqplNl6IBrsTIj~O29GcrhMGdqDm8b1x7di0lKYpO7u9UK3mg-FmuH3z-t99dh5EC0axtqOD3GVJnCmP4hbpnnADvTddY-iSo1w1EMOqoXdNJW7q2KXRKgXq36BbO7SaOKAxAkQ5KD0Q3ftf33oj-x56-r1VQsIQoYyyq1OwQZNDMHKw99~JcghWIigU05DhdUtRQ10vBnRssH8qgZpsuaAJAsEdKN2yvYvCWtUULdS06TDK3oAg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      title: "3 Item",
      status: BASE,
    },
    {
      id: "58694a0f-3da1-471f-bd9sadfadsf6-145571e29d72",
      // uri: require("../assets/images/popular_thumbnail.jpeg"),
      uri: "https://s3-alpha-sig.figma.com/img/ae62/dbb6/f714655497814bc586db89e86864ed36?Expires=1660521600&Signature=CyxSWf-oAwiXPK0A~cUsri26txfwKPLDJeidzb87DU1iusSgNXN27Trr2J2ppz8jGTVAn5fjubDHM7Ngy-qVVqH7BI6H5-D0JvWqplNl6IBrsTIj~O29GcrhMGdqDm8b1x7di0lKYpO7u9UK3mg-FmuH3z-t99dh5EC0axtqOD3GVJnCmP4hbpnnADvTddY-iSo1w1EMOqoXdNJW7q2KXRKgXq36BbO7SaOKAxAkQ5KD0Q3ftf33oj-x56-r1VQsIQoYyyq1OwQZNDMHKw99~JcghWIigU05DhdUtRQ10vBnRssH8qgZpsuaAJAsEdKN2yvYvCWtUULdS06TDK3oAg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      title: "4 Item",
      status: BASE,
    },
    {
      id: "58694a0ffasdfdasf71f-bd96-145571e29d72",
      // uri: require("../assets/images/popular_thumbnail1.png"),
      uri: "https://s3-alpha-sig.figma.com/img/ae62/dbb6/f714655497814bc586db89e86864ed36?Expires=1660521600&Signature=CyxSWf-oAwiXPK0A~cUsri26txfwKPLDJeidzb87DU1iusSgNXN27Trr2J2ppz8jGTVAn5fjubDHM7Ngy-qVVqH7BI6H5-D0JvWqplNl6IBrsTIj~O29GcrhMGdqDm8b1x7di0lKYpO7u9UK3mg-FmuH3z-t99dh5EC0axtqOD3GVJnCmP4hbpnnADvTddY-iSo1w1EMOqoXdNJW7q2KXRKgXq36BbO7SaOKAxAkQ5KD0Q3ftf33oj-x56-r1VQsIQoYyyq1OwQZNDMHKw99~JcghWIigU05DhdUtRQ10vBnRssH8qgZpsuaAJAsEdKN2yvYvCWtUULdS06TDK3oAg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      title: "5 Item",
      status: BASE,
    },
    {
      id: "58694a0f-3daasdfas1-471f-bd9sd6-145571e29d72",
      // uri: require("../assets/images/popular_thumbnail.jpeg"),
      uri: "https://s3-alpha-sig.figma.com/img/ae62/dbb6/f714655497814bc586db89e86864ed36?Expires=1660521600&Signature=CyxSWf-oAwiXPK0A~cUsri26txfwKPLDJeidzb87DU1iusSgNXN27Trr2J2ppz8jGTVAn5fjubDHM7Ngy-qVVqH7BI6H5-D0JvWqplNl6IBrsTIj~O29GcrhMGdqDm8b1x7di0lKYpO7u9UK3mg-FmuH3z-t99dh5EC0axtqOD3GVJnCmP4hbpnnADvTddY-iSo1w1EMOqoXdNJW7q2KXRKgXq36BbO7SaOKAxAkQ5KD0Q3ftf33oj-x56-r1VQsIQoYyyq1OwQZNDMHKw99~JcghWIigU05DhdUtRQ10vBnRssH8qgZpsuaAJAsEdKN2yvYvCWtUULdS06TDK3oAg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      title: "6 Item",
      status: BASE,
    },
    {
      id: "58694a0f-3daasdfsdfasdas1-471f-bd9sd6-145571e29d72",
      // uri: require("../assets/images/popular_thumbnail.jpeg"),
      uri: "https://s3-alpha-sig.figma.com/img/ae62/dbb6/f714655497814bc586db89e86864ed36?Expires=1660521600&Signature=CyxSWf-oAwiXPK0A~cUsri26txfwKPLDJeidzb87DU1iusSgNXN27Trr2J2ppz8jGTVAn5fjubDHM7Ngy-qVVqH7BI6H5-D0JvWqplNl6IBrsTIj~O29GcrhMGdqDm8b1x7di0lKYpO7u9UK3mg-FmuH3z-t99dh5EC0axtqOD3GVJnCmP4hbpnnADvTddY-iSo1w1EMOqoXdNJW7q2KXRKgXq36BbO7SaOKAxAkQ5KD0Q3ftf33oj-x56-r1VQsIQoYyyq1OwQZNDMHKw99~JcghWIigU05DhdUtRQ10vBnRssH8qgZpsuaAJAsEdKN2yvYvCWtUULdS06TDK3oAg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      title: "7 Ifsdaftem",
      status: BASE,
    },
    {
      id: "58694a0f-3daasadfsadffsdfasdas1-471f-bd9sd6-145571e29d72",
      // uri: require("../assets/images/popular_thumbnail.jpeg"),
      uri: "https://s3-alpha-sig.figma.com/img/ae62/dbb6/f714655497814bc586db89e86864ed36?Expires=1660521600&Signature=CyxSWf-oAwiXPK0A~cUsri26txfwKPLDJeidzb87DU1iusSgNXN27Trr2J2ppz8jGTVAn5fjubDHM7Ngy-qVVqH7BI6H5-D0JvWqplNl6IBrsTIj~O29GcrhMGdqDm8b1x7di0lKYpO7u9UK3mg-FmuH3z-t99dh5EC0axtqOD3GVJnCmP4hbpnnADvTddY-iSo1w1EMOqoXdNJW7q2KXRKgXq36BbO7SaOKAxAkQ5KD0Q3ftf33oj-x56-r1VQsIQoYyyq1OwQZNDMHKw99~JcghWIigU05DhdUtRQ10vBnRssH8qgZpsuaAJAsEdKN2yvYvCWtUULdS06TDK3oAg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      title: "8 Ifsdaftem",
      status: ADD,
    },
  ]);

  let [selectedImageId, setSelectedImageId] = useState("");
  let [screenStatus, setScreenStatus] = useState(BASE);
  let [isModalVisible, setIsModalVisible] = useState(false);

  const startEdit = () => {
    setScreenStatus(EDIT);
    let newArray = [...imageInfo];

    let arrayLength = newArray.length;
    for (let i = 0; i < arrayLength; i++) {
      if (newArray[i].status != ADD) {
        newArray[i].status = EDIT;
      }
    }
    console.log("edit start");
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
    console.log("edit finished");
    setImageInfo(newArray);
  };

  const deleteSelectedImage = () => {
    let newArray = [...imageInfo];
    newArray = newArray.filter(item => item.id != selectedImageId);
    setImageInfo(newArray);
    setIsModalVisible(false);
  };

  const handleSelection = async (id, status) => {
    if (status == ADD) {
      console.log("add new image");
      try {
        const result = await launchImageLibrary({}, response => {
          console.log(response);
          let uri =
            "https://s3-alpha-sig.figma.com/img/2368/2f7c/bf359d92bfd88117fafe2b252fec1f12?Expires=1660521600&Signature=aV7VDi9kBJtisfIq1hv5QYqJ1XJ1WXNcytOI3PWXyMWO10V~HHUji47cNADyU-u-5jTFToo9RJzVGq3c-pJItMj-bBZLNrYsa4I1x6YFT47GNbz16zxXDnaIBuv8z7p2G5btSqZwPIWWbNu7TNLKg51sxBvuPJ7V4LE-GP49DqzSzEfNhqAkfM1TiZXYZt0MHmoMR1gi8MfuAzsIg381es98-DbO3hfj5f~xT52gHy5GhZzVzsw6~NnQlclRINBv4fuqO5Q-hq1I6FZwaFXSIaT4HrzQMsbqO2QBuQpueg3qlTWVaS4lazH8J1OHYneuxoalbM0j2TWA0~xW6kY4YA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA";
          let newImage = {
            id: uuid.v4(),
            uri: uri,
            status: BASE,
          };

          let newArray = [...imageInfo];
          let toInsertIndex = newArray.length - 1;
          newArray.splice(toInsertIndex, 0, newImage);

          setImageInfo(newArray);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      setSelectedImageId(id);
      if (screenStatus == EDIT) {
        console.log(`image to delete is ${id}`);

        setIsModalVisible(true);
      } else {
        imageInfo.forEach((item, index) => {
          if (item.status == ADD) {
          } else if (item.id != id) {
            //reset image selection
            imageInfo[index].status = BASE;
          } else if (
            item.id == id &&
            item.id != store.getState().Profile.selectedImage
          ) {
            //when user choose new image
            let newArray = [...imageInfo];
            newArray[index].status = SELECTED;
            setImageInfo(newArray);

            setScreenStatus(SELECTED);
            dispatch(getSelectedImage(id));

            console.log(newArray[index]);
          } else {
            //when user choose already selected image
            let newArray = [...imageInfo];
            imageInfo[index].status = BASE;
            setImageInfo(newArray);

            setScreenStatus(BASE);
            console.log(newArray[index]);
            dispatch(getSelectedImage(""));
          }
        });
      }
    }
  };
  const HeaderButton = () => {
    if (screenStatus == SELECTED) {
      return (
        <Button
          title="다음"
          type="clear"
          titleStyle={styles.headerRightButton}
          onPress={() => navigation.navigate("VirtualStyling")}
        />
      );
    } else if (screenStatus == BASE) {
      return (
        <Button
          title="편집"
          type="clear"
          titleStyle={styles.headerRightButton}
          onPress={startEdit}
        />
      );
    } else {
      return (
        <Button
          title="완료"
          type="clear"
          titleStyle={styles.headerRightButton}
          onPress={finishEdit}
        />
      );
    }
  };

  const HeaderContents = () => {
    const navigation = useNavigation();

    return (
      <>
        <Icon
          name="chevron-back-outline"
          color="#ffffff"
          size={verticalScale(40)}
          onPress={() => navigation.navigate("Main")}></Icon>

        <HeaderButton />
      </>
    );
  };

  const renderItem = ({ item }) => {
    console.log(item);
    return (
      <ProfileImage
        thumbnail={item.uri}
        status={item.status}
        id={item.id}
        onPressImage={() => handleSelection(item.id, item.status)}
      />
      // <Image
      //   source={{ uri: item.uri }}
      //   style={{ width: 150, height: 150 }}></Image>
    );
  };
  return (
    <View style={styles.mainView}>
      <Header contents={<HeaderContents></HeaderContents>}></Header>
      <Modal isVisible={isModalVisible}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <View
            style={{
              width: scale(350),

              height: verticalScale(150),

              borderRadius: 15,
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              borderColor: "white",
            }}>
            <View style={{ flex: 2, alignItems: "center" }}>
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: verticalScale(24),
                  marginTop: verticalScale(33),
                }}>
                이 프로필을 삭제하시겠어요?
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Button
                  title="삭제"
                  type="clear"
                  titleStyle={styles.headerRightButton}
                  onPress={deleteSelectedImage}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  title="취소"
                  type="clear"
                  titleStyle={[
                    styles.headerRightButton,
                    { color: "rgba(255, 255, 255, 0.5)" },
                  ]}
                  onPress={() => setIsModalVisible(false)}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingTop: 15 }}>
          <View style={{ flex: 6 }}>
            <Text
              style={{
                fontFamily: "Pretendard",
                fontSize: verticalScale(22),
                color: "white",
              }}>
              가상 헤어를 적용 할
            </Text>
            <Text>
              <Text
                style={{
                  fontFamily: "Pretendard-Bold",
                  fontSize: verticalScale(22),
                  color: "white",
                  textDecorationLine: "underline",
                  textDecorationColor: "#8a2139",
                }}>
                프로필을 선택
              </Text>
              <Text
                style={{
                  fontFamily: "Pretendard-Regular",
                  fontSize: verticalScale(22),
                  color: "white",
                }}>
                해주세요.
              </Text>
            </Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 5 }}>
        <FlatList
          data={imageInfo}
          extraData={Object.values(imageInfo)}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingHorizontal: verticalScale(20),

    backgroundColor: "#191919",
  },

  title: {
    fontSize: 32,
  },
  headerRightButton: {
    fontFamily: "Pretendard-Bold",
    fontSize: verticalScale(16),
    color: "#fc2a5b",
  },
});
