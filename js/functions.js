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

function getHours(time) {
  return parseInt(time.split(':')[0], 10);
}
function getMinutes(time) {
  return parseInt(time.split(':')[1], 10);
}
function checkMeetingTime(from, until, meetTime, duration) {
  const fromHours = getHours(from);
  const fromMinutes = getMinutes(from);
  const untilHours = getHours(until);
  const untilMinutes = getMinutes(until);
  let meetHours = getHours(meetTime);
  let meetMinutes = getMinutes(meetTime);
  if ((meetHours < fromHours) || (meetHours === fromHours && meetMinutes < fromMinutes)) {
    return false;
  }
  meetHours += Math.floor(duration / 60);
  meetMinutes += duration % 60;

  if (meetMinutes >= 60) {
    meetHours++;
    meetMinutes -= 60;
  }
  return meetHours <= untilHours && meetMinutes <= untilMinutes;
}


checkMeetingTime('08:00', '14:30', '14:00', 30);

