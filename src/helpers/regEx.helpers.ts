export const EMAIL_VALIDATION_PATTERN =
  /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const PHONE_VALIDATION_PATTERN =
  /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{1,2})$/;

export const SITE_VALIDATION_PATTERN =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export const LINK_VALIDATION_PATTERN =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

export const CREDIT_CARD_VALIDATION_PATTERN =
  /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;

export const CREDIT_CARD_DATE_VALIDATION_PATTERN =
  /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;

export const CVV_VALIDATION_PATTERN = /^[0-9]{3,4}$/;

export const SPECIAL_SYMBOLS_VALIDATION_PATTERN = /[$-/:-?{-~!"^_`\[\]]/;

export const SELECT_DIGITS_PATTERN = /[^\d]/g;

export const USER_NAME_PATTERN = /^[a-zA-Z\s]*$/;

export const ONLY_NUMBERS = /^\d+$/;
