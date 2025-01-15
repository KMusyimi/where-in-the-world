import {getCountries} from "../api";
import {useLoaderData, useSearchParams} from "react-router-dom";
import SearchForm from "../components/SearchForm.jsx";
import FiltersContainer from "../components/FiltersContainer.jsx";
import {createContext, useEffect} from "react";
import {HiMiniArrowUpCircle} from "react-icons/hi2";
import {CountryCards} from "../components/CountryCards.jsx";

export const HomepageContext = createContext('');

export async function homepageLoader() {
    const countries = getCountries();
    return {countries};
}

export default function Homepage() {
    const data = useLoaderData();

    const [searchParams] = useSearchParams();
    const regionFilter = searchParams.get("region");
    useEffect(() => {
        const scrollPosition = sessionStorage.getItem('scrollPosition');
        let scrollTimer = null;

        window.addEventListener('scroll', handleScrollToTop);
        if (scrollPosition) {
            scrollTimer = setTimeout(() => {
                window.scrollBy({top: parseInt(scrollPosition, 10), left: 0, behavior: 'smooth'});
                sessionStorage.removeItem('scrollPosition');
            }, 300);
        }
        return () => {
            window.removeEventListener('scroll', handleScrollToTop);
            clearTimeout(scrollTimer)
        }
    }, []);

    function handleScrollToTop() {
        const btn = document.querySelector('#back-to-top');
        if (btn) {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                btn.style.display = '';
                return;
            }
            btn.style.display = 'none';
        }
    }

    return (<>
        <div className='main-nav'>
            <div className={'search-container'}>{<SearchForm/>}</div>
            {<HomepageContext.Provider value={regionFilter}> <FiltersContainer/> </HomepageContext.Provider>}
        </div>
        <CountryCards data={data} filter={regionFilter}/>
        <button type={'button'} id={'back-to-top'} className={'btn-top'} style={{display: 'none'}}
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <HiMiniArrowUpCircle/></button>
    </>)
}