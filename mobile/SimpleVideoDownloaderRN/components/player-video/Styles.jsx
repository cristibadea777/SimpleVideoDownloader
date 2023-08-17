import { StyleSheet } from 'react-native';

const generareStiluriPlayerVideo = ( culoareFundal, culoarePictograme, culoareTitlu ) => {

  return StyleSheet.create({
      
    containerTitluPlayerVideo: {
        width: "100%", 
        height: "17%",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 3,
        flexWrap: "wrap",
        overflow:"hidden",
        backgroundColor: culoareFundal
    },
    
    video: {
      flex: 1,
      alignSelf: 'stretch'
    },

    textTitluPlayerVideo: {
      fontSize: 18,
      fontWeight: 'bold',
      color: culoareTitlu,
    },

  })
}
export{ generareStiluriPlayerVideo }

