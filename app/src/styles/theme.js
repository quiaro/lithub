import {
  cyan500, cyan700,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';

const palette = {
  primary1Color: cyan500,
  primary2Color: cyan700,
  primary3Color: grey400,
  accent1Color: '#d46422',
  accent2Color: grey100,
  accent3Color: grey500,
  textColor: darkBlack,
  alternateTextColor: white,
  canvasColor: white,
  borderColor: grey300,
  pickerHeaderColor: cyan500,
  shadowColor: fullBlack,
};

export default {
  // spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: palette,
  toolbar: {
    backgroundColor: '#ad7751'
  },
  tableHeaderColumn: {
    textColor: palette.textColor
  },
};
