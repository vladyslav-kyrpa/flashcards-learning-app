import { useEffect, useState } from "react"

export default function useApi(func, deps) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [data, setData] = useState();

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        setData(null);
        setError("")

        func().then((r) => {
            if (isMounted) setData(r);
        }).catch((e) => {
            if (isMounted) setError(e.message);
            console.error(e);
        }).finally(() => {
            if (isMounted) setIsLoading(false);
        });

        return () => { isMounted = false; };
    }, [deps]);

    const hideError = () => {
        setError("");
    }

    return { isLoading, error, data, hideError };
} 