import logo from './logo.svg';
import './App.css';

const App = () => {
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
      
      </div>
    </div>
  );
}

export default App;
