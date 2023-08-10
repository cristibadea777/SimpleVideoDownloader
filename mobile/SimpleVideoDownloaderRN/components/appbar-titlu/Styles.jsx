import { StyleSheet } from 'react-native';

const generareStiluriAppBarTitlu = ( culoareTitlu, culoarePictograme ) => {

  return StyleSheet.create(
    {
        containerAppBarSiTitlu: {
            flexDirection: "column",
            height: "15%",
            borderColor: "red",
            borderWidth: 10
        },

        containerAppBar: {
            width: "100%",
            height: "60%",
            justifyContent: "flex-end", 
            alignItems: "center", 
            backgroundColor: "#11574a",
            flexDirection: "row",
        },
    
        butonAppBar: {
            padding: 33,
            paddingRight: 12,
        },

        culoarePictogrameButon: {
            color: culoarePictograme
        },

        containerTitlu: {
            width: "100%", 
            height: "40%",
            justifyContent: "center", 
            alignItems: "center", 
            backgroundColor: "white"
        },

        textTitlu: {
            fontSize: 33,
            fontWeight: 'bold',
            color: culoareTitlu
        },
    }
  )

}
export{ generareStiluriAppBarTitlu }