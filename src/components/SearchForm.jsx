import {Form, Link} from "react-router-dom";
import {IoIosCloseCircleOutline} from "react-icons/io";

import {IoSearch} from "react-icons/io5";
import {useState} from "react";
import {searchDataJSON} from "../api.js";
import {prioritizeResults} from "../utils.js";


export default function SearchForm() {
    const [results, setResults] = useState([]);

    function handleFilterCountries(e) {
        e.preventDefault();
        e.target.focus();
        const {value} = e.target;
        const searchData = JSON.parse(searchDataJSON)
        if (!value) {
            setResults([]);
            return;
        }
        // ^.* everything from, including the beginning of the line
        // value the requested pattern
        // .*$ everything after the pattern, including the end of the line
        const pattern = value.length === 1 ? `^${value.trim()}` : `^.*${value.trim()}.*$`;

        const countryRegx = new RegExp( pattern, 'i');
        const filteredResults = searchData.filter(data => {
            if (countryRegx.test(data.name)) return data;
        });
        const prioritizedArr = prioritizeResults(filteredResults, value);
        setResults(() => prioritizedArr.length > 10 ? prioritizedArr.slice(0, 10) : prioritizedArr);
    }

    const displayResults = results.length > 0 && results.map((result, id) => (
        <Link className={'result-links'} key={`results-${id}`}
              to={`page/?country=${result.name.replace(/\s+/g, '+').toLowerCase()}`}>
            <figure className={'d-flex'}>
                <img className={'flag-results'}
                     src={result.flags}
                     alt={result.alt || `The flag of ${name.common}`} loading={'lazy'}/>
                <figcaption>
                    <h1 className={'txt-caps fw-600'}>{result.name}</h1>
                    <p>{result.capital}</p>
                </figcaption>
            </figure>
        </Link>)
    );

    return (<>
        <div className={'form-container'}>
            <Form method={'get'} action={'results'}>
                <div className={'input-container d-flex'}>
                    <IoSearch/>
                    <input
                        id={'search'}
                        type='search'
                        name={'search_query'}
                        className='search-input'
                        autoComplete={'on'}
                        placeholder='Search for a country...'
                        onInput={handleFilterCountries}
                        required={true}
                    />
                </div>
            </Form>
        </div>
        {<div className={'results-container'}>
            <div className={'btn-wrapper d-flex'}>
                <p>Results list</p>
                <button type='button'
                        onClick={() => {
                            document.querySelector('#search').value = '';
                        }} className={'close-button d-flex'}>
                    <IoIosCloseCircleOutline/>
                </button>
            </div>
            <ul className={'results-list'}
                id={'list'}>{results.length > 0 ? displayResults : 'No countries found'}
            </ul>
        </div>}
    </>)
}