import {Form} from "react-router-dom";
import {IoSearch} from "react-icons/io5";


export default function SearchForm() {
    function handleFilterCountries(e) {
        e.preventDefault();
        const {value} = e.target;
        const countryCards = document.querySelectorAll(".country-card");

        for (let i = 0; i < countryCards.length; i++) {
            const countryId = countryCards[i].id.replace(/\+/g, " ");
            if (countryId.indexOf(value.trim().toLowerCase()) > -1) {
                countryCards[i].style.display = "";

            } else {
                countryCards[i].style.display = "none";
            }
        }
    }

    return (
        <Form method={'get'} action={'results'}>
            <div className={'input-container d-flex'}>
                <IoSearch/>
                <input
                    id={'search'}
                    type='search'
                    name={'search_query'}
                    className='search-input'
                    autoComplete={'on'}
                    placeholder='Search for a country...'
                    onInput={handleFilterCountries}
                    required={true}
                />
            </div>
        </Form>
    )
}