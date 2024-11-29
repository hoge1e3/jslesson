function genRandID() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
}

var exe_window;
// window.runtime_get_params={};
// runtime_get_params["opt"]=(get_params["opt"])?(get_params["opt"].split(",")):[];
const processCreate = params=>{
	window.process.info = params;
	window.process.end = async ({result,detail}) =>{
		window.process.info.detail = detail;
		window.process.info.result = result;
		window.process.info.filename = location.href;
		window.process.info.lang = 'dncl2';
		window.process.info.classID = Cookies.get('classID') || 'guest';
		window.process.info.userID = Cookies.get('userID') || Cookies.get('uniqueID') || 'unknown';
		window.process.info.parentURL = parent.location.href;
		window.process.info.progID = getParams['progID'] || 'Null';
		// console.log(window.process.info);
		if(window.parent)window.parent.callback(window.process.info);
		
		if(!/klabst.eplang.jp/.test(location.href))return;
		const url = new URL('https://klabst.eplang.jp/dncl/logging.php');
		const response = await fetch(url, {
			method: 'POST',
			dataTyle: 'json',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(window.process.info)
		});
		// console.log(response);
		// console.log(await response.text());
	};
};
window.process={};

// const getUserID = async()=>{
//   const id = await (async()=>{
//     try{
//       return await (await fetch('http://localhost:2029/regist')).text()
//     }catch(e){
//       return false;
//     }
//   })();
//   if(!id){
//     console.log('user regist failed...');
//     setTimeout(getUserID,1000); return; }
//   console.log(id)
//   console.log(`user registed! id:${id}`);
//   Cookies.set('userID',id);
// };

