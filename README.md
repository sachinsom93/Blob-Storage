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
![idea drawio](https://user-images.githubusercontent.com/64790109/151802220-34b6b479-b100-427f-b829-0ea513bf6669.png)

### Technologies Used
- FastApi ( Server Implementation )
- React ( UI Implementation )
- Redux ( State Management )
- fluentui/north-star ( UI Components )
- SqlAlchemy ORM ( Database ORM )
- Github Action with Heruko ( Continous Deployment )


### Project Setup
#### Clone The Project
1. Clone the Project. Following Command Can be used for this purpose -
```
$ git clone https://github.com/sachinsom93/Blob-Storage-Server-Cloudwiry-Hackathon-2022.git
```
2. Change the present directory to cloned project directory.
```
$ cd Blob-Storage-Server-Cloudwiry-Hackathon-2022
```

#### Backend Setup
1. Fork, Clone and go inside project directory.
2. **Important Step Change** the `.sampleenv` to `.env`.
3. Create and Enable `virtualenv`.
```python
# Create virtual env
$ virtualenv venv

# activate venv (For Windows)
$ venv\Scripts\activate
```
4. Install the project dependencies. Use the following command.
```
$ pip install -r requirements.txt
```
5. Run the Server.
```
$ uvicorn backend.main:app --reload
```

#### Frontend Setup
1. Fork, Clone and go inside project directory.
2. Go inside `frontend` directory.
```
$ cd frontend
```
3. Install npm dependencies.
```
(frontend) $ npm install
```
4. Start react server.
```
(frontend) $ npm start
```

### Project Features
1. User can create accound and login into account.
2. User can upload files.
3. User can rename, delete and download any file.
4. User can share files with other users.
5. Other users can also rename, download the shared file.
6. User can logout.


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
