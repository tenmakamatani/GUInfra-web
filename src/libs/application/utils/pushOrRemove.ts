export const pushOrRemove = (value: string, oldValues: string[]): string[] => {
  let newValues: string[];
  if (oldValues.includes(value)) {
    newValues = oldValues.filter(o => o !== value);
  } else {
    oldValues.push(value);
    newValues = [...oldValues];
  }
  return newValues;
};
