drop table if exists attachment;
drop table if exists issue;
drop table if exists tag;
drop table if exists status;
drop table if exists account_project;
drop table if exists project;
drop table if exists account;

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
create table account(
name varchar(20),
password varchar(255) not null,
active boolean not null default false,
login_time timestamp with time zone,
create_time timestamp with time zone not null,
last_update_time timestamp with time zone not null,
primary key (name)
);

--專案
create table project(
name varchar(50),
is_public boolean default true,
creator varchar(20) references account(name),
create_time timestamp with time zone not null,
last_update_time timestamp with time zone not null,
primary key (name)
);

--需求
create table issue(
id serial,
name varchar(50) references project(name),
title varchar(100) not null,
description text,
status_id int not null references status(id),
priority varchar(20) not null,
tag_id int not null references tag(id),
assigned_account varchar(100),
estimate_work_hour smallint,
estimate_start_date date,
estimate_end_date date,
finished_percent smallint,
creator varchar(20) references account(name),
create_time timestamp with time zone not null,
last_update_time timestamp with time zone not null,
primary key (id)
);

--需求附件
create table attachment(
id serial,
issue_id int not null references issue(id),
file_name varchar(200) not null,
file_path varchar(1024) not null,
description varchar(50),
creator varchar(20) references account(name),
create_time timestamp with time zone not null,
primary key(id)
);

--帳號_專案_Mapping
create table account_project(
account_name varchar(20) not null references account(name),
project_name varchar(50) not null references project(name),
primary key(account_name, project_name)
);
