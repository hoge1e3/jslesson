<?php
class JSQN {
    var $schema;
    function read($json) {
        /*
        ["read",{
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
        }]
        */
        $res="select ";$com="";
        foreach ($json->select as $field) {
            $res.=$com. self::parseField($field);
            $com=", ";
        }
        $res.=" from ";
        $res.=self::parseFrom($json->from);

        echo $res;
        //$p=pdo();
        //$sth=$pdo->prepare($res);
        //$sth->execute(array());
        //$p->query();

    }
    function parseFrom($f) {
        if (is_array($expr)) {

        } else if (is_string($expr)) {
            return self::table($expr);
        }
    }
    function parseField($expr) {
        if (is_array($expr)) {
            if (count($expr)>=2 && $expr[0]=="field") {

            }
        } else if (is_string($expr)) {
            return self::field($expr);
        }

    }
    function field($s) {
        return "`$s`";//TODO injection
    }
    function table($s) {
        return "`$s`";//TODO injection
    }
    function insert($json) {

    }
    function update($json) {

    }
    function del($json) {

    }
}
?>
