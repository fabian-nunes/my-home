import DNav from "../Dashboard/Navbar";
import HistoryTable from "./HistoryTable";
import { useParams } from "react-router-dom";

const DashHistory = () => {
    const { name } = useParams();

    return (
        <>
            <DNav />
            <HistoryTable Sname={name} type="sensor" />
        </>
    )
}

export default DashHistory;