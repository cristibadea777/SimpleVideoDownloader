import { StyleSheet } from 'react-native';

const generareStiluri = ( culoareFundal, culoareTitlu ) => {

  return StyleSheet.create({
    
    containerPrincipal: {
      flexGrow: 1,
      backgroundColor: culoareFundal,
    },

    containerRowInputParti: {
      width: "100%", 
      height: "50%",
      backgroundColor: "blue"
    },

    containerRowTitluClip: {
      width: "100%", 
      height: "12%",
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: 3,
      flexWrap: "wrap",
      overflow:"hidden",
      backgroundColor: "yellow",
    },

    textTitluClip: {
      fontSize: 24,
      fontWeight: 'bold',
    },

    containerOutput: {
      height: "33%",
      width: "100%", 
      justifyContent: "center",
      alignItems: "center",
    },

    text: {
      fontSize: 33,
    },



  })
}
export{ generareStiluri }

