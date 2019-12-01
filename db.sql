create table customers
(
    cust_id varchar(20),
    PRIMARY key(cust_id),
    cust_name varchar(40),
    cust_gender char(1),
    cust_phone int(10)
);
create table suppliers
(
    supplier_id varchar(20),
    email varchar(20),
    mobile_no int(15),
    PRIMARY KEY(supplier_id)
);
create table medicines
(
    medicine_id varchar(20),
    supplier_id varchar(20),
    FOREIGN KEY(supplier_id)REFERENCES suppliers(supplier_id),
    mfg_date date,
    exp_date date,
    price int(6),
    PRIMARY KEY(medicine_id)
);

create table salesman
(
    sales_id varchar(20),
    medicine_id varchar(20),
    cust_id varchar(20),
    price int(5),
    PRIMARY KEY(sales_id),
    foreign key (cust_id)REFERENCES customers(cust_id),
    foreign key (medicine_id)REFERENCES medicines(medicine_id)
); 

create table payments
(
    payment_id varchar(20),
    sales_id varchar(20),
    cust_id varchar(20),
    price int(5),
    PRIMARY KEY(payment_id),
	foreign key(sales_id)REFERENCES salesman(sales_id)
);

CREATE TABLE req_time
(
	id int,
    exec_time time,
    PRIMARY KEY(id)
);


ALTER TABLE req_time
MODIFY id int not null AUTO_INCREMENT;

CREATE TRIGGER user_trig AFTER INSERT on payments for EACH row
INSERT INTO req_time(exec_time)values(Now());