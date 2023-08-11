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


    text: {
      fontSize: 33,
    },



  })
}
export{ generareStiluri }

