import HNavbar from "../Parts/Navbar";
import Banner from "./Banner";
import SensorBanner from "./SensorBanner";
import UploadButton from "./UploadButton";
import SensorTable from "./SensorTable";

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