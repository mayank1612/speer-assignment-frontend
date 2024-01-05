export async function strictFetch(url, method = "GET", variables = {}) {
  const queryData = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    ...(() => {
      if (method !== "GET") {
        return {
          body: JSON.stringify(variables),
        };
      }
    })(),
  });

  try {
    const jsonData = await queryData.json();
    return jsonData;
  } catch (error) {
    return queryData;
  }
}
