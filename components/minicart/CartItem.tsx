import Image from "deco-sites/std/components/Image.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import QuantitySelector from "deco-sites/fashion/components/ui/QuantitySelector.tsx";
import { useCart } from "deco-sites/std/commerce/vtex/hooks/useCart.ts";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import { AnalyticsEvent } from "deco-sites/std/commerce/types.ts";

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: AnalyticsEvent) => void;
    };
  }
}

interface Props {
  index: number;
}

function CartItem({ index }: Props) {
  const { loading, cart, updateItems, mapItemsToAnalyticsItems } = useCart();
  const item = cart.value!.items[index];
  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const {
    imageUrl,
    skuName,
    sellingPrice,
    listPrice,
    name,
    quantity,
  } = item;

  const isGift = sellingPrice < 0.01;

  return (
    <div class="relative flex flex-row justify-between items-start gap-7">
      <Image
        src={imageUrl}
        alt={skuName}
        width={80}
        height={80}
        class="object-cover object-center"
      />
      <div class="flex-grow">
        <span class="block h-8 mb-2 text-xs font-bold">
          {name}
        </span>
        <div class="flex justify-between">
          <div class="max-w-min">
            <QuantitySelector
              disabled={loading.value || isGift}
              quantity={quantity}
              onChange={(quantity) => {
                updateItems({ orderItems: [{ index, quantity }] });
                const quantityDiff = quantity - item.quantity;

                if (!cart.value) return;

                window.DECO_SITES_STD.sendAnalyticsEvent({
                  name: quantityDiff < 0 ? "remove_from_cart" : "add_to_cart",
                  params: {
                    items: mapItemsToAnalyticsItems({
                      items: [{
                        ...item,
                        quantity: Math.abs(quantityDiff),
                      }],
                      marketingData: cart.value.marketingData,
                    }),
                  },
                });
              }}
            />
          </div>
          <div class="flex flex-col items-end">
            <span class="text-base-300 line-through text-xs">
              {formatPrice(listPrice / 100, currencyCode!, locale)}
            </span>
            <span class="text-primary text-[17px] font-bold">
              {isGift
                ? "Grátis"
                : formatPrice(sellingPrice / 100, currencyCode!, locale)}
            </span>
          </div>
        </div>
      </div>
      <Button
        class="absolute !bg-base-300 !rounded-full !h-4 !w-4 !px-0 opacity-50 top-0 right-0"
        onClick={() => {
          updateItems({ orderItems: [{ index, quantity: 0 }] });
          if (!cart.value) return;
          window.DECO_SITES_STD.sendAnalyticsEvent({
            name: "remove_from_cart",
            params: {
              items: mapItemsToAnalyticsItems({
                items: [item],
                marketingData: cart.value.marketingData,
              }),
            },
          });
        }}
        disabled={loading.value || isGift}
        loading={loading.value}
      >
        <Icon
          id="XMark"
          class="text-white"
          height={14}
          width={14}
          strokeWidth={1}
        />
      </Button>
    </div>
  );
}

export default CartItem;
