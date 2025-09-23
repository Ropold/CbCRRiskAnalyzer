import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./styles/Navbar.css";
import countryKeys from "../assets/country-keys.jpg";
import "./styles/Buttons.css";

type NavbarProps = {
    user:string;
    getUser: () => void;
}

export default function Navbar(props: Readonly<NavbarProps>) {

    const navigate = useNavigate();

    function loginWithGithub() {
        const host = window.location.host === "localhost:5173" ? "http://localhost:8080" : window.location.origin;
        window.open(host + "/oauth2/authorization/github", "_self");
    }

    function logoutFromGithub() {
        axios
            .post("/api/users/logout")
            .then(() => {
                props.getUser();
                navigate("/");
            })
            .catch((error) => {
                console.error("Logout failed:", error);
            });
    }

    return(
        <nav className="navbar">
            <button className="button-group-button" onClick={() => navigate("/")}>Home</button>
            {props.user !== "anonymousUser" ? (
                <>
                    <div
                        className="clickable-header padding-left-5"
                        onClick={() => {
                            navigate("/cbcr");
                        }}
                    >
                        <img src={countryKeys} alt="Scanner Logo" className="logo-image" />
                        <h2 className="header-title">CbCR</h2>
                    </div>

                    <button className="button-group-button" onClick={logoutFromGithub}>logout</button>
                </>
            ) : (
                <button className="button-group-button" onClick={loginWithGithub}>Login GitHub</button>
            )}
        </nav>
    )
}