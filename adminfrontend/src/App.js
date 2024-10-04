import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Navbar from '../../frontend/src/Componetns/Navbar';
import './Styles/Navbar.css'
import Home from '../../frontend/src/Componetns/Home';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
           <Route path='/' element={<Home/>}></Route>
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
