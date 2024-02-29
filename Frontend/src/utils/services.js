import Cookies from "js-cookie";

export const postRequest = async (url, body) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("jwt")}`,
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
      Authorization: `Bearer ${Cookies.get("jwt")}`,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    console.log("get error", Cookies.get("jwt"));
    return { error: data.error };
  }
  return data;
};
