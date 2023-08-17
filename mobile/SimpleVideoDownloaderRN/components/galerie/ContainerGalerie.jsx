import React, { useEffect, useState } from "react"
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation'

const ContainerGalerie = ({ listaClipuri }) => {

    const [videoURI, setVideoURI] = useState()

    const changeOrientation = async () => {
        if (Dimensions.get('window').height > Dimensions.get('window').width) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
        } else{
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
        }
    }

    useEffect(
        () => {
            console.log(videoURI)
        }, [videoURI]
    )

    const handlePressTitlu = (uri) => {
        setVideoURI(uri)
    }

    const styles = StyleSheet.create(
        {
            containerVideo: {
                height: 333, 
                width: "100%",
            },
            video: {
                height: "80%",
                alignSelf: "stretch"
            },
            containerButoane: {
                flex: 1, 
                backgroundColor: "blue",
                marginBottom: 12
            }
        }
    )

    const afisareListaClipuri = () => {
        return listaClipuri.map((item, index) => (
            <TouchableOpacity 
                key={index} 
                style={{backgroundColor: "cyan", marginBottom: 3, borderColor: "white", borderBottomWidth: 3}}
                onPress={()=>{handlePressTitlu(item.uri)}}
            >
                <Text style={{fontSize: 24, color: (videoURI === item.uri) ? "blue" : "black", textAlign: "center"}}>{item.titlu.split(' [')[0]}</Text>
                {
                    videoURI === item.uri ? (
                        <View style={styles.containerVideo}>
                            <Video
                                style={styles.video}
                                source={{uri: videoURI}}
                                useNativeControls={true}
                                resizeMode="contain"
                                isLooping={false}
                                onFullscreenUpdate={changeOrientation}
                            />
                            <View style={styles.containerButoane}>
                            
                            </View>
                        </View>
                    ): (
                        <></>
                    )
                }
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
