import {getCountries} from "../api";
import {useLoaderData, useSearchParams} from "react-router-dom";
import SearchForm from "../components/SearchForm.jsx";
import FiltersContainer from "../components/FiltersContainer.jsx";
import {createContext, useEffect} from "react";
import {HiMiniArrowUpCircle} from "react-icons/hi2";
import {CountryCards} from "../components/CountryCards.jsx";

export const HomepageContext = createContext('');

export async function homepageLoader() {
    return await getCountries();
}

export default function Homepage() {
    const data = useLoaderData();
    const [searchParams] = useSearchParams();
    const regionFilter = searchParams.get("region");

    const countriesArr = regionFilter ? data.filter(country => regionFilter === country.region.toLowerCase()) : data;

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
        if (data.length) {
            const scrollPosition = sessionStorage.getItem('scrollPosition');
            if (scrollPosition) {
                setTimeout(() => {
                    window.scrollTo({top: parseInt(scrollPosition, 10), behavior: 'instant'});
                    sessionStorage.removeItem('scrollPosition');
                }, 75);
            }
        }
    }, [data]);


    const handleClick = (e) => {
        const yPos = e.target.getBoundingClientRect().top - (e.target
            .getBoundingClientRect().top - window.scrollY);
        sessionStorage.setItem('scrollPosition', yPos)
    }

    return (<>
        <div className='main-nav'>
            <div className={'search-container'}>{<SearchForm/>}</div>
            {<HomepageContext.Provider value={regionFilter}> <FiltersContainer/> </HomepageContext.Provider>}
        </div>
        <CountryCards data={countriesArr} handleClick={handleClick}/>
        <button type={'button'} id={'back-to-top'} className={'btn-top'} style={{display: 'none'}}
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <HiMiniArrowUpCircle/></button>
    </>)
}