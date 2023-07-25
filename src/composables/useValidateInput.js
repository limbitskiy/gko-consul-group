import { nextTick } from "vue";

export function useValidateInput() {

  const regex = /^[\d:;,]+$/gm
  let lastValue = null

  const validateInput = (input) => {

    if (regex.test(input)) {
      // lastValue = input;
      console.error(`inside`);
      return;
    }

    console.error(`outside`);

    const diff = {
      value: null,
      index: null,
    };

    if (lastValue) {
      // if it's pasted - ignore it
      if (input.length - lastValue.length > 1) return;

      input.split("").forEach((char, index) => {
        if (char != lastValue.charAt(index)) {
          diff.value = char;
          diff.index = index;
        }
      });
    } else {
      diff.value = input;
      diff.index = 0;
    }

    // validate the diff
    const validated = /[\d:;,]/.test(diff.value);

    if (!validated) {
      nextTick().then(() => {
        if (diff.index === 0) {
          kNumbers.value = input.slice(1);
        } else {
          kNumbers.value = lastValue =
            input.slice(0, diff.index) + input.slice(diff.index + 1);
        }
      });
    } else {
      lastValue = input;
    }
  }

  return { validateInput }
};