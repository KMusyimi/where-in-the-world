import {useRouteError} from "react-router-dom";
import BackButton from "./BackButton.jsx";
import { TbWorldExclamation } from "react-icons/tb";

export default function Error() {
    const err = useRouteError();
    return (
        <div className={'err-container'}>
            {<BackButton/>}
            <div>
                <figure><TbWorldExclamation/></figure>
                <h1 className='err-msg' aria-live='assertive'>{err.message}</h1>
                {err.statusText && <pre>{err.status} - {err.statusText}</pre>}
            </div>
        </div>
)
}