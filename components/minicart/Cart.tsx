import { useCart } from "deco-sites/std/commerce/vtex/hooks/useCart.ts";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import { AnalyticsEvent } from "deco-sites/std/commerce/types.ts";
import Icon from "deco-sites/wepink/components/ui/Icon.tsx";

import { useUI } from "deco-sites/fashion/sdk/useUI.ts";
import CartItem from "./CartItem.tsx";
import Coupon from "./Coupon.tsx";

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: AnalyticsEvent) => void;
    };
  }
}

const CHECKOUT_URL =
  "https://bravtexfashionstore.vtexcommercestable.com.br/checkout";

function Cart() {
  const { displayCart } = useUI();
  const { cart, loading, mapItemsToAnalyticsItems } = useCart();
  const isCartEmpty = cart.value?.items.length === 0;
  const total = cart.value?.totalizers.find((item) => item.id === "Items");
  const discounts = cart.value?.totalizers.find((item) =>
    item.id === "Discounts"
  );
  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;

  if (cart.value === null) {
    return null;
  }

  return (
    <>
      {/* Cart Header */}
      <header class="border-b flex items-center py-3 mx-3 md:mx-6">
        <Icon
          class="mr-2.5"
          id="ShoppingCart"
          height="20"
          width="20"
          strokeWidth={.1}
        />
        <h3 class="text-xl font-bold">
          seu carrinho
        </h3>

        <Button
          class="ml-auto"
          variant="ghost"
          onClick={() => displayCart.value = false}
        >
          <Icon
            class="text-black"
            id="XMark"
            height="30"
            width="30"
            strokeWidth={1}
          />
        </Button>
      </header>

      {isCartEmpty
        ? (
          <div class="flex flex-col justify-center items-center h-full gap-5">
            <Icon
              class="text-primary"
              id="EmptyCart"
              height="64"
              width="64"
            />
            <span class="text-lg">Seu carrinho está vazio</span>
          </div>
        )
        : (
          <>
            <ul
              role="list"
              class="mt-4 px-3 md:px-6 flex-grow overflow-y-auto flex flex-col gap-8"
            >
              {cart.value.items.map((_, index) => (
                <li>
                  <CartItem index={index} key={index} />
                </li>
              ))}
            </ul>

            {/* Cart Footer */}
            <footer class="flex flex-col shadow-2xl pt-4 gap-1">
              {/* Subtotal */}
              <div class="flex flex-col gap-4">
                {discounts?.value && (
                  <div class="flex justify-between items-center px-3 md:px-6">
                    <span class="text-xs font-bold">descontos</span>
                    <span class="font-bold text-primary">
                      {formatPrice(
                        discounts.value / 100,
                        currencyCode!,
                        locale,
                      )}
                    </span>
                  </div>
                )}
              </div>
              {/* Total */}
              {total?.value && (
                <div class="flex flex-col justify-end items-end gap-2 px-3 md:px-6">
                  <div class="flex justify-between items-center w-full">
                    <span class="text-xs font-bold">total</span>
                    <span class="font-bold text-primary">
                      {formatPrice(total.value / 100, currencyCode!, locale)}
                    </span>
                  </div>
                </div>
              )}
              <div class="flex py-4 px-3 md:px-6 mt-2">
                <Button
                  variant="ghost"
                  class="flex-1 !px-0 !h-10 !text-xs underline !text-black text-left !justify-start"
                  onClick={() => {
                    displayCart.value = false;
                  }}
                >
                  continuar <br /> comprando
                </Button>
                <a
                  class="flex-1 inline-block w-full"
                  target="_blank"
                  href={`${CHECKOUT_URL}?orderFormId=${
                    cart.value!.orderFormId
                  }`}
                >
                  <Button
                    data-deco="buy-button"
                    class="w-full !h-10"
                    disabled={loading.value || cart.value.items.length === 0}
                    onClick={() => {
                      window.DECO_SITES_STD.sendAnalyticsEvent({
                        name: "begin_checkout",
                        params: {
                          currency: cart.value ? currencyCode! : "",
                          value: total?.value
                            ? (total?.value - (discounts?.value ?? 0)) / 100
                            : 0,
                          coupon: cart.value?.marketingData?.coupon ??
                            undefined,

                          items: cart.value
                            ? mapItemsToAnalyticsItems(cart.value)
                            : [],
                        },
                      });
                    }}
                  >
                    Finalizar Compra
                  </Button>
                </a>
              </div>
            </footer>
          </>
        )}
    </>
  );
}

export default Cart;
