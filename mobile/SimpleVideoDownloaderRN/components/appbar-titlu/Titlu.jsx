import { Text, View } from "react-native"

const Titlu = ( {styles, visibilityCutVideo} ) => {
    return(
        <View style={styles.containerTitlu}>
                <Text style={styles.textTitlu}>{visibilityCutVideo ? "Cut and Download Video" : "Download Video"}</Text>
        </View>
    )
}
export default Titlu