export const constructDataImage = (imageFile: any) => {
  const buffer = Buffer.from(imageFile, 'binary');
  const base64File = buffer.toString('base64');
  return `data:image/*;base64,${base64File}`;
};
