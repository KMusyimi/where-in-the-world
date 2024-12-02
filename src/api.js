const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export let searchDataJSON = [];


export async function getCountries() {
    const url = 'https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags';
    const resp = await fetch(url);
    if (!resp.ok) {
        throw {
            status: resp.status, statusText: resp.statusText, message: 'Could not get Countries'
        }
    }

    const countries = await resp.json();

    if (searchDataJSON.length === 0) {
        searchDataJSON = JSON.stringify(countries.map(country => {
            return {
                name: country.name.common.trim(),
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
        if (country.borders.length > 0) {
            const url = `https://restcountries.com/v3.1/alpha?codes=${country.borders.join(',').toLowerCase()}&&fields=name`;
            const resp = await fetch(url);
            if (!resp.ok) {
                throw {
                    status: resp.status, statusText: resp.statusText, message: 'Could not get border countries'
                }
            }
            const data = await resp.json();
            country.borders = getCountryName(data);
        }
    }
    await getBorderCountries(...countryData);
    // allow ui to scroll up
    await sleep(300);
    return countryData[0];
}

function getCountryName(arr) {
    return arr.map(country => country.name?.common);
}