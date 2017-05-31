<?php
class JSQN {
    function read($json) {
        /*
        ["read",{
            from: ["innerjoin",
                ["table","product","p"],
                ["table","order","o"],
                ["p.id","o.product"]
            ],
            select: [
                ["as",["field","p.name"],"name"],
                ["as",["*",["field","p.price"],["field","o.qty"]],"amount"]
            ],
            where: ["gt","amount",300]
        }]
        */
    }
    function insert($json) {
        
    }
    function update($json) {
        
    }
    function del($json) {
        
    }
}
?>