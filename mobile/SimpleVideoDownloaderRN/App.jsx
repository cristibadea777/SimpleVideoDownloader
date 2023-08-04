import { Text, View, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { generareStiluri } from './Styles';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDownload, faPaste } from '@fortawesome/free-solid-svg-icons';

export default function App() {
  
  const [styles,          setStyles]            = useState('')
  const [stareDescarcare, setStareDescarcare]   = useState('')

  useEffect(
    () => {
      setStyles(generareStiluri("cyan", "black"))
    }, []
  )

  const handlePressButonDescarca = () => {
    setStareDescarcare("Se descarcă...")
  }
  
  return (
    <View style={styles.containerPrincipal}>
      <StatusBar style="auto" backgroundColor={"black"} barStyle={"light-content"}> </StatusBar>
      <View style={styles.titluContainer}>
        <Text style={styles.titluText}>Video Downloader</Text>
      </View>
      <View style={styles.containerInput}>

        <View style={styles.containerRowInput}>
          <View style={{width: "20%", alignItems: "center"}}>
            <Text style={styles.text}>Link</Text>
          </View>
          <View style={{width: "65%", alignItems: "center", backgroundColor: "white"}}>
            <TextInput 
              style={styles.textInput}
            />
          </View>
          <View style={styles.containerButonPaste}>
            <TouchableOpacity 
              style={styles.butonPaste}
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
