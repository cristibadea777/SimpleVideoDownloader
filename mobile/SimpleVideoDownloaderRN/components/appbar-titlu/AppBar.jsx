import { faDownload, faPhotoVideo, faScissors } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { useState } from "react"
import { TouchableOpacity, View } from "react-native"

const AppBar = ({ styles, setVisibilityVideoDownload, setVisibilityCutVideo, visibilityCutVideo }) => {

    const handlePressButonTaie = () => {
        setVisibilityCutVideo(true)
        setVisibilityVideoDownload(false)
    }
    const handlePressButonDescarca = () => {
        setVisibilityCutVideo(false)
        setVisibilityVideoDownload(true)
    }
    const handlePressButonGalerie = () => {
        
        setVisibilityCutVideo(false)
        setVisibilityVideoDownload(false)
    }

    return(
        <View style={styles.containerAppBar}>
            <TouchableOpacity    style={styles.butonAppBar}  onPress={handlePressButonDescarca}>
                <FontAwesomeIcon icon={faDownload}           size={50}   style={styles.culoarePictogrameButon}/>
            </TouchableOpacity>

            <TouchableOpacity    style={styles.butonAppBar}  onPress={handlePressButonTaie}>
                <FontAwesomeIcon icon={faScissors}           size={50}   style={styles.culoarePictogrameButon}/>
            </TouchableOpacity>

            <TouchableOpacity    style={styles.butonAppBar}  onPress={handlePressButonGalerie}>
                <FontAwesomeIcon icon={faPhotoVideo}         size={50}   style={styles.culoarePictogrameButon}/>
            </TouchableOpacity>
        </View>
    )
}
export default AppBar
