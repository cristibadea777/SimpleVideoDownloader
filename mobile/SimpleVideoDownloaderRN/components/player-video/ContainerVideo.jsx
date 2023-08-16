import { View } from "react-native"
import Video from "./Video"
import TitluVideo from "./TitluVideo"

const PlayerVideo = ( {styles, fileName, visibilityCutVideo, fileURI, inFullscreen, setInFullsreen} ) => {
    
    return (
        <View style={[styles.containerVideo, {height: "45%"}]}>
            <TitluVideo 
                styles      =   {styles}
                fileName    =   {fileName}
            />

            <Video 
                styles              =   {styles}
                visibilityCutVideo  =   {visibilityCutVideo}
                fileURI             =   {fileURI}
                inFullscreen        =   {inFullscreen}
                setInFullsreen      =   {setInFullsreen}
            />
        </View>
    )
}
export default PlayerVideo