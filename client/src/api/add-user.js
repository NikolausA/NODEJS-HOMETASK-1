export const addUser = async (email, password) =>
  await fetch("http://localhost:3002/login", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({ email, password }),
  });
