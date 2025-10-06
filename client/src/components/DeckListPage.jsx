import DeckList from "./shared/DeckList";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import api from "../services/DeckApi.js";
import useApi from "../hooks/useApi.js";

export default function DeckListPage() {
    const { isLoading, data: decks, error } = useApi(() => api.getList());

    if (isLoading) return <LoadingScreen />
    if (error) return <ErrorScreen error={error} />

    return <>
        <DeckList decks={decks} className="m-2"></DeckList>
    </>
}