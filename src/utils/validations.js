const hasDuplicates = (arr, value, prop = 'name') => {
  return arr.some(element => element[prop] === value);
};

export {
  hasDuplicates
};