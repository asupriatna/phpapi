
<?php
include_once("../config.php");

$conn = new mysqli(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
   
if ($conn->connect_error) {
      echo "Koneksi MySQL Gagal: " . mysqli_connect_error();
	die();
}
   
$sql = "SELECT id,nama,harga FROM produk";
$nama = (isset($_GET['nama'])&&$_GET['nama']!='')?$_GET['nama']:'"%a"';
$stmt = $conn->prepare($sql);
$res = null;
if (
	$stmt &&
	//$stmt->bind_param("s", $nama) &&
	$stmt -> execute() &&
	$stmt -> store_result() &&
	$stmt -> bind_result($id,$nama, $harga)
) {
      if ($stmt->num_rows()>0){
            while ($stmt -> fetch()) {
            $data[] = array('id'=>$id,'nama'=>$nama,'harga'=>$harga);
            }
            $res = array("data"=>$data);
      }
     
} else {
	echo 'Prepared Statement Error';
}
   
header('Content-type: application/json'); 
echo json_encode($res);
$conn->close();
