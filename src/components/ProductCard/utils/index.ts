import toast from "react-hot-toast";

export const handleChangeValue = async (
  newValue: number | null,
  _id: string,
  handler: (_id: string, newValue: number) => Promise<void>
): Promise<void> => {
  if (!newValue) {
    toast.error("Something went wrong");
    return;
  }
  await handler(_id, Number(newValue));

  toast.success("Дякуємо за оцінку 🤝");
};
