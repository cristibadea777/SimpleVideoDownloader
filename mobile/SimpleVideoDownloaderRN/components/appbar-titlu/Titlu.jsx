import { Text, View } from "react-native"

const Titlu = ( {styles, visibilityCutVideo, visibilityVideoDownload, visibilityVideoGalery} ) => {
    return(
        <View style={styles.containerTitlu}>
                <Text style={styles.textTitlu}>{visibilityCutVideo ? "Cut and Download Video" : visibilityVideoDownload ? "Download Video" : visibilityVideoGalery ? "Video Galery" : ""}</Text>
        </View>
    )
}
export default Titlu