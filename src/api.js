export async function getCountries() {
    const url = 'https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags'
    const resp = await fetch(url);
    if (!resp.ok) {
        throw {
            status: resp.status, statusText: resp.statusText, message: 'Could not get Countries'
        }
    }
    return await resp.json();
}

export async function getPageData(param) {
    if (!param) {
        return [];
    }
    const fields = ['name', 'population', 'region', 'capital', 'flags',
        'subregion', 'tld', 'languages', 'currencies', 'borders'];

    const url = `https://restcountries.com/v3.1/name/${param.replace(/\+/g, " ")}?fullText=true&&fields=${fields.join(',')}`;

    const resp = await fetch(url);
    if (!resp.ok) {
        throw {
            status: resp.status, statusText: resp.statusText, message: `Could not get ${param}`
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