$(function () {
	console.log(getParams);
	if(getParams['hiddenSave']!==undefined){
		document.querySelector('#save').style.display='none';
	}
	if(getParams['hiddenLoad']!==undefined){
		document.querySelector('#load').style.display='none';
	}
	// if(!Cookies.get('userID')) getUserID();
	// if(getParams['class']) Cookies.set('classID',getParams['class']);
	// else if(!Cookies.get('classID'))Cookies.set('classID','guest');
	if(!Cookies.get('userID'))Cookies.set('userID',genRandID());
	if(!window.parent){
		var save_prgrm=localStorage.getItem("prgrm.dncl2");
		if(save_prgrm){
			editor.setValue(save_prgrm);
		}
		if(getParams['noSave']===undefined){
		setInterval(function(){
			var src=editor.getValue();
			localStorage.setItem("prgrm.dncl2",src);
		},3000);
	}

	}
	if(getParams['src']){
		console.log(getParams['src']);
		console.log(utf8_hex_string_to_string(getParams['src']));
		editor.setValue(utf8_hex_string_to_string(getParams["src"]));
		editor.gotoLine(0,0);
	}
	if(getParams['devel']!==undefined){
		[...document.querySelectorAll('.devel')].map(e=>e.style.display='inline-block');
	}
	
	$('#errDialog').dialog({
		autoOpen:false,
		width:'50%',
		'title':'エラーが発生しました。'
	}).hide();

	//プログラムの初期化
  localStorage.setItem("run.js","");
  // $("#exe_window").attr("src","");
	$("#exe_window").attr("src","./runtime/run.html");
  $(window).bind("beforeunload", function() {
    // 確認メッセージに表示させたい文字列を返します。
    return "表示させたい文字列";
  });

  $("#fontsize").click(function(){
    var size=prompt("フォントサイズ",editor.getFontSize());
    editor.setFontSize(size);
  });
	$("#grid_chkbox").change(function(){
		if($(this).prop('checked')){
			document.getElementById('exe_window').contentWindow.window.grid_show();
		}else document.getElementById('exe_window').contentWindow.window.grid_hide();
	});
	Promise.all([
		import('./transpiler/DNCL2PreProcessor.js'),
		import('./transpiler/DNCL2Parser.js'),
	]).then(([{DNCL2PreProcessor},{DNCL2Parser}])=>{
		return;
		const runBtn = document.getElementById("run"); // IDが"Run"のボタンを取得
		setInterval(()=>{
			try{
				const processed = DNCL2PreProcessor(editor.getValue());
				const tree=DNCL2Parser.parse(processed).result[0];
				toWhite();
			}catch(e){
				toRed();
			}
		},100);
	});

	
	Promise.all([
		import('./transpiler/DNCL2PreProcessor.js'),
		import('./transpiler/DNCL2Parser.js'),
		import('./transpiler/DNCL2Semantics.js'),
		import('./transpiler/DNCL2Builder.js'),
		import('./transpiler/ast.js')
	]).then(([{DNCL2PreProcessor},{DNCL2Parser},{DNCL2Semantics},{DNCL2Builder},{toPathList}])=>{
		$("#run").click(function(){
			const src=editor.getValue();
			console.log(src);
			const isSync=str=>/isSync/.test((str.match(/.*\n/)||[''])[0]);
			const [program,ast]=(()=>{
				try{
					processed = DNCL2PreProcessor(editor.getValue());
					const tree=DNCL2Parser.parse(processed).result[0];
					if(tree===false)return [false,false];
					const ast=DNCL2Semantics.analyze(tree);
					console.log('ast',ast);
					const pathList = toPathList(ast);
					const program=(isSync(src)?DNCL2Builder.buildSync:DNCL2Builder.build)(ast);
					console.log(program);
					return [program,pathList];
				}catch(e){
					document.querySelector('#exe_window').contentWindow.displayClear();
					document.querySelector('#exe_window').contentWindow.write(e.message);
					console.error(e);
					// console.log(e);
					return [false,false];
				}
			})();
			// return;
			if(program===false)return;
			console.log(program);
			
			processCreate({code:src,time:(new Date()).toISOString(),ast});

			$("#exe_window").attr("src","");
			// const hex_string=string_to_utf8_hex_string(program);
			// $("#exe_window").attr("src",`./runtime/run.html?src=${hex_string}`);
			
			let url=`./runtime/run.html`;
			localStorage.setItem('run.js',program);
			$("#exe_window").attr("src",url);
		});
	});
	Promise.all([
		import('./transpiler/DNCL2PreProcessor.js'),
		import('./transpiler/DNCL2Parser.js'),
		import('./transpiler/DNCL2Semantics.js'),
		import('./transpiler/ast.js')
	]).then(([{DNCL2PreProcessor},{DNCL2Parser},{DNCL2Semantics},{toPathList}])=>{
		$('#ast').click(()=>{
			const processed = DNCL2PreProcessor(editor.getValue());
			// const src=editor.getValue().replace(/[　｜└]/g,'  ').split('\n').filter(e=>!/^ *$/.test(e)).join('\n');
			const tree=DNCL2Parser.parse(processed).result[0];
			const ast=DNCL2Semantics.analyze(tree);
			toPathList(ast);
		});
	});
	Promise.all([
		import('./transpiler/DNCL2Parser.js'),
		import('./transpiler/DNCL2Semantics.js'),
		import('./transpiler/DNCL2Python.js')
	]).then(([{DNCL2Parser},{DNCL2Semantics},{DNCL2Python}])=>{
		$("#toPython").click(function(){
			const src=editor.getValue().replace(/[　｜└]/g,'  ').split('\n').map(line=>line.replace(/ *\#.*$/,'')).filter(e=>!/^ *$/.test(e)).join('\n');
			// console.log(src);
			const program=(()=>{
				try{
					const tree=DNCL2Parser.parse(src).result[0];
					// return tree;
					const ast=DNCL2Semantics.analyze(tree);
					// return ast;
					console.log('ast',ast);
					// return;
					const python=DNCL2Python.build(ast);
					return python;
				}catch(e){
					document.querySelector('#errSrc').innerHTML=e;
					$('#errDialog').dialog('open');
					// alert(e);
					console.log(e);
					return false;
				}
			})();
			// return;
			if(program===false)return;
			console.log(program);
		});
	});
	$('#genURL').click(()=>{
		const src=editor.getValue();
		const hex_string=string_to_utf8_hex_string(src);
		console.log(`${location.href.replace(/\?.*/,'')}?src=${hex_string}`);
	});
	$("#save").click(function(){
		var src=editor.getValue();
		var node,errFlag=false;
		var filename=inputFileName("ファイル名を入力してください",".dncl2");
		if(filename=="cansel")return;

		var blob=new Blob([src],{type:"text/plain"});
		var url=URL.createObjectURL(blob);

		var a=document.createElement('a');
		a.href=url;
		a.target="_blank";
		a.download=filename;
		a.click();
	});
});

var inputFileName=function(text,ext){
  var filename="ファイル名"+ext;
  filename=prompt(text,filename);
  if(filename == "" || filename == null){
    alert("キャンセルしました。");
    return "cansel";
  }
  if(filename.match(/\.[a-zA-Z0-9]+$/) == null) filename+= ext;
  return filename;
};

function disableButton(btn) {
  btn.disabled = true; // ボタンを無効化する
  btn.style.backgroundColor = "lightcoral"; // 背景色を薄い赤色に変更する
}

function enableButton(btn) {
  btn.disabled = false; // ボタンを有効化する
  btn.style.backgroundColor = ""; // 背景色をもとに戻す
}
