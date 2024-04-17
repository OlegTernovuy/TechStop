const formatPrice = (price: number | undefined) => {
  if (price) {
    return price.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  } else return;
};

export default formatPrice;
