import { useRef } from "react";
import styles from "./patient-data.module.css";

export const PatientData = ({
  patientData,
  sortOrder,
  currentPage,
  totalPages,
  setSearchInput,
  setSortOrder,
  setCurrentPage,
}) => {
  const inputValue = useRef(null);

  const handleClick = () => {
    const value = inputValue.current.value;
    setSearchInput(value);
  };

  return (
    <div>
      <div className={styles.searchBlock}>
        <input
          className={styles.searchInput}
          type="text"
          name="search"
          ref={inputValue}
          placeholder="Поиск..."
        />
        <i class="fa fa-search" aria-hidden="true" onClick={handleClick} />
        <button
          className={styles.reset}
          type="button"
          onClick={() => {
            setSearchInput(null);
            inputValue.current.value = "";
          }}
        >
          Сбросить
        </button>
      </div>
      <h2>Заявки с формы</h2>
      <table className={styles.table}>
        <thead className={styles.head}>
          <th className={styles.cell}>Дата отправки</th>
          <th className={styles.cell}>
            <span className={styles.name}>ФИО</span>
            {sortOrder === "asc" ? (
              <i
                className="fa fa-sort-alpha-desc"
                aria-hidden="true"
                onClick={() => setSortOrder("desc")}
              />
            ) : (
              <i
                className="fa fa-sort-alpha-asc"
                aria-hidden="true"
                onClick={() => setSortOrder("asc")}
              />
            )}
          </th>
          <th className={styles.cell}>Телефон</th>
          <th className={styles.cell}>Проблема</th>
        </thead>
        <tbody>
          {patientData.length > 0 ? (
            patientData.map((item) => (
              <tr key={item.id}>
                <td className={styles.cell}>{item.date}</td>
                <td className={styles.cell}>{item.name}</td>
                <td className={styles.cell}>{item.phone}</td>
                <td className={styles.cell}>{item.description}</td>
              </tr>
            ))
          ) : (
            <p>No data</p>
          )}
        </tbody>
      </table>
      <div className={styles.paginationButtons}>
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage(currentPage - 1)}>
            {currentPage - 1}
          </button>
        )}
        <div className={styles.currentPage}>{currentPage}</div>
        {currentPage < totalPages && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>
            {currentPage + 1}
          </button>
        )}
      </div>
    </div>
  );
};
