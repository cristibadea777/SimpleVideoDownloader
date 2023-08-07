import { Text, View, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { generareStiluri } from './Styles';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDownload, faPaste } from '@fortawesome/free-solid-svg-icons';
import * as Clipboard from 'expo-clipboard';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Sharing from "expo-sharing"

export default function App() {
  
  const [styles,            setStyles]            = useState('')
  const [stareDescarcare,   setStareDescarcare]   = useState('')
  const [link,              setLink]              = useState('')
  const [videoBlob,         setVideoBlob]         = useState('')

  useEffect(
    () => {
      setStyles(generareStiluri("cyan", "black"))
    }, []
  )





  const handlePressButonDescarca = async () => {

/*
    console.log("/...")
    const contents = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
    contents.map(
        (item) => {
          console.log("   /" + item)
        }
    )
    await Sharing.shareAsync(`${FileSystem.documentDirectory}your_video_filename.mp4`)
*/



// /*
    setStareDescarcare("Downloading...");
  
    const formData = new FormData();
    formData.append('link', link);

    try {
      const response = await axios.post('https://simple-video-downloader.onrender.com/download/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      });

      //console.log(typeof(response.data))
      console.log(FileSystem.readAsStringAsync(response.data))

      const filename = response.headers.get('Filename')

      const fr = new FileReader();
      fr.onload = async () => {
        const fileUri = `${FileSystem.documentDirectory}/${filename}`;
        await FileSystem.writeAsStringAsync(fileUri, fr.result.split(',')[1], { encoding: FileSystem.EncodingType.Base64 });
        Sharing.shareAsync(fileUri);
      };
      fr.readAsDataURL(response.data);


      console.log(fr.readAsDataURL(response.data))




    setStareDescarcare("Finished downloading.")

    } catch (error) {
      console.error('Error sending request:', error);
    }

// */

    
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
