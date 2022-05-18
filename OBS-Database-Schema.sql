
create database busservers;

use busservers;

create table admin(
admin_id int PRIMARY KEY,  
admin_name varchar(30),
password varchar(30)

);

create table ticket(
ticket_id int PRIMARY KEY,  
email varchar(20) unique, 
no_of_passengers int,
status int,
total_amount int,
travel_date date, 
bus_id int,
user_id int
);


create table bus(
bus_id int PRIMARY KEY,  
bus_name varchar(30),
destination varchar(30),
duration varchar(30),
fare int,
source varchar(30),
time_of_arrival timestamp,
time_of_departure timestamp,
type_of_bus varchar(30)
);

create table registered_user(
user_id int PRIMARY KEY,
address varchar(30),
contact_no varchar(30),
date_of_birth date,
email varchar(30),
first_name varchar(30),
gender varchar(30),
last_name varchar(30),
password varchar(30),
wallet int
);

create table passenger(
passenger_id int PRIMARY KEY,
passenger_age int,  
passenger_name varchar(30),
seat_no varchar(30),
ticket_id int
);


ALTER TABLE ticket ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES registered_user(user_id); 
ALTER TABLE ticket ADD CONSTRAINT bus_id FOREIGN KEY (bus_id) REFERENCES bus(bus_id); 
ALTER TABLE passenger ADD CONSTRAINT ticket_id FOREIGN KEY (ticket_id) REFERENCES ticket(ticket_id); 




