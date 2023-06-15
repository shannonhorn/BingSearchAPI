import { useState } from 'react';

import styles from '../styles/Search.module.css';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/search?query=${query}`);
    const data = await res.json();

    console.log(data);
    
    setResults(data.webPages.value);
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={search} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search the web..."
          value={query}
          className={styles.searchInput}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className={styles.searchButton}>
          <svg viewBox="0 0 24 24" className='icon' width='24' height='24'>
          <path d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"></path>
        </svg>
        </button>
      </form>
      {results.map((result, index) => (
        <div key={index}>
          <a href={result.url} target="_blank" rel="noreferrer">{result.name}</a>
          <p>{result.snippet}</p>
        </div>
      ))}
    </div>
  );
}
