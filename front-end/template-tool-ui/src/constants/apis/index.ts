// Application URLs
const apiHost = import.meta.env.VITE_API_HOST; // host from .env file
const apiPort = import.meta.env.VITE_API_PORT; // port from .env file
const apiUrl = `http://${apiHost}:${apiPort}`; // format the URL

export const API_BASE_URL = `${apiUrl}/api`;

export const API_ROUTES = {
  GET_TEMPLATE_URL: (templateId: number) => `${API_BASE_URL}/template/${templateId}`,
  GET_TEMPLATES_BY_TEAMS: (eTeamIds: string) => `${API_BASE_URL}/templates/all?teams=${eTeamIds}`,
  GET_TEMPLATES_BY_PARAMS: (params: string) => `${API_BASE_URL}/templates?search=${params}`,
  DELETE_TEMPLATE: (templateId: string) => `${API_BASE_URL}/templates/${templateId}/delete`,
  UPDATE_TEMPLATE: (templateId: string) => `${API_BASE_URL}/templates/${templateId}/update`,
  CREATE_TEMPLATE: `${API_BASE_URL}/templates/create`,

  GET_TEAM_URL: (teamId: string) => `${API_BASE_URL}/team/${teamId}`,
  GET_TEAMS_BY_USER: (eUserId: string) => `${API_BASE_URL}/teams/all?user=${eUserId}`,
  GET_MEMBERS_BY_TEAM: (eTeamId: string) => `${API_BASE_URL}/teams/users?team=${eTeamId}`,
  GET_TEAMS_BY_SEARCH: `${API_BASE_URL}/teams/search`,
  DELETE_TEAM_URL: (teamId: string) => `${API_BASE_URL}/team/${teamId}/delete`,
  UPDATE_TEAM_URL: (teamId: string) => `${API_BASE_URL}/team/${teamId}/update`,
  CREATE_TEAM_URL: `${API_BASE_URL}/team/create`,

  GET_USER_DETAILS: (keycloakId: string) => `${API_BASE_URL}/user?kcid=${keycloakId}`
};