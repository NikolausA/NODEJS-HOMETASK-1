const PatienRequest = require("../models/PatientRequest");

async function getPatientData(query, sortField, order, page, limit) {
  const sort = order === "asc" ? 1 : -1;
  const requests = await PatienRequest.find(query)
    .sort({
      [sortField]: sort,
    })
    .skip((page - 1) * limit)
    .limit(limit);

  const totalRequests = await PatienRequest.countDocuments();
  const totalPages = Math.ceil(totalRequests / limit);

  return {
    requests,
    totalPages,
    page,
  };
}

async function addPatientData(newRequest) {
  return (newPatientData = await PatienRequest.create(newRequest));
}

module.exports = { getPatientData, addPatientData };
