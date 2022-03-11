import {
    base_url,
    get,
    post,
    put,
    deleteService,
    commonError,
  } from "./httpService";
  import { toast } from "react-toastify";
  
  export const getTeamList = async (url) => {
    try {
      let { data } = await get(base_url + url);
      return data;
    } catch (ex) {
      commonError(ex);
    }
  };
  
  export const getTeamByID = async (url, _id) => {
    try {
      let { data } = await post(base_url + url, { _id: _id });
      return data;
    } catch (error) {
      commonError(error);
    }
  }
  
  export const createNewTeam = async (url, sendData) => {
    try {
      let { data } = await post(base_url + url, sendData);
      toast.success("Created New Team Successfully!")
      return data;
    } catch (error) {
      commonError(error);
    }
  };
  export const removeTeam = async (url, _id) => {
    try {
      let { data } = await deleteService(base_url + url, { data: { _id } });
      toast.success("Deleted a Team!")
      return data;
    } catch (error) {
      commonError(error);
    }
  };
  
  export const getTeamMemberList = async (url) => {
    try {
      let { data } = await get(base_url + url);
      return data;
    } catch (ex) {
      commonError(ex);
    }
  };
  
  export const getTeamMemberByID = async (url, _id) => {
    try {
      let { data } = await post(base_url + url, { _id: _id });
      return data;
    } catch (error) {
      commonError(error);
    }
  }
  
  export const createNewTeamMember = async (url, sendData) => {
    try {
      let { data } = await post(base_url + url, sendData);
      toast.success("Created New Team Member Successfully!")
      return data;
    } catch (error) {
      commonError(error);
    }
  };
  export const removeTeamMember = async (url, _id) => {
    try {
      let { data } = await deleteService(base_url + url, { data: { _id } });
      toast.success("Deleted a Team Member!")
      return data;
    } catch (error) {
      commonError(error);
    }
  };
  
  export const getAssignmentList = async (url) => {
    try {
      let { data } = await get(base_url + url);
      return data;
    } catch (ex) {
      commonError(ex);
    }
  };
  
  export const getAssignmentByID = async (url, _id) => {
    try {
      let { data } = await post(base_url + url, { _id: _id });
      return data;
    } catch (error) {
      commonError(error);
    }
  }
  
  export const createNewAssignment = async (url, sendData) => {
    try {
      let { data } = await post(base_url + url, sendData);
      toast.success("Created New Assignment Successfully!")
      return data;
    } catch (error) {
      commonError(error);
    }
  };
  export const removeAssignment = async (url, _id) => {
    try {
      let { data } = await deleteService(base_url + url, { data: { _id } });
      toast.success("Deleted an Assignment!")
      return data;
    } catch (error) {
      commonError(error);
    }
  };

  export const assignTaskToMember = async(url,sendData) => {
    try {
      let { data } = await put(base_url + url,  sendData );
      toast.success("Assigned an Assignment!")
      return data;
    } catch (error) {
      commonError(error);
    }
  }

  export const  addNewMemberToTeam =  async(url,sendData) => {
    try {
      let { data } = await put(base_url + url,  sendData );
      toast.success("Added a Team Member to team!")
      return data;
    } catch (error) {
      commonError(error);
    }
  }