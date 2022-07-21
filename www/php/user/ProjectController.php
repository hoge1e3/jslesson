<?php
req("auth");
class ProjectController {
    static function homeDir() {
        return Auth::home();
    }
    static function list() {
        /*
        [homeDir ! exists ] ! then[
            homeDir ! listFiles
            [|f| f!"options.json" rel exists] select
            [|f;o|
                o=f!"options.json" rel.
                o ! getObj "name" (f! name) set "lastUpdate" (o! lastUpdate) set
            ] map.
        ] else [
            Array ! create.
        ] execute
        */
        header("Content-type: text/json; encoding=utf8");
        //TODO unify into Auth::projects;
        $homeDir=self::homeDir();
        if ($homeDir->exists()) {
            $dirs=$homeDir->listFiles();
            $res=array();
            foreach ($dirs as $dir) {
                $of=$dir->rel("options.json");
                if ($of->exists()) {
                    $o=$of->obj();
                    $o["name"]=$dir->name();
                    $o["lastUpdate"]=$of->lastUpdate();
                    array_push($res,$o);
                }
            }
            echo json_encode($res);
        } else {
            print "[]";
        }
    }
    static function delete() {
        $project=param("project");// ends with /
        /*
        [projectf=homeDir !(project) rel] do
        [projectf ! exists] [(projectf!path)+" not exists"] check
        [projectf ! rmdirForce. ("Succ delete "+(projectf!path))] done.
        */
        $homeDir=self::homeDir();
        $projectF=$homeDir->rel($project);
        if (!$projectF->exists() ) {
            throw new Error($projectF->path()." not exists");
        }
        $projectF->rmdirForce();
        echo "Succ delete ".$projectF->path();
    }
    static function rename() {
        $homeDir=self::homeDir();
        $from=param("from");// ends with /
        $to=param("to");// ends with /
        $fromf=$homeDir->rel($from);
        $tof=$homeDir->rel($to);
        if (!$fromf->exists()) throw new Error ($fromf->path()." not exists");
        if ($tof->exists()) throw new Error ($tof->path()." already exists");
        $fromf->moveTo($tof);
        echo "Succ ".($fromf->path()."->".$tof->path())." done.";
    }
}
