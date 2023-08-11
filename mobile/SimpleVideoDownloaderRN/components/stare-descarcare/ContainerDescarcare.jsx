import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { TouchableOpacity } from "react-native"
import { Text, View } from "react-native"
import { salveazaVideoAsync } from "../VideoDownloader"

const ContainerDescarcare = ( {styles, stareDescarcare, link, folderGalery, setFileName, setFileURI, setStareDescarcare, visibilityCutVideo} ) => {

    const handlePressButonDescarca = async () => {
        setFileURI(null)
        setFileName(null)
        try { await salveazaVideoAsync( {link, folderGalery, setFileName, setFileURI, setStareDescarcare, visibilityCutVideo}) } 
        catch (error) { 
            console.error('Error:', error)
            setStareDescarcare("Server Error") 
        }
    }

    return(
        <View style={styles.containerStareDescarcare}>
            <View style={styles.containerTextStareDescarcare}>
                <Text style={styles.text}>{stareDescarcare}</Text>
            </View>
            <View style={styles.containerButonDescarca}>
                <TouchableOpacity    style={styles.butonDescarca}   onPress={handlePressButonDescarca}>
                    <FontAwesomeIcon icon={faDownload}              size={40}           style={styles.culoarePictogramaButonDescarca}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default ContainerDescarcare