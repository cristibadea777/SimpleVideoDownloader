import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { TouchableOpacity } from "react-native"
import { Text, View } from "react-native"
import { salveazaVideoAsync } from "../VideoDownloader"

const ContainerDescarcare = ( {styles, stareDescarcare, link, folderGalery, setFileName, setFileURI, setStareDescarcare, visibilityCutVideo, oraStart, oraEnd, minutStart, minutEnd, secundaStart, secundaEnd} ) => {

    const handlePressButonDescarca = async () => {
        setFileURI(null)
        setFileName(null)
        let secundeStart = calculeazaSecunde(parseInt(oraStart, 10) || 0, parseInt(minutStart, 10) || 0, parseInt(secundaStart, 10) || 0)
        let secundeEnd = calculeazaSecunde(parseInt(oraEnd, 10) || 0, parseInt(minutEnd, 10) || 0, parseInt(secundaEnd, 10) || 0)
        try { await salveazaVideoAsync( {link, folderGalery, setFileName, setFileURI, setStareDescarcare, visibilityCutVideo, secundeStart, secundeEnd}) } 
        catch (error) { 
            console.error('Error:', error)
            setStareDescarcare("Server Error") 
        }
    }

    const calculeazaSecunde = (ore, minute, secunde) => {
        return ((ore * 3600) + (minute*60) + secunde)
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