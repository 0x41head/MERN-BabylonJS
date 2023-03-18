import './App.css';
import Cuboid from './components/Cuboid';
import MapLoader from './components/MapLoader';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>    
        <Routes>
          <Route path="/cuboid" element={<Cuboid />} />
          <Route path="/" element={<MapLoader />} />
        </Routes>
      
    </>
  );
}

export default App;
