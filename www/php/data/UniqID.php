<?php
class UniqID {
    static function find($existCheckFunc, $initMax=90,$min=10) {
        $max=$initMax;
        $f=$existCheckFunc;
        while(true) {
            $id=rand($min,$max);
            if (! $f($id) ) break;
            $max*=2;
        }
        return $id;
    }
}
