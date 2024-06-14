// Define action types
export const SET_PROJECTS = "SET_PROJECTS";
export const SET_PROJECTS_NULL = "SET_PROJECTS_NULL";


// Action creator for setting projects
export const setProjects = (projects) => {
    return {
      type: SET_PROJECTS,
      payload: projects // Corrected to use 'projects' instead of 'user'
    }
  }
  
  // Action creator for clearing projects
  export const setProjectsNull = () => {
    return {
      type: SET_PROJECTS_NULL
    }
  }