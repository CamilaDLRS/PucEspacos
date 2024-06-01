import { cnpj, cpf } from "cpf-cnpj-validator";

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
  console.log(dtToday.getHours())
  const hours = (dtToday.getHours() < 10) ? "0" + dtToday.getHours().toString() : dtToday.getHours().toString();
  const minutes = (dtToday.getMinutes() < 10) ? "0" + dtToday.getMinutes().toString() : dtToday.getMinutes().toString();

  return `${hours}:${minutes}`
}

export function convertToTimestamp(dateString, timeString) {

  console.log(`chegou: ${dateString}  ${timeString}`);

  const [year, month, day] = dateString.split('-');
  const [hours, minutes] = timeString.split(':');
  const date = new Date(year, month - 1, day, hours, minutes, 0); // Mês é 0-indexado no Date

  return date.getTime();
}

export function removeSpecialCharacters(string) {
  return string.replace(/[^a-zA-Z0-9 ]/g, "");
}

export function validateCpf(num) {

  if (!num) {
    return false;
  }
  return cpf.isValid(removeSpecialCharacters(num));
}

export function validateCnpj(num) {
  
  if (!num) {
    return false;
  }

  return cnpj.isValid(removeSpecialCharacters(num));
}

export function formatCnpj(num) {
  return cnpj.format(removeSpecialCharacters(num));
}

export function formatCpf(num) {
  return cpf.format(removeSpecialCharacters(num));
}

export function validatePhone(num) {
  if (!num) {
    return false;
  }
  const phoneNumber = /0{0,2}(55)?(?:(11)(9[0-9]{4})|([1-9]{2})([0-9]{4}))([0-9]{4})/;
  return phoneNumber.test(this.removeSpecialCharacters(num));
}

export function formatPhone(num) {

  // Remove caracteres especiais
  const cleanNum = removeSpecialCharacters(num);

  // Formatação de acordo com o comprimento do número
  if (cleanNum.length === 10) {
    // Telefone fixo (sem o dígito 9)
    return `(${cleanNum.slice(0, 2)}) ${cleanNum.slice(2, 6)}-${cleanNum.slice(6, 10)}`;
  } else if (cleanNum.length === 11) {
    // Telefone celular (com o dígito 9)
    return `(${cleanNum.slice(0, 2)}) ${cleanNum.slice(2, 7)}-${cleanNum.slice(7, 11)}`;
  }

  return null;
}

export function validateCEP(cep) {
  
  if (!cep) {
    return false;
  }
  const cepPattern = /^[0-9]{8}$/;
  return cepPattern.test(cep);
}

export function formatCEP(cep) {

  console.log(cep);
  console.log(cep.toString().replace(/(\d{5})(\d{3})/, '$1-$2'));
  // Format the CEP as XXXXX-XXX
  if (cep.toString().length === 8) {
      return cep.toString().replace(/(\d{5})(\d{3})/, '$1-$2');
  }

  return null; // Or handle error as appropriate
}