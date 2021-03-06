export const cn = (...classes) => classes.join(" ");
export function getMonthString(month = new Date().getMonth()) {
  switch (new Date().getMonth()) {
    case 0:
      month = "januar";
      break;
    case 1:
      month = "februar";
      break;
    case 2:
      month = "mars";
      break;
    case 3:
      month = "april";
      break;
    case 4:
      month = "mai";
      break;
    case 5:
      month = "juni";
      break;
    case 6:
      month = "juli";
      break;
    case 7:
      month = "august";
      break;
    case 8:
      month = "september";
      break;
    case 9:
      month = "oktober";
      break;
    case 10:
      month = "november";
      break;
    case 11:
      month = "desember";
      break;
    default:
      month = "Invalid month";
  }
  return month;
}

export const failSafeGraphQlError = (err) =>
  err &&
  err.graphQLErrors &&
  err.graphQLErrors[0] &&
  err.graphQLErrors[0].extensions &&
  err.graphQLErrors[0].extensions.exception &&
  err.graphQLErrors[0].extensions.exception.errors;

export const addEndingS = (name) => {
  return name.endsWith("s") ? name + "'" : name + "s";
};
