<?php
// Old user/list.txt to Class DB

req("NativeFS","SFile","pdo");
class ClassMigrationController {
    static function migrate() {
        $fs=new NativeFS(BA_TOP);
        $list=new SFile($fs,"user/list.txt");
        foreach ($list->lines() as $line) {
            $class=json_decode($line);
            if (!$class) continue;
            $classr=pdo_select1("select * from class where id=?",$class->classid);
            if (!$classr) {
                echo "Ins class ".$class->classid."<BR>";
                pdo_insert("class",array("id"=>$class->classid,"pass"=>$class->pass));
            }
        }
    }
}

 ?>
