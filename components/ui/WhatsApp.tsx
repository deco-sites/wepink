import Icon from "deco-sites/fashion/components/ui/Icon.tsx";

export interface Props {
  phone?: number;
}

function WhatsApp({ phone }: Props) {
  if (!phone) {
    return null;
  }

  return (
    <a
      href={`https://api.whatsapp.com/send/?phone=${phone}&text&type=phone_number&app_absent=0`}
      class="fixed bottom-14 -right-11 z-40 -rotate-90"
      aria-label="Chat on WhatsApp"
      target="_blank"
    >
      <button
        class="flex text-white bg-primary items center rounded-t-xl py-2 px-3 hover:py-1.5 hover:px-2.5 items-center gap-x-1 font-bold text-xs shadow-lg shadow-black"
        aria-label="Chat on WhatsApp"
      >
        <Icon id="Chat" size={22} /> Iniciar Chat
      </button>
    </a>
  );
}

export default WhatsApp;
