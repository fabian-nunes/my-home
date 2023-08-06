import DNav from "../Dashboard/Navbar";
import HistoryTable from "./HistoryTable";
import { useParams } from "react-router-dom";

const DashHistory = () => {
    const { name, type } = useParams();

    return (
        <>
            <DNav />
            <HistoryTable Sname={name} Stype={type} />
        </>
    )
}

export default DashHistory;