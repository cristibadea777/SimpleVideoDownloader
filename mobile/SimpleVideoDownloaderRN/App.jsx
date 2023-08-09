import { View, StatusBar, Dimensions } from 'react-native'
import { generareStiluri } from './Styles'
import { useEffect, useState } from 'react'
import { initializareFolderGalerie } from './components/Galerie'
import { LogBox } from 'react-native'
import * as Clipboard from 'expo-clipboard'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
import * as ScreenOrientation from 'expo-screen-orientation'

import VideoDownload from './components/VideoDownload'
import AppBar from './components/AppBar'

export default function App() {
  
  LogBox.ignoreLogs(['new NativeEventEmitter'])

  const [styles,              setStyles]            = useState('')
  const [stareDescarcare,     setStareDescarcare]   = useState('')
  const [link,                setLink]              = useState('')
  const [fileName,            setFileName]          = useState('')
  const [fileURI,             setFileURI]           = useState('')
  const [permissionResponse,  requestPermission]    = MediaLibrary.usePermissions();
  
  const folderGalery           = `${FileSystem.documentDirectory}galery/`
  const windowWidthLandscape   =   Dimensions.get('window').height;
  const windowHeightLandscape  =   Dimensions.get('window').width;

  const [visibilityVideoDownload, setVisibilityVideoDownload] = useState(true)
  const [visibilityCutVideo,      setVisibilityCutVideo]      = useState(false)

//************************************************************//
//************************************************************//
//************************************************************//
//TO DO 
  //Functionalitate CUT - pe alt endpoint din API
  //Functioanalitate vizualizare galerie descarcata 
  //Functioalitate share clipuri din galerie, edit nume fisier, delete
//************************************************************//
//************************************************************//
//************************************************************//

  useEffect(
    () => {
      setStyles(generareStiluri("cyan", "black"))
      requestPermission()
      initializareFolderGalerie(folderGalery)
    }, []
  )

  useEffect(
    () => {
      setStyles(generareStiluri("cyan", "black", inFullscreen))
    }, [inFullscreen]
  )

  const handlePressButonPaste = async () => {
    try {
      const text = await Clipboard.getStringAsync();
      setLink(text)
    } catch (error) { console.log(error) }
  }

  const handleChangeInputLink = (value) => {
    setLink(value)
  }

  const [inFullscreen, setInFullsreen] = useState(false)
  const changeScreenOrientationLanscape = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }
  const changeScreenOrientationPortrait = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }

  const handlePressButonDescarca = async () => {
    setFileURI(null)
    setFileName(null)
    try { await salveazaVideoAsync( {link, folderGalery, setFileName, setFileURI, setStareDescarcare} ) } 
    catch (error) { console.error('Error:', error) }
}


  return (
    <View style={styles.containerPrincipal}>
       <StatusBar style="auto" backgroundColor={"black"} barStyle={"light-content"}> </StatusBar>
        <AppBar 
          styles                      = {styles}
          setVisibilityVideoDownload  = {setVisibilityVideoDownload}
          setVisibilityCutVideo       = {setVisibilityCutVideo}
        />

        {
        visibilityVideoDownload ? (
          <VideoDownload
            changeScreenOrientationLanscape = {changeScreenOrientationLanscape}
            changeScreenOrientationPortrait = {changeScreenOrientationPortrait}
            windowHeightLandscape           = {windowHeightLandscape}
            windowWidthLandscape            = {windowWidthLandscape}
            visibilityVideoDownload         = {visibilityVideoDownload}
            styles                          = {styles}
            visibilityCutVideo              = {visibilityCutVideo}
            inFullscreen                    = {inFullscreen}
            link                            = {link}
            handleChangeInputLink           = {handleChangeInputLink}
            handlePressButonPaste           = {handlePressButonPaste}
            handlePressButonDescarca        = {handlePressButonDescarca}
            stareDescarcare                 = {stareDescarcare}
            fileName                        = {fileName}
            fileURI                         = {fileURI}
            setFileName                     = {setFileName}
            setFileURI                      = {setFileURI}
            folderGalery                    = {folderGalery}
            setStareDescarcare              = {setStareDescarcare}
            setInFullsreen                  = {setInFullsreen}
          /> )  
        : (
          <></>
        )
        }
  </View>
  );
}
