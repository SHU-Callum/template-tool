// Mocks API requests using MSW (Mock Service Worker)
// Intercepts the below API requests

import { http, HttpResponse } from 'msw'
import { API_BASE_URL } from '../constants/apis'
import { GET_TEAMS_BY_USER_DATA, GET_TEMPLATES_BY_PARAMS_DATA, GET_TEMPLATES_BY_PARAMS_DATA_2, GET_TEMPLATES_BY_TEAMS_DATA, GET_USER_DETAILS_DATA, TEAM_MEMBERS_DATA } from './data'
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
      return HttpResponse.json(GET_TEMPLATES_BY_PARAMS_DATA) // Successful response
    }
    return HttpResponse.json(GET_TEMPLATES_BY_PARAMS_DATA_2) // Successful response
  }),

  // Intercept "GET localhost/api/templates/all?teams=*" requests...
  http.get(`${API_BASE_URL}/templates/all`, ({request}) => {
    const url = new URL(request.url);
    const teamsParam = url.searchParams.get('teams')
    if (!teamsParam) {
      return HttpResponse.json({ error: 'User is not part of any teams' }, { status: 400 })
    }
    return HttpResponse.json(GET_TEMPLATES_BY_TEAMS_DATA) // Successful response
  }),

  // Intercept "POST localhost/api/templates/create requests...
  http.post(`${API_BASE_URL}/templates/create`, async ({ request }) => {
    const body = await request.text();
    const headers = request.headers;
    const decryptedBody = JSON.parse(decryptParameter((body), headers.get('encryption-iv') || ''));
    if (!decryptedBody || Object.keys(decryptedBody).length === 0) {
      return HttpResponse.json({ error: 'Request body cannot be empty' }, { status: 400 });
    }
    return HttpResponse.json(decryptedBody, { status: 201 }); // Successful response
  }),

  // Intercept "PUT localhost/api/templates/*/update requests...
  http.put(`${API_BASE_URL}/templates/:id/update`, async ({ request }) => {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const templateId = pathParts[pathParts.indexOf('templates') + 1];
    if (!templateId || templateId.length < 1) {
      return HttpResponse.json({ error: 'Template ID cannot be empty' }, { status: 400 });
    }
    const body = await request.text();
    const headers = request.headers;
    const decryptedBody = JSON.parse(decryptParameter((body), headers.get('encryption-iv') || ''));
    if (!decryptedBody || Object.keys(decryptedBody).length === 0) {
      return HttpResponse.json({ error: 'Request body cannot be empty' }, { status: 400 });
    }
    return HttpResponse.json(decryptedBody); // Successful response
  }),

  // Intercept "DELETE localhost/api/templates/*/delete requests...
  http.delete(`${API_BASE_URL}/templates/:id/delete`, async ({ request }) => {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const templateId = pathParts[pathParts.indexOf('templates') + 1];
    if (!templateId || templateId.length < 1) {
      return HttpResponse.json({ error: 'Template ID cannot be empty' }, { status: 400 });
    }
    return HttpResponse.json(templateId); // Successful response
  }),

  // Intercept "GET localhost/api/teams/all?user=*" requests...
  http.get(`${API_BASE_URL}/teams/all`, async ({ request }) => {
    const url = new URL(request.url);
    const userParam = url.searchParams.get('user')
    if (!userParam || userParam.length < 1) {
      return HttpResponse.json({ error: 'User ID cannot be empty' }, { status: 400 });
    }
    return HttpResponse.json(GET_TEAMS_BY_USER_DATA); // Successful response
  }),

  // Intercept "GET localhost/api/teams/users?team=*" requests...
  http.get(`${API_BASE_URL}/teams/users`, async ({ request }) => {
    const url = new URL(request.url);
    const teamId = url.searchParams.get('team')
    if (!teamId || teamId.length < 1) {
      return HttpResponse.json({ error: 'Team ID cannot be empty' }, { status: 400 });
    }
    return HttpResponse.json(TEAM_MEMBERS_DATA); // Successful response
  }),

  // Intercept "PUT localhost/api/team/promote requests...
  http.put(`${API_BASE_URL}/teams/promote`, async ({ request }) => {
    const body = await request.text();
    const headers = request.headers;
    const decryptedBody = JSON.parse(decryptParameter((body), headers.get('encryption-iv') || ''));
    if (!decryptedBody || Object.keys(decryptedBody).length === 0) {
      return HttpResponse.json({ error: 'Request body cannot be empty' }, { status: 400 });
    }
    const { userId, teamId } = decryptedBody;
    if (!userId || userId.length < 1 || !teamId || teamId.length < 1) {
      return HttpResponse.json({ error: 'Member ID and Team ID cannot be empty' }, { status: 400 });
    }
    const updatedMembers = TEAM_MEMBERS_DATA.map(member => {
      return { ...member, isOwner: userId === member.id ? true : member.isOwner}; // Simulate promoting the member to owner
    })
    return HttpResponse.json(updatedMembers); // Successful response
  }),

  // Intercept "POST localhost/api/teams/add requests...
  http.post(`${API_BASE_URL}/teams/add`, async ({ request }) => {
    const body = await request.text();
    const headers = request.headers;
    const decryptedBody = JSON.parse(decryptParameter((body), headers.get('encryption-iv') || ''));
    if (!decryptedBody || Object.keys(decryptedBody).length === 0) {
      return HttpResponse.json({ error: 'Request body cannot be empty' }, { status: 400 });
    }
    const { email, teamId } = decryptedBody;
    if (!email || email.length < 1 || !teamId || teamId.length < 1) {
      return HttpResponse.json({ error: 'Email and Team ID cannot be empty' }, { status: 400 });
    }
    const newMember = {
      id: TEAM_MEMBERS_DATA.length + 1, // Simulate new member ID
      email: email,
      displayName: `User ${TEAM_MEMBERS_DATA.length + 1}`, // Simulate new member name
      isOwner: false // New members are not owners by default
    };
    return HttpResponse.json(newMember); // Successful response
  }),

  // Intercept "GET localhost/api/user?kcid=*" requests...
  http.get(`${API_BASE_URL}/user`, async ({ request }) => {
    const url = new URL(request.url);
    const userParam = url.searchParams.get('kcid')
    if (!userParam || userParam.length < 1) {
      return HttpResponse.json({ error: 'User ID cannot be empty' }, { status: 400 });
    }
    return HttpResponse.json(GET_USER_DETAILS_DATA); // Successful response
  })
]