import HNavbar from "./Navbar";
import Banner from "./Banner";
import SensorBanner from "./SensorBanner";
import UploadButton from "./UploadButton";
import SensorTable from "./SensorTable";
import Footer from "./Footer";

const Dashboard = () => {
    return (
        <>
            <HNavbar />
            <Banner />
            <SensorBanner />
            <UploadButton />
            <SensorTable />

        </>
    );
}

export default Dashboard;