function currentThemeStr({localStorageTheme, systemTheme}) {
    if (localStorageTheme) {
        return localStorageTheme;
    }
    return systemTheme.matches ? 'dark' : 'light';
}

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const localStorageTheme = localStorage.getItem("theme");

export const defaultTheme = currentThemeStr({localStorageTheme, systemTheme});

export function updateHtmlTheme(theme) {
    document.querySelector("html").setAttribute("data-theme", theme);
}
