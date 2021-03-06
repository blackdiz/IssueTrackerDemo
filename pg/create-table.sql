drop table if exists attachment;
drop table if exists issue;
drop table if exists tag;
drop table if exists status;
drop table if exists priority;
drop table if exists account_project;
drop table if exists project;
drop table if exists account;

--優先度
create table priority(
id serial,
name varchar(10) not null,
"order" smallint not null,
primary key (id)
);
alter sequence priority_id_seq restart with 1;

insert into priority(name, "order") values('低', 1);
insert into priority(name, "order") values('正常', 2);
insert into priority(name, "order") values('高', 3);

--追蹤標籤
create table tag(
id serial,
name varchar(20) not null,
primary key (id)
);
alter sequence tag_id_seq restart with 1;

insert into tag(name) values('臭蟲');
insert into tag(name) values('功能');
insert into tag(name) values('支援');

--狀態
create table status(
id serial,
name varchar(20) not null,
primary key(id)
);
alter sequence status_id_seq restart with 1;

insert into status(name) values('新建');
insert into status(name) values('進行中');
insert into status(name) values('已解決');
insert into status(name) values('已回應');
insert into status(name) values('已結案');
insert into status(name) values('拒絕');

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
id varchar(50),
name varchar(50),
description text,
is_public boolean default true,
creator varchar(20) references account(name) not null,
create_time timestamp with time zone not null,
last_update_time timestamp with time zone not null,
primary key (id)
);

--需求
create table issue(
id serial,
project_id varchar(50) references project(id) not null,
title varchar(100) not null,
description text,
status_id int not null references status(id),
priority_id int not null references priority(id),
tag_id int not null references tag(id),
assigned_account varchar(20) references account(name),
estimate_work_hour smallint,
start_date date,
end_date date,
finished_percent smallint,
creator varchar(20) references account(name) not null,
create_time timestamp with time zone not null,
last_update_time timestamp with time zone not null,
primary key (id)
);
alter sequence issue_id_seq restart with 1;

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
project_id varchar(50) not null references project(id),
primary key(account_name, project_id)
);
