<?php
req("config","MySession","BAClass","BAUser","pdo");
/*define('CONSUMER_KEY', 'XXX');
define('CONSUMER_SECRET', 'YYY');
define('TOKEN_URL', 'https://accounts.google.com/o/oauth2/token');
define('AUTH_URL', 'https://accounts.google.com/o/oauth2/auth');
define('INFO_URL', 'https://www.googleapis.com/oauth2/v1/userinfo');
define('CALLBACK_URL', 'http://localhost/?OAuth/login');
// add http://localhost/?OAuth/login to authroized url 
//optional
define('DEFAULT_DOMAIN','@mail.example.com');
*/

class OAuthController {
    static function start() {
        //--------------------------------------
        // 認証ページにリダイレクト
        //--------------------------------------
        $params = array(
            'client_id' => CONSUMER_KEY,
            'redirect_uri' => CALLBACK_URL,
            'scope' => 'openid profile email',
            'response_type' => 'code',
        );
        // リダイレクト
        $url= AUTH_URL . '?' . http_build_query($params);
        $id=MySession::get("oauthed_id",null);
        self::header();
        ?>
        <h1>メール認証メニュー</h1>
        <?php if ($id) { ?>
            <div><?= $id ?>でログインしています．</div>
            <ul>
                <li><a href=".?OAuth/select">クラス選択</a></li>
                <li><a href="<?= $url ?>">他のメールアドレスでログイン</a></li>
            </ul>
        <?php } else { ?>
            <ul>
                <li><a href="<?= $url ?>">ログイン</a></li>
            </ul>
        <?php }
    }
    static function login() {
        //--------------------------------------
        // アクセストークンの取得
        //--------------------------------------
        $params = array(
            'code' => $_GET['code'],
            'grant_type' => 'authorization_code',
            'redirect_uri' => CALLBACK_URL,
            'client_id' => CONSUMER_KEY,
            'client_secret' => CONSUMER_SECRET,
        );
        $headers = array(
            'Content-Type: application/x-www-form-urlencoded'
        );
        // POST送信
        $options = array('http' => array(
                'method' => 'POST',
                'content' => http_build_query($params),
                'header' => implode("\r\n", $headers)
        ));
        if ($_SERVER["HTTP_HOST"]==="localhost") {
            $options['ssl']=array();
            $options['ssl']['verify_peer']=false;
            $options['ssl']['verify_peer_name']=false;
        }
        $res = file_get_contents(TOKEN_URL, false, stream_context_create($options));

        // レスポンス取得
        $token = json_decode($res, true);
        if(isset($token['error'])){
            echo 'エラー発生';
            exit;
        }
        $access_token = $token['access_token'];


        //--------------------------------------
        // ユーザー情報を取得してみる
        //--------------------------------------
        $params = array('access_token' => $access_token);
        $options=array();
        if ($_SERVER["HTTP_HOST"]==="localhost") {
            $options['ssl']=array();
            $options['ssl']['verify_peer']=false;
            $options['ssl']['verify_peer_name']=false;
        }
        $res = file_get_contents(INFO_URL . '?' . http_build_query($params),
        false, stream_context_create($options));
        $res = json_decode($res, true);
        //echo "<pre>" . print_r($res, true) . "</pre>";
        $id=getID($res["email"]);
        MySession::set("oauthed_id",$id);
        header("Location: .?OAuth/select");
    }
    static function select() {
        $id=MySession::get("oauthed_id");
        $r=pdo_select("select class,name from user where name=?;",$id);
        $a=array();
        foreach ($r as $e) {
            array_push($a,$e->{"class"});
        }
        if (count($a)==0) {
            self::header();
            ?>
            <?=$id?> - 現在登録されているクラスがありません．
            <?php
            return;
        } else if (count($a)==1) {
            $className=$a[0];
        } else {
            $className=null;
            $classNameP=param("className",null);
            foreach ($a as $e) {
                if ($e===$classNameP) {
                    $className=$e;
                }
            }
        }
        if ($className) {
            $class=new BAClass($className);
            $user=new BAUser($class, $id);
            if (!$user->exists()) {
                $user->password=rand(10000,99999)."";
                $user->make();
            }
            MySession::set("class",$class->id);
            MySession::set("user",$user->name);
            header("Location: .");
        } else {
            self::header();
            //            header("Location: .?OAuth/selectDone&className=$a[0]");
            ?>
            <h1><?=$id?> - クラス選択</h1>
            <ul>
            <?php
            foreach ($a as $e) {
                ?>
                <li><a href=".?OAuth/select&className=<?= $e ?>">
                    <?= $e ?></a></li>
                <?php
            }
            ?></ul><?php
        }
        //echo $id;
    }
    static function header() {
        echo "<a href='.'>トップ</a><hr>";
    }
}
function getID($id) {
    if (defined("DEFAULT_DOMAIN")) {
        if (endsWith($id,DEFAULT_DOMAIN)) {
            return substr($id,0,strlen($id)-strlen(DEFAULT_DOMAIN));
        }
    }
    return $id;
}
function endsWith($haystack, $needle) {
    return (strlen($haystack) > strlen($needle)) ? (substr($haystack, -strlen($needle)) == $needle) : false;
}
