export function formatPopulation(population) {
    return String(population).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function PrioritizeResults(template, value) {
    const rgx = new RegExp(`^${value}`, "i");
    const filteredArr = template.filter((item) => {
        if (rgx.test(item.name)) {
            return item;
        }
    });
    return Array.from(new Set([...filteredArr, ...template]));
}