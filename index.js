var express = require('express');
var mysql = require('mysql');
var bodyparser = require('body-parser');
var app = express();
var urlencodedparser = bodyparser.urlencoded({ extended: false });


app.set("view engine", "ejs");
app.use("/assets", express.static(__dirname + "/assets"))

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pharmac"


});
connection.connect(err => {
    if (err) throw err;
    console.log("connected");
});

app.get("/", (req, res) => res.render("index"));
app.get("/insert/customers", (req, res) => res.render("insertcustomers"));
app.get("/insert/medicines", (req, res) => res.render("insertmedicines"));
app.get("/insert/salesman", (req, res) => res.render("insertsalesman"));
app.get("/insert/payment", (req, res) => res.render("insertpayment"));
app.get("/insert/supplier", (req, res) => res.render("insertsupplier"));

app.get("/success", (req, res) => res.render("errorDetection/success"));
app.get("/failure", (req, res) => res.render("errorDetection/failure"));

app.get("/delete", (req, res) => res.render("delete/omission"));
app.get("/update", (req, res) => res.render("update/updatedetails"));

app.post("/insert/customers", urlencodedparser, function(req, res) {
    var CUSTOMERS_ID = req.body.cust_id;
    var Name = req.body.cust_name;
    var Sex = req.body.cust_gender;
    var Phone = req.body.cust_phone;
    var sql =
        "Insert into customers VALUES ('" +
        CUSTOMERS_ID +
        "','" +
        Name +
        "','" +
        Sex +
        "','" +
        Phone +
        "')";

    connection.query(sql, (err, result) => {
        try {
            if (err) throw err;
            console.log("1 row inserted");
            res.redirect("/success");
        } catch (e) {
            res.redirect("/failure");
            console.log("error was thrown");
        }
    });
});

app.post("/insert/supplier", urlencodedparser, function(req, res) {
    var SUPPLIER_ID = req.body.supplier_id;
    var SUPPLIER_NAME = req.body.supplier_name;
    var Email = req.body.email;
    var MOBILE_NO = req.body.mobile_no;

    var sql =
        "Insert into suppliers VALUES ('" +
        SUPPLIER_ID +
        "','"+SUPPLIER_NAME +"','" +
        Email +
        "','" +
        MOBILE_NO +
        "')";


    connection.query(sql, (err, result) => {
        try {
            if (err) throw err;
            console.log("1 row inserted");
            res.redirect("/success");
        } catch (e) {
            res.redirect("/failure");
            console.log("error was thrown");
        }
    });
});



app.post("/insert/medicines", urlencodedparser, function(req, res) {
    var MEDICINE_ID = req.body.medicine_id;
    
    var SUPPLIER_ID = req.body.supplier_id;
    var MEDICINE_NAME = req.body.medicine_name;
    var Mfg = req.body.mfg;
    var Exp = req.body.exp;
    var PRICE = req.body.price;
    var sql =
        "Insert into medicines VALUES ('" + MEDICINE_ID + "','" + SUPPLIER_ID + "','" + MEDICINE_NAME + "','" + Mfg + "','" + Exp + "','" + PRICE + "')";

    connection.query(sql, (err, result) => {
        try {
            if (err) throw err;
            console.log("1 row inserted");
            res.redirect("/success");
        } catch (e) {
            res.redirect("/failure");
            console.log("error was thrown");
        }
    });
});

app.post("/insert/salesman", urlencodedparser, function(req, res) {
    var SALES_ID = req.body.sales_id;
    var medicine_id = req.body.medicine_id;
    var cust_id = req.body.cust_id;
    var PRICE = req.body.price;
    var sql =
        "Insert into salesman VALUES ('" +
        SALES_ID +
        "','" +
        medicine_id +
        "','" +
        cust_id +
        "','" +
        PRICE + "')";

    connection.query(sql, (err, result) => {
        try {
            if (err) throw err;
            console.log("1 row inserted");
            res.redirect("/success");
        } catch (e) {
            res.redirect("/failure");
            console.log("error was thrown");
        }
    });
});


app.post("/insert/payment", urlencodedparser, function(req, res) {
    var PAYMENT_ID = req.body.payment_id;
    var SALES_ID = req.body.sales_id;
    var CUSTOMER_ID = req.body.cust_id;
    var Price = req.body.price;
    var sql =
        "Insert into payments VALUES ('" +
        PAYMENT_ID +
        "','" +
        SALES_ID +
        "','" +
        CUSTOMER_ID +
        "','" +
        Price + "')";

    connection.query(sql, (err, result) => {
        try {
            if (err) throw err;
            console.log("1 row inserted");
            res.redirect("/success");
        } catch (e) {
            res.redirect("/failure");
            console.log("error was thrown");
        }
    });
});

app.post("/delete", urlencodedparser, function(req, res) {
    var PAYMENT_ID = req.body.payment_id;
    var sql =
        "delete from payments where payment_id=('" +
        PAYMENT_ID +
        "')";

    connection.query(sql, (err, result) => {
        try {
            if (err) throw err;
            console.log("1 row inserted");
            res.redirect("/success");
        } catch (e) {
            res.redirect("/failure");
            console.log("error was thrown");
        }
    });
});


app.get("/display", function(req, res) {
    var sql = "select * from medicines";
    var Id = [];
    var Name = [];
    var SID = [];
    var Mfg = [];
    var Exp = [];
    var Price = [];

    connection.query(sql, function(err, result) {
        if (err) throw err;

        for (var i = 0; i < result.length; i++) {
            Id[i] = result[i].medicine_id;
            Name[i] = result[i].medicine_name;
            SID[i] = result[i].supplier_id;
            Mfg[i] = result[i].mfg_date;
            Exp[i] = result[i].exp_date;
            Price[i] = result[i].price;
        }
        console.log(Id);

        res.render("display/displayDetails", {
            Id: Id,
            Name: Name,
            SID: SID,
            Mfg: Mfg,
            Exp: Exp,
            Price: Price
        });
    });
});


app.post("/update1", urlencodedparser, function(req, res) {
    var Name = req.body.supplier_name;
    var Phone = req.body.mobile_no;
    sql =
        "update suppliers SET mobile_no='" + Phone + "' WHERE supplier_name='" + Name + "'";
    connection.query(sql, function(err, result) {
        try {
            if (err) throw err;
            res.redirect("/update");
            console.log("data successfully updated");
        } catch (e) {
            res.redirect("/failure");
            console.log("error was thrown");
        }
    });
});

app.post("/update2", urlencodedparser, function(req, res) {
    var Id = req.body.cust_id;
    var Phone = req.body.cust_phone;
    sql = "update customers SET cust_phone='" + Phone + "' WHERE cust_id='" + Id + "'";
    connection.query(sql, function(err, result) {
        try {
            if (err) throw err;
            res.redirect("/success");
            console.log("data successfully updated");
        } catch (e) {
            res.redirect("/failure");
            console.log("error was thrown");
        }
    });
});
app.listen(2222, () => console.log("Listen to port 2222"));