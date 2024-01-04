export function formatTime(date) {
  const inputDate = new Date(date);

  const options = { hour: "2-digit", minute: "2-digit", hour12: true };
  const formattedTime = inputDate.toLocaleTimeString("en-US", options);

  return formattedTime;
}
