import { View, StatusBar, Dimensions, Text, ScrollView, KeyboardAvoidingView } from 'react-native'
import { generareStiluri } from './Styles'
import { useEffect, useState } from 'react'
import { initializareFolderGalerie } from './components/Galerie'
import { LogBox } from 'react-native'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
import * as ScreenOrientation from 'expo-screen-orientation'

import VideoDownload from './components/VideoDownload'
import AppBar from './components/AppBarTitlu'
import { salveazaVideoAsync } from './components/VideoDownloader'
import Test1 from './components/Test1'
import AppBarTitlu from './components/AppBarTitlu'
import { generareStiluriAppBarTitlu } from './components/appbar-titlu/Styles'
import ContainerInput from './components/input/ContainerInput'
import { generareStiluriContainerInput } from './components/input/Styles'
import StareDescarcare from './components/stare-descarcare/StareDescarcare'
import { generareStiluriStareDescarcare } from './components/stare-descarcare/Styles'
import { generareStiluriPlayerVideo } from './components/player-video/Styles'
import PlayerVideo from './components/player-video/PlayerVideo'

export default function App() {
  
  LogBox.ignoreLogs(['new NativeEventEmitter'])

  const [styles,                setStyles]                = useState('')
  const [stylesAppBarTitlu,     setStylesAppBarTitlu]     = useState('')
  const [stylesContainerInput,  setStylesContainerInput]  = useState('')
  const [stylesStareDescarcare, setStylesStareDescarcare] = useState('')
  const [stylesPlayerVideo,     setStylesPlayerVideo]     = useState('')

  const [culoareTitlu,          setCuloareTitlu]          = useState('#11574a')
  const [culoarePictograme,     setCuloarePictograme]     = useState('white')
  const [culoareFundal,         setCuloareFundal]         = useState("cyan")

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
      setStylesAppBarTitlu(generareStiluriAppBarTitlu( culoareTitlu, culoarePictograme ))
      setStylesContainerInput(generareStiluriContainerInput( culoareFundal, culoarePictograme ))
      setStylesStareDescarcare(generareStiluriStareDescarcare( culoarePictograme ) )
      setStylesPlayerVideo(generareStiluriPlayerVideo(culoareTitlu, culoarePictograme) )
      requestPermission()
      initializareFolderGalerie(folderGalery)
    }, []
  )

  useEffect(
    () => {
      setStyles(generareStiluri("cyan", "black", inFullscreen))
    }, [inFullscreen]
  )

  const [inFullscreen, setInFullsreen] = useState(false)
  const changeScreenOrientationLanscape = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }
  const changeScreenOrientationPortrait = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }


  return (
    <KeyboardAvoidingView behavior={"height"} enabled style={{ flex: 1 }}>
      <ScrollView style={styles.containerPrincipal} contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar style="auto" backgroundColor={"black"} barStyle={"light-content"}> </StatusBar>
          {! inFullscreen && (
          <>
            <AppBarTitlu
              styles                      = {stylesAppBarTitlu}
              setVisibilityVideoDownload  = {setVisibilityVideoDownload}
              setVisibilityCutVideo       = {setVisibilityCutVideo}
              visibilityCutVideo          = {visibilityCutVideo}
            />

            <ContainerInput
              styles                      = {stylesContainerInput}   
              link                        = {link}
              setLink                     = {setLink}
              visibilityVideoDownload     = {visibilityVideoDownload}       
            />

            <StareDescarcare
              styles                      = {stylesStareDescarcare}
              stareDescarcare             = {stareDescarcare}
            />

            <PlayerVideo 
              styles                      = {stylesPlayerVideo}
              fileName                    = {fileName}
              culoarePictograme           = {culoarePictograme}
            />
          </>
          )}
      </ScrollView>
  </KeyboardAvoidingView>
  );
}

/*
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
*/
