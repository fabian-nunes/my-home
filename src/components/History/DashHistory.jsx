import DNav from "../Parts/Navbar";
import HistoryTable from "./HistoryTable";
import { useParams } from "react-router-dom";

const DashHistory = () => {
    //if params are not passed, it will be undefined
    const { name, type } = useParams();

    return (
        <>
            <DNav />
            <HistoryTable Sname={name} Stype={type} />
        </>
    )
}

export default DashHistory;