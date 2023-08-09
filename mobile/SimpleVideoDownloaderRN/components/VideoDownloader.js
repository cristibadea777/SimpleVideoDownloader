import axios from 'axios'
import * as FileSystem from 'expo-file-system';

const descarcaVideoAsync = async ( {link, setStareDescarcare} ) => {
    setStareDescarcare("Downloading...")
    //data formularului ce se trimite in cererea catre API
    //link se primiste ca props de la aplicatie 
    const formData = new FormData()
    formData.append('link', link) 
    //cererea asincrona se face cu axios
    //preluare raspuns de la API - se returneaza un video sub forma de blob 
    const videoResponse = await axios.post('https://simple-video-downloader.onrender.com/download/', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    responseType: 'blob',
    })
    return videoResponse
}

const salveazaVideoAsync = async ( {link, folderGalery, setFileName, setFileURI, setStareDescarcare} ) => {    
    setStareDescarcare("Saving...")
    const videoResponse = await descarcaVideoAsync({link, setStareDescarcare})
    const newFileName = videoResponse.headers.get('Filename')
    const newFileURI  = `${folderGalery}${newFileName}`//API-ul trimite si extensia, ca parte ca numelui fisierului
    //citire a raspunsului video si salvare cu writeAsStringAsync
    const file_reader   = new FileReader()
    file_reader.readAsDataURL(videoResponse.data)
    //event onload ce se asigura ca datele din raspuns au fost terminate de citit
    file_reader.onload = async () => {
      //dupa ce datele din raspuns au fost citite, se salveaza fisierul
      await FileSystem.writeAsStringAsync(newFileURI, file_reader.result.split(',')[1], { encoding: FileSystem.EncodingType.Base64 })
    }
    setFileName(newFileName)
    setFileURI(newFileURI)      
    setStareDescarcare("Finished.")
}
export {descarcaVideoAsync, salveazaVideoAsync}