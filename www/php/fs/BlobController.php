<?php
req("Published","auth","NativeFS");
class BlobController {
	static function upload() {
		//project, path, file
		$project=param("project");
		$path=param("path");
		$user=Auth::curUser2();
		$class=$user->_class;
		$urlFrac=Published::getURL($class->id,$user->name,$project);
		$uploadfile=BA_PUB."/".$urlFrac.$path;
		$dir=dirname($uploadfile);
		if (!file_exists($dir)) mkdir($dir, 0777, true);
		$dirC=dirname(BA_PUB."/".$urlFrac);
		if (!file_exists("$dirC/index.html")) {
			$f=fopen("$dirC/index.html","w");
			fwrite($f,"----");
			fclose($f);
		}
		if (move_uploaded_file($_FILES['theFile']['tmp_name'], $uploadfile)) {
			echo "Uploaded to $uploadfile";
		} else {
			echo "Err";
		}
	}
}

?>
