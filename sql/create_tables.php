<?php
$servername = "10.52.56.55";
$username = "user";
$password = "Student@123";
$dbname = "movies";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


// sql to create table
$sql = "CREATE TABLE user (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
name VARCHAR(30) NOT NULL,
email VARCHAR(50),
username VARCHAR(50),
password VARCHAR(50),
location VARCHAR(50),
reg_date TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo "Table users created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$sql = "CREATE TABLE film (
movieId INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
movieName VARCHAR(50) NOT NULL UNIQUE,
genre VARCHAR(50)
)";

if ($conn->query($sql) === TRUE) {
    echo "Table film created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$sql = "CREATE TABLE reviews (
movieId INT(6) unsigned, 
rating DECIMAL(3) NOT NULL,
comments VARCHAR(500),
FOREIGN KEY(movieId) references film(movieId)
)";

if ($conn->query($sql) === TRUE) {
    echo "Table reviews created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}


$sql = "CREATE TABLE cast (
movieId INT(6) unsigned, 
name VARCHAR(50) NOT NULL,
role VARCHAR(50),
FOREIGN KEY(movieId) references film(movieId)
)";

if ($conn->query($sql) === TRUE) {
    echo "Table cast created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}


$sql = "CREATE TABLE awards (
id int(10) primary key,
movieName VARCHAR(50), 
castName VARCHAR(50) NOT NULL,
award VARCHAR(50),
FOREIGN KEY(movieName) references film(movieName)
)";

if ($conn->query($sql) === TRUE) {
    echo "Table awards created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$sql = "CREATE TABLE theatre (
theatreId int(6) AUTO_INCREMENT NOT NULL primary key  , 
theatreName varchar(100),
city varchar(100),
state varchar(50)
)";

if ($conn->query($sql) === TRUE) {
    echo "Table theatre created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$sql = "CREATE TABLE nowShowing (
theatreId int(6), 
movieName varchar(50),
timing1 varchar(20),
timing2 varchar(20),
timing3 varchar(20),
FOREIGN KEY (theatreId) references theatre(theatreId),
FOREIGN KEY (movieName) references film(movieName)
)";

if ($conn->query($sql) === TRUE) {
    echo "Table theatre created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();
?>