import { View } from "react-native"
import InputLink from "./InputLink"
import InputDurata from "./InputDurata"

const ContainerInput = ( {styles, link, setLink, visibilityCutVideo} ) => {
    return(
        <View style={[styles.containerInput, {height: visibilityCutVideo ? "30%" : "10%"}]}>
            <InputLink 
                styles  =   {styles}
                link    =   {link}
                setLink =   {setLink}
            />

            {
            visibilityCutVideo && (
            <InputDurata 
                styles  =   {styles}
            />
            )
            }

        </View>
    )
}
export default ContainerInput