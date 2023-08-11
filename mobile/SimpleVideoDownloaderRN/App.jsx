import { StatusBar, ScrollView, KeyboardAvoidingView } from 'react-native'
import { generareStiluri } from './Styles'
import { useEffect, useState } from 'react'
import { initializareFolderGalerie } from './components/Galerie'
import { LogBox } from 'react-native'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'

import AppBarTitlu from './components/AppBarTitlu'
import { generareStiluriAppBarTitlu } from './components/appbar-titlu/Styles'
import ContainerInput from './components/input/ContainerInput'
import { generareStiluriContainerInput } from './components/input/Styles'
import ContainerDescarcare from './components/stare-descarcare/ContainerDescarcare'
import { generareStiluriStareDescarcare } from './components/stare-descarcare/Styles'
import { generareStiluriPlayerVideo } from './components/player-video/Styles'
import ContainerVideo from './components/player-video/ContainerVideo'
import Video from './components/player-video/Video'
import { generareStiluriVideoFullscreen } from './components/player-video/StylesFullScreen'

export default function App() {
  
  LogBox.ignoreLogs(['new NativeEventEmitter']) //ceva warning aparut dupa importarea expo-screen-orientation (in Video.jsx)

  const [styles,                setStyles]                = useState('')
  const [stylesAppBarTitlu,     setStylesAppBarTitlu]     = useState('')
  const [stylesContainerInput,  setStylesContainerInput]  = useState('')
  const [stylesStareDescarcare, setStylesStareDescarcare] = useState('')
  const [stylesPlayerVideo,     setStylesPlayerVideo]     = useState('')
  const [stylesVideoFullScreen, setStylesVideoFullScreen] = useState('')

  const [culoareTitlu,          setCuloareTitlu]          = useState('#11574a')
  const [culoarePictograme,     setCuloarePictograme]     = useState('white')
  const [culoareFundal,         setCuloareFundal]         = useState("cyan")

  const [stareDescarcare,     setStareDescarcare]   = useState('')
  const [link,                setLink]              = useState('')
  const [fileName,            setFileName]          = useState('')
  const [fileURI,             setFileURI]           = useState('')
  const [permissionResponse,  requestPermission]    = MediaLibrary.usePermissions();
  
  const folderGalery           =   `${FileSystem.documentDirectory}galery/`

  const [visibilityVideoDownload, setVisibilityVideoDownload] = useState(false)
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
      setStylesPlayerVideo(generareStiluriPlayerVideo(culoareFundal, culoarePictograme, culoareTitlu) )
      setStylesVideoFullScreen(generareStiluriVideoFullscreen())
      requestPermission()
      initializareFolderGalerie(folderGalery)
    }, []
  )

  const [inFullscreen, setInFullsreen] = useState(false)

  useEffect(
    () => {
      setStyles(generareStiluri("cyan", "black", inFullscreen))
    }, [inFullscreen]
  )

  
  return ( <>
  {! inFullscreen ? (
      <KeyboardAvoidingView behavior={"height"} enabled style={{ flex: 1 }}>
      <ScrollView style={styles.containerPrincipal} contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar style="auto" backgroundColor={"black"} barStyle={"light-content"}> </StatusBar>
          
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
              visibilityCutVideo          = {visibilityCutVideo}       
            />

            <ContainerDescarcare
              styles                      = {stylesStareDescarcare}
              stareDescarcare             = {stareDescarcare}
              link                        = {link}
              folderGalery                = {folderGalery}
              setFileName                 = {setFileName}
              setFileURI                  = {setFileURI}
              setStareDescarcare          = {setStareDescarcare}
              visibilityCutVideo          = {visibilityCutVideo}

            />

            <ContainerVideo 
              styles                      = {stylesPlayerVideo}
              fileName                    = {fileName}
              culoarePictograme           = {culoarePictograme}
              visibilityCutVideo          = {visibilityCutVideo}
              fileURI                     = {fileURI}
              inFullscreen                = {inFullscreen}
              setInFullsreen              = {setInFullsreen}
            />
          </>
           
      </ScrollView>
  </KeyboardAvoidingView>
    
    ) : (
      <Video 
        styles              =   {stylesVideoFullScreen}
        visibilityCutVideo  =   {visibilityCutVideo}
        fileURI             =   {fileURI}
        inFullscreen        =   {inFullscreen}
        setInFullsreen      =   {setInFullsreen}
      />
    )
    }
</>)
}