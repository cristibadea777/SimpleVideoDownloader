import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native"
import { addElementListaClipuriAtIndex, removeElementListaClipuri, renameFile } from "../galerie/Galerie"
import { useEffect, useState } from "react"

const ModalEdit = ( {visibilityModalEdit, setVisibilityModalEdit, styles, videoURI, videoName, setVideoName, index, listaClipuri, setListaClipuri, extensie} ) => {

    const handleCloseModal = () => {
        setVisibilityModalEdit(false)
    }

    const [numeInitial, setNumeInitial] = useState('')
    useEffect(
        () => {
            if(visibilityModalEdit === true)
            setNumeInitial(videoName)
        }, [visibilityModalEdit]
    )

    const handleEditVideo = async () => {
        const numeNou = videoName+extensie
        //uri nou = path + new name
        //avem nevoie si de numele vechi (initial) pt a face split, pt a obtine path-ul
        const path = videoURI.split(numeInitial)[0]
        const uriNou = path + numeNou

        //scoatem elementul cu numele vechi din lista
        const newListaClipuri = await removeElementListaClipuri([...listaClipuri], index)
        setListaClipuri(newListaClipuri)
        
        //rename fisierului, cu nume si uri nou
        await renameFile(videoURI, uriNou)
        
        //pentru lista in care am scos vechiul element, adaugam noul element, cu numele nou
        const updatedListaClipuri = await addElementListaClipuriAtIndex(newListaClipuri, numeNou, uriNou, index)
        setListaClipuri(updatedListaClipuri)
        
        //close
        handleCloseModal()
    }

    return (
        <Modal
            visible={visibilityModalEdit}
            animationType="fade"
            transparent={true}
            onRequestClose={handleCloseModal}
        >
            <View style={styles.containerModal}>
                <View style={styles.containerModalEdit}>
                    <View style={styles.containerTitluModal}>
                        <Text style={[styles.textTitluModal, {color: "cyan"}]}> Change the name ? </Text>
                    </View>
                    <View style={styles.containerInputTitluEdit}>
                        <TextInput
                            value={videoName}
                            onChangeText={setVideoName}
                            placeholder="Input the new name..."
                            style={styles.textInputEdit}
                            multiline={true}
                        />
                    </View>
                    <View style={styles.containerButoane}>
                        <TouchableOpacity 
                            style={[styles.butoane, {backgroundColor: "red"}]}
                            onPress={handleEditVideo}
                        >
                            <Text style={[styles.textButoane, {color: "white"}]}>CHANGE</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.butoane, {backgroundColor: "#11574a"}]}
                            onPress={handleCloseModal}
                        >
                            <Text style={styles.textButoane}>CANCEL</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </Modal>
    )

}
export default ModalEdit