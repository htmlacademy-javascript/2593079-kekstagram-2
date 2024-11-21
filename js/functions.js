function checkStr(string, length) {
  return string.length <= length;
}

checkStr('fff', 3);

function isPalimdrome(string) {
  string = string.replaceAll(' ', '');
  const reversedString = string.split('').reverse().join('');
  return string === reversedString;
}
isPalimdrome('ooppoo ooppoo');
function getNums(string) {
  string = String(string);
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }
  return parseInt(result, 10);
}

getNums('ou8kj9');

