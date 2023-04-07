export const toJson = (value) => {
  return JSON.parse(JSON.stringify(value));
};

export const moneyFormat = (amount) => {
  return !amount
    ? 0
    : '₱ ' +
        Math.ceil(amount, Math.pow(10, 1))
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

export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const convertBufferToImage = (image) => {
  return Buffer.from(image, 'binary').toString('base64');
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
