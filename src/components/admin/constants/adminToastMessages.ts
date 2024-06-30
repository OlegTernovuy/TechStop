export const adminToastMessages = (field?: string) => {
  return {
    CREATE_PRODUCT_SUCCESS: "Product was successfully created",
    CREATE_PRODUCT_ERROR: "Failed to create product",
    DELETE_PRODUCT_SUCCESS: `Products with ID ${field} was deleted`,
    DELETE_PRODUCT_ERROR: `Failed to delete product with ID ${field}`,
    CREATE_ORDER_SUCCESS: "Order was successfully created",
    CREATE_ORDER_ERROR: "Failed to create order",
    UPDATE_ORDER_SUCCESS: "Order was successfully updated",
    UPDATE_ORDER_ERROR: "Failed to update order",
    DELETE_ORDER_SUCCESS: "Order was successfully deleted",
    DELETE_ORDER_ERROR: "Failed to delete order",
  };
};
