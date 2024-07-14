export const TOAST_MESSAGES = (productTitle?: string) => {
  return {
    DELETE_SUCCESS: "Successfully deleted",
    ADD_SUCCESS: `Product ${productTitle} was added to basket`,
    ADD_SUCCESS_TO_FAVORITES: `Товар ${productTitle} додано до улюблених ➕`,
    DELETE_SUCCESS_FROM_FAVORITES: `Товар ${productTitle} видалено з улюблених 🚮`,
    REVIEW_SUCCESS: `Дякуємо за відгук 🙌`,
    REVIEW_ERROR: `Помилка створення відгуку`,
    DELETE_REVIEW_ERROR: `Помилка видалення`,
    DELETE_REVIEW_SUCCESS: `Відгук успішно видалено`,
    ADD_REVIEW_ERROR: "Ви вже залишили відгук на даному товарі",
    AUTH_ERROR: "Ви не авторизовані",
    SIGN_OUT_SUCCESS: "Logout successfully ",
    SIGN_IN_SUCCESSFULLY: "Sign in successfully",
    SIGN_IN_ERROR: "Email or password is incorrect",
    SIGN_UP_SUCCESSFULLY: "Signup successfully",
    SIGN_UP_ERROR: "Email in use",
    BOOK_TRIAL_SUCCESS: "Thanks for you choice",
  };
};
