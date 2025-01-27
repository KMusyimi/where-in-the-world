import {IoIosArrowDropdown, IoIosCloseCircleOutline} from "react-icons/io";
import {memo, useState} from "react";
import {useSearchParams} from "react-router-dom";

function FiltersContainer() {
    const [filterParams, setFilterParams] = useSearchParams();
    const [toggled, setToggled] = useState(null);
    const regionParam = filterParams.get("region");

    const toggle = () => setToggled(!toggled);

    function handleFilterChange(key, value) {
        setFilterParams(prevParams => {
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
                    type={'button'} onClick={toggle}>Filter by
                Region {toggled ? <IoIosCloseCircleOutline/> : <IoIosArrowDropdown/>}</button>
            <div className={'tags-container'}>
                <button className={`filter-tag txt-caps ${!regionParam ? 'checked' : ''}`}
                        onClick={() => handleFilterChange('region', null)}> all
                < /button>
                <button className={`filter-tag txt-caps ${regionParam === 'africa' ? 'checked' : ''}`}
                        onClick={() => handleFilterChange('region', 'africa')}> africa
                < /button>
                <button className={`filter-tag txt-caps ${regionParam === 'americas' ? 'checked' : ''}`}
                        onClick={() => handleFilterChange('region', 'americas')}> america
                < /button>
                <button className={`filter-tag txt-caps ${regionParam === 'asia' ? 'checked' : ''}`}
                        onClick={() => handleFilterChange('region', 'asia')}> asia
                < /button>
                <button className={`filter-tag txt-caps ${regionParam === 'europe' ? 'checked' : ''}`}
                        onClick={() => handleFilterChange('region', 'europe')}> europe
                < /button>
                <button className={`filter-tag txt-caps ${regionParam === 'oceania' ? 'checked' : ''}`}
                        onClick={() => handleFilterChange('region', 'oceania')}> oceania
                < /button>
            </div>
        </div>
    )
}

export default memo(FiltersContainer);