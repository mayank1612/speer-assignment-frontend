export async function strictFetch(url, method = "GET") {
  const queryData = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const jsonData = await queryData.json();

  return jsonData;
}
