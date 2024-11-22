import {getPageData} from "../api.js";
import {Link, useLoaderData, useNavigation} from "react-router-dom";
import {formatPopulation} from "../utils.js";
import BackButton from "../components/BackButton.jsx";
import {Spinner} from "../components/Spinner.jsx";

export async function detailsLoader({params, request}) {
    const req = new URL(request.url).searchParams.get('search_query');
    return await getPageData(req ? req : params.id);
}

export default function Details() {
    const country = useLoaderData();
    const navigation = useNavigation();

    if (navigation.state === 'loading') {
        return (<Spinner/>)
    }

    if (navigation.state === 'idle') {

    }


    const {
        name, population, region, capital, flags, subregion, tld, languages, currencies, borders
    } = country;
    const isEmpty = (obj) => Object.keys(obj).length === 0;

    const nativeName = !isEmpty(name.nativeName) ? Object.values(name.nativeName)[0]?.common : 'no native name';
    const currency = !isEmpty(currencies) ? Object.values(currencies)[0].name : "no currency";

    const langs = !isEmpty(languages) ? Object.values(languages).join(', ') : 'no languages';

    const links = borders.length > 0 && borders.map((country, idx) => <Link className={'country-link'}
                                                                            key={`link-${idx}`}
                                                                            to={`/page/${country
                                                                                .replace(/\s+/g, '+')
                                                                                .toLowerCase()}`}>{country}</Link>);


    return (
        <div className={'details-container'}>
            {<BackButton/>}
            <section className='page'>
                <section>
                    <h1 className={'fw-800'}>{name.common}</h1>
                    <div className={'details-wrapper'}>
                        <div>
                            <p><span className='fw-600 txt-caps'>native name:</span>{nativeName}</p>
                            <p><span
                                className='fw-600 txt-caps'>population:</span>{formatPopulation(population)}</p>
                            <p><span className='fw-600 txt-caps'>region:</span>{region || 'no region'}</p>
                            <p><span className='fw-600 txt-caps'>sub region:</span>{subregion || 'no subregion'}</p>
                            <p><span
                                className='fw-600 txt-caps'>capital:</span>{capital?.join(', ') || 'no capital'}</p>
                        </div>
                        <div>
                            <p className={'tld'}><span className='fw-600 txt-caps'>top level domain:</span>{tld}</p>
                            <p><span className='currencies fw-600 txt-caps'>currencies:</span>{currency}</p>
                            <p><span className='languages fw-600 txt-caps'>languages:</span>{langs}</p>
                        </div>
                    </div>
                    {borders.length > 0 ? <section className='borders'>
                        <h2 className={'fw-600 txt-caps'}>border countries:</h2>
                        <div>{links}</div>
                    </section> : <h2 className={'borders-none fw-600'}><span
                        className={'country-name fw-800'} style={{color: '#0D9276'}}>{`${name.common}`}</span> has no
                        border countries</h2>}
                </section>
                <figure className={'flag-wrapper'}>
                    <img className={'flag'} src={`${flags.svg}`}
                         alt={flags?.alt || `The flag for ${name.common}`}
                         onLoad={() => window.scrollTo({top: 0, behavior: "smooth"})}/>
                </figure>
            </section>
        </div>)
}