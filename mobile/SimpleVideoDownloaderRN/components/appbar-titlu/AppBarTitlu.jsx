import { View } from "react-native"
import AppBar from "./AppBar"
import Titlu from "./Titlu"

const AppBarTitlu = ({ styles, setVisibilityVideoDownload, setVisibilityCutVideo, setVisibilityVideoGalery, visibilityCutVideo, visibilityVideoDownload, visibilityVideoGalery }) => {
    return(
        <View style={styles.containerAppBarSiTitlu}>
            <AppBar
                styles                      = {styles}
                setVisibilityVideoDownload  = {setVisibilityVideoDownload}
                setVisibilityCutVideo       = {setVisibilityCutVideo}
                setVisibilityVideoGalery    =  {setVisibilityVideoGalery}
            />  
            <Titlu 
                styles                      = {styles}
                visibilityCutVideo          = {visibilityCutVideo}
                visibilityVideoDownload     = {visibilityVideoDownload}
                visibilityVideoGalery       = {visibilityVideoGalery}
            />
        </View>
    )
}
export default AppBarTitlu
