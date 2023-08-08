import { Text, View, StatusBar, TextInput, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { generareStiluri } from './Styles';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDownload, faPaste } from '@fortawesome/free-solid-svg-icons';
import * as Clipboard from 'expo-clipboard';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Sharing from "expo-sharing"
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  
  const [styles,              setStyles]            = useState('')
  const [stareDescarcare,     setStareDescarcare]   = useState('')
  const [link,                setLink]              = useState('')
  const [videoBlob,           setVideoBlob]         = useState('')
  const [permissionResponse,  requestPermission]    = MediaLibrary.usePermissions();
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
    }, []
  )

  const handlePressButonDescarca = async () => {
    setStareDescarcare("Downloading...");
  
    const formData = new FormData();
    formData.append('link', link);

    try {
      const response = await axios.post('https://simple-video-downloader.onrender.com/download/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      })
      const fileName      = response.headers.get('Filename')
      const fileLocation  = `${FileSystem.documentDirectory}${fileName}`
      const file_reader   = new FileReader()
      file_reader.readAsDataURL(response.data)
      //event onload ce se asigura ca datele din raspuns au fost terminate de citit
      file_reader.onload = async () => {
        //dupa ce datele din raspuns au fost citite, se salveaza fisierul
        await FileSystem.writeAsStringAsync(fileLocation, file_reader.result.split(',')[1], { encoding: FileSystem.EncodingType.Base64 })
      }
      //functionalitate de share a fisierului creat
      Sharing.shareAsync(fileLocation) 
      console.log('URI:', fileLocation)
      setStareDescarcare("Finished downloading.")
    } catch (error) {
      console.error('Error:', error);
    }
    
  }



  const handlePressButonPaste = async () => {
    try {
      const text = await Clipboard.getStringAsync();
      setLink(text)
    } catch (error) { console.log(error) }

    console.log("/")
    const imaginiBackupContents = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
    imaginiBackupContents.map((item) => {console.log("   /" + item)})
  }

  const handleChangeInputLink = (value) => {
    setLink(value)
  }
  

  useEffect(
    () => {
      console.log(link)
    }, [link]
  )

  return (
    <View style={styles.containerPrincipal}>
      <StatusBar style="auto" backgroundColor={"black"} barStyle={"light-content"}> </StatusBar>
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
              <FontAwesomeIcon icon={faDownload} size={50} color='black'/>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </View>
  );
}
