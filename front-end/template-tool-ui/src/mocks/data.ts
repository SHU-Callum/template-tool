export const GET_TEMPLATE_DATA = {
  id: 1,
  title: 'Welcome Email',
  detail: 'Template for welcoming new users',
  content: '{"Dear {{name}},\n\nWelcome to our service! We are glad to have you.\n\nBest regards,\nThe Team"}',
  owner_id: 1,
  team_id: 1,
  editable: true,
  last_amend_date: '2025-02-16T10:00:00Z'
}

export const GET_TEMPLATES_BY_SEARCH_DATA = [
  {
    id: 1,
    title: 'Welcome Email',
    detail: 'Template for welcoming new users',
    content: '{"Dear {{name}},\n\nWelcome to our service! We are glad to have you.\n\nBest regards,\nThe Team"}',
    owner_id: 1,
    team_id: 1,
    editable: true,
    last_amend_date: '2025-02-16T10:00:00Z'
  },
  {
    id: 2,
    title: 'Goodbye Email',
    detail: 'Template for saying goodbye to users',
    content: '{"Dear {{name}},\n\nWe are sorry to see you go. Please come back soon!\n\nBest regards,\nThe Team"}',
    owner_id: 1,
    team_id: 1,
    editable: true,
    last_amend_date: '2025-02-16T10:00:00Z'
  }
]