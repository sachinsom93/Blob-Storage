[![Github Pages Deploy](https://github.com/sachinsom93/Blob-Storage-Server-Cloudwiry-Hackathon-2022/actions/workflows/deploy.yml/badge.svg)](https://github.com/sachinsom93/Blob-Storage-Server-Cloudwiry-Hackathon-2022/actions/workflows/deploy.yml)

[![FastApi Deploy](https://github.com/sachinsom93/Blob-Storage-Server-Cloudwiry-Hackathon-2022/actions/workflows/deployserver.yml/badge.svg)](https://github.com/sachinsom93/Blob-Storage-Server-Cloudwiry-Hackathon-2022/actions/workflows/deployserver.yml)

# Blob-Storage-Server - Cloudwiry-Hackathon-2022

## Live Application Link - [Deployed APP](https://blob-storage.herokuapp.com/)
## Problem Statement
We’re in a digital economy where data is more valuable than ever. It’s the key to the smooth functionality of everything from the government to local companies. Without it, progress would halt.
With data becoming enormous so is the requirement for better storage systems.

Therefore building a storage system and understanding the difficulties faced is an important step for research & improvements in the storage technologies.

To trigger curiosity and the critical thinker within you, we at Cloudwiry have decided to formulate this into a hackathon.

### Requirements
- [x] User authentication and session management
- [x] Implementation of the blob storage server
- [x] Client application (CLI/ web based) for file upload, download, rename and delete
- [x] User based access control on who can access the files
- [x] Deploy the application
- [x] (optional - bonus points) - File compression

### Work flow Plan and Database Design

![idea drawio](https://user-images.githubusercontent.com/64790109/151773274-6e09cb88-bb46-4d48-8e99-f4355894a12d.png)

### Technologies Used
- FastApi
- React
- Redux
- fluentui/north-star
- SqlAlchemy ORM
- Github Action with Heruko

### Example Use Case / Application Flow

- User (John) logs in to the application using username and password (Authentication to happen over HTTP/HTTPS using REST API)
- John can now view all the files he has access to and has uploaded
- John decides to upload a new file on to the storage system
- John later decides to share that file with 2 other users (Alice & Bob)
- When Alice/Bob login into the system, they should be able to view the file.
- Alice decides to download the file onto her device.
- John renames the file and deletes it later on
- John exits & logout of the application

### Evaluation Criteria
- General coding standards & usage of git
- Blob storage system implementation
- Database design
- Originality & creativity
- Working & Demo of the application


