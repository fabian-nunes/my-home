import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HNavbar from "./components/Navbar";
import Banner from "./components/Banner";
import SensorBanner from "./components/SensorBanner";
import UploadButton from "./components/UploadButton";
import SensorTable from "./components/SensorTable";

function App() {
  return (
    <div className="App">
        <HNavbar />
        <Banner />
        <SensorBanner />
        <UploadButton />
        <SensorTable />
    </div>
  );
}

export default App;
