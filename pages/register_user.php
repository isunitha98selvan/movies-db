<?php include "templates/header.php"; ?>
<form method="post">
	<label for="firstname">First Name</label>
	<input type="text" name="firstname" id="firstname"><br><br>
	<label for="lastname">Last Name</label>
	<input type="text" name="lastname" id="lastname"><br><br>
	<label for="email">Email Address</label>
	<input type="text" name="email" id="email"><br><br>
	<label for="age">Age</label>
	<input type="text" name="age" id="age"><br><br>
	<label for="location">Location</label>
	<input type="text" name="location" id="location"><br><br>
	<input type="submit" name="submit" value="Submit"><br><br>
</form>

<a href="index.php">Back to home</a>
<?php include "templates/footer.php"; ?>