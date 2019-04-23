var formdatatemp = function(){
	var formdata=`<input type="text" id="inkode" value="">
				<button id="refresh"> Cari...</button>
				<br/>
				<table>
				<tr><td> Id: </td> <td> <label id="kode"> </label></td></tr>
				<tr><td> Nama: </td> <td> <label id="nama"> </label></td></tr>
				<tr><td> Harga: </td> <td> <label id="harga"> </label></td></tr>
				</table>`;
	$("#pagecontent").html(formdata);
}

var ViewProduk = function(id){
	$.ajax({
		url: "/phpsimpleapi/api/produk/getsatu.php?id="+id,
		dataType: 'json',
		data: {
		id: $("#inkodel").val()
		},
		success: function(result) {
		 data = result.data;
		var dispProduk=`
		<button class="list-produk-button"> List </button>
		<table>
		<tr><td> Id: </td> <td> <label id="kode">`+data.id+` </label></td></tr>
		<tr><td> Nama: </td> <td> <label id="nama">`+data.nama+` </label></td></tr>
		<tr><td> Harga: </td> <td> <label id="harga">`+data.harga+` </label></td></tr>
		</table>`;
		$("#pagecontent").html(dispProduk);
		}
	});
}

var RubahProduk = function(id){
	$.ajax({
		url: "/phpsimpleapi/api/produk/getsatu.php?id="+id,
		dataType: 'json',
		data: {},
		success: function(result) {
		 data = result.data;
		var formProduk=`
		<button class="list-produk-button"> List </button>
		<form id="RubahProduk" action="#">
		<table>
		<tr><td> Id: </td> <td> <input type="text" name="id" readonly id="kode" value="`+data.id+`"/></td></tr>
		<tr><td> Nama: </td> <td> <input type="text" name="nama" id="nama" value="`+data.nama+` "/></td></tr>
		<tr><td> Harga: </td> <td> <input type="text" name="harga" id="harga" value="`+data.harga+`"/></td></tr>
		</table>
		</form>
		<button class="rubah-produk-button"> Simpan </button>
		`;
		$("#pagecontent").html(formProduk);
		}
	});
}

var TambahProduk = function(id){
	var formProduk=`
		<button class="list-produk-button"> List </button>
		<form id="tambahProduk" action="#">
		<table>
		<tr><td> Nama: </td> <td> <input type="text" name="nama" id="nama" value=""/></td></tr>
		<tr><td> Harga: </td> <td> <input type="text" name="harga" id="harga" value=""/></td></tr>
		</table>
		</form>
		<button class="simpan-produk-button"> Simpan </button>
		`;
		$("#pagecontent").html(formProduk);
}

var SimpanDataProduk = function(dataProduk,api_url){
	//do ajax proses
	$.ajax({
		url : api_url, 
		type: "post", 
		data: dataProduk,
		dataType:"json",
		beforeSend:function(){	  
		  $(".loading").html("Please wait....");
		},
		success:function(result){
		  if(result.status){
			alert("Selamat, data berhasil disimpan");
		  }else{
			alert("harap isi smw inputan");
		  }
		  $(".loading").html("");
		},
		error: function(xhr, Status, err) {
			$(".loading").html("Terdapat error+Status");
		 
		}
	  });	   
};

var DisplayListDataProduk = function(data){	
	var tabledata=`<button class="tambah-produk-button">Tambah</button><table><tr><td>No</td><td>Nama</td><td>Harga</td><td>Action</td></tr>`;
				$.each(data, function(index) {
						tabledata+= `<tr><td>`+(index+1)+`</td><td>`+data[index].nama+`</td><td>`+data[index].harga+`</td><td>`+
						`<button class="view-produk-button" data-id=`+data[index].id+`>View</button>`+`</td><td>`+
						`<button class="ubah-produk-button" data-id=`+data[index].id+`>Rubah</button>`+`</td>`+
						`</tr>`;
					});		
				tabledata+=`</table>`; 
				$("#pagecontent").html(tabledata);
}

var getListDataProduk = function(){
	$.ajax({
		url: "/phpsimpleapi/api/produk/list.php",
		dataType: 'json',
		data: {},
		success: function(result) {
		 data = result.data;
		 DisplayListDataProduk(data);
		}
	});
}


$(document).ready(function() {
	console.log( "ready!" );

	$( "#getForm" ).click(function() {
		formdatatemp();
	});
	

	$( "#produkList" ).click(function() {
		getListDataProduk();
	});

	$(document).on('click', '.list-produk-button', function(){
		getListDataProduk();
	});
	
	$(document).on('click', '.view-produk-button', function(){
		var id = $(this).attr('data-id');
		ViewProduk(id);
	});

	$(document).on('click', '.tambah-produk-button', function(){
			TambahProduk();
	});

	$(document).on('click', '.ubah-produk-button', function(){
		var id = $(this).attr('data-id');
		RubahProduk(id);
	});

	$(document).on('click', '.rubah-produk-button', function(){
		dataProduk = $("#RubahProduk").serialize();
		api_url = "/phpsimpleapi/api/produk/edit.php";
		SimpanDataProduk(dataProduk,api_url);
	});

	$(document).on('click', '.simpan-produk-button', function(){
		dataProduk = $("#tambahProduk").serialize();
		api_url = "/phpsimpleapi/api/produk/create.php";
		SimpanDataProduk(dataProduk,api_url);
	});


});




