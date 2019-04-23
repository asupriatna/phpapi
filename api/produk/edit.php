
<?php
include_once("../config.php");

$conn = new mysqli(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Koneksi MySQL Gagal " . $conn->connect_error);
}
$sql = "update produk set nama=?, harga=? where id=?";
$stmt = $conn->prepare($sql);

$nama = $_POST['nama'];
$harga = $_POST['harga'];
$id = $_POST['id'];

if (
    $stmt 
    && $stmt->bind_param("sii", $nama, $harga,$id)
    && $stmt -> execute()
    && ($stmt -> affected_rows === 1)
){
    $res = array("data"=>"","keterangan"=>"Data  di simpan","status"=>"berhasil");
} else
{
    $res = array("data"=>"","keterangan"=>"Data gagal di simpan","status"=>"gagal");

}

header('Content-type: application/json'); 
echo json_encode($res);
 
$stmt->close();
$conn->close();
