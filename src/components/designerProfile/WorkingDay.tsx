import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { verticalScale } from "../../utils/scale";

export const WorkingDay = props => {
  if (props.data == undefined) {
    return (
      <View style={styles.office_hours}>
        <Text style={styles.working_day}>{props.week}</Text>
        <Text style={styles.working_time}>휴무</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.office_hours}>
        <Text style={styles.working_day}>{props.week}</Text>
        <Text style={styles.working_time}>{`PM ${props.data.startTime.substring(
          0,
          5,
        )} - PM ${props.data.endTime.substring(0, 5)}`}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  office_hours: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(8),
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
});
