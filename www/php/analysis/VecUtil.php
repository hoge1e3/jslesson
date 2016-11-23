<?php
require_once __DIR__."/../Progress.php";

class VecUtil {
    static $verbose=0;
    
    static function mkvec($src) {
        $vec=array();
    	preg_replace_callback("/[a-zA-Z0-9]+/",function ($a) use (&$vec) {
        	if (!isset($vec[$a[0]])) $vec[$a[0]]=0;
        	$vec[$a[0]]++;
        },$src);
        return $vec;
    }
    static function mkvec2($src) {
        return new Vec(self::mkvec($src));
    }
    static function dist($va,$vb) {
        $v=0;
        foreach (self::unionKeys($va,$vb) as $k) {
            $ca=0;
            if (isset($va[$k])) $ca=$va[$k];
            $cb=0;
            if (isset($vb[$k])) $cb=$vb[$k];
            //print "$k $ca $cb<BR>";
            $v+=pow($ca-$cb,2);
        }
        return sqrt($v);
    }
    static function unionKeys($va,$vb) {
        $keys=array();
        foreach($va as $k=>$v) {
            $keys[$k]=1;
        }
        foreach($vb as $k=>$v) {
            $keys[$k]=1;
        }
        return array_keys($keys);
    }
    public static function centroidFile() {
        $logD=LogUtil::getLogDir();
        $class=Auth::curClass();
        return $logD->rel("$class-vector.json");
    }
    public static function loadCentroids() {
        $f=self::centroidFile();
        $res=array();
        foreach ($f->obj() as $label=>$a) {
            $v=new Vec($a);
            $v->label=$label;
        }
        return $res;        
    }
    public static function saveCentroids($vecs) {// [Vec]
        $f=self::centroidFile();
        $res=array();
        foreach ($vecs as $v) {
            $res[$v->label]=$v->ary;
        }
        $f->obj($res);
    }
    
    public static function kmeans($k,$vecs) {// $vecs:[Vec]
        $cfile=self::centroidFile();
        if ($cfile->exists()) {
            if (self::$verbose) {
                showProgress("kmeans: Loading prev centroids");
            }
            $centroids=self::loadCentroids();    
            $skip=true;
        } else {
            if (self::$verbose) {
                showProgress("kmeans: setting random group");
            }
            foreach ($vecs as $vec) {
                $vec->label=rand(0,$k-1);
            }
            $skip=false;
        }
        $changed=1;
        while ($changed>0) {
            $changed=0;
            if ($skip) {
                $skip=false;
            } else {
                $centroids=array();// [Vec]
                for ($i=0;$i<$k; $i++) {
                    $centroid=new Vec();
                    $centroid->cnt=0;
                    $centroid->label=$i;
                    $centroids[]=$centroid;
                }
                $ccnt=count($vecs);
                foreach ($vecs as $i=>$vec) {
                    $centroid=$centroids[$vec->label];
                    $centroid->addX($vec);
                    $centroid->cnt++;
                }
                foreach ($centroids as $centroid) {
                    if ($centroid->cnt>0) $centroid->mulX(1/$centroid->cnt);
                }
            }
            $cl=new VecCluster2($centroids);
            $ccnt=count($vecs);
            foreach ($vecs as $i=>$vec) {
                $n=$cl->nearest($vec);
                if ($vec->label!=$n->label) {
                    $vec->label=$n->label;
                    $changed++;
                }
            }
            self::saveCentroids($centroids);
            if (self::$verbose) {
                showProgress("kmeans: $changed samples changed. Retrying...");
            }
        }
        return $cl;
    }
}
class Vec {
    var $ary;
    var $label;
    public function Vec() {
        if (func_num_args()==0) {
            $this->ary=array();
        } else {
            $this->ary=func_get_arg(0);
        }
    }
    public function dup() {
        return new Vec($this->ary);
    }
    public function add($v) {
        return $this->dup()->addX($v);
    }
    public function addX($v) {
        foreach ($v->keys() as $k) {
            $this->ary[$k]=$this->get($k)+$v->get($k);
        }
        return $this;
    }
    public function abs() {
        $v=0;
        foreach ($this->keys() as $k) {
            $v+=pow($this->get($k),2);
        }
        return sqrt($v);
    }
    public function dist($v) {
        return $this->sub($v)->abs();
    }
    public function sub($v) {
        return $this->dup()->subX($v);
    }
    public function subX($v) {
        foreach ($v->keys() as $k) {
            $this->ary[$k]=$this->get($k)-$v->get($k);
        }
        return $this;
    }
    public function mul($k) {
        return $this->dup()->mulX($k);
    }
    public function mulX($k) {
        foreach ($this->keys() as $ke) {
            $this->ary[$ke]=$this->get($ke)*$k;
        }
        return $this;
    }
    public function keys() {
        return array_keys($this->ary);
    }
    public function unionKeys($v) {
        return VecUtil::unionkeys($this->keys(),$v->keys());
    }
    public function get($key) {
        if (isset($this->ary[$key])) {
            return $this->ary[$key];
        }
        return 0;
    }
}
class VecCluster2 {
    function VecCluster2($centroids) {//$centroids:[Vec2]
        $this->centroids=$centroids;
    }
    function nearest($vec) {
        $min=-1;$minC;
        foreach ($this->centroids as $c) {
            $d=$c->dist($vec);
            if ($min<0 || $d<$min) {
                $min=$d;
                $minC=$c;
            }
        }
        return $minC;
    }
}

class VecCluster {
    function VecCluster($vecs) {//$vec:array(name=>$vec)
        $this->vecs=$vecs;
    }
    function nearest($vec) {
        $min=-1;$minN;
        $vecs=$this->vecs;
        foreach ($vecs as $name=>$cvec) {
            $d=VecUtil::dist($vec,$cvec);
            if ($min<0 || $d<$min) {
                $minN=$name;
                $min=$d;
            }
        }
        return array($minN,$d);
    }
}


?>