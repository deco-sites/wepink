import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "deco-sites/fashion/sdk/useAddToCart.ts";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
  variant?: "shelf" | "product";
}

function AddToCartButton(
  {
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
    variant = "product",
  }: Props,
) {
  const props = useAddToCart({
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
  });

  return (
    <Button
      class="h-[42px]"
      data-deco="add-to-cart"
      variant="outline"
      {...props}
    >
      {variant === "shelf"
        ? (
          <>
            +
            <Icon id="ShoppingCart" class="mr-1.5" height={14} width={14} />
          </>
        )
        : "Comprar"}
    </Button>
  );
}

export default AddToCartButton;
