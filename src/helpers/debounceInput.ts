const debounceInput = function debounce(
  func: any,
  setControlledInputValue: (value: string) => void
) {
  let timer: any;
  return function (...args: [string]) {
    setControlledInputValue(...args);
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      timer = null;
      func.apply(context, args);
    }, 800);
  };
};

export default debounceInput;
