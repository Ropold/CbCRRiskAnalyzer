import {useNavigate} from "react-router-dom";

export default function CbcrForm(){

    const navigate = useNavigate();
    const isEditmode = backNavigationPath.includes("cbcr-reports/") && backNavigationPath !== "cbcr-reports");

    return(
        <div>
            <h2>Cbcr Form</h2>
            <p>This is the Cbcr Form page.</p>
        </div>
    )
}