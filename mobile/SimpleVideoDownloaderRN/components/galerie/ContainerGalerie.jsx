import React, { useEffect, useState } from "react"
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit, faShare, faShareAlt, faX } from "@fortawesome/free-solid-svg-icons";
import * as Sharing from "expo-sharing"
import ModalStergere from "../modale/ModalStergere";

const ContainerGalerie = ({ listaClipuri, styles, setListaClipuri, stylesModale, visibilityModalStergere, setVisibilityModalStergere, setVisibilityModalEdit }) => {

    const [videoURI,    setVideoURI]  = useState()
    const [videoName,   setVideoName] = useState(' Rammestein - Sonne (slowed ~ reverb) [zVonqC7-1cg].mp4 ')
    const [file,        setFile]      = useState('')
    const [index,       setIndex]     = useState('')

    const changeOrientation = async () => {
        if (Dimensions.get('window').height > Dimensions.get('window').width) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
        } else{
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
        }
    }

    ///@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


    //de facut modale de confirmare si input nume nou


    ///@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    const handlePressItemLista = (item) => {
        setVideoURI(item.uri)
        setVideoName(item.titlu.split(' [')[0])
    }

    const handlePressButonDelete = (file, index) => {
        setFile(file)
        setIndex(index)
        setVisibilityModalStergere(true)
    }

    const onPressButonEdit = (file) => {
        //copy cu noul nume 
        //apoi delete
    }

    const onPressButonShare = (file) => {
        Sharing.shareAsync(file)
    }

    const afisareListaClipuri = () => {
        return listaClipuri.map((item, index) => (
            <TouchableOpacity 
                key={index} 
                style={styles.containerGalerie}
                onPress={() => {handlePressItemLista(item)}}
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
                                    onPress={
                                        event => {
                                            event.stopPropagation()
                                            handlePressButonDelete(item.uri, index)
                                        }
                                    }
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

            <ModalStergere 
                visibilityModalStergere       = {visibilityModalStergere}
                setVisibilityModalStergere    = {setVisibilityModalStergere}
                styles                        = {stylesModale}
                videoURI                      = {videoURI}
                videoName                     = {videoName}
                file                          = {file}
                index                         = {index}
                listaClipuri                  = {listaClipuri}
                setListaClipuri               = {setListaClipuri}
            />
        </ScrollView>
    )
}

export default ContainerGalerie
