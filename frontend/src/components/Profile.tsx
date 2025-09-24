import type {UserModel} from "./models/UserModel.ts";
import "./styles/Profile.css"

type ProfileProps = {
    user: string;
    userDetails: UserModel | null;
}


export default function Profile(props: Readonly<ProfileProps>) {
    if (!props.userDetails) {
        return (
            <div className="profile-container">
                <h2>Profile Page</h2>
                <p>Loading user details...</p>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img
                    src={props.userDetails.avatarUrl}
                    alt={`${props.userDetails.name}'s avatar`}
                    className="profile-avatar"
                />
                <div className="profile-info">
                    <h1 className="profile-name">{props.userDetails.name}</h1>
                    <p className="profile-username">@{props.userDetails.username}</p>
                    <p className="profile-role">{props.userDetails.role}</p>
                </div>
            </div>

            <div className="profile-details">
                <div className="profile-section">
                    <h3>Account Information</h3>
                    <div className="profile-field">
                        <p className="field-label">GitHub ID:</p>
                        <p className="field-value">{props.userDetails.githubId}</p>
                    </div>
                    <div className="profile-field">
                        <p className="field-label">Preferred Language:</p>
                        <p className="field-value">{props.userDetails.preferredLanguage}</p>
                    </div>
                    <div className="profile-field">
                        <p className="field-label">Member since:</p>
                        <p className="field-value">
                            {new Date(props.userDetails.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="profile-field">
                        <p className="field-label">Last login:</p>
                        <p className="field-value">
                            {new Date(props.userDetails.lastLoginAt).toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="profile-actions">
                    <a
                        href={props.userDetails.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-link"
                    >
                        View GitHub Profile
                    </a>
                </div>
            </div>
        </div>
    );
}
