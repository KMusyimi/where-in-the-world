import {decode} from "html-entities";
import {useNavigate} from "react-router-dom";

export default function BackButton() {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate(-1)} className={'back-btn'}>
            <span className='left-arr'>{decode('&larr;')}</span>
            <span>Back</span>
        </button>
    )
}