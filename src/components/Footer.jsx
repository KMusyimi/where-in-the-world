import {decode} from "html-entities";
import moment from "moment";
import {Link} from "react-router-dom";
import {memo} from "react";

function Footer() {

    return (<footer>
        {decode('&copy;')} {moment().year()}
        <span> Done by: <Link to={'https://github.com/KMusyimi'} target={'_blank'}> Kennedy Nzyuko </Link></span>
        <span> Challenge by: <Link to={'https://www.frontendmentor.io/challenges'}> frontendmentor.io </Link></span>
    </footer>)
}

export default memo(Footer);