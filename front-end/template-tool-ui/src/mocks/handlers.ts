// Mocks API requests using MSW (Mock Service Worker)
// Intercepts the below API requests

import { http, HttpResponse } from 'msw'
import { API_BASE_URL } from '../constants/apis'
import { GET_TEAMS_BY_USER_DATA, GET_TEMPLATES_BY_SEARCH_DATA, GET_TEMPLATES_BY_TEAMS_DATA } from './data'
 
export const handlers = [
  http.get('/', () => {
    return HttpResponse.text('Hello, World!')
  }),

  // Intercept "GET localhost/api/templates/?search=*" requests...
  http.get(`${API_BASE_URL}/templates`, ({request}) => {
    const url = new URL(request.url);
    const textParam = url.searchParams.get('search')
    if (!textParam) {
      return HttpResponse.json({ error: 'Search value cannot be empty' }, { status: 400 })
    }
    return HttpResponse.json(GET_TEMPLATES_BY_SEARCH_DATA)
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
  })
]