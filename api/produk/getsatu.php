
<?php
include_once("../config.php");

$conn = new mysqli(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
   
if ($conn->connect_error) {
      echo "Koneksi MySQL Gagal: " . mysqli_connect_error();
	die();
}

$id = (isset($_GET['id'])&&$_GET['id']!='')?$_GET['id']:'';
   
$sql = "SELECT id,nama,harga FROM produk where id=?";

$stmt = $conn->prepare($sql);

if (
	$stmt &&
	$stmt->bind_param("s", $id) &&
	$stmt -> execute() &&
	$stmt -> store_result() &&
	$stmt -> bind_result($id,$nama, $harga)
) {

	while ($stmt -> fetch()) {
        $data = array('id'=>$id,'nama'=>$nama,'harga'=>$harga);
	}

} else {
	echo 'Prepared Statement Error';
}
   
$res = array("data"=>$data);

header('Content-type: application/json'); 
echo json_encode($res);
$conn->close();
