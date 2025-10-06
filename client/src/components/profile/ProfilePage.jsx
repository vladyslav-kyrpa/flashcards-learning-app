import { useNavigate, useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import profiles from "../../services/ProfileApi"
import auth from "../../services/AuthApi"
import LoadingScreen from "../LoadingScreen";
import ErrorScreen from "../ErrorScreen";
import { ActiveButton } from "../shared/Buttons";
import { useState } from "react";
import { Confirmation } from "../shared/Dialogs";

export default function ProfilePage() {
    const { id } = useParams();
    const { isLoading, data: profile, error } = useApi(() =>
        id ? profiles.getProfile(id) : profiles.getCurrent());

    const navigate = useNavigate();

    const handleOnEdit = () => {
        navigate(`/edit-profile/${profile.id}`);
    }

    const handleOnDelete = () => {
        profiles.delete(profile.id).then((_) => {
            navigate("/");
        }).catch((error) => {
            console.error(error);
        });
    }

    const handleOnLogOut = () => {
        auth.logout();
        navigate("/log-in");
    }

    if (isLoading) return <LoadingScreen />
    if (error) return <ErrorScreen error={error} />

    return <div>
        <p>{profile.id}</p>
        <p>{profile.name}</p>
        <ActiveButton onClick={handleOnEdit}>Edit</ActiveButton>
        <DeleteButton onClick={handleOnDelete} />
        <ActiveButton onClick={handleOnLogOut} >Log-out</ActiveButton>
    </div>


}

function DeleteButton({ onClick }) {
    const [showConfirmation, setShowConfirmation] = useState(false);

    return <>
        <ActiveButton className="m-2" onClick={() => setShowConfirmation(true)}>Delete Deck</ActiveButton>
        {
            showConfirmation && <Confirmation
                onCancel={() => setShowConfirmation(false)}
                onConfirm={onClick}
                message="Do you really want to delete your profile?" />
        }
    </>
}