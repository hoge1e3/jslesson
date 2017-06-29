<?php
class JSQN {
    var $schema;
    function setSchema($s) {
        //{"tableName": {"fieldName":true||["eq",value]}  }
        $this->schema=$s;
    }
    function setReadPreprocessor($prc) {
        $this->rdPrc=$prc;
    }
    function read($obj) {
        $this->whereByConstraint=array();
        if (isset($this->rdPrc)) {
            $p=$this->rdPrc;
            $obj=$p($obj);
        }
        //var_dump($obj);
        /*
        {
            from: ["innerjoin",
                ["table","product","p"],
                ["table","order","o"],
                ["on",["eq",["field",p.id"],["field","o.product"] ]]
            ],
            select: [
                ["field","p.name","name"],
                ["as",["*",["field","p.price"],["field","o.qty"]],"amount"]
            ],
            where: ["gt","amount",300]
        }
        */
        $res="select ";$com="";
        foreach ($obj->select as $field) {
            $res.=$com. $this->parseField($field);
            $com=", ";
        }
        $res.=" from ";
        $res.=$this->parseFrom($obj->from);

        if (!isset($obj->where)) {
            $obj->where=null;
        }
        $res.=$this->parseWhere($obj->where);
        echo $res;
        return pdo_select($res);
        //$p=pdo();
        //$sth=$pdo->prepare($res);
        //$sth->execute(array());
        //$p->query();

    }
    function isAccessibleTable($table) {
        return isset($this->schema[$table]);
    }
    function parseFrom($expr) {
        if (is_array($expr)) {

        } else if (is_string($expr)) {
            if (!$this->isAccessibleTable($expr)) throw new Exception("$expr is not accessible");
            $this->getFieldConstraints($expr);
            return $this->table($expr);
        }
        $this->err("parseFrom",$expr);
    }
    function getFieldConstraints($table) {
        $s=$this->schema[$table];
        foreach ($s as $f=>$c) {
            if (is_array($c)) {
                if ($c[0]==="eq"){
                    $this->whereByConstraint[]=["eq",["field",$f],$c[1]];
                }
            }
        }
    }
    function err($at,$expr) {
        var_dump($expr);
        throw new Exception("parse err at $at");
    }
    function parseField($expr) {
        if (is_array($expr)) {
            if ($expr[0]=="field") {
                if (count($expr)===2) {
                    return $this->field($expr[1]);
                } else if (count($expr)===3) {
                    return $this->field($expr[1])." as ".$this->field($expr[2]);
                }
            } else {
                return $this->parseExpr($expr);
            }
        } else if (is_string($expr)) {
            return $this->field($expr);
        }
        $this->err("parseField",$expr);
    }
    function parseWhere($expr) {
        $w=$this->whereByConstraint;
        if (is_array($expr)) {
            $buf=" where ";
            if (count($w)>0) {
                array_push($w,$expr);
                array_unshift($w,"and");
                $buf.=$this->parseExpr($w);
            } else {
                $buf.=$this->parseExpr($expr);
            }
            return $buf;
        } else {
            if (count($w)>0) {
                $buf=" where ";
                array_unshift($w,"and");
                $buf.=$this->parseExpr($w);
                return $buf;
            } else {
                return "";
            }
        }
    }
    function parseExpr($expr) {
        $op=$expr[0];
        if ($op==="and") {
            $buf="";
            for ($i=1;$i<count($expr);$i++) {
                if ($i>1) $buf.=" and ";
                $buf.=$this->parseExpr($expr[$i]);
            }
            return $buf;
        }
        if ($op==="eq") {
            return $this->parseExpr($expr[1])."=".$this->parseExpr($expr[2]);
        }
        if ($op==="like") {
            return $this->parseExpr($expr[1])." like ".$this->parseExpr($expr[2]);
        }
        if ($op==="field") {
            return $this->parseField($expr);
        }
        if ($op==="str") {
            return $this->str($expr[1]);
        }
        $this->err("parseExpr",$expr);
    }
    function field($s) {
        return "`$s`";//TODO injection
    }
    function table($s) {
        return "`$s`";//TODO injection
    }
    function str($s) {
        return "'$s'";//TODO injection
    }
    function insert($obj) {

    }
    function update($obj) {

    }
    function del($obj) {

    }
}
?>
