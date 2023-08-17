import React, { useEffect, useState } from "react"
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit, faShare, faShareAlt, faX } from "@fortawesome/free-solid-svg-icons";
import * as Sharing from "expo-sharing"

const ContainerGalerie = ({ listaClipuri, styles }) => {

    const [videoURI, setVideoURI] = useState()

    const changeOrientation = async () => {
        if (Dimensions.get('window').height > Dimensions.get('window').width) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
        } else{
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
        }
    }

    const onPressButonDelete = () => {
    }

    const onPressButonEdit = () => {
    }

    const onPressButonShare = (file) => {
        Sharing.shareAsync(file)
    }

    const afisareListaClipuri = () => {
        return listaClipuri.map((item, index) => (
            <TouchableOpacity 
                key={index} 
                style={styles.containerGalerie}
                onPress={()=>{setVideoURI(item.uri)}}
                activeOpacity={0.7}
            >
                <Text style={{fontSize: 24, color: (videoURI === item.uri) ? "blue" : "black", textAlign: "center"}}>
                    {item.titlu.split(' [')[0]}
                </Text>
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
                                <TouchableOpacity
                                    style={styles.buton}
                                    onPress={{}}
                                >
                                    <FontAwesomeIcon icon={faX} size={33} style={styles.culoarePictograme} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buton}
                                    onPress={{}}
                                >
                                    <FontAwesomeIcon icon={faEdit} size={33} style={styles.culoarePictograme} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buton}
                                    onPress={
                                        event => {
                                            event.stopPropagation()
                                            onPressButonShare(item.uri)
                                        }
                                    }
                                >
                                    <FontAwesomeIcon icon={faShareAlt} size={33} style={styles.culoarePictograme} />
                                </TouchableOpacity>
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
