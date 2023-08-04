import { StyleSheet } from 'react-native';

const generareStiluri = ( culoareFundal, culoareTitlu ) => {

  return StyleSheet.create({
    
    containerPrincipal: {
      flex: 1,
      backgroundColor: culoareFundal,
    },

    titluContainer: {
        width: "100%", 
        height: "15%",
        justifyContent: "center", 
        alignItems: "center", 
    },

    titluText: {
        fontSize: 33,
        fontWeight: 'bold',
        color: culoareTitlu
    },

    containerInput: {
        height: "20%",
        width: "100%", 
        backgroundColor: "cyan",
        justifyContent: "center"
    },

    containerRowInput: {
        width: "100%", 
        height: "50%",
        flexDirection: "row", 
        alignItems: "center",
    },

    containerButonPaste: {
      width: "15%", 
      height: "100%", 
      alignItems: "center", 
      justifyContent: "center",  
    },

    containerRowDescarcare: {
      width: "100%", 
      height: "50%",
      flexDirection: "row"
    },

    containerTextDescarca: {
      width: "50%", 
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },

    containerButonDescarca: {
      width: "50%", 
      height: "100%",
      justifyContent: "flex-start",
      alignItems: "flex-end",
      padding: 12,
    },

    text: {
      fontSize: 33,
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

    butonDescarca: {
      width: "50%", 
      height: "100%", 
      justifyContent: "center", 
      alignItems: "flex-end",
      padding: 3
    }


  })
}

export{
  generareStiluri,
}

