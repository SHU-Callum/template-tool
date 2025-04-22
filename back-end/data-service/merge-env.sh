#!/bin/bash

# Paths to the .env files
UI_ENV="../../front-end/template-tool-ui/.env.development"
DB_ENV="../db/.env.dev"
COMBINED_ENV_FILE="./.combined.env"

# Combine the .env files
(cat "$UI_ENV"; echo ""; cat "$DB_ENV") > "$COMBINED_ENV_FILE"

echo "Data Service .env file created in data-service/ $COMBINED_ENV_FILE"