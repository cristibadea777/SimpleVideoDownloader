import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios'

const App = () => {
  
  const [stareDescarcare, setStareDescarcare] = useState('')
  const [link,            setLink]            = useState('')

  const handlePressOk = () => {
    setStareDescarcare("Downloading...")
    
    const formData = new FormData();
    formData.append('link', link);

    //axios.post('http://127.0.0.1:5000/download/', formData, { responseType: 'blob' })
    axios.post('https://simple-video-downloader.onrender.com/download/', formData, { responseType: 'blob' })
    .then(response => {
      setStareDescarcare("Finished ")
      const video = window.URL.createObjectURL(new Blob([response.data]));
      //algoritm de descarcare
      //creare element ancora <a> ascunsa
      //hreful setat cu url-ul blob-ului
      //atributul de download cu numele blob-ului
      //click artificial pe <a>, incepe descarcarea
      const a = document.createElement('a');
      a.href = video;
      //numele fisierului luat din headerul Filename
      const filename = response.headers.get('Filename')
      a.download = filename + '.mp4';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(video);
    })
    .catch(error => {
      console.error('Error downloading:', error);
      setStareDescarcare("Error");
    });
}


  const handleChangeTextInput = (event) => {
    setLink(event.target.value)
  } 

  return (
    <div style={{backgroundColor: "red", }} className="Container">
      <div className="Header-Container">
        <img src={logo} className="App-logo" alt="logo" />
        <div style={{flexGrow: 1, padding: 7}}>
          <h1 className="Titlu"> Simple Video Downloader </h1>
          <div style={{textAlign: "end"}}>
            <h5 className='Subtitlu'>created with: Python, Flask, React JS</h5>
          </div>
        </div>
      </div>
      <div className="Body-Container">
      
        <div style={{display: "flex", flexDirection: "row", width: "100%", padding: 13, alignItems: "center", justifyContent: "flex-start", paddingLeft: "25%"}}>
          <h1 style={{marginRight: 33}}>Link: </h1>
          <input 
            style={{width: "33%", height: "50%", marginLeft: 33, marginRight: 33, border: 0, outline: 0, borderBottomWidth: 1, borderBottomColor: "black", borderBottomStyle: "solid", fontSize: 25, backgroundColor: "cyan"}}
            onChange={handleChangeTextInput}
          />
          <Button 
            sx={{backgroundColor: "yellow", fontSize: 25, color: "black", marginLeft: 3}}
            onClick={handlePressOk}
          >OK</Button>
        </div>
      
        <div style={{display: "flex", flexDirection: "row", width: "100%", padding: 13, alignItems: "center", justifyContent: "flex-start", paddingLeft: "25%"}}>
          <h1 style={{marginRight: 33}}>Status:</h1>
          <h1> {stareDescarcare} </h1>
        </div>
      
      </div>
    </div>
  );
}

export default App;
