CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  display_name VARCHAR(255) NOT NULL,
  keycloak_id VARCHAR(255)
);

CREATE TABLE team (
  id INT PRIMARY KEY,
  team_name VARCHAR(255) NOT NULL
);

CREATE TABLE member_role (
  id INT PRIMARY KEY,
  permission VARCHAR(255) NOT NULL
);

CREATE TABLE team_member (
  user_id INT,
  team_id INT,
  permission_role INT,
  FOREIGN KEY (permission_role) REFERENCES member_role(id),
  FOREIGN KEY (user_id) REFERENCES employee(id),
  FOREIGN KEY (team_id) REFERENCES team(id)
);

CREATE TABLE template (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  detail VARCHAR(255),
  content TEXT,
  owner_id INT,
  team_id INT,
  editable BOOLEAN,
  last_amend_date DATETIME,
  FOREIGN KEY (owner_id) REFERENCES employee(id),
  FOREIGN KEY (team_id) REFERENCES team(id)
);
