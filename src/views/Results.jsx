import {getResults, searchDataJSON} from "../api.js";
import {useLoaderData} from "react-router-dom";
import BackButton from "../components/BackButton.jsx";
import CountryCards from "../components/CountryCards.jsx";

export async function resultsLoader({request}) {
    const {url} = request;
    const searchData = JSON.parse(searchDataJSON);
    const query = new URL(url).searchParams.get('search_query');
    const rgx = new RegExp(`.*${query}`, 'i');
    const results = searchData.filter(data => {
        if (rgx.test(data.name)) {
            return data;
        }
    });
    if (results.length === 0) {
        throw {message: `Could not find any results for ${query}`};
    }

    return {countries: getResults(results)};
}

export default function Results() {
    const countriesArr = useLoaderData();

    return (
        <>
            <BackButton/>
            <CountryCards data={countriesArr}/>
        </>
    )
}