import {Link} from "react-router-dom";
import "@theme-toggles/react/css/Around.css"
import {Around} from "@theme-toggles/react"
import {useEffect, useState} from "react";
import {defaultTheme, updateHtmlTheme} from "../theme.js";

export default function Header() {
    const [theme, setTheme] = useState(defaultTheme);

    useEffect(() => {
        localStorage.setItem("theme", theme);
        updateHtmlTheme(theme);
    }, [theme]);

    function handleClick() {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    }

    return (
        <header className={'header d-flex'}>
            <Link className={'fw-800'} to='/'>Where in the world?</Link>
            <Around duration={550} className={theme === 'dark' ? 'theme-toggle' : 'theme-toggle theme-toggle--toggled'}
                    onClick={handleClick}>{theme === 'dark' ? 'light mode' : 'dark mode'}</Around>
        </header>)
}