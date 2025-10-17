import {useNavigate} from "react-router-dom";

type InsertProps = {
    language: string;
}

export default function Insert(props: Readonly<InsertProps>){
    const navigate = useNavigate();

    return(
        <div>
            <div className="add-new-button">
                <button className="button-blue">csv/ai</button>
                <button className="button-blue" onClick={()=> navigate("add-new-company")}>add Company</button>
                <button className="button-blue" onClick={()=> navigate("add-new-cbcr-report")}>add CbCR Report</button>
                <button className="button-blue" onClick={()=> navigate("add-new-country")}>add Country</button>
                <button className="button-blue" onClick={()=> navigate("add-new-risk-assessment")}>add Risk Assessment</button>
                <button className="button-blue" onClick={()=> navigate("add-new-subsidiary")}>add Subsidiary</button>
            </div>

            <h2>Insert</h2>
            <p>This is the Insert page.</p>
            <p>{props.language}</p>
        </div>
    )
}