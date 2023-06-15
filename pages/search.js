import { useState } from 'react';
import Link from 'next/link';

import styles from '../styles/Search.module.css';

export default function Search() {
  const [query, setQuery] = useState('');
  const [searchProcessed, setSearchProcessed] = useState(false);
  const [results, setResults] = useState([]);
  const [resultsCount, setResultsCount] = useState(0);

  const search = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/search?query=${query}`);
    const data = await res.json();

    console.log(data.webPages.value);

    setSearchProcessed(true);
    setResults(data.webPages.value);
    setResultsCount(data.webPages.totalEstimatedMatches);
  };

  return (
    <div className={styles.searchContainer}>
      <section className={styles.searchInfo}>
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
      </section>
      <section className={styles.resultsSection}>
        <p className={styles.resultsCount}>{searchProcessed &&
          <span>About {resultsCount} results</span>}
        </p>
        {results.map((result, index) => (
          <div key={index} className={styles.resultItem}>
            <Link href={result.url} target='_blank' rel='noreferrer'>{result.name}</Link>
            <p><span>{result.snippet}</span></p>
          </div>
        ))}
      </section>
    </div>
  );
}
