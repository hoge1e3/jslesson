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
        $res="select ";
        foreach ($json->select as $field) {
            
        }
        $res.="from ";
        self::parseFrom($json->from);
    }
    function parseFrom($f) {
        
    }
    function field($expr) {
        
    }
    function insert($json) {
        
    }
    function update($json) {
        
    }
    function del($json) {
        
    }
}
?>