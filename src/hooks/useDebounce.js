import { useEffect, useState } from "react"

export const useDebounce = (query, delay = 300) => {
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, delay)

        return () => {
            clearTimeout(handler);
        }
    }, [query]);

    return debouncedQuery;
}