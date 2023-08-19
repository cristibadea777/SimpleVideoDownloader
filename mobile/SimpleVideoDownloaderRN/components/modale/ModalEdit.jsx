import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native"

const ModalEdit = ( {visibilityModalEdit, setVisibilityModalEdit, styles, videoURI, videoName, setVideoName, file, index, listaClipuri, setListaClipuri} ) => {

    const handleCloseModal = () => {
        setVisibilityModalEdit(false)
    }

    const handleEditVideo = async () => {
        //facut copie video cu noul nume
        //sters clipul vechi
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
                            style={{height: "100%", width: "100%", fontSize: 20, color: "black", padding: 12}}
                            multiline={true}
                        />
                    </View>
                    <View style={styles.containerButoane}>
                        <TouchableOpacity 
                            style={[styles.butoane, {backgroundColor: "white"}]}
                            onPress={handleEditVideo}
                        >
                            <Text style={[styles.textButoane, {color: "black"}]}>CHANGE</Text>
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