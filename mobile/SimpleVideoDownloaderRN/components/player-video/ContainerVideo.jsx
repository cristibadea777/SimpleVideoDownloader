import { View } from "react-native"
import Player from "./Player"
import TitluVideo from "./TitluVideo"

const PlayerVideo = ( {styles, fileName, visibilityVideoDownload} ) => {
    return (
        <View style={[styles.containerInput, {flexGrow: visibilityVideoDownload ? 1 : 0, borderColor: "red", borderWidth: 10}]}>
            <TitluVideo 
                styles      =   {styles}
                fileName    =   {fileName}
            />

            <Player 
                styles      =   {styles}
            />
        </View>
    )
}
export default PlayerVideo