import { StatusBar, ScrollView, KeyboardAvoidingView, View } from 'react-native'
import { useEffect, useState } from 'react'
import { initializareFolderGalerie, populareListaClipuriGalerie } from './components/Galerie'
import { LogBox } from 'react-native'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'

import AppBarTitlu from './components/appbar-titlu/AppBarTitlu'
import { generareStiluriAppBarTitlu } from './components/appbar-titlu/Styles'
import ContainerInput from './components/input/ContainerInput'
import { generareStiluriContainerInput } from './components/input/Styles'
import ContainerDescarcare from './components/stare-descarcare/ContainerDescarcare'
import { generareStiluriStareDescarcare } from './components/stare-descarcare/Styles'
import { generareStiluriPlayerVideo } from './components/player-video/Styles'
import ContainerVideo from './components/player-video/ContainerVideo'
import ContainerGalerie from './components/galerie/ContainerGalerie'

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

  const [visibilityVideoDownload, setVisibilityVideoDownload] = useState(true)
  const [visibilityCutVideo,      setVisibilityCutVideo]      = useState(false)
  const [visibilityVideoGalery,   setVisibilityVideoGalery]  = useState(false)


  const [oraStart,      setOraStart]        = useState('00')
  const [minutStart,    setMinutStart]      = useState('00')
  const [secundaStart,  setSecundaStart]    = useState('00')
  const [oraEnd,        setOraEnd]          = useState('00')
  const [minutEnd,      setMinutEnd]        = useState('00')
  const [secundaEnd,    setSecundaEnd]      = useState('00')


  const [listaClipuri, setListaClipuru] = useState([])

//************************************************************//
//************************************************************//
//************************************************************//
//TO DO 
  //Functioanalitate vizualizare galerie descarcata 
  //Functioalitate share clipuri din galerie, edit nume fisier, delete
//************************************************************//
//************************************************************//
//************************************************************//

  useEffect(
    () => {
      setStylesAppBarTitlu(generareStiluriAppBarTitlu( culoareTitlu, culoarePictograme ))
      setStylesContainerInput(generareStiluriContainerInput( culoareFundal, culoarePictograme ))
      setStylesStareDescarcare(generareStiluriStareDescarcare( culoarePictograme, culoareFundal ) )
      setStylesPlayerVideo(generareStiluriPlayerVideo(culoareFundal, culoarePictograme, culoareTitlu) )
      requestPermission()
      initializareFolderGalerie(folderGalery)
      populareListaClipuriGalerie(folderGalery, listaClipuri)
    }, []
  )


  return ( 
    <KeyboardAvoidingView behavior={"height"} enabled style={{ flex: 1 }}>
      <ScrollView style={styles.containerPrincipal} contentContainerStyle={{ height: "100%", backgroundColor: culoareFundal }}>
        <StatusBar style="auto" backgroundColor={"black"} barStyle={"light-content"}> </StatusBar>              
        <AppBarTitlu
          styles                      = {stylesAppBarTitlu}
          setVisibilityVideoDownload  = {setVisibilityVideoDownload}
          setVisibilityCutVideo       = {setVisibilityCutVideo}
          setVisibilityVideoGalery    = {setVisibilityVideoGalery}
          visibilityCutVideo          = {visibilityCutVideo}
          visibilityVideoDownload     = {visibilityVideoDownload}
          visibilityVideoGalery       = {visibilityVideoGalery}
        />
        { ! visibilityVideoGalery ? (
        <>
          <ContainerInput
            styles                      = {stylesContainerInput}   
            link                        = {link}
            setLink                     = {setLink}
            visibilityCutVideo          = {visibilityCutVideo}
            oraStart                    = {oraStart}
            oraEnd                      = {oraEnd}
            setOraStart                 = {setOraStart}
            setOraEnd                   = {setOraEnd}
            minutStart                  = {minutStart}
            minutEnd                    = {minutEnd}
            setMinutStart               = {setMinutStart}
            setMinutEnd                 = {setMinutEnd}
            secundaStart                = {secundaStart}
            secundaEnd                  = {secundaEnd}
            setSecundaStart             = {setSecundaStart}
            setSecundaEnd               = {setSecundaEnd}     
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
            oraStart                    = {oraStart}
            oraEnd                      = {oraEnd}
            minutStart                  = {minutStart}
            minutEnd                    = {minutEnd}
            secundaStart                = {secundaStart}
            secundaEnd                  = {secundaEnd}
          />
          {
            fileURI && (
              <ContainerVideo 
                styles                      = {stylesPlayerVideo}
                fileName                    = {fileName}
                culoarePictograme           = {culoarePictograme}
                fileURI                     = {fileURI}
              /> 
            )
          }
        </>
        ) : (
        <ContainerGalerie 
            listaClipuri              = {listaClipuri}
        />
        )
        }
      </ScrollView>
    </KeyboardAvoidingView>  
  )
}