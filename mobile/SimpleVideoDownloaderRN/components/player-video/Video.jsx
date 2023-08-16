import { Dimensions, Text, View } from "react-native"
import * as ScreenOrientation from 'expo-screen-orientation'
import VideoPlayer from 'expo-video-player'
import { ResizeMode } from 'expo-av'

const Video = ( {styles, visibilityCutVideo, fileURI, inFullscreen, setInFullsreen} ) => {

    const changeScreenOrientationLanscape = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    
    const changeScreenOrientationPortrait = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }

    const windowWidthLandscape   =   Dimensions.get('window').height;
    const windowHeightLandscape  =   Dimensions.get('window').width;

    return(
        <View style={[styles.containerVideo, {height: visibilityCutVideo ? "43%" : "57%"}]}>

            {
                fileURI && (
                    <VideoPlayer
                        style={{height: inFullscreen ? (windowHeightLandscape-33) : 433, width: inFullscreen ? (windowWidthLandscape) : 287, flex: inFullscreen ? 1 : 0}}
                        videoProps={{
                        shouldPlay: false,
                        resizeMode: ResizeMode.COVER,
                        source: {
                            uri: fileURI,
                        },
                        isLooping: false,
                        }}
                        fullscreen={{
                        enterFullscreen: () => {setInFullsreen(true),  changeScreenOrientationLanscape()},
                        exitFullscreen : () => {setInFullsreen(false), changeScreenOrientationPortrait()},
                        inFullscreen,
                        visible: true
                        }}
                    />
                )
            }

        </View>
    )
}
export default Video