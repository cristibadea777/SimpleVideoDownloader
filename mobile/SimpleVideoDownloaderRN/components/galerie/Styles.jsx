import { StyleSheet } from "react-native"

const generateStiluriGalerie = ( culoarePictograme, culoareFundal ) => {
    return StyleSheet.create(
        {
            containerGalerie: {
                backgroundColor: culoareFundal, 
                marginBottom: 3, 
                borderColor: "white", 
                borderWidth: 3,
                padding: 7,
            },
            containerVideo: {
                height: 333, 
                width: "100%",
            },
            video: {
                height: "80%",
                alignSelf: "stretch"
            },
            containerButoane: {
                flex: 1, 
                flexDirection: "row",
                backgroundColor: "#11574a",
                marginBottom: 3,
                marginTop: 3,
                justifyContent: "flex-start",
                alignItems: "center",
            },
            buton: {
                height: "100%",
                width: "15%",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 7
            },
            culoarePictograme: {
                color: culoarePictograme
            }
        }
    )
}
export default generateStiluriGalerie