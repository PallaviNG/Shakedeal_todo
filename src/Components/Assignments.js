import React, { useEffect, useState } from 'react'
import { getAssignmentList, createNewAssignment } from './../Service/TeamService';
import { toast } from 'react-toastify';
import { Field, Form,Formik } from 'formik';

function Assignments() {
  let [assignmentList, setAssignmentList] = useState([]);
  let initialValues = {
    assignment_title: "",
  };

  useEffect(() => {
      getAssignmentList("get-assignment-list").then((result) => {
          if (result === undefined) return false;
          console.log(result.assignmentList);
          assignmentList = [];
          assignmentList = result.assignmentList;
          setAssignmentList(assignmentList);
      });

  }, [assignmentList]);
  let onSubmit = (values, onSubmitProps) => {
      console.log(values.assignment_title);
      let newAssignmentDetails = {
        assignment_title: values.assignment_title,
          
      };
      console.log(newAssignmentDetails);
      createNewAssignment("create-new-assignment", newAssignmentDetails).then((result) => {
          if (result === undefined) {
              toast.error("Unable to Create New Assignment")
          }
          onSubmitProps.resetForm();
      });
  };


  return (
      <div className="card col-md-12 m-2">
          <div className="card col-md-6 m-2">
              <h5 className="card-title">Create New Assignment</h5>
              <Formik initialValues={initialValues} onSubmit={onSubmit}>
                  <Form>
                      <div className="card-body">
                          <div className="mb-3 row">
                              <label htmlFor="teamName" className="col-sm-4 col-form-label">Assignment Name</label>
                              <div className="col-sm-8">
                                  <Field type="text" className="form-control" name="assignment_title" />
                              </div>
                          </div>
                          <button type='submit' className="btn btn-primary">Create Assignment</button>
                      </div>
                  </Form>
              </Formik>
          </div>
          <div className="card col-md-6 m-2">

              <table className="table table-striped table-hover">
                  <thead>
                      <tr>
                          <th scope="col">#</th>
                          <th scope="col">Assignment Name</th>

                      </tr>
                  </thead>

                  <tbody>
                      {assignmentList.map((assignment, index) => {
                          return (
                              <tr key={index}>
                                  {/* <th scope="row">1</th> */}
                                  <td>{index}</td>
                                  <td>{assignment.assignment_title}</td>
                              </tr>)
                      })
                      }
                  </tbody>
              </table>
          </div>
      </div>
  )
}

export default Assignments;