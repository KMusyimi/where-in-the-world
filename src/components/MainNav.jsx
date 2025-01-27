import SearchForm from "./SearchForm.jsx";
import FiltersContainer from "./FiltersContainer.jsx";
import {memo} from "react";

function MainNav() {
    return (
        <div className='main-nav'>
            <div className={'search-container'}>{<SearchForm/>}</div>
            <FiltersContainer/>
        </div>)
}

export default memo(MainNav);