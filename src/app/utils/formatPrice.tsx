const formatPrice = (price: number | undefined) => {
  if (price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  } else return;
};

export default formatPrice;
