import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { addNewMemberToTeam, createNewTeamMember, getTeamMemberList } from '../Service/TeamService';
import { toast } from 'react-toastify';
import { getTeamList } from './../Service/TeamService';

function TeamMembers() {

  let [teamList, setTeamList] = useState([]);
  let [teamMemberList, setTeamMemberList] = useState([]);
  let initialValues = {
    member_name: "",
  };

  useEffect(() => {
    getTeamMemberList("get-team-member-list").then((result) => {
      if (result === undefined) return false;
      console.log(result.teamMemberList);
      teamMemberList = [];
      teamMemberList = result.teamMemberList;
      setTeamMemberList(teamMemberList);
    });

  }, [teamMemberList]);



  let onSubmit = (values, onSubmitProps) => {
    console.log(values.member_name);
    let newTeamDetails = {
      member_name: values.member_name,
      assignment_list: []
    };
    console.log(newTeamDetails);
    createNewTeamMember("create-new-team-member", newTeamDetails).then((result) => {
      if (result === undefined) {
        toast.error("Unable to Create New Team Member");
      }
      onSubmitProps.resetForm();
    });
  };


  return (
    <div className="card col-md-12 m-2">
      <div className="card col-md-6 m-2">
        <h5 className="card-title">Create Team</h5>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <div className="card-body">
              <div className="mb-3 row">
                <label htmlFor="teamName" className="col-sm-4 col-form-label">Team Member Name</label>
                <div className="col-sm-8">
                  <Field type="text" className="form-control" name="member_name" />
                </div>
              </div>
              <button type='submit' className="btn btn-primary">Create Team Member</button>
            </div>
          </Form>
        </Formik>
      </div>

      <div className="card col-md-6 m-2">

        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Team Member Name</th>
            </tr>
          </thead>

          <tbody>
            {teamMemberList.map((team, index) => {
              return (
                <tr key={index}>
                  {/* <th scope="row">1</th> */}
                  <td>{index}</td>
                  <td>{team.member_name}</td>
                </tr>)
            })
            }
          </tbody>
        </table>
      </div>

    </div>
  )

}

export default TeamMembers