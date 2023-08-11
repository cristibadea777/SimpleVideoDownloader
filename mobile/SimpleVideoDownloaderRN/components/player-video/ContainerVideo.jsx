import { View } from "react-native"
import Player from "./Player"
import TitluVideo from "./TitluVideo"

const PlayerVideo = ( {styles, fileName, visibilityCutVideo} ) => {
    return (
        <View style={[styles.containerInput, {flexGrow: 1, borderColor: "red", borderWidth: 10}]}>
            <TitluVideo 
                styles      =   {styles}
                fileName    =   {fileName}
            />

            <Player 
                styles              =   {styles}
                visibilityCutVideo  =   {visibilityCutVideo}
            />
        </View>
    )
}
export default PlayerVideo