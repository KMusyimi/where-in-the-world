import {Form, Link} from "react-router-dom";
import {IoIosCloseCircleOutline} from "react-icons/io";

import {IoSearch} from "react-icons/io5";
import {useState} from "react";
import {searchData} from "../api.js";

export default function SearchForm() {
    const [results, setResults] = useState([]);
    const [displayContainer, setDisplayContainer] = useState(false);

    function handleFilterCountries(e) {
        e.preventDefault();
        const {value} = e.target;
        e.target.focus();
        setDisplayContainer(true);

        if (!value) {
            setResults([]);
            setDisplayContainer(false);
            return;
        }
        const countryRegx = new RegExp('^' + value, 'i');

        const filteredArr = searchData.filter(data => {
            if (countryRegx.test(data.name)) {
                return data;
            }
        });
        setResults(filteredArr);
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
        {displayContainer && <div className={'results-container'}>
            <div className={'btn-wrapper d-flex'}>
                <p>Results list</p>
                <button type='button'
                        onClick={() => {
                            document.querySelector('#search').value = '';
                            setDisplayContainer(false);
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