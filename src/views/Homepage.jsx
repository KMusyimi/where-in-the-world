import {getCountries, searchData} from "../api";
import {Link, useLoaderData, useSearchParams} from "react-router-dom";
import {formatPopulation} from "../utils.js";
import SearchForm from "../components/SearchForm.jsx";
import FiltersContainer from "../components/FiltersContainer.jsx";
import {createContext, useEffect} from "react";
import {HiMiniArrowUpCircle} from "react-icons/hi2";

export const HomepageContext = createContext('');

export async function homepageLoader() {
    return await getCountries();
}

export default function Homepage() {
    const data = useLoaderData();
    const [searchParams] = useSearchParams();
    const regionFilter = searchParams.get("region");

    const sortedCountries = data.sort((a, b) => a.name.common > b.name.common ? 1 : -1);

    const countriesArr = regionFilter ? sortedCountries
        .filter(country => regionFilter === country.region.toLowerCase()) : sortedCountries;

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const btn = document.querySelector('#back-to-top');
            if (btn) {
                if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                    btn.style.display = '';
                    return;
                }
                btn.style.display = 'none';
            }
        });

    }, []);


    const countries = countriesArr.map((country, idx) => {
        const {capital, flags, population, region, name} = country;
        return (
            <Link key={`c-${idx}`}
                  id={`${name.common.replace(/\s+/g, '+').toLowerCase()}`}
                  to={`page/?country=${name.common.replace(/\s+/g, '+').toLowerCase()}`}
                  className={'country-card d-flex fx-direction--column'}>
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
                    <img className={'flag'} src={flags?.svg} alt={flags?.alt || `The flag of ${name.common}`}
                         loading={'lazy'}/>
                </figure>
            </Link>)
    });

    return (
        <>
            <div className='main-nav'>
                <div className={'search-container'}>{<SearchForm searchData={searchData}/>}</div>
                {<HomepageContext.Provider value={regionFilter}> <FiltersContainer/> </HomepageContext.Provider>}
            </div>
            <div className={'countries-container'}>{countries}</div>
            <button type={'button'} id={'back-to-top'} className={'btn-top'} style={{display: 'none'}}
                    onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                <HiMiniArrowUpCircle/></button>
        </>)
}