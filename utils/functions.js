export const toJson = (value) => {
  return JSON.parse(JSON.stringify(value));
};

export const moneyFormat = (amount) => {
  return !amount
    ? 0
    : '₱ ' +
        parseInt(amount)
          .toFixed(0)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const totalMoneyFormat = (data) => {
  return !data
    ? 0
    : moneyFormat(
        data.reduce((a, v) => (a = a + parseInt(v.price) * v.quantity), 0)
      );
};
