import Modal from "deco-sites/fashion/components/ui/Modal.tsx";
import { lazy, Suspense } from "preact/compat";
import { useUI } from "deco-sites/fashion/sdk/useUI.ts";

import type { Props as MenuProps } from "deco-sites/fashion/components/header/Menu.tsx";
import Loading from "deco-sites/fashion/components/ui/Loading.tsx";

const Menu = lazy(() =>
  import("deco-sites/fashion/components/header/Menu.tsx")
);
const Cart = lazy(() =>
  import("deco-sites/fashion/components/minicart/Cart.tsx")
);

interface Props {
  menu: MenuProps;
}

function Modals({ menu }: Props) {
  const { displayCart, displayMenu } = useUI();

  function handleMenuClose() {
    displayMenu.value = false;
  }

  return (
    <>
      <Modal
        title="Menu"
        mode="sidebar-left"
        loading="lazy"
        open={displayMenu.value}
        onClose={handleMenuClose}
      >
        <Suspense fallback={<Loading />}>
          <Menu {...menu} onClose={handleMenuClose} />
        </Suspense>
      </Modal>

      <Modal
        title="Minha sacola"
        mode="sidebar-right"
        loading="lazy"
        open={displayCart.value}
        onClose={() => {
          displayCart.value = false;
        }}
      >
        <Suspense fallback={<Loading />}>
          <Cart />
        </Suspense>
      </Modal>
    </>
  );
}

export default Modals;
