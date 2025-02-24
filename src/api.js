export let searchDataJSON = '';

export async function getResults(results) {
    return Promise.all(results.map(async endpoint => {
        const url = `https://restcountries.com/v3.1/name/${endpoint.name.toLowerCase()}?fullText=true
        &&fields=name,population,region,capital,flags`
        const resp = await fetch(url);
        if (!resp.ok) {
            throw {
                status: resp.status, statusText: resp.statusText, message: 'Could not get Countries'
            }
        }
        const results = await resp.json();
        const searchResults = (data) => (data)
        return searchResults(...results);
    }));

}

export async function getCountries() {

    const url = 'https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags';
    const resp = await fetch(url);
    if (!resp.ok) {
        throw {
            status: resp.status, statusText: resp.statusText, message: 'Could not get Countries'
        }
    }

    const countries = await resp.json();
    if (!searchDataJSON) {
        searchDataJSON = JSON.stringify(countries.map(country => {
            return {
                name: country.name.common,
                flags: country.flags.png,
                capital: country.capital.join(', '),
                alt: country.flags.alt
            }
        }))
    }
    return countries;
}

export async function getPageData(param) {
    if (!param) {
        return [];
    }

    const fields = ['name', 'population', 'region', 'capital', 'flags',
        'subregion', 'tld', 'languages', 'currencies', 'borders'];

    const url = `https://restcountries.com/v3.1/name/${param.trim().replace(/\+/g, " ")}?fullText=true&&fields=${fields.join(',')}`;

    const resp = await fetch(url);
    if (!resp.ok) {
        throw {
            status: resp.status,
            statusText: resp.statusText,
            message: `Could not get country by the name `,
            param: param
        }
    }
    const countryData = await resp.json();
    const getBorderCountries = async (country) => {
        const countryCopy = country;
        const url = `https://restcountries.com/v3.1/alpha?codes=${countryCopy.borders.join(',').toLowerCase()}&&fields=name`;
        const resp = await fetch(url);
        if (!resp.ok) {
            throw {
                status: resp.status, statusText: resp.statusText, message: 'Could not get border countries'
            }
        }
        const data = await resp.json();
        countryCopy.borders = getCountryName(data);
        return {...countryCopy}
    }
    if (countryData[0].borders.length > 0) {
        return await getBorderCountries(...countryData);
    }
    return countryData[0];
}

function getCountryName(arr) {
    return arr.map(country => country.name?.common);
}