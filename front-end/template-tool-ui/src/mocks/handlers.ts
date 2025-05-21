// Mocks API requests using MSW (Mock Service Worker)
// Intercepts the below API requests

import { http, HttpResponse } from 'msw'
import { API_BASE_URL } from '../constants/apis'
import { GET_TEAMS_BY_USER_DATA, GET_TEMPLATES_BY_PARAMS_DATA, GET_TEMPLATES_BY_PARAMS_DATA_2, GET_TEMPLATES_BY_TEAMS_DATA, GET_USER_DETAILS_DATA } from './data'
import { decryptParameter } from '../utils/encryption'
 
export const handlers = [
  http.get('/', () => {
    return HttpResponse.text('Hello, World!')
  }),

  // Intercept "GET localhost/api/templates/?search=*" requests...
  http.get(`${API_BASE_URL}/templates`, ({request}) => {
    const headers = request.headers;
    const url = new URL(request.url);
    const paramString = url.searchParams.get('search')
    if (!paramString) {
      return HttpResponse.json({ error: 'Search value cannot be empty' }, { status: 400 })
    }
    const params = JSON.parse(decryptParameter(paramString, headers.get('encryption-iv') || ''));
    const { searchText } = params;
    if (!searchText || searchText.length < 1) {
      return HttpResponse.json(GET_TEMPLATES_BY_PARAMS_DATA)
    }
    return HttpResponse.json(GET_TEMPLATES_BY_PARAMS_DATA_2)
  }),

  // Intercept "GET localhost/api/templates/all?teams=*" requests...
  http.get(`${API_BASE_URL}/templates/all`, ({request}) => {
    const url = new URL(request.url);
    const teamsParam = url.searchParams.get('teams')
    if (!teamsParam) {
      return HttpResponse.json({ error: 'User is not part of any teams' }, { status: 400 })
    }
    return HttpResponse.json(GET_TEMPLATES_BY_TEAMS_DATA)
  }),

  // Intercept "GET localhost/api/teams/all?user=*" requests...
  http.get(`${API_BASE_URL}/teams/all`, async ({ request }) => {
    const url = new URL(request.url);
    const userParam = url.searchParams.get('user')
    if (!userParam || userParam.length < 1) {
      return HttpResponse.json({ error: 'User ID cannot be empty' }, { status: 400 });
    }
    return HttpResponse.json(GET_TEAMS_BY_USER_DATA);
  }),

  // Intercept "GET localhost/api/user?kcid=*" requests...
  http.get(`${API_BASE_URL}/user`, async ({ request }) => {
    const url = new URL(request.url);
    const userParam = url.searchParams.get('kcid')
    if (!userParam || userParam.length < 1) {
      return HttpResponse.json({ error: 'User ID cannot be empty' }, { status: 400 });
    }
    return HttpResponse.json(GET_USER_DETAILS_DATA);
  })
]