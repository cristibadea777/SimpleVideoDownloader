import { StatusBar, ScrollView, KeyboardAvoidingView, View } from 'react-native'
import { useEffect, useState } from 'react'
import { initializareFolderGalerie, populareListaClipuriGalerie } from './components/galerie/Galerie'
import { LogBox } from 'react-native'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'

import AppBarTitlu from './components/appbar-titlu/AppBarTitlu'
import { generareStiluriAppBarTitlu } from './components/appbar-titlu/Styles'
import ContainerInput from './components/input/ContainerInput'
import { generareStiluriContainerInput } from './components/input/Styles'
import ContainerDescarcare from './components/descarcare/ContainerDescarcare'
import { generareStiluriStareDescarcare } from './components/descarcare/Styles'
import { generareStiluriPlayerVideo } from './components/player-video/Styles'
import ContainerVideo from './components/player-video/ContainerVideo'
import ContainerGalerie from './components/galerie/ContainerGalerie'
import generateStiluriGalerie from './components/galerie/Styles'
import { generareStiluriModale } from './components/modale/Styles'

export default function App() {
  
  LogBox.ignoreLogs(['new NativeEventEmitter']) //ceva warning aparut dupa importarea expo-screen-orientation (in Videoclip.jsx)

  const folderGalery                                          = `${FileSystem.documentDirectory}galery/`  
  const [permissionResponse,      requestPermission]          = MediaLibrary.usePermissions();
  const [listaClipuri,            setListaClipuri]            = useState([])
  const [stylesAppBarTitlu,       setStylesAppBarTitlu]       = useState('')
  const [stylesContainerInput,    setStylesContainerInput]    = useState('')
  const [stylesStareDescarcare,   setStylesStareDescarcare]   = useState('')
  const [stylesPlayerVideo,       setStylesPlayerVideo]       = useState('')
  const [stylesGalerie,           setStylesGalerie]           = useState('')
  const [stylesModale,            setStylesModale]            = useState('')

  const [culoareTitlu,            setCuloareTitlu]            = useState('#11574a')
  const [culoarePictograme,       setCuloarePictograme]       = useState('white')
  const [culoareFundal,           setCuloareFundal]           = useState("cyan")

  const [stareDescarcare,         setStareDescarcare]         = useState('')
  const [link,                    setLink]                    = useState('')
  const [fileName,                setFileName]                = useState('')
  const [fileURI,                 setFileURI]                 = useState('')


  const [visibilityVideoDownload, setVisibilityVideoDownload] = useState(true)
  const [visibilityCutVideo,      setVisibilityCutVideo]      = useState(false)
  const [visibilityVideoGalery,   setVisibilityVideoGalery]   = useState(false)

  const [oraStart,                setOraStart]                = useState('00')
  const [minutStart,              setMinutStart]              = useState('00')
  const [secundaStart,            setSecundaStart]            = useState('00')
  const [oraEnd,                  setOraEnd]                  = useState('00')
  const [minutEnd,                setMinutEnd]                = useState('00')
  const [secundaEnd,              setSecundaEnd]              = useState('00')

  const [visibilityModalStergere, setVisibilityModalStergere] = useState(false)
  const [visibilityModalEdit,     setVisibilityModalEdit]     = useState(false)


//************************************************************//
//************************************************************//
//************************************************************//
//TO DO 
  //la edit nume - sa nu se poate edita inafara de - [...].extensie - valoarea pt input sa fie taiata - apoi se lipeste si partea a doua 
  //cand se salveaza noul nume 

  //in API restrictionat maximul de GB pt video  --extract file size inainte de dowwnload
  //daca start time == end time atunci end time + 1
  //in API restrictionat doar pt youtube/piped/tiktok/facebook
  //facut iconita pt aplicatie, pus in playstore
  //configurat server nginx 
  //dupa ce se descarca  (tot clipul, nu cut) sa se stearga si de pe server
//************************************************************//
//************************************************************//
//************************************************************//
//buguri: 
//daca titlul clipului contine '|' pe server nu se va salva asa, si va da eroare cum ca fila nu exista.

  useEffect(
    () => {
      requestPermission           ()
      setStylesAppBarTitlu        (generareStiluriAppBarTitlu( culoareTitlu, culoarePictograme ))
      setStylesContainerInput     (generareStiluriContainerInput( culoareFundal, culoarePictograme ))
      setStylesStareDescarcare    (generareStiluriStareDescarcare( culoarePictograme, culoareFundal ))
      setStylesPlayerVideo        (generareStiluriPlayerVideo( culoareFundal, culoarePictograme, culoareTitlu ))
      setStylesGalerie            (generateStiluriGalerie( culoarePictograme, culoareFundal ))
      setStylesModale             (generareStiluriModale( culoareFundal, culoarePictograme ))
      initializareFolderGalerie   (folderGalery)
      populareListaClipuriGalerie (folderGalery, listaClipuri)
    }, []
  )


  return ( 
    <KeyboardAvoidingView behavior={"height"} enabled style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ height: "100%", backgroundColor: culoareFundal }}>
        <StatusBar style="auto" backgroundColor={"black"} barStyle={"light-content"}> </StatusBar>              
        <AppBarTitlu
          styles                        = {stylesAppBarTitlu}
          setVisibilityVideoDownload    = {setVisibilityVideoDownload}
          setVisibilityCutVideo         = {setVisibilityCutVideo}
          setVisibilityVideoGalery      = {setVisibilityVideoGalery}
          visibilityCutVideo            = {visibilityCutVideo}
          visibilityVideoDownload       = {visibilityVideoDownload}
          visibilityVideoGalery         = {visibilityVideoGalery}
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
            qsecundaStart               = {secundaStart}
            secundaEnd                  = {secundaEnd}
            listaClipuri                = {listaClipuri}
            setListaClipuri             = {setListaClipuri}
          />
          {
          fileURI && (
          <ContainerVideo 
            styles                      = {stylesPlayerVideo}
            fileName                    = {fileName}
            fileURI                     = {fileURI}
          /> 
          )
          }
        </>
        ) : (
        <ContainerGalerie 
            listaClipuri                = {listaClipuri}
            styles                      = {stylesGalerie}
            setListaClipuri             = {setListaClipuri}
            setVisibilityModalStergere  = {setVisibilityModalStergere}
            visibilityModalStergere     = {visibilityModalStergere}    
            visibilityModalEdit         = {visibilityModalEdit}
            setVisibilityModalEdit      = {setVisibilityModalEdit}  
            stylesModale                = {stylesModale}
        />
        )
        }
      </ScrollView>
    </KeyboardAvoidingView>  
  )
}