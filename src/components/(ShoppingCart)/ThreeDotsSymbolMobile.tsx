import { Menu, Transition } from "@headlessui/react";
import { Button } from "@mui/material";
import Image from "next/image";
import { Fragment } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useShoppingCartModalStore } from "@/store/modalStore";

type IdProps = {
  onRemoveItem?: () => void;
  isOrderPage?: boolean;
};

const ThreeDotsSymbolMobile = ({ onRemoveItem, isOrderPage }: IdProps) => {
  const RemoveItemFromCart = () => {
    if (onRemoveItem) onRemoveItem();
  };
  // const { setShowShoppingCart } = useShoppingCartModalStore();
  const setShowShoppingCart = useShoppingCartModalStore(
    (state) => state.setShowShoppingCart
  );

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button>
            <Image
              src="/MoreVertFilled.svg"
              alt="MoreVertFilled"
              width={24}
              height={24}
              className="min-w-6"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute top-0 right-0 w-48 origin-top-right divide-y-2 divide-gray-500 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1">
              {isOrderPage ? (
                <Menu.Item>
                  {({ active }) => (
                    <Button
                      variant="text"
                      size="medium"
                      startIcon={<DeleteIcon />}
                      sx={{ color: "#CC7E00" }}
                      onClick={setShowShoppingCart}
                    >
                      Редагувати
                    </Button>
                  )}
                </Menu.Item>
              ) : (
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <Button
                        variant="text"
                        size="medium"
                        startIcon={<DeleteIcon />}
                        sx={{ color: "#CC7E00" }}
                        onClick={RemoveItemFromCart}
                      >
                        Видалити
                      </Button>
                    )}
                  </Menu.Item>
                </>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ThreeDotsSymbolMobile;
