import { StyleSheet } from 'react-native';

const generareStiluriModale = ( culoareFundal, culoarePictograme ) => {

  return StyleSheet.create({
    
    containerModal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        alignItems: "center",
        justifyContent: "center",
    }, 

    containerModalStergere: {
        height: "33%",
        width: "70%",
        backgroundColor: culoareFundal,
    },

    containerTitluModal: {
        height: "25%",
        width: "100%",
        backgroundColor: "#11574a",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },

    textTitluModal: {
        fontSize: 33,
        color: "white",
    },

    textTitluVideo: {
        fontSize: 20,
        color: "black"
    },

    containerTitluVideoStergere: {
        flex: 1, 
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },

    containerInputTitluEdit: {
        flexDirection: "row",
        height: "40%",
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "white",
    },

    containerButoane: {
        height: "33%", 
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12
    },

    butoane: {
        borderWidth: 2, 
        borderColor: "black",
    },

    textButoane: {
        fontSize: 33,
        color: "white"
    },

    containerModalEdit: {
        height: "33%",
        width: "90%",
        backgroundColor: "cyan",
    }


  })
}
export{ generareStiluriModale }

