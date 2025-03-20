// Mock data for testing purposes with Mock Service Worker

export const GET_TEMPLATE_DATA = {
  id: 1,
  title: 'Welcome Email',
  detail: 'Template for welcoming new users',
  content: '{"Dear {{name}},\n\nWelcome to our service! We are glad to have you.\n\nBest regards,\nThe Team"}',
  ownerId: 1,
  team_id: 1,
  editable: true,
  lastAmendDate: '2025-02-16T10:00:00Z'
}

export const GET_TEMPLATES_BY_SEARCH_DATA = [
  {
    id: 1,
    title: 'Welcome Email',
    detail: 'Template for welcoming new users',
    content: '{"Dear {{name}},\n\nWelcome to our service! We are glad to have you.\n\nBest regards,\nThe Team"}',
    ownerId: 1,
    teamId: 1,
    editable: true,
    lastAmendDate: '2025-02-16T10:00:00Z'
  },
  {
    id: 2,
    title: 'Goodbye Email',
    detail: 'Template for saying goodbye to users',
    content: '{"Dear {{name}},\n\nWe are sorry to see you go. Please come back soon!\n\nBest regards,\nThe Team"}',
    ownerId: 1,
    team_id: 1,
    editable: true,
    lastAmendDate: '2025-02-16T10:00:00Z'
  }
]

export const GET_TEAMS_BY_USER_DATA = [
  {
    id: 1,
    name: 'Team 1',
    ownerId: 3,
    members: [1, 2, 3]
  },
  {
    id: 2,
    name: 'Team 2',
    ownerId: 2,
    members: [1, 3, 4]
  },
  {
    id: 3,
    name: 'My Test Team',
    ownerId: 1,
    members: [1, 4]
  }
]

export const GET_TEMPLATES_BY_TEAMS_DATA = [
  {
    id: 1,
    title: 'Welcome Email',
    detail: 'Template for welcoming new users',
    content: '{"Dear {{name}},\n\nWelcome to our service! We are glad to have you.\n\nBest regards,\nThe Team"}',
    ownerId: 1,
    teamId: 1,
    editable: true,
    lastAmendDate: '2025-02-16T10:00:00Z'
  },
  {
    id: 2,
    title: 'Goodbye Email',
    detail: 'Template for saying goodbye to users',
    content: '{"Dear {{name}},\n\nWe are sorry to see you go. Please come back soon!\n\nBest regards,\nThe Team"}',
    ownerId: 1,
    team_id: 1,
    editable: true,
    lastAmendDate: '2025-02-16T10:00:00Z'
  },
  {
    id: 2,
    title: 'Test Email',
    detail: 'Test Template',
    content: '{"Dear {{name}},\n\nInsert here.\n\nBest regards,\nThe Team"}',
    ownerId: 2,
    team_id: 1,
    editable: false,
    lastAmendDate: '2025-02-16T10:00:00Z'
  },
]