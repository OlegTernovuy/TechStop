export const pageCount = (totalProducts: number | undefined) => {
    if (totalProducts === undefined || totalProducts === null) {
        return 1;
    }
    return Math.ceil(totalProducts / 10);
};
