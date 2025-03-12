# AWS Architecture for Tekamolo.info

## Overview
The AWS architecture for the application hosted under the domain `tekamolo.info` is designed to ensure high availability, scalability, and security by leveraging several AWS services. The architecture includes a **frontend** hosted on **S3**, a **backend** running on **EC2** instances behind a **Load Balancer**, all served securely over **HTTPS** with certificates managed by **AWS Certificate Manager** (ACM). Routing is handled using **Route 53** and **CloudFront** for optimal content delivery.

## AWS Services Used
1. **Amazon S3**: Hosts the static assets of the client-side application (frontend).
2. **Amazon EC2**: Runs the backend services.
3. **Elastic Load Balancer (ELB)**: Distributes traffic across the EC2 instances to ensure high availability.
4. **Target Group**: EC2 instances are grouped into a target group for backend traffic distribution.
5. **Amazon Certificate Manager (ACM)**: Manages SSL/TLS certificates for securing the domain with HTTPS.
6. **Amazon Route 53**: Manages DNS records for the domain `tekamolo.info`.
7. **Amazon CloudFront**: Serves content securely via HTTPS for both frontend (S3) and backend (EC2), improving performance via caching and global content delivery.

## Architecture Components

### 1. Frontend (S3 Bucket)
- **S3 Bucket**: The frontend application, consisting of static files (HTML, CSS, JavaScript), is hosted on an S3 bucket.
- **CloudFront Distribution**:
    - **Origin 1**: The S3 bucket is set up as the origin to deliver the static assets.
    - **Routing**: All requests to `https://tekamolo.info/*` are routed to the S3 bucket.
    - **HTTPS**: Traffic to the frontend is served over HTTPS with a certificate issued by ACM.
- **Security**: The S3 bucket is configured with public access for read operations only via CloudFront.

### 2. Backend (EC2)
- **Amazon EC2**: The backend API is hosted on an EC2 instance running behind a load balancer.
- **Elastic Load Balancer (ELB)**: Distributes incoming traffic across multiple EC2 instances to ensure high availability.
    - **Target Group**: EC2 instances are organized into a target group for automatic load balancing.
    - **Auto Scaling**: The EC2 instances can scale horizontally based on traffic patterns.
- **CloudFront Distribution**:
    - **Origin 2**: The EC2 instance, accessed via the load balancer, is set as the origin for API calls.
    - **Routing**: API requests made to `https://tekamolo.info/api/*` are routed to the backend.
    - **HTTPS**: Traffic to the backend is served over HTTPS using a certificate from ACM.
- **Elastic IP**: The EC2 instance has an Elastic IP for static addressing.

### 3. SSL/TLS Certificates (ACM)
- **AWS Certificate Manager (ACM)**: Manages the SSL certificates for the domain `tekamolo.info`, ensuring end-to-end encryption for both the frontend and backend.
    - **Certificates**: Issued for `tekamolo.info` and `www.tekamolo.info`.
    - **Integration**: The certificates are integrated into both CloudFront and the load balancer to handle HTTPS traffic.

### 4. DNS Management (Route 53)
- **Domain**: `tekamolo.info`
- **Hosted Zone**: Managed within Route 53.
- **DNS Records**:
    - **A Record**: Points to the CloudFront distribution, which handles routing for both frontend and backend.
    - **Alias**: An alias record points to the CloudFront distribution to simplify DNS management and optimize routing.

## CloudFront Configuration

- **Distribution**: A single CloudFront distribution serves both the frontend and backend, with two separate origins.
- **Origin 1** (Frontend - S3):
    - **Domain**: S3 bucket's website endpoint.
    - **Path Pattern**: `/*` for routing frontend requests.
    - **Protocol**: HTTPS.
- **Origin 2** (Backend - EC2 via Load Balancer):
    - **Domain**: Load Balancer’s endpoint.
    - **Path Pattern**: `/api/*` for routing backend API requests.
    - **Protocol**: HTTPS.

## Load Balancer Configuration

- **Type**: Application Load Balancer (ALB) ensures that HTTP/HTTPS traffic is distributed evenly across the backend instances.
- **Target Group**:
    - EC2 instances belong to a target group that automatically scales to handle varying loads.
- **Security**: HTTPS traffic is terminated at the load balancer using the ACM certificate, ensuring secure communication.

## Security and Compliance

- **HTTPS Everywhere**: SSL/TLS certificates from ACM are used to enforce HTTPS on both frontend and backend services.
- **Security Groups**:
    - The EC2 instance is protected by a security group allowing only HTTP/HTTPS traffic.
    - Access to EC2 via SSH is restricted to trusted IPs for maintenance.
- **CloudFront Caching**: Content delivery is optimized with caching at edge locations via CloudFront, reducing latency for global users.