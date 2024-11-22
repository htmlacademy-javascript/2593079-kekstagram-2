function checkStr(string, length) {
  return string.length <= length;
}
checkStr('fff', 3);

function isPalindrome(string) {
  string = string.toLowerCase().replaceAll(' ', '');
  const reversedString = string.split('').reverse().join('');
  return string === reversedString;
}
isPalindrome('ooppoo ooppoo');
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

