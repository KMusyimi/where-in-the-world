import SearchForm from "./SearchForm.jsx";
import FiltersContainer from "./FiltersContainer.jsx";
import {HomepageContext} from "../views/Homepage.jsx";
import {memo} from "react";

// eslint-disable-next-line react/prop-types
function MainNav({regionFilter}) {
    return (<div className='main-nav'>
        <div className={'search-container'}>{<SearchForm/>}</div>
        {<HomepageContext.Provider value={regionFilter}> <FiltersContainer/> </HomepageContext.Provider>}
    </div>)
}

export default memo(MainNav);