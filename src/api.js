const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export let searchData = [];

export async function getCountries() {
    const url = 'https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags'
    const resp = await fetch(url);
    if (!resp.ok) {
        throw {
            status: resp.status, statusText: resp.statusText, message: 'Could not get Countries'
        }
    }
    const countries = await resp.json();

    if (searchData.length === 0) {
        searchData = countries.map(country => {
            return {
                name: country.name.common.toLowerCase().trim(),
                flags: country.flags.png,
                capital: country.capital.join(', '),
                population: country.population,
                alt: country.flags.alt
            }
        }).sort((a, b) => b.population - a.population);
    }

    return countries;
}

export async function getPageData(param) {
    if (!param) {
        return [];
    }
    await sleep(500);
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

    const data = async (country) => {
        if (country.borders.length > 0) {
            const url = `https://restcountries.com/v3.1/alpha?codes=${country.borders.join(',')}`;
            const resp = await fetch(url);
            if (!resp.ok) {
                throw {
                    status: resp.status, statusText: resp.statusText, message: 'Could not get border countries'
                }
            }
            const data = await resp.json();
            countryData[0].borders = getName(data);
        }
    }
    await data(...countryData);
    return countryData[0];
}

function getName(arr) {
    return arr.map(country => country?.name.common);
}