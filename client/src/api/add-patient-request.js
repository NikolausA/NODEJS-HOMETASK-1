export const addPatientRequest = async (newPatientRequest) =>
  await fetch("http://localhost:3002/form", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(newPatientRequest),
  });
