export const getPatientRequests = async (
  query,
  sortField,
  sortOrder,
  page,
  limit
) => {
  try {
    const res = await fetch(
      `http://localhost:3002/patient-data?${query}&sortBy=${sortField}&order=${sortOrder}&page=${page}&limit=${limit}`
    );

    if (!res.ok) {
      throw new Error("There in no response from server");
    }

    return await res.json();
  } catch (e) {
    console.error("Error fetching data:", e.message);
    throw e;
  }
};
