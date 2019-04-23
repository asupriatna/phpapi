
<?php
include_once("../config.php");

$conn = new mysqli(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Koneksi MySQL Gagal " . $conn->connect_error);
}
$sql = "INSERT INTO produk (nama, harga) VALUES (?,?)";
$stmt = $conn->prepare($sql);

$nama = $_POST['nama'];
$harga = $_POST['harga'];


if (
    $stmt &&
    $stmt->bind_param("si", $nama, $harga) &&
    $stmt -> execute()
){
    $res = array("data"=>"","keterangan"=>"Data berhasil di simpan","status"=>"berhasil");
} else
{
    $res = array("data"=>"","keterangan"=>"Data gagal di simpan","status"=>"gagal");

}

header('Content-type: application/json'); 
echo json_encode($res);
 
$stmt->close();
$conn->close();
