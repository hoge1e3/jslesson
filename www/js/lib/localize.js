let timeout=(t)=>new Promise((s)=>setTimeout(s,t));
let freq={};
let dictstr=`
グループ    Group
ユーザ  User
解答者    Answered by
解答    Answer
点数    Score
作成者    Created by
問題文    Question Text
正解    Correct Answer
解答とコメント    Answers and comments
選択肢    Options
未解答    Unanswered
全クイズと解答  All quizzes and answers
クラス一覧に戻る    Return to class list    
クラス管理    Manage class
クラス設定    Class Configuration
ユーザ登録    Register Users
ユーザ一覧    User List
ユーザの状況一覧    Users' Log
ユーザの全ファイルダウンロード    
演習画面へ  Start programming
教員ページトップ    Return to teacher top page    
教員パスワード変更    
クラス一覧    List of classes
クラス名    Class name
最近    Last
分間    Minutes
年    year
集計    count
クラス管理に戻る    Return to class management    
自動再読み込みをする    Auto reload
対象の時刻を変える    Change time range
着手時間    Elapsed Time    
最新のソースコード一覧  Recent Source Codes    
タイムラインを別画面で見る    
時    Hour
から    From
までの実行状況  Execution Status    
分    Min
秒から   Seconds
エラー  Error
実行    Run
実行からの経過時間  Elapsed Time from last execution
今実行しているファイル  Current File
答え合わせ    Review
新しいクイズを作る  Create New Quiz    
教員専用メニュー    Teacher Menu
クイズを作る    Create Quiz
みんなのクイズを確認    Check others' Quizzes
個人でクイズを解く    Answer to Quiz
ホーム    Home
クラス    Class
現在の活動    Current Activity
ユーザ切り替え    Change User
実習環境    BitArrow
自分のクイズを確認する  Check Quizzes    
グループ番号    Group No.
メンバー    Member
みんなのクイズを確認する    Check others' Quizzes     
グループを変更する    Change Group
クイズに解答する    Answer to Quiz
答え合わせする    Review
自分たちが作成したクイズ    My Quizzes    
他の活動で作成したクイズ    My Quizzes in other activities
他の人の解答    What others answers 
他の人の解答にコメントする    Comment to answer
自分が書いたコメントを見る    Check my comments
で解いたクイズ    Answered Quizzes
これまで解いたすべてのクイズ    All Quizzes
自分たちが作成したクイズを確認する  Check my quizzes
教員メニュー    Teacher's menu
進捗設定    Phases
最新の情報に更新  Reload  
変更    Change
一覧    List
その他    Other
グループとメンバーを見る    List of groups and members    
全クイズと解答を見る    All Quizzes and answers
解答と得点を表で見る    Answers and scores
全コメントを見る    All Comments
教員連絡用チャット    
設定    Settings
`;
let dict={};
for (let d of dictstr.split("\n")) {
    let ds=d.split(/\s\s+/,2);
    if (ds.length===2) {
        dict[ds[0]]=ds[1];
    }
}
console.log(dict);
let rjp=	/[ーぁ-んァ-ヶ々〇〻\u3400-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF]+/g;
function doRepl(jpstrs) {
    return jpstrs.replace(rjp, (jpstr)=> {
        freq[jpstr]=freq[jpstr]||0;
        freq[jpstr]++;
        if (dict[jpstr]) return `${jpstr}(${dict[jpstr]})`;
        return jpstr;
    });
}
async function traverse(dom) {
    for (let e of dom.childNodes ){
        if (!e.tagName) { 
            e.textContent=doRepl(e.textContent);
            await timeout(0);            
        } else if (e){ 
            if (e.value) e.value=doRepl(e.value);
            traverse(e); 
        }
    }
}
window.addEventListener("load", ()=>
(async function () {
    return; // disable
    await traverse(document.body);
    let keys=Object.keys(freq);
    keys=keys.filter((s)=>!dict[s]);
    keys=keys.sort((a,b)=>freq[b]-freq[a]);
    keys=keys.slice(0,50);
    let buf="";
    for (let key of keys) {
        buf+=`${key}    \n`;
    }
    console.log(buf);
})()
);
