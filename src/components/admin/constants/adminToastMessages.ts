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
    UPDATE_CATEGORY_SUCCESS: "CATEGORY was successfully updated",
    UPDATE_CATEGORY_ERROR: "Failed to update CATEGORY",
    DELETE_CATEGORY_SUCCESS: "CATEGORY was successfully deleted",
    DELETE_CATEGORY_ERROR: "Failed to delete CATEGORY",
    UPDATE_USER_SUCCESS: `USER ${field}  was successfully UPDATED`,
    UPDATE_USER_ERROR: `Failed  to delete USER ${field}`,
    DELETE_USER_SUCCESS: "USER was successfully UPDATED",
    DELETE_USER_ERROR: "Failed to delete USER",
    AUTH_ERROR_CREDENTIALS: "You do not have access",
    AUTH_SUCCESSFULLY: "Login success",
  };
};
