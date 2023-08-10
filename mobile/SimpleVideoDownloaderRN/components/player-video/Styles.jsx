import { StyleSheet } from 'react-native';

const generareStiluriPlayerVideo = ( culoareFundal, culoarePictograme ) => {

  return StyleSheet.create({
    
    textTitluPlayerVideo: {
        fontSize: 18,
        fontWeight: 'bold',
      },

      
    containerTitluPlayerVideo: {
        width: "100%", 
        height: "12%",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 3,
        flexWrap: "wrap",
        overflow:"hidden",
        backgroundColor: "white",
        borderBlockColor: "yellow", 
        borderWidth: 5
      },


  })
}
export{ generareStiluriPlayerVideo }

