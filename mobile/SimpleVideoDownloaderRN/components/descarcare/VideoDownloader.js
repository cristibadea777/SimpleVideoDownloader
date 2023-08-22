import axios from 'axios'
import * as FileSystem from 'expo-file-system';
import { addElementListaClipuri } from '../galerie/Galerie';

const api = 'https://3d0e-86-124-125-24.ngrok-free.app/'

const descarcaVideoAsync = async ( {link, setStareDescarcare, visibilityCutVideo,secundeStart, secundeEnd} ) => {
    setStareDescarcare("Downloading...")
    //endpoint-ul pt download
    let apiEndpoint = api + '/download/'
    //data formularului ce se trimite in cererea catre API
    //link se primiste ca props de la aplicatie 
    const formData = new FormData()
    formData.append('link', link) 
    //daca visibilityCutVideo este false atunci se descarca tot clipul (serverul se uita daca exista sau nu in body start, end), 
    //altfel se descarca doar sectiunea indicata
    if(parseInt(secundeStart) > parseInt(secundeEnd))        
        return "WRONG TIME INPUT"
    if(parseInt(secundeStart) === parseInt(secundeEnd))
        secundeEnd = secundeEnd + 1
    console.log(secundeEnd)
    if(visibilityCutVideo){
        formData.append('start', secundeStart)
        formData.append('end', secundeEnd)
    }
    //cererea asincrona se face cu axios
    //preluare raspuns de la API - se returneaza un video sub forma de blob 
    const videoResponse = await axios.post(
        apiEndpoint, 
        formData, 
        {
            headers: { 
                'Content-Type': 'multipart/form-data', 
            },
            responseType: 'blob',
        }
    )
    return videoResponse
}

const salveazaVideoAsync = async ( {link, folderGalery, setFileName, setFileURI, setStareDescarcare, visibilityCutVideo, secundeStart, secundeEnd, listaClipuri, setListaClipuri} ) => {    
    const videoResponse = await descarcaVideoAsync({link, setStareDescarcare, visibilityCutVideo, secundeStart, secundeEnd})
    if(videoResponse === "WRONG TIME INPUT"){
        setStareDescarcare("Wrong time input")
        return 
    } 
    const newFileName = videoResponse.headers.get('Filename')
    const newFileURI  = `${folderGalery}${newFileName}`//API-ul trimite si extensia, ca parte a numelui fisierului
    //citire a raspunsului video si salvare cu writeAsStringAsync
    setStareDescarcare("Saving...")
    const file_reader   = new FileReader()
    file_reader.readAsDataURL(videoResponse.data)
    //event onload ce se asigura ca datele din raspuns au fost terminate de citit
    file_reader.onload = async () => {
      //dupa ce datele din raspuns au fost citite, se salveaza fisierul
      await FileSystem.writeAsStringAsync(newFileURI, file_reader.result.split(',')[1], { encoding: FileSystem.EncodingType.Base64 })
    }
    setFileName(newFileName.split(' [')[0])
    setFileURI(newFileURI)      
    setStareDescarcare("Finished.")
    await setListaClipuri(addElementListaClipuri(listaClipuri, newFileName, newFileURI))
}
export {descarcaVideoAsync, salveazaVideoAsync}