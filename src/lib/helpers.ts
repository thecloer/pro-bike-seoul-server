const SEOUL_BIKE_API_MAX_GAP = 1000;
export const makeSeoulBikeApiIndexes = (
  indexes: number[],
): { startIdx: number; endIdx: number }[] => {
  if (indexes.length < 1) return [];
  return indexes.reduce(
    (acc, curIdx, i) => {
      if (i === 0) return acc;
      const startIdx = acc.at(-1).startIdx;
      const gap = curIdx - startIdx;

      if (gap < SEOUL_BIKE_API_MAX_GAP) acc.at(-1).endIdx = curIdx;
      else acc.push({ startIdx: curIdx, endIdx: curIdx });

      return acc;
    },
    [{ startIdx: indexes[0], endIdx: indexes[0] }],
  );
};

export const isFullFilled = <T>(
  result: PromiseSettledResult<T>,
): result is PromiseFulfilledResult<T> => result.status === 'fulfilled';
