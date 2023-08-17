import { View } from "react-native"
import Videoclip from "./Videoclip"
import TitluVideo from "./TitluVideo"

const ContainerVideo = ( {styles, fileName, fileURI} ) => {
    
    return (
        <View style={{height: "40%"}}>
            <TitluVideo 
                styles      =   {styles}
                fileName    =   {fileName}
            />

            <Videoclip 
                styles              =   {styles}
                fileURI             =   {fileURI}
            />
        </View>
    )
}
export default ContainerVideo