drop table if exists issue;
drop table if exists project;
drop table if exists account;

create table project(
id serial,
project_name varchar(50) not null,
create_time timestamp not null,
last_update_time timestamp not null,
primary key (id)
);

create table issue(
id serial,
project_id integer references project(id),
title varchar(100) not null,
description varchar(1000),
status varchar(20) not null,
priority varchar(20),
assigned_user varchar(100),
estimate_work_hour smallint,
estimate_start_date date,
estimate_end_date date,
finished_percent smallint,
create_time timestamp not null,
last_update_time timestamp not null,
primary key (id)
);

create table account(
user_account varchar(20) not null,
password varchar(255) not null,
first_name varchar(20) not null,
last_name varchar(20) not null,
email varchar(50) not null,
last_login_time timestamp,
create_time timestamp not null,
last_update_time timestamp not null,
primary key (user_account)
);
