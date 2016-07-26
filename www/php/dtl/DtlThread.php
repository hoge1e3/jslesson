<?php
class DtlThread {
    public static $methodMap=array(
        "else"=>"_else","while"=>"_while","use"=>"_use"
    ); 
    public static function run($self,$block,$args) {
        $stack=new DtlArray;
        $scope=$block->__scope->create();//DtlObj::create($block->scope);
        $scope->self=$self;
        $scope->arguments=$args;
        //echo count($block->code);
        foreach ($block->code as $c) {
            //$len=count($this->stack);
            //echo " {$c[0]} sp=$len \n";
            switch ($c[0]) {
            //pushi (immedeate) 
            case "pushi":
                $stack->push(DtlUtil::wrap($c[1]));
                break;
            //push1 nameid (local)  -> push1 nameid(self::name)
            case "pushbinding":
            case "push1":
                $name=$c[1];
                $stack->push(DtlObj::s_get($scope,$name));
                break;
            //[obj] push2 nameid
            case "push2":
                $name=$c[1];
                $obj=$stack->pop();
                $stack->push(DtlObj::s_get($obj,$name));
                break;
            //pushb blockid  (with dtlbind)
            case "pushbb": // block with binding
            case "pushb":
                $stack->push(new DtlBlock($scope,$c[1]) );
                break;
            //[obj] [arg1] .... [argN] send #N,$nameid   
            case "send":
                $n=$c[1];
                $name=$c[2];
                $args=array();
                for ($i=0;$i<$n;$i++) array_unshift($args,$stack->pop());
                //$obj=$this->stack[count($this->stack)-($n+1)];
                $obj=$stack->pop();
                if (is_float($obj) || is_int($obj)) {
                    $obj=new DtlNumber($obj);
                } else if (is_string($obj)) {
                    $obj=new DtlString($obj);
                }
                if (!is_object($obj)) {
                    throw new Exception("オブジェクトではない値にメソッド".$name."を呼び出しています");
                }
                $f=DtlObj::s_get($obj,$name);
                $mmapped=isset(self::$methodMap[$name])?self::$methodMap[$name]:$name;
                if ($f instanceof DtlBlock) {
                    $stack->push(self::run($obj,$f,$args));
                } else if (method_exists($obj,$mmapped)) {
                    $stack->push(DtlUtil::wrap(
                        call_user_func_array(array($obj,$mmapped),$args)));
                } else {
                    throw new Exception($obj."::".$name."はメソッドではありません");
                }
                break;
            // ret
            case "ret":
                return $stack->pop();
            // [val] store1 nameid layer
            case "storebinding":
            case "store1":
                $name=$c[1];
                $layer=$c[2];
                $val=$stack->pop();
                $sscope=$scope;
                while ($layer-->0) $sscope=$sscope->__proto__;
                DtlObj::s_set($sscope,$name,$val);
                $stack->push($val);
                break;
            //[obj] [val] store2 nameid (obj.nameid=val)
            case "store2":
                $name=$c[1];
                $val=$stack->pop();
                $obj=$stack->pop();
                DtlObj::s_set($obj,$name,$val);
                $stack->push($val);
                break;
            // Deprecated?
            case "para":
                $name=$c[1];
                DtlObj::s_set($scope, $name, array_shift($scope->arguments));
                break;                
            case "tmp":
                $name=$c[1];
                DtlObj::s_set($scope, $name, 0);
                break;
            case "pop":
                $n=$c[1];
                while($n--) $stack->pop();
                break;
            }
        } 
    }
}
?>