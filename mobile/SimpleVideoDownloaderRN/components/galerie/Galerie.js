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
    const directoryContents = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
    console.log("Director curent:")
    directoryContents.map( 
        (item) => { console.log("--- " + item) }
    )
}

const afisareContinutFolderGalerie = async (folderGalery) => {
    const directoryContents = await FileSystem.readDirectoryAsync(folderGalery)
    console.log("Folder galerie:")
    directoryContents.map( 
        (item) => { console.log("Video: --- " + item) }
    )
}

const removeElementListaClipuri = (listaClipuri, index) => {
    const newListaClipuri = [...listaClipuri]
    newListaClipuri.splice(index, 1)
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
    console.log(listaClipuri)
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
    console.log(listaClipuri)
}
export {initializareFolderGalerie, afisareContinutDirector, afisareContinutFolderGalerie, populareListaClipuriGalerie, removeElementListaClipuri, addElementListaClipuri}