import { StyleSheet } from 'react-native';

const generareStiluriContainerInput = ( culoareFundal, culoarePictograme ) => {

  return StyleSheet.create({
    
    containerInput: {
        width: "100%", 
        backgroundColor: "white",
        borderColor: "blue", 
        borderWidth: 10,
        justifyContent: "center",
    },

    containerInputLink: {
        flex: 1,
        flexDirection: "row", 
        alignItems: "center",
        backgroundColor: "cyan",
        borderColor: "yellow", 
        borderWidth: 5
    },

    containerButonPaste: {
      width: "15%", 
      height: "100%", 
      alignItems: "center", 
      justifyContent: "center",  
    },

    containerTextInput: {
      width: "65%", 
      alignItems: "center", 
      backgroundColor: "white",
    },

    containerLabelTextInput: {
      width: "20%", 
      alignItems: "flex-start",
      paddingLeft: 3
    },

    text: {
      fontSize: 33,
    },

    text2: {
        fontSize: 27,
      },

    textInput: {
      fontSize: 17, 
      justifyContent: "flex-start", 
      alignItems: "center",
      height: "50%",
      width: "100%",
      borderBottomColor: "black", 
      backgroundColor: culoareFundal,
      borderBottomWidth: 2
    },

    butonPaste: {
      width: "55%", 
      height: "33%", 
      justifyContent: "center", 
      alignItems: "center",
    },

    culoareButonPaste: {
        color: culoarePictograme
    },

  })
}
export{ generareStiluriContainerInput }

