import { Text, View, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faDownload, faPaste } from '@fortawesome/free-solid-svg-icons'
import { salveazaVideoAsync } from './VideoDownloader'
import VideoPlayer from 'expo-video-player'
import { ResizeMode } from 'expo-av'

const Test1 = ({    styles, visibilityCutVideo, inFullscreen, link, handleChangeInputLink, handlePressButonPaste, stareDescarcare,
    fileName, fileURI, setFileURI, setFileName, folderGalery, setStareDescarcare, setInFullsreen, handlePressButonDescarca,
    changeScreenOrientationLanscape, changeScreenOrientationPortrait, windowWidthLandscape, windowHeightLandscape
}) => {
    return (
        <>
            <View style={[styles.containerInput, {height: ! visibilityCutVideo ? "50%" : "50%"}]}>
                


            </View>
        </>
    )
}
export default Test1