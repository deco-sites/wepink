import Button from "../ui/Button.tsx";
import Icon from "../ui/Icon.tsx";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
}

const QUANTITY_MAX_VALUE = 100;

// Remove default browser behavior: https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp
// TODO: Figure out how to add it via tailwind config.
const innerStyle = `
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
`;

function QuantitySelector({ onChange, quantity, disabled, loading }: Props) {
  const decrement = () => onChange?.(Math.max(0, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  return (
    <div class="flex  border-base-200">
      <Button
        class="!h-8 !w-8 !rounded-full !text-6xl !font-normal"
        onClick={decrement}
        disabled={disabled}
        loading={loading}
      >
        <Icon id="Minus" height={16} width={16} />
      </Button>
      <style dangerouslySetInnerHTML={{ __html: innerStyle }} />
      <input
        class="text-center w-7 text-primary text-[17px] font-bold bg-transparent outline-none disabled:opacity-50"
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        max={QUANTITY_MAX_VALUE}
        min={1}
        value={quantity}
        disabled={disabled}
        onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
      />
      <Button
        class="!h-8 !w-8 !rounded-full !text-2xl"
        onClick={increment}
        disabled={disabled}
        loading={loading}
      >
        <Icon id="Plus" height={18} width={18} />
      </Button>
    </div>
  );
}

export default QuantitySelector;
