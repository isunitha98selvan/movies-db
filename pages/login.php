<?php include "templates/header.php"; ?>

<form method="post">
	<label for="username">Username</label>
	<input type="text" id="username" name="username"><br><br>
	<label for="password">Password</label>
	<input type="text" id="password" name="password"><br><br>

	<input type="submit" name="submit" value="Login">
</form>

<a href="index.php">Back to home</a>

<?php include "templates/footer.php"; ?>