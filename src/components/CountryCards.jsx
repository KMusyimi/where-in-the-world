import {Await, Link, useSearchParams} from "react-router-dom";
import {formatPopulation} from "../utils.js";
import {memo, Suspense} from "react";
import {Spinner} from "./Spinner.jsx";

// eslint-disable-next-line react/prop-types
function CountryCards({data}) {
    const [searchParams] = useSearchParams();
    const filter = searchParams.get("region");

    const handleClick = (e) => {
        const yPos = Math.floor(window.scrollY) - 100;
        sessionStorage.setItem('scrollPosition', yPos)
    }

    function renderCountries(arr) {
        return arr.map((country, idx) => {
            const {capital, flags, population, region, name} = country;
            return (<Link key={`c-${idx}`}
                          id={`${name.common.replace(/\s+/g, '+').toLowerCase()}`}
                          to={`/page/?country=${name.common.replace(/\s+/g, '+').toLowerCase()}`}
                          className={'country-card d-flex fx-direction--column'}
                          onClick={handleClick}
            >
                <section className={'country-info'}>
                    <h1 className={'fw-800'}>{name.common}</h1>
                    <p><span className={'fw-600 txt-caps'}>population:</span>
                        {formatPopulation(population)}</p>
                    <p><span className={'fw-600 txt-caps'}>region:</span>
                        {region}</p>
                    <p><span className={'fw-600 txt-caps'}>capital:</span>
                        {capital?.join(', ') || 'has no capital'}</p>
                </section>
                <figure className={'flag-wrapper'}>
                    <img className={'flag'} src={flags?.png} alt={flags?.alt || `The flag of ${name.common}`}
                         loading={'lazy'}/>
                </figure>
            </Link>)
        })
    }

    return (<div className={'countries-container'}>
        {<Suspense fallback={<Spinner/>}>
            {/* eslint-disable-next-line react/prop-types */}
            <Await resolve={data?.countries}>
                {(loadedCountries) => {
                    const loadedCopy = [...loadedCountries].sort((a, b) => a.name.common.localeCompare(b.name.common));
                    const countriesArr = filter ? loadedCopy.filter(country => filter === country.region.toLowerCase()) : loadedCopy;
                    return renderCountries(countriesArr);
                }}
            </Await>
        </Suspense>}</div>)
}

export default memo(CountryCards);