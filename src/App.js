import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HNavbar from "./components/Navbar";
import Banner from "./components/Banner";
import SensorBanner from "./components/SensorBanner";
import UploadButton from "./components/UploadButton";
import TableComponent from "./components/Table";

function App() {
  return (
    <div className="App">
        <HNavbar />
        <Banner />
        <SensorBanner />
        <UploadButton />
        <TableComponent />
    </div>
  );
}

export default App;
