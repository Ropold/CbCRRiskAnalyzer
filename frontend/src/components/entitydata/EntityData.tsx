import {useNavigate} from "react-router-dom";

type EntityDataProps = {
    language: string;
}

export default function EntityData(props: Readonly<EntityDataProps>){
    const navigate = useNavigate();

    return(
        <div>
            <div className="add-new-button">
                <button className="button-blue" onClick={()=> navigate("cbcr-reports")}>Cbcr-Reports</button>
                <button className="button-blue" onClick={()=> navigate("countries")}>Countries</button>
                <button className="button-blue" onClick={()=> navigate("risk-assessments")}>RiskAssessment</button>
                <button className="button-blue" onClick={()=> navigate("subsidiaries")}>Subsidiaries</button>
            </div>

            <h2>Entity Data</h2>
            <p>This is the Entity Data page.</p>
            <p>{props.language}</p>
        </div>
    )
}