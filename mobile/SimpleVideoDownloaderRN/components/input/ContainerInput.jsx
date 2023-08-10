import { View } from "react-native"
import InputLink from "./InputLink"
import InputDurata from "./InputDurata"

const ContainerInput = ( {styles, link, setLink, visibilityVideoDownload} ) => {
    return(
        <View style={[styles.containerInput, {height: visibilityVideoDownload ? "30%" : "10%"}]}>
            <InputLink 
                styles  =   {styles}
                link    =   {link}
                setLink =   {setLink}
            />

            {
            visibilityVideoDownload && (
            <InputDurata 
                styles  =   {styles}
            />
            )
            }

        </View>
    )
}
export default ContainerInput