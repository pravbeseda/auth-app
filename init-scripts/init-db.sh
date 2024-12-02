#!/bin/bash
echo "Initializing shadow database..."

# Замена переменной ${MARIADB_SHADOW_DATABASE} на её значение
mysql -u root -p"${MARIADB_ROOT_PASSWORD}" <<EOF
CREATE DATABASE IF NOT EXISTS ${MARIADB_SHADOW_DATABASE};
GRANT ALL PRIVILEGES ON ${MARIADB_SHADOW_DATABASE}.* TO '${MARIADB_USER}'@'%';
FLUSH PRIVILEGES;
EOF

echo "Shadow database initialized."
