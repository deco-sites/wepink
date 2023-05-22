import { useCallback, useEffect, useState } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { useUI } from "deco-sites/fashion/sdk/useUI.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import { useCart } from "deco-sites/std/commerce/vtex/hooks/useCart.ts";
import type { SimulationOrderForm } from "deco-sites/std/commerce/vtex/types.ts";

interface Props {
  currentProduct: Product;
  buyTogether: Product[];
}

const parseProductsToCartItems = (products: Product[]) => {
  return products.map((product) => {
    return {
      id: product.sku,
      quantity: 1,
      seller: product?.offers?.offers?.[0].seller ?? "1",
    };
  });
};

const getBestInstallmentOption = (cartSimulation: SimulationOrderForm) => {
  const { paymentData: { installmentOptions } } = cartSimulation;

  const bestInstallments = installmentOptions.reduce((best, current) => {
    if (current.installments.length > best.installments.length) {
      return current;
    }
    return best;
  }, installmentOptions[0]);

  return bestInstallments.installments.pop();
};

function ProductCard(
  { product, isSelected, isCurrentProduct, onProductSelect }: {
    product: Product;
    isSelected: boolean;
    isCurrentProduct?: boolean;
    onProductSelect?: (product: Product) => void;
  },
) {
  const { offers } = product;
  const { price } = useOffer(offers);

  return (
    <div
      class="flex gap-x-3.5 md:gap-x-7 border border-[#efefef] rounded-xl overflow-hidden w-full group"
      data-checked={isSelected}
      data-current={isCurrentProduct}
    >
      <Image
        src={product?.image?.[0].url ?? ""}
        width={84}
        height={84}
      />
      <div class="flex flex-col justify-evenly w-full">
        <h2 class="text-primary text-sm font-bold">
          {product.name}
        </h2>
        <span class="text-sm">
          a partir de{" "}
          <strong>{formatPrice(price, offers!.priceCurrency!)}</strong>
        </span>
      </div>
      <div class="w-[65px] md:w-[74px] flex-shrink-0 grid place-items-center border-l border-[#efefef] group-data-[current=true]:invisible">
        <Button
          variant="outline"
          class="!h-[27px] !w-[27px] !p-0 !border-primary !text-white bg-transparent group-data-[checked=true]:bg-primary !rounded-md"
          onClick={() => onProductSelect?.(product)}
        >
          {isSelected && <Icon id="Check" height={20} width={20} />}
        </Button>
      </div>
    </div>
  );
}

function BuyTogether({ currentProduct, buyTogether }: Props) {
  const { displayCart } = useUI();
  const isAddingToCart = useSignal(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([
    currentProduct,
  ]);
  const { addItems, simulate } = useCart();
  const [cartSimulation, setCartSimulation] = useState<SimulationOrderForm>();
  const bestInstallmentOption = cartSimulation &&
    getBestInstallmentOption(cartSimulation);

  const subtotal = selectedProducts.reduce((acc, product) => {
    const { offers } = product;
    const { price } = useOffer(offers);

    return acc + (price ?? 0);
  }, 0);

  const handleSelectProduct = (product: Product) => {
    const index = selectedProducts.indexOf(product);

    if (index > -1) {
      const filteredProducts = selectedProducts.filter((p) => p !== product);

      setSelectedProducts(filteredProducts);
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const simulateCart = async () => {
    const items = parseProductsToCartItems(selectedProducts).map((item) => {
      return {
        ...item,
        id: Number(item.id),
      };
    });

    const cartSimulation = await simulate({
      items,
      country: "BRA",
      postalCode: "",
    });

    setCartSimulation(cartSimulation);
  };

  const isProductSelected = (product: Product) => {
    return selectedProducts.includes(product);
  };

  const handleAddToCart = useCallback(async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const items = parseProductsToCartItems(selectedProducts);

    try {
      isAddingToCart.value = true;

      await addItems({
        orderItems: items,
      });

      displayCart.value = true;
    } finally {
      isAddingToCart.value = false;
    }
  }, [selectedProducts]);

  useEffect(() => {
    simulateCart();
  }, [selectedProducts]);

  return (
    <div class="flex flex-col items-center w-full max-w-[376px]">
      <h2 class="text-[32px] text-primary font-bold pb-8">compre junto</h2>
      <ProductCard
        product={currentProduct}
        isSelected={true}
        isCurrentProduct={true}
      />
      <div class="text-5xl font-bold py-2">
        +
      </div>
      <div class="w-full flex flex-col gap-[22px]">
        {buyTogether.map((product) => {
          return (
            <ProductCard
              key={product.sku}
              product={product}
              isSelected={isProductSelected(product)}
              onProductSelect={handleSelectProduct}
            />
          );
        })}
      </div>
      <div class="flex flex-col items-center text-sm pb-3 pt-5">
        <span>Subtotal</span>
        <span>
          a partir de{" "}
          <strong>
            {formatPrice(subtotal, currentProduct.offers?.priceCurrency!)}
          </strong>
        </span>
        {bestInstallmentOption && (
          <span>
            <strong>
              (ou até {bestInstallmentOption.count}x de {formatPrice(
                (bestInstallmentOption.value ?? 0) / 100,
                currentProduct.offers?.priceCurrency!,
              )})
            </strong>
          </span>
        )}
      </div>
      <Button
        class="w-full "
        onClick={handleAddToCart}
        disabled={isAddingToCart.value || selectedProducts.length < 2}
      >
        {selectedProducts.length > 1
          ? `Adicionar ${selectedProducts.length} itens`
          : "Selecione ao menos um produto"}
      </Button>
    </div>
  );
}

export default BuyTogether;
