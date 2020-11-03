# IssueTrackerDemo  

專案問題管理程式，前後端分離，後端只提供API endpoint

前後端和 DB 均使用 Docker, 並以 Docker Compose 啟動

後端使用：  
* NodeJS
* Express  
* DB使用PostgreSQL  
* ORM使用Objection.js

前端使用：
* ReactJS
* React Router v4
* Reactstrap

提供功能:  
* 帳號註冊
* 專案建立、修改、刪除
* 問題建立、修改、刪除  

---

如何啟動

請先安裝 [docker-compose](https://docs.docker.com/compose/install/)
再輸入
```
docker-compose up
```
接著拜訪網址
```
http://localhost:8080
```
即可看到專案

---

TODO
- [x] 持續更新版本和容器化
- [ ] 改用TypeScript
