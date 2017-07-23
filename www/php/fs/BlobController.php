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
		if (move_uploaded_file($_FILES['theFile']['tmp_name'], $uploadfile)) {
			echo "Uploaded to $uploadfile";
		} else {
			echo "Err";
		}
		/*$pubfs=new NativeFS(BA_PUB."/");
		$f=new SFile($pubfs,"/".$urlFrac.$path);
		$f->text("test!");
		echo "Wrote to ".$f->path();*/
	}
}

?>
