import { CCard, CCardHeader } from '@coreui/react';
import { useState, useEffect } from "react";
import "./App.css"

function App() {
  const [data, setData2] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(
      "https://ens-job-apply.onrender.com/api/get-all"
    );
    const data = await response.json();
    setData2(data.data);
  };
  
  return (
    <div>
      <Table data={data} />
    </div>
  );
}

  const openFileInNewTab = (file) => {
    window.open(file, "_blank");
  };

  function Table(props) {
    const { data } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);
  
    const filteredData = data.filter((item) =>
      item.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredData.length / rowsPerPage); i++) {
      pageNumbers.push(i);
    }

  return (
    <CCard>
      <CCardHeader>
        <div className="guru">
          <h1>Candidate Details</h1>
         
        </div>
        <Pagination
              pageNumbers={pageNumbers}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
      </CCardHeader>

      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Experience</th>
            <th>CTC</th>
            <th>Resume</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((item) => (
            <tr key={item._id}>
              <td>{item.userName}</td>
              <td>{item.email}</td>
              <td>{item.mobile}</td>
              <td>{item.experience}</td>
              <td>{item.ctc}</td>
              <td>
                <button className="file-link" onClick={() => openFileInNewTab(item.file)}>
                  Click here
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </CCard>
  );
}

function Pagination(props) {
  const { pageNumbers, currentPage, setCurrentPage } = props;

  const linksToShow = 5; // Change this to control the number of links to show
  const firstIndex = Math.max(0, currentPage - linksToShow);
  const lastIndex = Math.min(firstIndex + linksToShow, pageNumbers.length);

  const getPageLinks = () => {
    const links = [];
    for (let i = firstIndex; i < lastIndex; i++) {
      const pageNumber = pageNumbers[i];
      links.push(
        <li
          key={pageNumber}
          className={`page-item${currentPage === pageNumber ? " active" : ""}`}
        >
          <button className="page-link" onClick={() => setCurrentPage(pageNumber)}>
            {pageNumber}
          </button>
        </li>
      );
    }
    return links;
  };

  return (
    <ul className="pagination">
      <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
        <button
          className="page-link"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
      </li>
      {getPageLinks()}
      {lastIndex < pageNumbers.length && (
        <li className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      )}
      <li className={`page-item${currentPage === pageNumbers.length ? " disabled" : ""}`}>
        <button
          className="page-link"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
        >
          Next
        </button>
      </li>
    </ul>
  );
}

export default App;
