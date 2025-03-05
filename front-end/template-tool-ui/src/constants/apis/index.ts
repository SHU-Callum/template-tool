// Application URLs
const apiUrl = import.meta.env.VITE_API_URL; // url from .env file

export const API_BASE_URL = `${apiUrl}/api`;

export const API_ROUTES = {
  GET_TEMPLATE_URL: (templateId: number) => `${API_BASE_URL}/template/${templateId}`,
  GET_TEMPLATES_BY_USER_URL: (userId: string) => `${API_BASE_URL}/templates/${userId}`,
  GET_TEMPLATES_BY_SEARCH: (text: string) => `${API_BASE_URL}/templates?search=${text}`,
  DELETE_TEMPLATE_URL: (templateId: string) => `${API_BASE_URL}/template/${templateId}/delete`,
  UPDATE_TEMPLATE_URL: (templateId: string) => `${API_BASE_URL}/template/${templateId}/update`,
  CREATE_TEMPLATE_URL: `${API_BASE_URL}/template/create`,

  GET_TEAM_URL: (teamId: string) => `${API_BASE_URL}/team/${teamId}`,
  GET_TEAMS_BY_USER_URL: (userId: string) => `${API_BASE_URL}/teams/${userId}`,
  GET_TEAMS_BY_SEARCH: `${API_BASE_URL}/teams/search`,
  DELETE_TEAM_URL: (teamId: string) => `${API_BASE_URL}/team/${teamId}/delete`,
  UPDATE_TEAM_URL: (teamId: string) => `${API_BASE_URL}/team/${teamId}/update`,
  CREATE_TEAM_URL: `${API_BASE_URL}/team/create`,
};