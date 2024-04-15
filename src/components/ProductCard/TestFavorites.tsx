import { useCartStore } from "@/store/useCartStore";

const TestFavorites = () => {
  const { cartItems } = useCartStore();

  return (
    <div>
      {cartItems.map(({ title }) => (
        <>
          <h1 className="text-TechStopBlue">Favorites</h1>
          <li key={Date.now().toString()}>{title}</li>
        </>
      ))}
    </div>
  );
};

export default TestFavorites;
