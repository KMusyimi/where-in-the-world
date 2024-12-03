import {Link} from "react-router-dom";
import "@theme-toggles/react/css/Around.css"
import {Around} from "@theme-toggles/react"
import {useEffect, useRef, useState} from "react";
import {defaultTheme, updateTheme} from "../theme.js";

export default function Header() {
    const [theme, setTheme] = useState(defaultTheme);
    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            currentTheme();
            firstRender.current = false;
        }
    }, [firstRender.current]);

    function currentTheme() {
        const themeBtn = document.querySelector('.theme-toggle');
        themeBtn.className = theme === 'dark' ? 'theme-toggle' : 'theme-toggle theme-toggle--toggled';
        const themeText = theme === 'dark' ? '<span class="mode">light mode</span>' : '<span class="mode">dark mode</span>';
        themeBtn.insertAdjacentHTML('beforeend', themeText);
    }


    function handleClick() {
        const themeBtn = document.querySelector('.theme-toggle');
        const mode = document.querySelector('.mode');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        themeBtn.className = newTheme === 'dark' ? 'theme-toggle' : 'theme-toggle theme-toggle--toggled';
        mode.textContent = newTheme === 'dark' ? 'light mode' : 'dark mode';

        localStorage.setItem("theme", newTheme);
        updateTheme(newTheme);
        setTheme(newTheme);
    }

    return (<header className={'header d-flex'}>
        <Link className={'fw-800'} to='/'>Where in the world?</Link>
        <Around duration={750} onClick={handleClick}/>
    </header>)
}