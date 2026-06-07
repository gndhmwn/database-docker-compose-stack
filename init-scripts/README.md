# Initialization Scripts Directory

Place your SQL initialization scripts in this directory to have them automatically executed when the PostgreSQL container starts for the first time.

## How It Works

All `.sql` files in this directory are executed in alphabetical order when the PostgreSQL container initializes.

## File Naming Convention

Use a numeric prefix to control execution order:

- `01-create-users.sql`
- `02-create-schemas.sql`
- `03-create-tables.sql`
- `04-seed-data.sql`

## Example Script

```sql
-- Create additional users
CREATE USER app_user WITH PASSWORD 'secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE mydatabase TO app_user;

-- Create additional schema
CREATE SCHEMA IF NOT EXISTS app_schema;

-- Grant schema privileges
GRANT ALL ON SCHEMA app_schema TO app_user;
```

## Important Notes

- Scripts only run on **first initialization**
- To re-run scripts, you must remove the PostgreSQL volume: `docker-compose down -v`
- All scripts should be idempotent (safe to run multiple times)
- Use `IF NOT EXISTS` statements where possible