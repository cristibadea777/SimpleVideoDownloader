import { StyleSheet } from 'react-native';

const generareStiluriStareDescarcare = ( culoarePictograme, culoareFundal ) => {

  return StyleSheet.create({

    culoarePictogramaButonDescarca: {
        color: culoarePictograme
    },

    containerStareDescarcare: {
        height: "10%",
        width: "100%", 
        flexDirection: "row",
    },

    containerButonDescarca: {
        width: "33%", 
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        padding: 12,
        backgroundColor: culoareFundal
    },

    butonDescarca: {
        width: "50%", 
        height: "100%", 
        justifyContent: "center", 
        alignItems: "flex-end",
        padding: 3
    },

    containerTextStareDescarcare: {
        width: "67%", 
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 3,
        backgroundColor: culoareFundal
    },

    text: {
        fontSize: 33,
    },

  })
}
export{ generareStiluriStareDescarcare }

