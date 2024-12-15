const URL = "http://localhost/api";

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

export const requestAuth = async (authRequest) => {
  const uri = `${URL}/auth/sign-in`;
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

export const requestRegister = async (body, token) => {
  const uri = `${URL}/auth/sign-up`;
  const res = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: token,
    },
    body: body,
  });
  if (!res.ok) {
    throw new Error("Failed to register");
  }
  return res.json();
};

export const requestGetPost = async (id) => {
  const uri = `${URL}/posts/${id}`;
  const res = await fetch(uri, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to get post");
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

export const requestDeletePost = async (id, token) => {
  const uri = `${URL}/posts/${id}`;
  const res = await fetch(uri, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: token,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to delete post");
  }
  return res.json();
};

export const requestDeleteAllPosts = async (token) => {
  const uri = `${URL}/posts`;
  const res = await fetch(uri, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: token,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to delete all posts");
  }
};

export const requestUpdatePost = async (id, post, token) => {
  const uri = `${URL}/posts/${id}`;
  const res = await fetch(uri, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: token,
    },
    body: post,
  });
  if (!res.ok) {
    throw new Error("Failed to update post");
  }
};

export const requestCreateSubscription = async (postRequest) => {
  const uri = `${URL}/subscriptions`;
  const res = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: postRequest,
  });
  if (!res.ok) {
    throw new Error("Failed to create subscription");
  }
  return res.json();
};

export const requestGetSubscriptions = async (token) => {
  const uri = `${URL}/subscriptions`;
  const res = await fetch(uri, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: token,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to get subscriptions");
  }
  return res.json();
};

export const requestDeleteSubscription = async (id, token) => {
  const uri = `${URL}/subscriptions/${id}`;
  const res = await fetch(uri, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: token,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to delete subscription");
  }
  return res.json();
};

export const requestGetUsers = async (token) => {
  const uri = `${URL}/users`;
  const res = await fetch(uri, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: token,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to get users");
  }
  return res.json();
};

export const requestDeleteUser = async (id, token) => {
  const uri = `${URL}/users/${id}`;
  const res = await fetch(uri, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: token,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to delete user");
  }
};
