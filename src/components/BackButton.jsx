import {useNavigate} from "react-router-dom";
import {IoArrowBackOutline} from "react-icons/io5";

export default function BackButton() {
    const navigate = useNavigate();

    return (
        <>
            <button onClick={() => navigate(-1)} className={'back-btn'}><IoArrowBackOutline/> Back</button>
        </>
    )
}