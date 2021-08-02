const getPosition = (position: any) => {
  switch (position) {
    case 1:
      return "GOL";
    case 2:
      return "ZAG";
    case 3:
      return "LE";
    case 4:
      return "LD";
    case 6: 
      return "MC"
    case 7:
      return "PD";
    case 8:
      return "VOL";
    case 9:
      return "ATA";
    case 10:
      return "MEI";
    case 11:
      return "PE";
    case 12:
      return "ME";
    case 13:
      return "MD";
    default:
      return "";
  }
};

export default getPosition;
