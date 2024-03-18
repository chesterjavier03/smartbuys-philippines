export const convertMoney = (amount: Number) => {
  return amount?.toLocaleString!('en-US', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    localeMatcher:'best fit',
    currencyDisplay: "symbol",
  });
};