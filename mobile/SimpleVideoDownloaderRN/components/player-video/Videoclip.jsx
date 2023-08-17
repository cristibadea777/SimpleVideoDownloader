import { Dimensions, View } from "react-native"
import * as ScreenOrientation from 'expo-screen-orientation'
import { Video } from 'expo-av'

const Videoclip = ( {styles, fileURI} ) => {

    const changeOrientation = async () => {
        if (Dimensions.get('window').height > Dimensions.get('window').width) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
        }
        else{
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
        }
    }

    return(
        <View style={{height: "80%"}}>
            <Video
                style={styles.video}
                source={{uri: fileURI}}
                useNativeControls={true}
                resizeMode="contain"
                isLooping={false}
                shouldPlay={true}
                onFullscreenUpdate={changeOrientation}
            />
        </View>
    )
}
export default Videoclip