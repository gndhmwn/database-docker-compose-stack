# PostgreSQL, MongoDB, and pgAdmin Docker Stack

This project provides a complete database setup with PostgreSQL, MongoDB, and pgAdmin 4 web interface using Docker Compose.

## Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+

## Windows WSL2 Setup

If you're using Windows, you can run this Docker stack using WSL2 (Windows Subsystem for Linux). This provides a native Linux environment on Windows.

### Step 1: Enable WSL2

Open PowerShell as Administrator and run:

```powershell
wsl --install
```

After installation, restart your computer.

### Step 2: Install Docker Desktop for Windows

1. Download Docker Desktop from [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
2. During installation, ensure "Use WSL2 instead of Hyper-V" is checked
3. Start Docker Desktop and verify it's running

### Step 3: Access WSL2 Ubuntu

Open Ubuntu terminal (or any WSL distribution you installed):

```bash
# Navigate to your project directory
cd /mnt/c/Users/YourUsername/Documents/docker-stack

# Or clone the repository if needed
git clone https://github.com/gndhmwn/database-docker-compose-stack.git
cd docker-stack
```

### Step 4: Configure Environment Variables

Copy the example env file and update as needed:

```bash
cp .env.example .env  # if .env.example exists
nano .env  # or use code .env to open in VS Code
```

### Step 5: Start Docker Containers

```bash
docker-compose up -d
```

### Step 6: Access Services

- **pgAdmin**: Open browser and go to `http://localhost:5050`
- **PostgreSQL**: Connect via `localhost:5432`
- **MongoDB**: Connect via `localhost:27017`

### Important Notes for Windows Users

1. **File Path**: In WSL2, Windows drives are mounted at `/mnt/c/`, `/mnt/d/`, etc.
2. **Docker Daemon**: Make sure Docker Desktop is running before executing Docker commands
3. **Performance**: For better performance, keep project files in the WSL filesystem (e.g., `~/projects/`) rather than `/mnt/c/`
4. **Port Conflicts**: Ensure ports 5432, 5050, and 27017 are not used by other applications on Windows

### Troubleshooting WSL2 Issues

**Docker command not found:**
```bash
# Check if Docker is accessible
docker --version

# If not, start Docker in WSL
sudo service docker start

# Or add Docker to WSL integration in Docker Desktop settings
# Docker Desktop > Settings > Resources > WSL Integration > Enable Ubuntu
```

**Permission denied when running Docker:**
```bash
# Add your user to docker group
sudo usermod -aG docker $USER

# Log out and log back in, or run:
newgrp docker
```

**Slow performance:**
```bash
# Place your project in WSL home directory instead of /mnt/c/
cp -r /mnt/c/Users/YourUsername/Documents/docker-stack ~/docker-stack
cd ~/docker-stack
docker-compose up -d
```

**Windows Defender blocking Docker:**
```powershell
# Run PowerShell as Administrator
Add-Windows Defender Firewall Rule -DisplayName "Docker" -Direction Inbound -Protocol TCP -LocalPort 2375
```

## Linux Setup

This section covers how to set up and run this Docker stack on Linux systems (Ubuntu, Debian, Fedora, CentOS, etc.).

### Step 1: Install Docker Engine

**Ubuntu / Debian:**
```bash
# Update package index
sudo apt update

# Install prerequisites
sudo apt install -y ca-certificates curl gnupg lsb-release

# Add Docker GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Enable and start Docker
sudo systemctl enable docker
sudo systemctl start docker
```

**Fedora:**
```bash
# Add Docker repository
sudo dnf -y install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo

# Install Docker
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Enable and start Docker
sudo systemctl enable docker
sudo systemctl start docker
```

**CentOS / RHEL:**
```bash
# Add Docker repository
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# Install Docker
sudo yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Enable and start Docker
sudo systemctl enable docker
sudo systemctl start docker
```

### Step 2: Add Your User to Docker Group

```bash
# Add your user to the docker group
sudo usermod -aG docker $USER

# Log out and log back in for changes to take effect
# Or run the following to apply immediately:
newgrp docker
```

### Step 3: Verify Docker Installation

```bash
# Check Docker version
docker --version

# Check Docker Compose version
docker compose version

# Test Docker is running
docker run hello-world
```

### Step 4: Navigate to Project Directory

```bash
# Clone or navigate to the project directory
cd /path/to/docker-stack

# Or clone from repository
git clone <repository-url>
cd docker-stack
```

### Step 5: Configure Environment Variables

```bash
# Review and edit the .env file
nano .env

# Or use your preferred editor
code .env  # VS Code
gedit .env  # GNOME
```

### Step 6: Start Docker Containers

```bash
# Start all containers in detached mode
docker compose up -d

# Or using docker-compose (older syntax)
docker-compose up -d
```

### Step 7: Verify Containers are Running

```bash
# Check container status
docker compose ps

# View logs
docker compose logs

# Check specific container
docker compose logs postgres
docker compose logs mongodb
docker compose logs pgadmin
```

### Step 8: Access Services

- **pgAdmin**: Open browser and go to `http://localhost:5050`
- **PostgreSQL**: Connect via `localhost:5432`
- **MongoDB**: Connect via `localhost:27017`

### Important Notes for Linux Users

1. **Socket Permission**: If you get "permission denied" errors, ensure your user is in the `docker` group
2. **Firewall**: If you can't access services, check firewall settings:
   ```bash
   # Ubuntu/Debian (ufw)
   sudo ufw allow 5050
   sudo ufw allow 5432
   sudo ufw allow 27017

   # Fedora/CentOS (firewalld)
   sudo firewall-cmd --permanent --add-port=5050/tcp
   sudo firewall-cmd --permanent --add-port=5432/tcp
   sudo firewall-cmd --permanent --add-port=27017/tcp
   sudo firewall-cmd --reload
   ```
3. **Port Conflicts**: Ensure ports 5050, 5432, and 27017 are not already in use:
   ```bash
   sudo lsof -i :5050
   sudo lsof -i :5432
   sudo lsof -i :27017
   ```

### Troubleshooting Linux Issues

**Docker daemon not running:**
```bash
# Check Docker status
sudo systemctl status docker

# Start Docker if not running
sudo systemctl start docker

# Enable Docker to start on boot
sudo systemctl enable docker
```

**Permission denied (socket):**
```bash
# Verify your user is in docker group
groups $USER

# If not, add and re-login
sudo usermod -aG docker $USER
exit
# Then log back in
```

**Cannot connect to Docker daemon:**
```bash
# Check if docker socket exists
ls -la /var/run/docker.sock

# If missing, restart Docker
sudo systemctl restart docker
```

**Port already in use:**
```bash
# Find and kill the process using the port
sudo lsof -i :5050
sudo kill <PID>

# Or change the port in .env file
```

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

# MongoDB Database
MONGO_ROOT_USER=admin              # MongoDB root username
MONGO_ROOT_PASSWORD=admin_password # MongoDB root password
MONGO_DB_NAME=mydb                 # Default database name
MONGO_PORT=27017                   # Port exposed on host
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

5. **Access pgAdmin**: Open browser and go to `http://localhost:5050`
6. **Access MongoDB**: Connect via MongoDB Compass or CLI at `localhost:27017`

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

## Connecting to MongoDB

### Using mongosh CLI

```bash
# Connect to MongoDB container
docker exec -it mongodb mongosh -u admin -p admin_password

# Or use Docker Compose
docker-compose exec mongodb mongosh -u admin -p admin_password
```

### Using MongoDB Compass (GUI)

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Create a new connection:
   - **Connection String**: `mongodb://admin:admin_password@localhost:27017`
   - **SRV Record**: Leave unchecked
3. Click "Connect"

### Connection String

```
mongodb://admin:admin_password@localhost:27017/mydb
```

### Create Additional User

```bash
# Connect to MongoDB
docker exec -it mongodb mongosh -u admin -p admin_password

# Switch to admin database
use admin

# Create a new user with readWrite permission
db.createUser({
  user: "app_user",
  pwd: "app_password",
  roles: [
    { role: "readWrite", db: "mydb" },
    { role: "dbAdmin", db: "mydb" }
  ]
});
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

# MongoDB logs only
docker-compose logs mongodb

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
├── mongo-init.js           # MongoDB initialization script
├── init-scripts/           # SQL initialization scripts (optional)
└── README.md               # This file
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
- `mongodb_data`: Stores MongoDB data files

These volumes persist even after containers are stopped, ensuring your data is not lost.

## Network

All containers are connected to a bridge network named `app-network`, allowing them to communicate with each other using their container names.

## Health Checks

The PostgreSQL and MongoDB containers include health checks that verify the databases are ready before dependent services attempt to connect. This ensures proper startup sequencing.

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

### MongoDB connection issues
- Verify MongoDB container is healthy: `docker-compose ps`
- Check MongoDB logs: `docker-compose logs mongodb`
- Ensure you're using the correct credentials from `.env`
- Try connecting with mongosh to verify authentication

### Reset the entire stack
```bash
docker-compose down -v
rm -rf postgres_data pgadmin_data  # If using named volumes locally
docker-compose up -d
```

## Security Considerations

1. **Change default passwords** before deploying to production
2. **Use strong passwords** for PostgreSQL, pgAdmin, and MongoDB
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
- **MongoDB**: [MongoDB Documentation](https://www.mongodb.com/docs/)