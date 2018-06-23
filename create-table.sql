drop table if exists issue;
drop table if exists tag;
drop table if exists status;
drop table if exists users_project;
drop table if exists project;
drop table if exists users;

--追蹤標籤
create table tag(
id serial,
name varchar(20) not null,
primary key (id)
);
alter sequence tag_id_seq restart with 1;

insert into tag(name) values('Bug');
insert into tag(name) values('Feature');
insert into tag(name) values('Support');

--狀態
create table status(
id serial,
name varchar(20) not null,
primary key(id)
);
alter sequence status_id_seq restart with 1;

insert into status(name) values('New');
insert into status(name) values('In Progress');
insert into status(name) values('Resolved');
insert into status(name) values('Feedback');
insert into status(name) values('Closed');
insert into status(name) values('Rejected');

--帳號
create table users(
user_name varchar(20),
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
id varchar(100),
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
status_id int not null references status(id),
priority varchar(20) not null,
tag_id int not null references tag(id),
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
