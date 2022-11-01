const onlyNum = (value: any) => {
  return value.replace(/[^0-9]/g, "");
};

const onlyPhoneNum = (value: any) => {
  const num = value.replace(/[^0-9]/g, "");
  let tmp = "";
  if (num.length < 4) {
    return num;
  } else if (num.length < 7) {
    tmp += num.substr(0, 3);
    tmp += "-";
    tmp += num.substr(3);
    return tmp;
  } else if (num.length < 11) {
    tmp += num.substr(0, 3);
    tmp += "-";
    tmp += num.substr(3, 3);
    tmp += "-";
    tmp += num.substr(6);
    return tmp;
  } else {
    tmp += num.substr(0, 3);
    tmp += "-";
    tmp += num.substr(3, 4);
    tmp += "-";
    tmp += num.substr(7);
    return tmp;
  }
};

export { onlyNum, onlyPhoneNum };
