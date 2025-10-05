export const groupArrayElements = <T>(size: number, array?: T[]) => {
  
  if (!array) return [];  

  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};
