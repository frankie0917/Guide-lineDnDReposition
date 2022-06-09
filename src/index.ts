import fs from 'fs';

const makeAllPermutation = (totalCols: number, minColSize: number) => {
  if (totalCols % minColSize !== 0)
    throw new Error('columns is not divisible by minCols');
  const colSizeList = new Array(totalCols - minColSize + 1)
    .fill(null)
    .map((_, i) => 2 + i);
  const result: number[][] = [];
  const dfs = (target: number, combine: number[], idx: number) => {
    if (idx === colSizeList.length) return;
    if (target === 0) {
      result.push(combine);
      return;
    }
    dfs(target, combine, idx + 1);
    if (target - colSizeList[idx] >= 0) {
      dfs(target - colSizeList[idx], [...combine, colSizeList[idx]], idx);
    }
  };
  dfs(totalCols, [], 0);
  return result;
};

fs.writeFileSync(
  './result.json',
  JSON.stringify(makeAllPermutation(12, 2), null, 2),
);
