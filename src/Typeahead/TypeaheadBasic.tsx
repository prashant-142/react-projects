import { useEffect, useState } from 'react';

const API = 'https://jsonplaceholder.typicode.com/users?q='

const Typeahead = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleAdd = (e) => {
        setQuery(e.target.value);
    }

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`${API}${query}`);
            const data = await (response.json());
            setResults(data);
        }

        getData();
    }, [query]);

    return (
        <>
            <input value={query} onChange={(e) => { handleAdd(e) }} />
            <ul>
                <li>{query}</li>
                {results.map((result, index) => <li>{result.name}</li>)}
            </ul>
        </>
    )
}

export default Typeahead;