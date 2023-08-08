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
    directoryContents.map( (item) => { console.log("--- " + item) }
    )
}

const afisareContinutFolderGalerie = async (folderGalery) => {
    const directoryContents = await FileSystem.readDirectoryAsync(folderGalery)
    console.log("Folder galerie:")
    directoryContents.map( (item) => { console.log("Video: --- " + item) }
    )
}

export {initializareFolderGalerie, afisareContinutDirector, afisareContinutFolderGalerie}