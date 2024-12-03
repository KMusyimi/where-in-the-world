import {Link} from "react-router-dom";
import {formatPopulation} from "../utils.js";

// eslint-disable-next-line react/prop-types
export function CountryCards({data, handleClick}) {
    // eslint-disable-next-line react/prop-types
    const sortedCountries = data.sort((a, b) => a.name.common > b.name.common ? 1 : -1);

    const countries = (arr) => arr.map((country, idx) => {
        const {capital, flags, population, region, name} = country;
        return (
            <Link key={`c-${idx}`}
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
    return (
        <div className={'countries-container'}>{countries(sortedCountries)}</div>
    )
}