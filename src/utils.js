export function formatPopulation(population) {
    return String(population).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function prioritizeResults(template, value) {
    const rgx = new RegExp(`^${value}`, "i");
    const filteredArr = template.filter((item) => {
        if (rgx.test(item.name)) {
            return item;
        }
    });

    return Array.from(new Set([...filteredArr, ...template]));
}

export function debounce(func, delay) {
    let debounceTimer;
    return (...args) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(()=> {
            func(...args)
        }, delay);
    }
}