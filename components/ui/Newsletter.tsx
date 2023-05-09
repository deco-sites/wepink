function Newsletter() {
  return (
    <div class="bg-primary flex items-center justify-center mb-[22px] px-7 py-5 sm:py-20 sm:px-0">
      <div class="w-full max-w-[650px]">
        <h4 class="text-lg sm:text-[32px] text-white font-bold text-center sm:leading-10 mb-4 sm:mb-10">
          receba dicas e novidades toda semana no seu e-mail
        </h4>
        <form action="" class="flex items-center gap-1.5 sm:gap-[30px]">
          <input
            class="h-[34px] max-sm:w-[calc(100%-32px)] sm:h-[52px] flex-1 rounded-full px-4 text-black placeholder:text-black"
            type="text"
            placeholder="seu e-mail"
          />
          <button
            class="h-10 sm:h-[52px] text-sm bg-white text-primary px-7 sm:px-5 rounded-[18px] font-bold"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Newsletter;
