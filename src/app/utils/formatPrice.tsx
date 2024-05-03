const formatPrice = (price: number | undefined) => {
  if (price !== undefined && price > 0) {
    return price
      .toFixed(0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  } else if (price !== undefined && price === 0) {
    return price.toFixed(0).toString();
  } else return;
};

export default formatPrice;
