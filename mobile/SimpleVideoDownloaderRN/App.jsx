import { Text, View, StatusBar, TextInput, TouchableOpacity, PermissionsAndroid, Dimensions } from 'react-native'
import { generareStiluri } from './Styles'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faDownload, faPaste } from '@fortawesome/free-solid-svg-icons'
import * as Clipboard from 'expo-clipboard'
import * as FileSystem from 'expo-file-system'
import * as Sharing from "expo-sharing"
import * as MediaLibrary from 'expo-media-library'
import { preluareVideoAsync, salveazaVideoAsync } from './components/VideoDownloader'
import { initializareFolderGalerie } from './components/Galerie'
import VideoPlayer from 'expo-video-player'
import { ResizeMode } from 'expo-av'
import * as ScreenOrientation from 'expo-screen-orientation'
import { LogBox } from 'react-native'
import AppBar from './components/AppBar'

export default function App() {
  
  LogBox.ignoreLogs(['new NativeEventEmitter'])

  const [styles,              setStyles]            = useState('')
  const [stareDescarcare,     setStareDescarcare]   = useState('')
  const [link,                setLink]              = useState('')
  const [fileName,            setFileName]          = useState('')
  const [fileURI,             setFileURI]           = useState('')
  const [permissionResponse,  requestPermission]    = MediaLibrary.usePermissions();
  const folderGalery                                = `${FileSystem.documentDirectory}galery/`

  const windowWidthLandscape   =   Dimensions.get('window').height;
  const windowHeightLandscape  =   Dimensions.get('window').width;


//************************************************************//
//************************************************************//
//************************************************************//
//TO DO 
  //Functionalitate CUT - pe alt endpoint din API
  //Functioanalitate vizualizare galerie descarcata 
  //Functioalitate share clipuri din galerie, edit nume fisier, delete
  //Meniu principal - 3 butoane pe centru - descarca video, taie video, galerie 
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

  const handlePressButonDescarca = async () => {
    setFileURI(null)
    setFileName(null)
    try {
      await salveazaVideoAsync( {link, folderGalery, setFileName, setFileURI, setStareDescarcare} )      
    } catch (error) {
      console.error('Error:', error);
    }
  }


  const handlePressButonPaste = async () => {
    try {
      const text = await Clipboard.getStringAsync();
      setLink(text)
    } catch (error) { console.log(error) }
  }

  const handleChangeInputLink = (value) => {
    setLink(value)
  }


  useEffect(
    () => {
      console.log(link)
    }, [link]
  )

  const [inFullscreen, setInFullsreen] = useState(false)

  const changeScreenOrientationLanscape = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }

  const changeScreenOrientationPortrait = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }

  return (
    <View style={styles.containerPrincipal}>
      
      <StatusBar style="auto" backgroundColor={"black"} barStyle={"light-content"}> </StatusBar>
      
      {
      !inFullscreen && (
      <>
      <AppBar 
        styles  = {styles}
      />
      <View style={styles.titluContainer}>
        <Text style={styles.titluText}>Video Downloader</Text>
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
  );
}
