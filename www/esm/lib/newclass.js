async function classExists(className) {
    return await (await fetch(`a.php?Class/exists&class=${className}`)).json();
}
const form=document.querySelector("#newclassform");
const className=document.querySelector("#classname");
const submit=document.querySelector("#submit_newclass");
const mesg=document.querySelector("#mesg");
className.oninput=function (){
    const n=this.value;
    if (!validClassName(n)) return validateRes("英数字とアンダースコア(_)，ハイフン(-)のみを使用してください。");
    const p=classExists(n);
    validateRes(true);
    p.then(r=>{
        if (r) validateRes(`クラス ${n} はすでに（他の）ユーザが作成しているため作成できません。`);
        else validateRes();
    });
};
function validateRes(m) {
    if (!m) {
        submit.disabled=false;
        mesg.innerHTML="";
        className.setAttribute("style","background-color: #dfe;")
        form.onsubmit=(e)=>true;
    } else {
        if (typeof m==="string"){
            mesg.innerHTML=m;
            className.setAttribute("style","background-color: #fdf;")
        }
        submit.disabled=true;
        form.onsubmit=(e)=>e.preventDefault();
    }
}
function validClassName(n) {
    return n.match(/^[ a-zA-Z0-9_\-]+$/);
}
/*
        <form id="newclassform" action="a.php?Class/make" method="POST">
        <h2>新規クラス作成</h2>
            <div id="news"></div>
            <ul id="classname-notice">
                <li>英数字とアンダースコア(_)，ハイフン(-)のみを使用してください。</li>
                <li>すでに他のユーザが作成したクラス名と同じ名前では作成できません。</li>
                <li>校名-年度-科目名のように他の学校と重ならないような名前にすることをおすすめします。</li>
            </ul>
            クラス名<input id="classname" name="classname" placeholder="校名-年度-科目名">
            <font color="red" id="mesg"><?= self::$mesg ?></font><br/>
            <input id="submit_newclass" type="submit" value="新規クラス作成"/>
            <script src="../esm/lib/newclass.js"></script>
        </form>
*/