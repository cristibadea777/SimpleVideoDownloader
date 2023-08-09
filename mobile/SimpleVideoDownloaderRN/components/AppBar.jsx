import { faDownload, faFileVideo, faPhotoVideo, faScissors, faVideo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { TouchableOpacity, View } from "react-native"

const AppBar = ({ styles, setVisibilityVideoDownload, setVisibilityCutVideo }) => {

    const handlePressButonTaie = () => {
        setVisibilityCutVideo(true)
        setVisibilityVideoDownload(false)
    }

    const handlePressButonDescarca = () => {
        setVisibilityVideoDownload(true)
        setVisibilityCutVideo(false)
    }

    const handlePressButonGalerie = () => {

        setVisibilityVideoDownload(false)
    }


    return(
        <View style={styles.containerAppBar}>

            <TouchableOpacity
                style={styles.butonAppBar}
                onPress={handlePressButonDescarca}
            >
                <FontAwesomeIcon icon={faDownload} color="white" size={50}/>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.butonAppBar}
                onPress={handlePressButonTaie}
            >
                <FontAwesomeIcon icon={faScissors} color="white" size={50}/>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.butonAppBar}
                onPress={handlePressButonGalerie}
            >
                <FontAwesomeIcon icon={faPhotoVideo} color="white" size={50}/>
            </TouchableOpacity>


        </View>
    )
}
export default AppBar
