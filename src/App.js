import React, { forwardRef, useState, useEffect } from 'react';
import styled from "styled-components";
import './App.css';
import Modal from './modal/modal';
import Grid from '@material-ui/core/Grid';
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import booksData from "./data/books.json";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

let columns = [
  { title: "genre", field: "genre" },
  { title: "isbn", field: "isbn" },
  { title: "title", field: "title" },
  { title: "summary", field: "summary" }
]

const localBooksData = booksData;

const App = () => {

  const [data, setData] = useState(null); //table data
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setData(localBooksData);
  }, [visible,data])

  const handleRowUpdate = (newData, oldData) => {
    localBooksData[oldData.tableData.id].genre = newData.genre;
    localBooksData[oldData.tableData.id].isbn = newData.isbn;
    localBooksData[oldData.tableData.id].title = newData.title;
    localBooksData[oldData.tableData.id].summary = newData.summary;
    console.log("What is current local booksData after the old row updated by the new row? ", localBooksData);
    setData(localBooksData);
  }

  const handleRowAdd = (newData) => {
    const jsonfile = require('jsonfile');
    const file = '/data/books.json'

    jsonfile.writeFile(file, newData)
      .then(newData => {
        console.log('Write complete',newData);
      })
      .catch(error => console.error(error));
    
    localBooksData.push(newData);
    console.log("What is current local booksData after the new row added? ", localBooksData);
    setData(localBooksData);
  }

  const handleRowDelete = (oldData) => {
    delete localBooksData[oldData.tableData.id];
    console.log("What is current local booksData after the old row deleted? ", localBooksData);
    setData(localBooksData);
  }

  const TableComponent = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <MaterialTable
            title={<>Shopee Assignment Table:[ <ModalComponent /> ]</>}
            columns={columns}
            data={data}
            icons={tableIcons}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise(() => {
                  handleRowUpdate(newData, oldData);
                }),
              onRowAdd: (newData) =>
                new Promise(() => {
                  handleRowAdd(newData);
                }),
              onRowDelete: (oldData) =>
                new Promise(() => {
                  handleRowDelete(oldData);
                }),
            }}
          />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    );
  }

  const ModalComponent = () => {
    const confirm = () => {
    }

    const showModal = () => {
      setVisible(true);
    }

    const closeModal = () => {
    }

    return (
      <React.Fragment>
        <button onClick={showModal}>Open Modal</button>
        <Modal
          visible={visible}
          title="books data"
          confirm={confirm}
          onClose={closeModal}
        >
          <TableStyle>
            <TableRowStyle>
              <TableHeaderStyle>genre</TableHeaderStyle>
              <TableHeaderStyle>isbn</TableHeaderStyle>
              <TableHeaderStyle>title</TableHeaderStyle>
              <TableHeaderStyle>summary</TableHeaderStyle>
            </TableRowStyle>
            {data ? data.map((row) => (
              <TableRowStyle>
                <TableColumnStyle>{row.genre}</TableColumnStyle>
                <TableColumnStyle>{row.isbn}</TableColumnStyle>
                <TableColumnStyle>{row.title}</TableColumnStyle>
                <TableColumnStyle>{row.summary}</TableColumnStyle>
              </TableRowStyle>
            )) : "No Data Found!"}
          </TableStyle>
        </Modal>
      </React.Fragment>
    );
  }

  return (
    <div className="App">
      <TableComponent />
    </div>
  );
}

export default App;

const TableStyle = styled.table`
  width: 90%;
  display: table;
  border-spacing: 0;
  border-collapse: collapse;
  border-color: grey;
  border: 1px solid #ddd;
`;

const TableRowStyle = styled.tr`
  border-collapse: collapse;
  border: 1px solid #ddd;
  background-color: #D5FDA9;
`;

const TableHeaderStyle = styled.th`
  border-collapse: collapse;
  border: 1px solid #ddd;
  background-color: #B5FC66;
`;

const TableColumnStyle = styled.td`
  border-collapse: collapse;
  border: 1px solid #ddd;
`;