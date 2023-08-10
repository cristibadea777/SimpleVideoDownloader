import { faPaste } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { Text, TextInput, TouchableOpacity, View } from "react-native"

import * as Clipboard from 'expo-clipboard'

const InputLink = ( {styles, link, setLink} ) => {

    const handlePressButonPaste = async () => {
        try {
          const text = await Clipboard.getStringAsync();
          setLink(text)
        } catch (error) { console.log(error) }
    }
    
    const handleChangeInputLink = (value) => {
        setLink(value)
    }

    return(
        <View style={styles.containerInputLink}>
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
                <TouchableOpacity    style={styles.butonPaste} onPress={handlePressButonPaste}>
                    <FontAwesomeIcon icon={faPaste} size={33}  style={styles.culoareButonPaste}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default InputLink