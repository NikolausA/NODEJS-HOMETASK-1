import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getPatientRequests } from "./api";
import { Header, Notification } from "./components";
import { Main, Login, PatientData, Form } from "./pages";
import styles from "./App.module.css";

export const App = () => {
  const [patientData, setPatientData] = useState([]);
  const [searchInput, setSearchInput] = useState(null);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  useEffect(() => {
    const query = searchInput ? `search=${searchInput}` : "";
    getPatientRequests(query, sortField, sortOrder, currentPage, limit).then(
      ({ data }) => {
        setPatientData(data.requests);
        setCurrentPage(data.page);
        setTotalPages(data.totalPages);
      }
    );
  }, [searchInput, sortField, sortOrder, currentPage]);

  return (
    <div className={styles.page}>
      <Header />
      <Notification message={message} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/form"
          element={
            <Form
              setPatientData={setPatientData}
              setMessage={setMessage}
              setError={setError}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/patient-data"
          element={
            <PatientData
              patientData={patientData}
              sortOrder={sortOrder}
              setSearchInput={setSearchInput}
              setSortOrder={setSortOrder}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          }
        />
      </Routes>
    </div>
  );
};
