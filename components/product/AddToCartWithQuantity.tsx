import { useSignal } from "@preact/signals";

import Button from "deco-sites/fashion/components/ui/Button.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "deco-sites/fashion/sdk/useAddToCart.ts";

type Props = UseAddToCartProps;

function AddToCartWithQuantity({ ...addToCartProps }: Props) {
  const quantity = useSignal(1);
  const addToCartButtonProps = useAddToCart({
    ...addToCartProps,
    quantity: quantity.value,
  });

  const handleQuantityChange = (newQuantity: number) => {
    quantity.value = Math.max(1, newQuantity);
  };

  return (
    <div class="flex flex-row border-2 border-primary rounded-xl">
      <div class="flex-1 flex justify-center items-center">
        <Button
          class="!h-8 !w-8 text-white bg-primary !rounded-full text-sm font-normal"
          onClick={() => handleQuantityChange(quantity.value - 1)}
        >
          -
        </Button>
        <span class="text-primary text-2xl w-10 grid place-items-center">
          {quantity.value}
        </span>
        <Button
          class="!h-8 !w-8 text-white bg-primary !rounded-full text-sm font-normal"
          onClick={() => handleQuantityChange(quantity.value + 1)}
        >
          +
        </Button>
      </div>
      <Button
        class="flex-1 w-full h-[52px] text-xl"
        {...addToCartButtonProps}
      >
        Comprar
      </Button>
    </div>
  );
}

export default AddToCartWithQuantity;
