import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);

  function handleNext() {
    console.log("running next")
    if(((page*10)/tableData.length) <= 1) {
      setPage((page) => page + 1)
    } else {
      return
    }
  }

  function handlePrev() {
    console.log("running prev")
    if(page === 1) {
      return
    } else {
      setPage((page) => page - 1)
    }

  }
  useEffect(() => {
    async function getTableData() {
      try {

        let response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
          );
          let responseJson = await response.json();
          
          setTableData(responseJson);
        } catch(error) {
          alert("failed to fetch data")
        }
    }

    getTableData();
  }, []);

  function tbodyData() {
    let initial = (page - 1) * 10;
    let tbodyJSX = [];

    if (initial + 10 < tableData.length) {
      let trData;
      for (let i = initial; i < (initial + 10); i++) {
        trData = tableData[i];
        tbodyJSX.push(
          <tr>
            <td>{trData.id}</td>
            <td>{trData.name}</td>
            <td>{trData.email}</td>
            <td>{trData.role}</td>
          </tr>
        );
      }
    } else {
      let trData;
      for (let i = initial; i < tableData.length; i++) {
        trData = tableData[i];
        tbodyJSX.push(
          <tr>
            <td>{trData.id}</td>
            <td>{trData.name}</td>
            <td>{trData.email}</td>
            <td>{trData.role}</td>
          </tr>
        );
      }
    }

    return tbodyJSX;
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
        <h1>Employee Table Data</h1>
        <table style={{ width: "100%"}}>
          <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </thead>
          <tbody style={{ textAlign: "center"}}>{tbodyData()}</tbody>
        </table>
        <div style={{ display: "flex"}}>

        <button onClick={handlePrev}>Previous</button>
        <p>{page}</p>
        <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </>
  );
}

export default App;
