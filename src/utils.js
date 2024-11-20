export function formatPopulation(population) {
    return String(population).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}