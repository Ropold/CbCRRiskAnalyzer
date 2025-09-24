import welcomePic from '../assets/cbcr-logo-big.svg';
import "./styles/Welcome.css"

export default function Welcome() {
    return (
        <>
        <h2>Welcome</h2>
            <div className="image-wrapper margin-top-20">
                <img
                    src={welcomePic}
                    alt="Welcome to Scan Manager"
                    className="logo-welcome"
                />
            </div>
        </>
    )
}