export function isAnyCallArchived(callHistory) {
  // Iterate through the array elements
  for (const entry of callHistory) {
    // Check if the "archived" array has any elements
    if (entry.callHistoryByDate.archived.length > 0) {
      // If yes, return true
      return true;
    }
  }
  // If no element is found in any "archived" array, return false
  return false;
}
