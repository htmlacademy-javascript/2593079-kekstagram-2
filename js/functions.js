function checkStr(string, length) {
  if (string.length <= length) {
    return true;
  }
  return false;
}

function isPalimdrome(string) {
  let concatenatedString = '';
  string.split(' ').forEach((word) => {
    word.split('').forEach((letter) => {
      concatenatedString += letter;
    });
  });
  concatenatedString = concatenatedString.toLocaleLowerCase();
  const reversedString = concatenatedString.split('').reverse().join('');
  if (concatenatedString === reversedString) {
    return true;
  }
  return false;
}

function getNumsFromString(param) {
  let num = '';
  if (typeof param === 'number') {
    return param;
  }
  param.split('').forEach((letter) => {
    if ('0123456789'.split('').indexOf(letter) !== -1) {
      num += letter;
    }
  });
  if (num === '') {
    return NaN;
  }
  return parseInt(num, 10);
}

