const VideoCut =  ({    styles, inFullscreen, link, handleChangeInputLink, handlePressButonPaste, stareDescarcare,
                       fileName, fileURI, setFileURI, setFileName, folderGalery, setStareDescarcare, setInFullsreen,
                       changeScreenOrientationLanscape, changeScreenOrientationPortrait, windowWidthLandscape, windowHeightLandscape
                  }) => {
    return(
        <View style={styles.containerPrincipal}>
        <StatusBar style="auto" backgroundColor={"black"} barStyle={"light-content"}> </StatusBar>
        {
        !inFullscreen && (
        <>
        <View style={styles.titluContainer}>
        <Text style={styles.titluText}>Cut and Download Video</Text>
        </View>
        <View style={styles.containerInput}>

        <View style={styles.containerRowInput}>
            <View style={styles.containerLabelTextInput}>
            <Text style={styles.text}>Link</Text>
            </View>
            <View style={styles.containerTextInput}>
            <TextInput 
                style={styles.textInput}
                value={link}
                onChangeText={handleChangeInputLink}
            />
            </View>
            <View style={styles.containerButonPaste}>
            <TouchableOpacity 
                style={styles.butonPaste}
                onPress={handlePressButonPaste}
            >
                <FontAwesomeIcon icon={faPaste} size={33} color='black'/>
            </TouchableOpacity>
            </View>
        </View>
        <View style={styles.containerRowDescarcare}>
            <View style={styles.containerTextDescarca}>
            <Text style={styles.text}>{stareDescarcare}</Text>
            </View>
            <View style={styles.containerButonDescarca}>
            <TouchableOpacity 
                style={styles.butonDescarca}
                onPress={handlePressButonDescarca}
            >
                <FontAwesomeIcon icon={faDownload} size={40} color='black'/>
            </TouchableOpacity>
            </View>
        </View>
        </View>  
        <View style={styles.containerRowTitluClip}>
            <Text style={styles.textTitluClip}>{fileName}</Text>
        </View>
        </>
        )
        }

        <View style={[styles.containerOutput, {height: inFullscreen ? "100%" : "33%", backgroundColor: inFullscreen ? "black" : "cyan"}]} >
        {
        fileURI && (
        <VideoPlayer
            style={{height: inFullscreen ? (windowHeightLandscape-33) : 287, width: inFullscreen ? (windowWidthLandscape) : 433, flex: inFullscreen ? 1 : 0}}
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
    </View>
    )
}
export default VideoCut