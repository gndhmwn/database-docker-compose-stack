# PostgreSQL and pgAdmin Docker Stack

This project provides a complete PostgreSQL database setup with pgAdmin 4 web interface using Docker Compose.

## Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+

## Configuration

The configuration is managed through the `.env` file. Make sure to review and modify the following variables before starting:

### Environment Variables

```env
# PostgreSQL Database
POSTGRES_DB=mydatabase              # Default database name
POSTGRES_USER=postgres              # Database user
POSTGRES_PASSWORD=postgres_password # Database password
POSTGRES_PORT=5432                  # Port exposed on host

# pgAdmin Web Interface
PGADMIN_DEFAULT_EMAIL=admin@example.com  # pgAdmin login email
PGADMIN_DEFAULT_PASSWORD=pgadmin_password # pgAdmin login password
PGADMIN_PORT=5050                  # Port for pgAdmin web interface
```

**Security Notice:** Change the default passwords before deploying to production!

## Quick Start

1. **Clone or navigate to the project directory**
   ```bash
   cd /path/to/docker-stack
   ```

2. **Review and update the `.env` file**
   ```bash
   nano .env  # or use your preferred editor
   ```

3. **Start the containers**
   ```bash
   docker-compose up -d
   ```

4. **Check container status**
   ```bash
   docker-compose ps
   ```

5. **Access pgAdmin**
   - Open your browser and navigate to: `http://localhost:5050`
   - Login with the credentials from your `.env` file

## Connecting to PostgreSQL

### Using pgAdmin

1. Open pgAdmin at `http://localhost:5050`
2. Login with your pgAdmin credentials
3. Click "Add New Server"
4. Configure the connection:
   - **Name**: `PostgreSQL-Docker` (or any name you prefer)
   - **Host**: `postgres` (container name) or `localhost:5432`
   - **Port**: `5432`
   - **Username**: `postgres` (from `.env`)
   - **Password**: `postgres_password` (from `.env`)

### Using psql CLI

```bash
docker exec -it postgres-db psql -U postgres -d mydatabase
```

### Using Docker Compose

```bash
docker-compose exec postgres psql -U postgres -d mydatabase
```

### Connection String

```
postgresql://postgres:postgres_password@localhost:5432/mydatabase
```

## Docker Compose Commands

### Start containers
```bash
docker-compose up -d
```

### Stop containers
```bash
docker-compose down
```

### Stop and remove volumes
```bash
docker-compose down -v
```

### View logs
```bash
# All logs
docker-compose logs

# PostgreSQL logs only
docker-compose logs postgres

# pgAdmin logs only
docker-compose logs pgadmin

# Follow logs in real-time
docker-compose logs -f
```

### Restart containers
```bash
docker-compose restart
```

### Rebuild containers
```bash
docker-compose up -d --build
```

## Project Structure

```
docker-stack/
├── docker-compose.yml      # Docker Compose configuration
├── .env                    # Environment variables
├── init-scripts/          # SQL initialization scripts (optional)
└── README.md              # This file
```

## Initialization Scripts

You can place SQL initialization scripts in the `init-scripts/` directory. These scripts will be executed automatically when the PostgreSQL container starts for the first time.

Example:
```bash
mkdir init-scripts
```

Create a file `init-scripts/01-init.sql`:
```sql
-- Create additional users
CREATE USER app_user WITH PASSWORD 'app_password';

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE mydatabase TO app_user;

-- Create additional schema
CREATE SCHEMA IF NOT EXISTS app_schema;
```

## Volumes

The following Docker volumes are created for data persistence:

- `postgres_data`: Stores PostgreSQL data files
- `pgadmin_data`: Stores pgAdmin configuration and preferences

These volumes persist even after containers are stopped, ensuring your data is not lost.

## Network

Both containers are connected to a bridge network named `app-network`, allowing them to communicate with each other using their container names.

## Health Checks

The PostgreSQL container includes a health check that verifies the database is ready before pgAdmin attempts to connect. This ensures proper startup sequencing.

## Troubleshooting

### Containers won't start
```bash
# Check logs for errors
docker-compose logs

# Remove existing volumes and start fresh
docker-compose down -v
docker-compose up -d
```

### Can't connect to pgAdmin
- Ensure port 5050 is not already in use
- Check firewall settings
- Verify pgAdmin container is running: `docker-compose ps`

### PostgreSQL connection issues
- Verify PostgreSQL container is healthy: `docker-compose ps`
- Check PostgreSQL logs: `docker-compose logs postgres`
- Ensure you're using the correct credentials from `.env`

### Reset the entire stack
```bash
docker-compose down -v
rm -rf postgres_data pgadmin_data  # If using named volumes locally
docker-compose up -d
```

## Security Considerations

1. **Change default passwords** before deploying to production
2. **Use strong passwords** for both PostgreSQL and pgAdmin
3. **Don't commit** `.env` file to version control
4. **Use environment-specific** configurations (dev, staging, production)
5. **Consider using** Docker secrets or external secret management for production
6. **Restrict network access** - consider not exposing PostgreSQL port publicly in production

## Production Deployment

For production deployments, consider:

1. Using official PostgreSQL images with version pinning
2. Implementing proper backup strategies
3. Configuring SSL connections
4. Setting up resource limits in docker-compose.yml
5. Using external volume management
6. Implementing proper logging and monitoring

## License

This configuration is provided as-is for educational and development purposes.

## Support

For issues related to:
- **Docker**: [Docker Documentation](https://docs.docker.com/)
- **PostgreSQL**: [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- **pgAdmin**: [pgAdmin Documentation](https://www.pgadmin.org/docs/)