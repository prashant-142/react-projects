
import  {useEffect, useState} from 'react';

const API="https://jsonplaceholder.typicode.com/users?q=";
const DELAY = 300;

const useDebounce = (value, delay) => {
   const [debounced, setDebounced] = useState(value);

   useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, DELAY)

   return () => clearTimeout(timer);
   }, [value, delay])

   return debounced;
}

const Typeahead = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const debouncedQuery = useDebounce(query);


  useEffect( () => {
    const getData = async () => {
      try {
        const reponse = await fetch(`${API}${debouncedQuery}`);
        const data = await(reponse.json());
        setResults(data);
      }
      catch (error) {
        console.error(error);
      };
    }

    getData();
  }, [debouncedQuery])

  const handleClick = (event) => {
    setQuery(event.target.value);
  }

  return (
    <>
    <input placeholder="search" onChange={(e) => {handleClick(e)}} />
    <ul>
      <li>{query}</li>
      { results.map( (result, idx) => <li>{result.name}</li>)}
    </ul>
    </>
  )
}

export default Typeahead;