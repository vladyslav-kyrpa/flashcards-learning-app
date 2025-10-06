import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/ProfileApi";
import LoadingScreen from "../LoadingScreen";
import ErrorScreen from "../ErrorScreen";
import { TextBox } from "../shared/TextBoxes";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { ActiveButton } from "../shared/Buttons";

export default function EditProfilePage() {
    const { id } = useParams();
    const { isLoading, data: profile, error } = useApi(() => api.getProfile(id))
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (profile)
            setName(profile.name);
    }, [profile]);

    const handleOnSave = () => {
        if (!id || !profile) return;

        const updated = { ...profile };
        updated.name = name;

        api.updateProfile(updated).then((_) => {
            navigate(`/profile/${id}`);
        }).catch((error) => {
            console.error(error);
        });
    }

    if (isLoading) return <LoadingScreen />
    if (error) return <ErrorScreen error={error} />

    return <div>
        <p>Name</p>
        <TextBox placeholder="name" name="name"
            onChange={setName} value={name} />
        <ActiveButton onClick={handleOnSave}>Save</ActiveButton>
    </div>

}