import { useEffect, useState } from 'react';

const API = 'https://jsonplaceholder.typicode.com/users?q=';
const DELAY=2000;

const useDebounce = (value, delay) => {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounced(value);
        }, delay);

        return (() => clearTimeout(timeout));

    },[ value, delay]);

    console.log(debounced);

    return debounced;
}

const Typeahead = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const debouncedQuery = useDebounce(query, DELAY);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`${API}${debouncedQuery}`);
            const data = await (response.json());
            setResults(data);
        }

        getData();
    }, [query]);

    const handleAdd = (e) => {
        setQuery(e.target.value);
    }

    return (
        <>
            <input value={query} onChange={(e) => { handleAdd(e) }} />
            <ul>
                {results.map((result, index) => <li>{result.name}</li>)}
            </ul>
        </>
    )
}

export default Typeahead;