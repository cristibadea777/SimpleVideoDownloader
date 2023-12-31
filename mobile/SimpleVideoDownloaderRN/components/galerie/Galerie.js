import * as FileSystem from 'expo-file-system';

//initializare folder pt galerie in directorul aplicatiei
const initializareFolderGalerie = async (folderGalery) => {
    const folderInfo = await FileSystem.getInfoAsync(folderGalery)
    if(!folderInfo.exists){
        await FileSystem.makeDirectoryAsync(folderGalery, { intermediates: true })
        console.log("Folder galerie creat")
    } 
    await afisareContinutDirector()
    await afisareContinutFolderGalerie(folderGalery)
}

const afisareContinutDirector = async () => {
    const directorCurent = FileSystem.documentDirectory
    const directoryContents = await FileSystem.readDirectoryAsync(directorCurent)
    console.log("Director curent: " + directorCurent + "---")
    directoryContents.map( 
        (item) => { console.log("--- " + item) }
    )
}

const afisareContinutFolderGalerie = async (folderGalery) => {
    const directoryContents = await FileSystem.readDirectoryAsync(folderGalery)
    console.log("Folder galerie: " + folderGalery + "---")
    directoryContents.map( 
        (item) => { console.log("Video: --- " + item) }
    )
}

const removeElementListaClipuri = (listaClipuri, index) => {
    const newListaClipuri = [...listaClipuri]
    newListaClipuri.splice(index, 1)
    return newListaClipuri
}

const renameFile = async (oldURI, newURI) => {
    try {
        await FileSystem.moveAsync( 
            { 
                from: oldURI,
                to: newURI
            } 
        )
    } catch (error) {
        console.log("Error renaming the file: " + error)
    }
} 

const addElementListaClipuriAtIndex = (listaClipuri, fileName, fileURI, index) => {
    const newListaClipuri = [...listaClipuri]
    const video = {
        "titlu" : fileName,
        "uri" : fileURI,
    }
    newListaClipuri.splice(index, 0, video)
    return newListaClipuri
}

const addElementListaClipuri = (listaClipuri, fileName, fileURI) => {
    const newListaClipuri = [...listaClipuri]
    newListaClipuri.push(
        {
            "titlu" : fileName, 
            "uri"   : fileURI
        }
    )
    return newListaClipuri 
}

const populareListaClipuriGalerie = async (folderGalery, listaClipuri) => {
    directoryContents = await FileSystem.readDirectoryAsync(folderGalery)
    directoryContents.map( 
        (item) => { 
            listaClipuri.push(
                {
                    "titlu" : item, 
                    "uri"   : folderGalery + "/" + item
                }
            ) 
        }
    )
    //console.log(JSON.stringify(listaClipuri, null, 2))
}
export {    initializareFolderGalerie, afisareContinutDirector, afisareContinutFolderGalerie, 
            populareListaClipuriGalerie, removeElementListaClipuri, addElementListaClipuri, 
            renameFile, addElementListaClipuriAtIndex
        }