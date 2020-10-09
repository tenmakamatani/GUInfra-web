export const pushOrRemoveIfExists = <T>(value: T, oldValues: T[]): T[] => {
  let newValues: T[];
  if (oldValues.includes(value)) {
    newValues = oldValues.filter(o => o !== value);
  } else {
    newValues = [...oldValues];
    newValues.push(value);
  }
  return newValues;
};
