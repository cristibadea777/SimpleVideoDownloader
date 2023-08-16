import { View } from "react-native"
import InputLink from "./InputLink"
import InputDurata from "./InputDurata"

const ContainerInput = ( {styles, link, setLink, visibilityCutVideo, oraStart, minutStart, secundaStart, oraEnd, minutEnd, secundaEnd, setOraStart, setMinutStart, setSecundaStart, setOraEnd, setMinutEnd, setSecundaEnd} ) => {
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
                styles                      = {styles}
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
            )
            }

        </View>
    )
}
export default ContainerInput