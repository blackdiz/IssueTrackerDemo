# IssueTrackerDemo  

A simple issue tracking system

Use docker for hosting backend and frontend, and start by docker compose.

Technique stack of the backend:
* Node.js
* Express
* PostgreSQL
* Objection.js

Technique stack of the frontend:
* ReactJS
* React Router v4
* Reactstrap

Features:
* Account resgistration
* Project management
* Issue management

How to start:

Intall [docker-compose](https://docs.docker.com/compose/install/) first.

go the project directory and execute
```
docker-compose up
```
after starting, visit:
```
http://localhost:8080
```

TODO
- [x] Dockrize and keep library versions up
- [ ] Migrate to TypeScript

---
專案問題管理程式，前後端分離，後端只提供API endpoint

前後端和 DB 均使用 Docker, 並以 Docker Compose 啟動

後端使用：  
* Node.js
* Express  
* DB 使用 PostgreSQL  
* ORM 使用 Objection.js

前端使用：
* ReactJS
* React Router v4
* Reactstrap

提供功能:  
* 帳號註冊
* 專案建立、修改、刪除
* 問題建立、修改、刪除  

如何啟動

請先安裝 [docker-compose](https://docs.docker.com/compose/install/)
在專案目錄下輸入
```
docker-compose up
```
接著拜訪網址
```
http://localhost:8080
```
即可看到專案

TODO
- [x] 持續更新版本和容器化
- [ ] 改用TypeScript
