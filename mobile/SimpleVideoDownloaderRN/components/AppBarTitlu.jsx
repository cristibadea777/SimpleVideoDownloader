import { faDownload, faFileVideo, faPhotoVideo, faScissors, faVideo } from "@fortawesome/free-solid-svg-icons"
import { View } from "react-native"
import AppBar from "./appbar-titlu/AppBar"
import Titlu from "./appbar-titlu/Titlu"

const AppBarTitlu = ({ styles, setVisibilityVideoDownload, setVisibilityCutVideo, visibilityCutVideo }) => {
    return(
        <View style={styles.containerAppBarSiTitlu}>
            <AppBar
                styles                      = {styles}
                setVisibilityVideoDownload  = {setVisibilityVideoDownload}
                setVisibilityCutVideo       = {setVisibilityCutVideo}
                visibilityCutVideo          = {visibilityCutVideo}
            />  
            <Titlu 
                styles                      = {styles}
                visibilityCutVideo          = {visibilityCutVideo}
            />
        </View>
    )
}
export default AppBarTitlu
