import { Text, View } from "react-native"

const Player = ( {styles, visibilityCutVideo} ) => {
    return(
        <View style={[styles.containerVideo, {height: visibilityCutVideo ? "43%" : "57%"}]}>
        </View>
    )
}
export default Player