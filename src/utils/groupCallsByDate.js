import { formatDate } from "./formateDate";
/**
 *
 * @param calls Calls data in format - DATA_RECEIVED_FROM_API - present in sampleData.js file
 * @returns results in format - DATA_REQUIRED_BY_UI - present in sampleData.js file
 */
export function groupCallsByDate(calls) {
  const groupedCalls = {};

  calls.forEach((call) => {
    // Extract the date part from the 'created_at' field
    const date = call.created_at.split("T")[0];

    // Check if this date is already a key in the groupedCalls object
    if (!groupedCalls[date]) {
      groupedCalls[date] = { archived: [], notArchived: [] };
    }

    // Check 'to' or 'from' because data received from the server is not proper
    if (call.to || call.from) {
      if (call.is_archived) {
        groupedCalls[date].archived.push(call);
      } else {
        groupedCalls[date].notArchived.push(call);
      }
    }
  });

  // Convert the object into an array of objects and sort each callHistory type by time
  const result = Object.keys(groupedCalls).map((date) => ({
    date: formatDate(date),
    callHistoryByDate: {
      archived: groupedCalls[date].archived.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      ),
      notArchived: groupedCalls[date].notArchived.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      ),
    },
  }));

  // Sort the array by date in descending order
  result.sort((a, b) => new Date(b.date) - new Date(a.date));
  return result;
}

/**
 * SAMPLE OUTPUT
 * --------------------------------

 */
