import logo from './logo.svg';
import './App.css';
import Header from "./Components/Header"
import ImageDisplayer from './Components/ImageDisplay';
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <div className="App">
     <Header/>
     <ImageDisplayer/>
    </div>
  );
}

export default App;
