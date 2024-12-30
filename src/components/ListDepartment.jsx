import React, { useEffect } from "react";
import { useState } from "react";
import {
  deleteDepartment,
  getAllDepartment,
} from "../services/DepartmentService";
import { Link, useNavigate } from "react-router-dom";

const ListDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllDepartment()
      .then((response) => {
        //console.log(response.data);
        setDepartments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  function updateDepartment(id) {
    navigate(`/edit-department/${id}`);
  }

  function removeDepartment(id) {
    console.log(id);

    deleteDepartment(id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <h2 className="text-center">List of Departments</h2>
      <Link to="/add-department" className="btn btn-primary mb-2">
        Add Department
      </Link>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Department Id</th>
            <th>Department Name</th>
            <th>Department Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((departments) => (
            <tr key={departments.id}>
              <td>{departments.id}</td>
              <td>{departments.departmentName}</td>
              <td>{departments.departmentDescription}</td>
              <td>
                <button
                  onClick={() => updateDepartment(departments.id)}
                  className="btn btn-info"
                >
                  Update
                </button>
                <button
                  onClick={() => removeDepartment(departments.id)}
                  className="btn btn-danger"
                  style={{ margin: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListDepartment;
