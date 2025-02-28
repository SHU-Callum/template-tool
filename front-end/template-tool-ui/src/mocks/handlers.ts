// src/mocks/handlers.js
import { http, HttpResponse } from 'msw'
import { API_ROUTES } from '../constants/apis'
import { GET_TEMPLATE_DATA } from './data'
 
export const handlers = [
  http.get('/', () => {
    return HttpResponse.text('Hello, World!')
  }
  ),
  // Intercept "GET localhost/api/template/1" requests...
  http.get(API_ROUTES.GET_TEMPLATE_URL(1), () => {
    return HttpResponse.json(GET_TEMPLATE_DATA)
  }),
]