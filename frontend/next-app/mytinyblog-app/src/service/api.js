const URL = "http://localhost:8080";

export const requestAuth = async (authRequest) => {
  const uri = `${URL}/auth/login`;
  const res = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: authRequest,
  });
  if (!res.ok) {
    throw new Error("Failed to login");
  }
  return res.json();
};

export const requestGetPosts = async () => {
  const uri = `${URL}/posts`;
  const res = await fetch(uri, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to get posts");
  }
  return res.json();
};

export const requestCreatePost = async (postRequest, token) => {
  const uri = `${URL}/posts`;
  const res = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: token,
    },
    body: postRequest,
  });
  if (!res.ok) {
    throw new Error("Failed to create post");
  }
  return res.json();
};

export const requestIsAuthorized = async (token) => {
  const uri = `${URL}/auth/is-authorized`;
  const res = await fetch(uri, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  if (!res.ok) {
    throw new Error("User not authorized");
  }
  return res.ok;
};
