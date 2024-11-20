import {IoIosArrowDropdown, IoIosCloseCircleOutline} from "react-icons/io";
import {useContext, useState} from "react";
import {HomepageContext} from "../views/Homepage.jsx";
import {useSearchParams} from "react-router-dom";

export default function FiltersContainer() {
    const [, setSearchParams] = useSearchParams();
    const regionFilter = useContext(HomepageContext);
    const [toggled, setToggled] = useState(null);

    function toggleFilter() {
        setToggled(!toggled);
    }

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key);
            } else {
                prevParams.set(key, value);
            }
            return prevParams;
        })
    }

    return (
        <div className={'filter-container'}>
            <button className={`${toggled ? 'dropdown-btn dropdown-btn-toggled' : 'dropdown-btn '}`}
                    type={'button'} onClick={toggleFilter}>Filter by
                Region {toggled ? <IoIosCloseCircleOutline/> : <IoIosArrowDropdown/>}</button>
            <div className={'tags-container'}>
                <button className={`filter-tag txt-caps ${!regionFilter ? 'checked' : ''}`}
                        onClick={() => handleFilterChange('region', null)}> all
                < /button>
                <button className={`filter-tag txt-caps ${regionFilter === 'africa' ? 'checked' : ''}`}
                        onClick={() => handleFilterChange('region', 'africa')}> africa
                < /button>
                <button className={`filter-tag txt-caps ${regionFilter === 'americas' ? 'checked' : ''}`}
                        onClick={() => handleFilterChange('region', 'americas')}> america
                < /button>
                <button className={`filter-tag txt-caps ${regionFilter === 'asia' ? 'checked' : ''}`}
                        onClick={() => handleFilterChange('region', 'asia')}> asia
                < /button>
                <button className={`filter-tag txt-caps ${regionFilter === 'europe' ? 'checked' : ''}`}
                        onClick={() => handleFilterChange('region', 'europe')}> europe
                < /button>
                <button className={`filter-tag txt-caps ${regionFilter === 'oceania' ? 'checked' : ''}`}
                        onClick={() => handleFilterChange('region', 'oceania')}> oceania
                < /button>
            </div>
        </div>
    )
}