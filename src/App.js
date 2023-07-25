import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HNavbar from "./components/Navbar";
import Banner from "./components/Banner";
import SensorBanner from "./components/SensorBanner";

function App() {
  return (
    <div className="App">
        <HNavbar />
        <Banner />
        <SensorBanner />
    </div>
  );
}

export default App;
