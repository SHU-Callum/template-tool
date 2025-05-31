// Mock data for testing purposes with Mock Service Worker

export const GET_TEMPLATES_BY_PARAMS_DATA = [
  {
    id: 1,
    title: 'Welcome Email',
    detail: 'Template for welcoming new users',
    content: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Dear "},{"type":"textInput","attrs":{"placeholder":"Enter text here...","id":"1748291257933-cgltgua","value":"name"}},{"type":"text","text":","}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"Welcome to our service! We are glad to have you."}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"Best regards,"}]},{"type":"paragraph","content":[{"type":"text","text":"The Team"}]}]}',
    ownerId: 1,
    teamId: 1,
    editable: true,
    lastAmendDate: '2025-02-16T10:00:00Z'
  },
  {
    id: 2,
    title: 'Password Reset',
    detail: 'Template for password reset instructions',
    content: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Dear "},{"type":"textInput","attrs":{"placeholder":"Enter text here...","id":"1748291326083-aqaygnk","value":"name"}},{"type":"text","text":","}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"You requested a password reset. "}]},{"type":"paragraph","content":[{"type":"text","text":"Click the link below to reset your password:"}]},{"type":"paragraph","content":[{"type":"textInput","attrs":{"placeholder":"Enter text here...","id":"1748291331680-mwgezw7","value":"reset link"}}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"Best regards,"}]},{"type":"paragraph","content":[{"type":"text","text":"The Team"}]}]}',
    ownerId: 2,
    teamId: 1,
    editable: false,
    lastAmendDate: '2025-02-16T10:00:00Z'
  }
]

export const GET_TEMPLATES_BY_PARAMS_DATA_2 = [
  {
    id: 1,
    title: 'Welcome Email',
    detail: 'Template for welcoming new users',
    content: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Dear "},{"type":"textInput","attrs":{"placeholder":"Enter text here...","id":"1748291257933-cgltgua","value":"name"}},{"type":"text","text":","}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"Welcome to our service! We are glad to have you."}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"Best regards,"}]},{"type":"paragraph","content":[{"type":"text","text":"The Team"}]}]}',
    ownerId: 1,
    teamId: 1,
    editable: true,
    lastAmendDate: '2025-02-16T10:00:00Z'
  },
]

export const GET_TEAMS_BY_USER_DATA = [
  {
    id: 1,
    teamName: 'Team 1',
    ownerIds: [3],
    members: [1, 2, 3]
  },
  {
    id: 2,
    teamName: 'Team 2',
    ownerIds: [2],
    members: [1, 3, 4]
  },
  {
    id: 3,
    teamName: 'My Test Team',
    ownerIds: [1],
    members: [1, 4]
  }
]

export const GET_TEMPLATES_BY_TEAMS_DATA = [
  {
    id: 1,
    title: 'Welcome Email',
    detail: 'Template for welcoming new users',
    content: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Dear "},{"type":"textInput","attrs":{"placeholder":"Enter text here...","id":"1748291257933-cgltgua","value":"name"}},{"type":"text","text":","}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"Welcome to our service! We are glad to have you."}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"Best regards,"}]},{"type":"paragraph","content":[{"type":"text","text":"The Team"}]}]}',
    ownerId: 1,
    teamId: 1,
    editable: true,
    lastAmendDate: '2025-02-16T10:00:00Z'
  },
  {
    id: 2,
    title: 'Password Reset',
    detail: 'Template for password reset instructions',
    content: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Dear "},{"type":"textInput","attrs":{"placeholder":"Enter text here...","id":"1748291326083-aqaygnk","value":"name"}},{"type":"text","text":","}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"You requested a password reset. "}]},{"type":"paragraph","content":[{"type":"text","text":"Click the link below to reset your password:"}]},{"type":"paragraph","content":[{"type":"textInput","attrs":{"placeholder":"Enter text here...","id":"1748291331680-mwgezw7","value":"reset link"}}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"Best regards,"}]},{"type":"paragraph","content":[{"type":"text","text":"The Team"}]}]}',
    ownerId: 2,
    teamId: 1,
    editable: false,
    lastAmendDate: '2025-02-16T10:00:00Z'
  },
  {
    id: 3,
    title: 'Account Activation',
    detail: 'Template for account activation',
    content: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Dear "},{"type":"textInput","attrs":{"placeholder":"Enter text here...","id":"1748222973732-dfvtg2j","value":"name"}},{"type":"text","text":","}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"Please activate your account by clicking the link below:"}]},{"type":"paragraph","content":[{"type":"textInput","attrs":{"placeholder":"Enter text here...","id":"1748222978666-wv6z2u1","value":"activation link"}}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"Best regards,"}]},{"type":"paragraph","content":[{"type":"text","text":"The Team"}]}]}',
    ownerId: 2,
    teamId: 3,
    editable: false,
    lastAmendDate: '2025-02-16T10:00:00Z'
  },
]

export const GET_USER_DETAILS_DATA = 
{
  id: 1,
  email: 'user1@example.com',
  displayName: 'User One',
  keycloakId: 'abc123'
}
