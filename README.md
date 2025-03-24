# RealRate - Movie Rating Website with DevSecOps

## Project Description
**RealRate** is a website designed for rating movies, similar to IMDb. This project is built using **React.js** with **Vite** as the build tool and follows **DevSecOps** principles to ensure security throughout the development and deployment process.

## Build and Deployment with Docker
### 1. Build Image for Development
```sh
docker build -t reactjs/devsecops:1.0.0 .
```
This command creates a Docker image named **reactjs/devsecops** version **1.0.0** for development purposes.

### 2. Check Created Images
```sh
docker image ls
```
This command displays a list of images available in Docker.

### 3. Run Project in Developer Mode
```sh
docker run -d -p 3000:3000 reactjs/devsecops:1.0.0
```
- **-d** : Runs the container in **detached** mode (background)
- **-p 3000:3000** : Maps local port **3000** to the container

### 4. Build Image for Pre-Production
```sh
docker build -t reactjs-stg/devsecops:1.0.0 -f Dockerfile.stg .
```
This command builds an image for the pre-production environment using **Dockerfile.stg**.

### 5. Run Project in Pre-Production Mode
```sh
docker run -d -p 3001:3001 reactjs-stg/devsecops:1.0.0
```
- **-p 3001:3001** : Maps local port **3001** to the pre-production container

## DevSecOps Implementation
In the **RealRate** project, we implement DevSecOps using the following steps:
1. **Using Docker** to isolate development and production environments.
2. **Vite as the Build Tool** for faster development and optimized builds.
3. **CI/CD Pipeline** for automating build, testing, and deployment.
4. **Application Security** by scanning Docker images with tools like Trivy or Clair.
5. **Monitoring and Logging** using tools like ELK Stack or Prometheus.
6. **Implementing Security Best Practices** in React.js, such as input sanitization and token-based authentication.

## License
This project is licensed under the [MIT License](LICENSE).
