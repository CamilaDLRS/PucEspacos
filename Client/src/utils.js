export const checkin = ["06:15","07:00", "07:50", "08:35", "09:40", "10:25", "11:10", "11:55", "12:40", "13:25", "14:10", "15:15", "16:00", "16:45", "17:30", "18:15", "19:00", "19:45", "20:45", "21:30", "22:15", "23:00" ];

export const checkout = [ "07:00", "07:50", "08:35", "09:20", "10:25", "11:10", "11:55", "12:40", "13:25", "14:10", "14:55", "16:00", "16:45", "17:30", "18:15", "19:00", "19:45", "20:30", "21:30", "22:15", "23:00", "23:30"];

export function showList(elementClass) {
  document.querySelector(`.${elementClass}`).style.display = "flex";
}

export function unShowlist(elementClass) {
  document.querySelector(`.${elementClass}`).style.display = "none";
}

export function convertToDateString(timestamp) {

  if (timestamp == null) {
    return `yyyy-MM-dd`
  }

  const dtToday = new Date(timestamp);
  const year = dtToday.getFullYear().toString();
  var month = dtToday.getMonth() + 1;
  month = month < 10 ? "0" + month.toString() : month.toString();
  var day = dtToday.getDate();
  day = day < 10 ? "0" + day.toString() : day.toString();

  return `${year}-${month}-${day}`
}

export function convertToTimeString(timestamp) {

  const dtToday = new Date(timestamp);
  const hours = (dtToday.getHours() < 10) ? "0" + dtToday.getHours().toString() : dtToday.getHours().toString();
  const minutes = dtToday.getMinutes().toString();

  return `${hours}:${minutes}`
}

export function convertToTimestamp(dateString, timeString) {

    console.log(`chegou: ${dateString}  ${timeString}`);

  const [year, month, day] = dateString.split('-');
  const [hours, minutes] = timeString.split(':');
  const date = new Date(year, month - 1, day, hours, minutes, 0); // Mês é 0-indexado no Date

  return date.getTime();
}