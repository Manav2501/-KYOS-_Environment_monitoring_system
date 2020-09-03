<?php
	$dbusername = "userr";
	$dbpassword = "12345";
	$server = "localhost";
	
	$dbconnect = mysqli_connect($server,$dbusername,$dbpassword);
	$dbselect = mysqli_select_db($dbconnect, "epd");
	
	$temp = $_GET["temp"];
	$sql = "INSERT INTO `temprature` (`temp`) VALUES (";
	$sql = $sql.$temp;
	$sql = $sql.")";
	echo $temp;
	mysqli_query($dbconnect,$sql);

	$ldr = $_GET["ldr"];
	$sql = "INSERT INTO `ldr` (`ldr`) VALUES (";
	$sql = $sql.$ldr;
	$sql = $sql.")";
	echo $ldr;
	mysqli_query($dbconnect,$sql);
	
	$humid = $_GET["humid"];
	$sql = "INSERT INTO `humidity` (`humidity`) VALUES (";
	$sql = $sql.$humid;
	$sql = $sql.")";
	echo $humid;
	mysqli_query($dbconnect,$sql);

	$soil = $_GET["soil"];
	$sql = "INSERT INTO `soil` (`soil`) VALUES (";
	$sql = $sql.$soil;
	$sql = $sql.")";
	echo $soil;
	mysqli_query($dbconnect,$sql);

	$aqi = $_GET["aqi"];
	$sql = "INSERT INTO `aqi` (`aqi`) VALUES (";
	$sql = $sql.$aqi;
	$sql = $sql.")";
	echo $aqi;
	mysqli_query($dbconnect,$sql);

?>