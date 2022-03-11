import React, { useEffect, useState } from 'react';
import { getTeamList, createNewTeam, getTeamMemberList, getTeamMemberByID, getTeamByID, addNewMemberToTeam } from './../Service/TeamService';
import { Formik, Form, Field } from "formik";
import { toast } from 'react-toastify';

function Teams() {
    let [teamList, setTeamList] = useState([]);
    let [teamOptions, setTeamOptions] = useState([]);
    let [teamMemberList, setTeamMemberList] = useState([]);
    let [teamMember, setTeamMember] = useState();
    let [teamID, setTeamID] = useState();
    let [teamMemberDetails, setTeamMemberDetails] = useState({});
    let [teamDetails, setTeamDetails] = useState({});


    let initialValues = {
        team_name: "",
    };

    let teamInitials = {
        team_member: "",
        team_name:""
    };

    useEffect(() => {
        getTeamList("get-team-list").then((result) => {
            if (result === undefined) return false;
            console.log(result.teamList);
            teamList = [];
            teamList = result.teamList;
            setTeamList(teamList);


            teamOptions = [];
            teamOptions.push({ value: 0, name: "-Select Team-" });
            if (result.teamList.length === 0)
                teamOptions.push({ value: undefined, name: "No Team Found" });
            else {
                result.teamList.forEach((team) => {
                    console.log(team);
                    teamOptions.push({
                        value: team._id,
                        name: team.team_name,
                    });
                });
            }

            // teamMemberList = result.teamMemberList;
            console.log(teamOptions);
            setTeamOptions([...teamOptions]);
        });
    }, []);

    useEffect(() => {

        getTeamMemberList("get-team-member-list").then((result) => {
            if (result === undefined) return false;
            console.log(result.teamMemberList);
            teamMemberList = [];
            teamMemberList.push({ value: 0, name: "-Select Member-" });
            if (result.teamMemberList.length === 0)
                teamMemberList.push({ value: undefined, name: "No Member Found" });
            else {
                result.teamMemberList.forEach((tMember) => {
                    console.log(tMember);
                    teamMemberList.push({
                        value: tMember._id,
                        name: tMember.member_name,
                    });
                });
            }

            // teamMemberList = result.teamMemberList;
            console.log(teamMemberList);
            setTeamMemberList([...teamMemberList]);
        });
    }, []);



    let onSubmit = (values, onSubmitProps) => {
        console.log(values.team_name);
        let newTeamDetails = {
            team_name: values.team_name,
            team_members: []
        };
        console.log(newTeamDetails);
        createNewTeam("create-new-team", newTeamDetails).then((result) => {
            if (result === undefined) {
                toast.error("Unable to Create New Team")
            }
            onSubmitProps.resetForm();
        });
    };

    useEffect(()=>{
        getTeamMemberByID("get-team-member-by-id",teamMember).then((result) => {
            if(result===undefined)return false;
            if(result.teamMemberDetails.length>0) {
                // console.log(result.teamMemberDetails[0]);
                // teamMemberDetails={};
                setTeamMemberDetails({...teamMemberDetails});
                teamMemberDetails=result.teamMemberDetails[0];
                setTeamMemberDetails({...teamMemberDetails});
            }
        });

    },[teamMember]);
    
    useEffect(()=>{
        getTeamByID("get-team-by-id",teamID).then((result) => {
            if(result===undefined)return false;
            if(result.teamList.length>0) {
                // console.log(result.teamMemberDetails[0]);
                // teamMemberDetails={};
                setTeamDetails({...teamDetails});
                teamDetails=result.teamList[0];
                setTeamDetails({...teamDetails});
            }
        });

    },[teamMember]);

    let onAddMember = (values, onSubmitProps) => {
        // console.log(teamMember);
        console.log(teamID);
        
        console.log(teamMemberDetails);
        console.log(teamDetails);

        let teamMembers = [];
        teamMembers.push(teamMemberDetails);

        let sendData = {
            _id:teamDetails._id,
            team_name:teamDetails.team_name,
            team_members:teamMembers
        };

        addNewMemberToTeam("add-new-member-to-team",sendData).then((result) => {
            if(result===undefined) return false;
            console.log(result);
        });

    }


    return (<>
        <div className="card col-md-12 m-2">
            <div className="card col-md-6 m-2">
                <h5 className="card-title">Create Team</h5>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    <Form>
                        <div className="card-body">
                            <div className="mb-3 row">
                                <label htmlFor="teamName" className="col-sm-2 col-form-label">Team Name</label>
                                <div className="col-sm-10">
                                    <Field type="text" className="form-control" name="team_name" />
                                </div>
                            </div>
                            <button type='submit' className="btn btn-primary">Create Team</button>
                        </div>
                    </Form>
                </Formik>
            </div>
            <div className="card col-md-6 m-2">

                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Team Name</th>

                        </tr>
                    </thead>

                    <tbody>
                        {teamList.map((team, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{team.team_name}</td>
                                </tr>)
                        })
                        }
                    </tbody>
                </table>
            </div>
        </div>

        <div className="card col-md-6 m-2">
            <h5 className="card-title">Create Team</h5>
            <Formik initialValues={teamInitials} onSubmit={onAddMember}>
                <Form>
                    <div className="card-body">
                        <div className="mb-3 row">
                            <label htmlFor="teamName" className="col-sm-4 col-form-label">Add Member to Team</label>
                            <div className="col-sm-8">
                            <Field
                                    name="team_name"
                                    as="select"
                                    className="form-select"
                                    onChange={(e) => setTeamID(e.target.value)}
                                    value={teamID}
                                >
                                    {teamOptions.map((team, index) => (
                                        <option key={index} value={team.value}>
                                            {team.name}
                                        </option>
                                    ))}
                                </Field>
                                <Field
                                    name="team_member"
                                    as="select"
                                    className="form-select"
                                    onChange={(e) => setTeamMember(e.target.value)}
                                    value={teamMember}
                                >
                                    {teamMemberList.map((tMember, index) => (
                                        <option key={index} value={tMember.value}>
                                            {tMember.name}
                                        </option>
                                    ))}
                                </Field>
                            </div>
                        </div>
                        <button type='submit' className="btn btn-primary">Add Member</button>
                    </div>
                </Form>
            </Formik>

        </div>
    </>
    )
}

export default Teams;