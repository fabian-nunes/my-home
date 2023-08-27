import DNav from "../Parts/Navbar";
import HistoryTable from "./HistoryTable";
import { useParams } from "react-router-dom";
import Links from "./Links";
import Chart from "./Chart";

const DashHistory = () => {
    //if params are not passed, it will be undefined
    const { name, type } = useParams();

    return (
        <>
            <DNav />
            <Links Sname={name} Stype={type} />
            <HistoryTable Sname={name} Stype={type} />
            <Chart Sname={name} Stype={type} />
        </>
    )
}

export default DashHistory;