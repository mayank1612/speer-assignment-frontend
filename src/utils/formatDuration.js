export function formatDuration(duration) {
  if (typeof duration !== "number" || isNaN(duration) || duration < 0) {
    return "0 sec";
  }

  let hours = Math.floor(duration / 3600);
  let minutes = Math.floor((duration % 3600) / 60);
  let seconds = duration % 60;

  let result = "";

  if (hours > 0) {
    result += hours + (hours === 1 ? " hour" : " hours");
    if (minutes > 0 || seconds > 0) {
      result += " ";
    }
  }

  if (minutes > 0) {
    result += minutes + (minutes === 1 ? " min" : " mins");
    if (seconds > 0) {
      result += " ";
    }
  }

  if (seconds > 0 || (hours === 0 && minutes === 0)) {
    result += seconds + (seconds === 1 ? " sec" : " secs");
  }

  return result;
}

/**
 * // Example usage:
console.log(formatDuration(90)); // Output: 1 min 30 secs
console.log(formatDuration(25)); // Output: 25 secs
console.log(formatDuration(3600)); // Output: 1 hour
console.log(formatDuration(3665)); // Output: 1 hour 1 min 5 secs
 */
