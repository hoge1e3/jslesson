<?php

req("pdo","DateUtil","BAUser");
class Note {
    public static function get($userOrClass, $file=null, $target=null, $since=0, $repliesByArray=false) {
        if ($userOrClass instanceof BAUser) {
            $user=$userOrClass;
            $class=$user->_class;
        } else {
            $class=$userOrClass;
            $user=null;
        }
        /*
        select n1.*,
            n2.class as c_class, n2.user as c_user,
            n2.content as c_content, n2.favs as c_favs
            from
            note n1 left join note n2
            on n2.target=n1.id
            where file=? and time>?

            select n1.*, sum(n2.favs) from
                note n1 inner join note n2
                on n2.target=n1.id
                group by n1.id;

            select n1.*, sum(n2.favs) from
                note n1 inner join note n2
                on n2.target=n1.id;
                where file=? and time>? ;

        */
        $select="select n1.*, ".
            "n2.id as c_id, n2.time as c_time, ".
            "n2.class as c_class, n2.user as c_user, ".
            "n2.content as c_content, n2.favs as c_favs ";
        $from=" from ".
        "note n1 left join note n2 ".
        "on n2.target=n1.id ";
        if ($file) {
            $rf=pdo_select($select.$from.
                "where n1.content<>'' and n1.class=? and n1.file=? and (n1.time>? or n2.time>?)",
                $class->id,$file,$since,$since);
            $ra=self::procResult($user,$rf,$repliesByArray);
            return $ra;
            //header("Content-type: text/json");
            //echo json_encode($ra);
            //return $ra;
        } else if ($target) {
            $rf=pdo_select($select.$from.
                "where n1.content<>'' and n1.target=? and (n1.time>? or n2.time>?)",
                $target,$since,$since);
            $ra=self::procResult($user, $rf,$repliesByArray);
            return $ra;
            //header("Content-type: text/json");
            //echo json_encode($ra);
        } else if ($user) {
            $rf=pdo_select($select.$from.
                "where n1.content<>'' and n1.user=? and (n1.time>? or n2.time>?)",
                $user->name,$since,$since);
            $ra=self::procResult($user, $rf,$repliesByArray);
            return $ra;
        }
    }
    static function procResult($user, $rf,$repliesByArray=false) {
        /*
        select n1.*,
            "n2.id as c_id, n2.time as c_time, ".
            "n2.class as c_class, n2.user as c_user, ".
            "n2.content as c_content, n2.favs as c_favs
        */
        $rh=array();
        $ra=array();
        foreach ($rf as $e) {
            if (isset($rh[$e->id])) {
                $r=$rh[$e->id];
            } else {
                $r=$e;
                $rh[$e->id]=$r;
                $r->favsHaving=0;
                if ($repliesByArray) $r->repliesHaving=array();
                else $r->repliesHaving=0;
                array_push($ra,$r);
            }
            if ($e->c_favs) {
                $r->favsHaving+=$e->c_favs;
                if ($user &&
                    $e->c_class===$user->_class->id &&
                    $e->c_user===$user->name ) {
                    $r->favByMyself=$e->c_id;
                }
            }
            if ($e->c_content) {
                if ($repliesByArray) {
                    array_push($r->repliesHaving, $e);
                } else {
                    $r->repliesHaving++;
                }
            }
        }
        return $ra;
    }
}
 ?>
