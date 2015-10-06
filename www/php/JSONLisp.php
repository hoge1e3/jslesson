class JSONLisp {
    var $keys, $special, $builtin;
    function JSONLisp() {
	    $keys = array(
	        EXPR=> "passing_expr",
	        Q=> "quote",
	        C=> "curScope",
	        "while"=> "while",
	        A_LEN=> "array_len",
	        O_EACH_K=> "obj_each_keys",
	        A_GET=> "array_get",
	        O_GET=> "object_get",
	        A_SET=> "array_set",
	        O_SET=> "object_set",
	        V_GET=> "var_get",
	        V_SET=> "var_set",
	        LAZY=> "lazy",
	        LAMBDA=> "lambda"
	    );
		$special = array($keys["Q"]=>1, 
		$keys["V_GET"]=>1, $keys["V_SET"]=>1,
		$keys["LAZY"]=>1,$keys["LAMDA"]=>1);
		$builtin = array();
    }
    function addBuiltin($obj,$name,$alias) {
        if (!isset($alias)) $alias=$name;
        $builtin[$alias]=array($obj,$name);
    }
	function quote($scope, $expr) {
        $args = [];
        for ($i = 1; $i < count($expr); $i++) {
            $args.push($expr[$i]);
        }
        return $args;
    }
    function var_get($scope, $expr) {
        return $self->get($scope, $this->ev($scope, $expr[1]));
    }
    function var_set($scope, $expr) {
        return $self->set($scope, $this->ev($scope, $expr[1]), $this->ev($scope, $expr[2]));
    }
	function lazy($scope, $expr) {
        return array(
            scope=> $scope,
            expr=> $expr[1]
        );
    }
    function lambda($scope, $expr) {
        return array(
            scope=> $scope,
            expr=> $expr[2],
            params=> $expr[1]
        );
    }
    function ev($scope, $expr) {
        if (!is_array($expr) || !$expr[0]) return $expr;    
        $cmd = $this->ev($scope, $expr[0]);
        if (isset($special[$cmd])) {
            return call_user_func_array( array($this,$cmd), array($scope, $expr) );    
        }
        if (is_string($cmd) == "string") {    
            $n = $cmd;
            $cmd = $this->get($scope, $n);
        }
        if (!$cmd) throw new Exception("Command $cmd ($n) not found");    

        $args = array();    
        for ($i = 1; $i < count($expr); $i++) {	
            $a=$this->ev($scope, $expr[$i]);    
            if ($this->is_exception($a)) return $a;    
            array_push($args, $a);    
        }    
        return $this->apply($cmd, $args);
   }
   function apply($cmd, $args) {
            if (!isset($args)) $args=array();
            if (is_string($cmd) && isset($this->builtin[$cmd])) {
                return call_user_func_array($this->builtin[$cmd], $args);
            } else if (isset($cmd["expr"])) {
                if (isset($cmd["params"]) {
                    $ns = $this->newScope($cmd["scope"]);
                    foreach ($cmd["params"] as $i=>$n) {
                        $this->set($ns, $n, $args[$i]);
                    }
                    return $this->ev($ns, $cmd["expr"]);
                } else {
                    return $this->ev($cmd["scope"], $cmd["expr"]);
                }
            }
            throw new Exception("Command $cmd not found");
   }
   function newScope(o) {
       return array(__proto__=>o);
   }   
       $this->addBuiltin($this,"newScope");
       $this->addBuiltin($this,"get");
       $this->addBuiltin($this,"set");
   function get($scope, $name) {
       for ($o=$scope;isset($o); $o=$o["__proto__"]) {
           if (isset($o[$name])) {
               return $o[$name];
           }
       }
   }
   function set($scope, $name, $value) {
       return $scope[name] = value;
   }
       $this->addBuiltin($this,"mul");
   function mul($x, $y) {
            return $x * $y;
   }
       $this->addBuiltin($this,"add");
   function add($x, $y) {
            return x + y;
   }
       $this->addBuiltin($this,"cat");
   function cat() {
       return implode("",func_get_args());
   }
       $this->addBuiltin($this,"lt");
       $this->addBuiltin($this,"lt","<");
   function lt($a, $b) {
            return $a < $b;
   }
       $this->addBuiltin($this,"prog","do");
   function prog() {
       $args=func_get_args();
       return $args[count($args) - 1];
   }
       $this->addBuiltin($this,"array_len");
   function array_len($a) {
       return count($a);
   }
       $this->addBuiltin($this,"_if","if");
   function _if($cond, $then, $else) {
            if ($cond) return $this->apply($then);
            if ($else) return $this->apply($else);
   }
        "while"=> function(cond, $expr) {
            var res;
            while (apply(cond)) {
                res = apply($expr);
                if (B.is_exception(res)) {
                    if(res.message=="break") {
                        return res.message;
                    }
                    return res;
                }
            }
            return res;
        },
        "try"=> function (stmt,cat) {
            try {
                var res=apply(stmt);
                if ($this->is_exception(res)) return apply(cat,[res.message]);
                return res;
            } catch (Exception e) {
                return apply(cat,[e.message]);
            }
        },
        "throw"=> function (mesg) {
            return new Exception(mesg);
        },
    function is_exception($e) {
            return $e instanceof Exception;
    }
    
    function initRoot() {
        $res = array();
        return $res;
    }

    function run($expr) {
        $scope = $self->initRoot();
        return $this->ev($scope, $expr);
    }
})();