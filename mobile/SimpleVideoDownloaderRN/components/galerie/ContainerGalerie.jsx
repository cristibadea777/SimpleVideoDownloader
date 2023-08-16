import React from "react"
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation'

const ContainerGalerie = ({ listaClipuri, setInFullsreen, setFileUri }) => {

    const changeScreenOrientationLanscape = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    
    const changeScreenOrientationPortrait = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }

    const handlePressTitlu = (uri) => {
        setFileUri(uri)
        setInFullsreen(true)
    }

    const windowWidthLandscape   =   Dimensions.get('window').height;
    const windowHeightLandscape  =   Dimensions.get('window').width;

    const afisareListaClipuri = () => {
        return listaClipuri.map((item, index) => (
            <TouchableOpacity 
                key={index} 
                style={{backgroundColor: "yellow", marginBottom: 3}}
                onPress={()=>{handlePressTitlu(item.uri)}}
            >
                <Text style={{fontSize: 24}}>{item.titlu.split(' [')[0]}</Text>
                <Text>{item.uri}</Text>
            </TouchableOpacity>
        ));
    }

    return (
        <ScrollView style={{flexGrow: 1}}>
            {afisareListaClipuri()}
        </ScrollView>
    )
}

export default ContainerGalerie
