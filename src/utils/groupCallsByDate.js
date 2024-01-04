import { formatDate } from "./formateDate";

export function groupCallsByDate(calls) {
  const groupedCalls = {};

  calls.forEach((call) => {
    // Extract the date part from the 'created_at' field
    const date = call.created_at.split("T")[0];

    // Check if this date is already a key in the groupedCalls object
    if (!groupedCalls[date]) {
      groupedCalls[date] = [];
    }

    // Add this call to the array for this date if call is not archived
    if (!call.is_archived) {
      groupedCalls[date].push(call);
    }
  });

  // Convert the object into an array of objects
  return Object.keys(groupedCalls).map((date) => ({
    date: formatDate(date),
    callHistoryByDate: groupedCalls[date],
  }));
}
