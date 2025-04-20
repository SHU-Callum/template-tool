// Mock data for testing purposes with Mock Service Worker

export const GET_TEMPLATES_BY_SEARCH_DATA = [
  {
    id: 1,
    title: 'Welcome Email',
    detail: 'Template for welcoming new users',
    content: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Dear {{name}},"}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"Welcome to our service! We are glad to have you."}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"Best regards,"}]},{"type":"paragraph","content":[{"type":"text","text":"The Team"}]}]}',
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
    teamId: 1,
    editable: true,
    lastAmendDate: '2025-02-16T10:00:00Z'
  }
]

export const GET_TEAMS_BY_USER_DATA = [
  {
    id: 1,
    teamName: 'Team 1',
    ownerId: 3,
    members: [1, 2, 3]
  },
  {
    id: 2,
    teamName: 'Team 2',
    ownerId: 2,
    members: [1, 3, 4]
  },
  {
    id: 3,
    teamName: 'My Test Team',
    ownerId: 1,
    members: [1, 4]
  }
]

export const GET_TEMPLATES_BY_TEAMS_DATA = [
  {
    id: 1,
    title: 'Welcome Email',
    detail: 'Template for welcoming new users',
    content: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Dear {{name}},"}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"Welcome to our service! We are glad to have you."}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"Best regards,"}]},{"type":"paragraph","content":[{"type":"text","text":"The Team"}]}]}',
    ownerId: 1,
    teamId: 1,
    editable: true,
    lastAmendDate: '2025-02-16T10:00:00Z'
  },
  {
    id: 2,
    title: 'Goodbye Email',
    detail: 'Template for saying goodbye to users',
    content: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Dear {{name}}, "}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"We are sorry to see you go. "}]},{"type":"paragraph","content":[{"type":"text","text":"Please come back soon! "}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"Best regards, "}]},{"type":"paragraph","content":[{"type":"text","text":"The Team"}]}]}',
    ownerId: 1,
    teamId: 1,
    editable: true,
    lastAmendDate: '2025-02-16T10:00:00Z'
  },
  {
    id: 2,
    title: 'Test Email',
    detail: 'Test Template',
    content: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Dear {{name}}, "}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"Insert here. "}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"Best regards, "}]},{"type":"paragraph","content":[{"type":"text","text":"The Team"}]}]}',
    ownerId: 2,
    teamId: 1,
    editable: false,
    lastAmendDate: '2025-02-16T10:00:00Z'
  },
]