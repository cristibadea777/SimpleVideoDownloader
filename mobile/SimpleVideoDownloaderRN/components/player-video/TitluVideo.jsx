import { Text, View } from "react-native"

const TitluVideo = ( {styles, fileName} ) => {
    return(
        <View style={styles.containerTitluPlayerVideo}>
            <Text style={styles.textTitluPlayerVideo}>{fileName}</Text>
        </View>
    )
}
export default TitluVideo
