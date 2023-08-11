import { StyleSheet } from 'react-native';

const generareStiluriVideoFullscreen = ( culoareFundal, culoarePictograme, culoareTitlu ) => {

  return StyleSheet.create({

    containerVideo: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: culoareFundal
    },

  })
}
export{ generareStiluriVideoFullscreen }

