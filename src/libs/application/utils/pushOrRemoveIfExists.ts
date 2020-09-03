export const pushOrRemoveIfExists = <T>(value: T, oldValues: T[]): T[] => {
  let newValues: T[];
  console.log(value, oldValues);
  if (oldValues.includes(value)) {
    newValues = oldValues.filter(o => o !== value);
  } else {
    newValues = [...oldValues];
    newValues.push(value);
  }
  return newValues;
};
