export const postRequest = async (url, body) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${JSON.parse(localStorage.getItem("user"))?.token}`,
    },
    body,
  });
  const data = await res.json();

  if (!res.ok) {
    return { error: data.error };
  }
  return data;
};

export const getRequest = async (url) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Token ${JSON.parse(localStorage.getItem("user")).token}`,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    return { error: data.error };
  }
  return data;
};
