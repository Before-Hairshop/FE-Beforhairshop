import {StyleSheet, Text, View, Platform, Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Avatar} from '@rneui/themed';
import Swiper from 'react-native-swiper';

export default function Main(props) {
  const [slideTime, setSlideTime] = useState(1);
  const bannerLists = [
    '../Assets/Images/MainBanner1.png',
    '../Assets/Images/MainBanner2.png',
  ];
  useEffect(() => {
    const autoTimer = setTimeout(() => setSlideTime(8), 1000);
    return () => clearTimeout(autoTimer);
  }, []);

  return (
    <View style={styles.mainView}>
      <View style={{flex: 3}}>
        <View style={styles.header}>
          <Text style={styles.Title}>BEFORE HAIRSHOP</Text>
          <Avatar
            activeOpacity={0.2}
            avatarStyle={{}}
            containerStyle={{backgroundColor: '#BDBDBD'}}
            icon={{}}
            iconStyle={{}}
            imageProps={{}}
            onLongPress={() => alert('onLongPress')}
            onPress={() => alert('onPress')}
            overlayContainerStyle={{}}
            placeholderStyle={{}}
            rounded
            title="P"
            titleStyle={{}}
          />
        </View>

        <View style={{flex: 1, paddingTop: 15}}>
          <View style={{flex: 1}}>
            <Swiper style={styles.wrapper} autoplay>
              <View style={styles.slide1}>
                <Text style={styles.text}>Hello Swiper</Text>
              </View>
              <View style={styles.slide2}>
                <Text style={styles.text}>Beautiful</Text>
              </View>
              <View style={styles.slide3}>
                <Text style={styles.text}>And simple</Text>
              </View>
            </Swiper>
          </View>
          <View style={{flex: 1}}></View>
        </View>
      </View>

      <View style={{flex: 1.5}}>
        <Text style={styles.Title}>인기 헤어스타일</Text>

        {/* <Swiper
            autoplay
            showsPagination={false}
            width={300}
            height={250}
            autoplayTimeout={slideTime}>
            {bannerLists.map(banner => {
              console.log(banner);
              return (
                <Image
                  style={{width: 50, height: 50}}
                  source={require('../Assets/Images/MainBanner1.png')}></Image>
              );
            })}
          </Swiper>
           */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    padding: 20,
    paddingTop: 32,

    backgroundColor: '#191919',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Title: {
    width: 164,

    height: 21,

    fontFamily: 'Pretendard-Bold',

    fontSize: 18,

    fontWeight: 'bold',

    fontStyle: 'normal',

    letterSpacing: 0.07,

    textAlign: 'left',

    color: '#ffffff',
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },

  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
