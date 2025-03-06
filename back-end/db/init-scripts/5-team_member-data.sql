INSERT INTO team_member (user_id, team_id, permission_role) VALUES
(1, 1, 3), -- John Doe as OWNER in Development Team
(2, 1, 2), -- Jane Smith as CREATE in Development Team
(6, 1, 1), -- David Wilson as MEMBER in Development Team

(2, 2, 3), -- Jane Smith as OWNER in Marketing Team
(7, 2, 2), -- Emma Thomas as CREATE in Marketing Team
(3, 2, 1), -- Alice Jones as MEMBER in Marketing Team

(3, 3, 3), -- Alice Jones as OWNER in Sales Team
(8, 3, 2), -- Frank Martin as CREATE in Sales Team
(7, 3, 2), -- Emma Thomas as CREATE in Marketing Team
(4, 3, 1), -- Bob Brown as MEMBER in Sales Team

(4, 4, 3), -- Bob Brown as OWNER in Support Team
(5, 4, 2), -- Charlie Davis as CREATE in Support Team
(9, 4, 1), -- Grace Lee as MEMBER in Support Team

(5, 5, 3), -- Charlie Davis as OWNER in HR Team
(10, 5, 2), -- Henry Clark as CREATE in HR Team
(1, 5, 1); -- John Doe as MEMBER in HR Team