export function isAnyCallNotArchived(callHistory) {
  // Iterate through the array elements
  for (const entry of callHistory) {
    // Check if the "notArchived" array has any elements
    if (entry.callHistoryByDate.notArchived.length > 0) {
      // If yes, return true
      return true;
    }
  }
  // If no element is found in any "notArchived" array, return false
  return false;
}
