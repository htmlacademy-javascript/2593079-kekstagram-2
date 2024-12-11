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

function getTimeInMinutes(time) {
  const [hours, minutes] = time.split(':').map((elem) => parseInt(elem, 10));
  return hours * 60 + minutes;
}

function checkMeetingTime(from, until, meetTime, duration) {
  from = getTimeInMinutes(from);
  until = getTimeInMinutes(until);
  meetTime = getTimeInMinutes(meetTime);

  return from <= meetTime && meetTime + duration <= until;
}
checkMeetingTime('08:00', '14:30', '14:00', 30);
