import { Modal, Text, TouchableOpacity, View } from "react-native"
import { removeElementListaClipuri } from "../galerie/Galerie"
import { deleteAsync } from "expo-file-system"

const ModalStergere = ( {visibilityModalStergere, setVisibilityModalStergere, styles, videoURI, videoName, file, index, listaClipuri, setListaClipuri} ) => {

    const handleCloseModal = () => {
        setVisibilityModalStergere(false)
    }

    const handleDeleteVideo = async () => {
        const newListaClipuri = await removeElementListaClipuri(listaClipuri, index)
        setListaClipuri(newListaClipuri)
        await deleteAsync(file)
        handleCloseModal()
    }

    return (
        <Modal
            visible={visibilityModalStergere}
            animationType="fade"
            transparent={true}
            onRequestClose={handleCloseModal}
        >
            <View style={styles.containerModal}>
                <View style={styles.containerModalStergere}>
                    <View style={styles.containerTitluModal}>
                        <Text style={[styles.textTitluModal, {color: "red"}]}> Delete this video ? </Text>
                    </View>
                    <View style={styles.containerTitluVideoStergere}>
                        <Text style={styles.textTitluVideoStergere}> {videoName} </Text>
                    </View>
                    <View style={styles.containerButoane}>
                        <TouchableOpacity 
                            style={[styles.butoane, {backgroundColor: "red"}]}
                            onPress={handleDeleteVideo}
                        >
                            <Text style={styles.textButoane}>DELETE</Text>
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
export default ModalStergere