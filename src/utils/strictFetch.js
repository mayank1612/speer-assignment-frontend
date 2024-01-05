export async function strictFetch(url, method = "GET") {
  const queryData = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });

  try {
    const jsonData = await queryData.json();
    return jsonData;
  } catch (error) {
    return queryData;
  }
}
