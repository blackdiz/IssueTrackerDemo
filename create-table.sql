drop table if exists issue;
drop table if exists tag;
drop table if exists users_project;
drop table if exists project;
drop table if exists users;

--追蹤標籤
create table Tag(
name varchar(20) not null,
primary key (name)
);

insert into Tag(name) values('Bug');
insert into Tag(name) values('Feature');
insert into Tag(name) values('Support');

--狀態
create table Status(
name varchar(20) not null,
primary key(name)
);

insert into Status(name) values('New');
insert into Status(name) values('In Progress');
insert into Status(name) values('Resolved');
insert into Status(name) values('Feedback');
insert into Status(name) values('Closed');
insert into Status(name) values('Rejected');

--帳號
create table users(
user_name varchar(20) not null,
password varchar(255) not null,
first_name varchar(20) not null,
last_name varchar(20) not null,
email varchar(50) not null,
last_login_time timestamp,
create_time timestamp not null,
last_update_time timestamp not null,
primary key (user_name)
);

--專案
create table project(
id varchar(100) not null,
project_name varchar(50) not null,
is_public boolean default true,
creator varchar(20) references users(user_name),
create_time timestamp not null,
last_update_time timestamp not null,
primary key (id)
);

--需求
create table issue(
id serial,
project_id varchar(100) references project(id),
title varchar(100) not null,
description text,
status varchar(20) not null references status(name),
priority varchar(20) not null,
tag varchar(20) not null references tag(name),
assigned_user varchar(100),
estimate_work_hour smallint,
estimate_start_date date,
estimate_end_date date,
finished_percent smallint,
creator varchar(20) references users(user_name),
create_time timestamp not null,
last_update_time timestamp not null,
primary key (id)
);

--帳號_專案_Mapping
create table users_project(
user_name varchar(20) not null references users(user_name),
project_id varchar(100) not null references project(id),
primary key(user_name, project_id)
);
