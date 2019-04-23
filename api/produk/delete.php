
<?php
include_once("../config.php");

$conn = new mysqli(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
   
if ($conn->connect_error) {
      echo "Koneksi MySQL Gagal: " . mysqli_connect_error();
	die();
}

$id = (isset($_GET['id'])&&$_GET['id']!='')?$_GET['id']:'';
   
$sql = "DELETE FROM produk where id=?";
$stmt = $conn->prepare($sql);

if (
	$stmt
	&& $stmt->bind_param("s", $id)
	&& $stmt -> execute()
    && ($stmt -> affected_rows === 1)
) {
	$res = array("data"=>"","keterangan"=>"Data dihapus","status"=>"berhasil");
} else {
	$res = array("data"=>"","keterangan"=>"Data gahal dihapus statement error","status"=>"berhasil");
}
header('Content-type: application/json'); 
echo json_encode($res);
$conn->close();
