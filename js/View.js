View = function() {
	var M = Model;
	return {

		initTodo: function() {

			var loginTodo = '<div class="loginTop" id="loginMainId">'+
					'<img src="images/login.png">'+
					'<p id="Item">login to Todos</p>'+
					'</div>'+
					'<div class="loginMain" id="mainId">'+
						'<div class="username">'+
							'<p>Username</p>'+
							'<input class="userinput" type="text" placeholder="和风" id="usernameId">'+
						'</div>'+
						'<div class="password">'+
							'<p>Password</p>'+
							'<input class="passwordinput" type="password" placeholder="***" id="passwordId">'+
						'</div>'+
						'<div class="Security divnone" id="SecurityId">'+
							'<p>Security Question</p>'+
							'<input class="Questioninput" type="text" placeholder="Who is my best friend?" id="QuestionId">'+
							'<p>Security Answer</p>'+
							'<input class="Answerinput" type="text" placeholder="He is ..." id="AnswerId">'+
						'</div>'+
						'<button class="signIn" id="signInId">Sign in</button>'+
						'<button class="Register divnone" id="RegisterId">Register</button>'+
					'</div>'+
					'<div class="Creat" id="CreatId">'+
						'<p>New to Todos?<button id="CreatAccount" class="creatAccount">Creat an account</button></p>'+
					'</div>'


			var mainTodo = '	<div class="main divnone" id="TodosMainId">'+
			'<p class="todos">todos</p>'+
			'<button id = "leave" class="leave">退出登录</button>'+
			'</div>'+
			'<div id="menu" class="divnone">'+
				'<div class="top">'+
					'<span>'+
						'<input class="text2" id ="aSId" type="button" value = "aS">'+
					'</span>'+
					'<span>'+
						'<input class="text" id="text" type="text" placeholder="What needs to be done？" autofocus>'+
					'</span>'+
				'</div>		'+
			'</div>	'+
		  		'<div class= "bottom divnone" id="bottomid">'+
		  			'<span class="bottomText">'+
		  				'<strong>0</strong>'+
		  				'items left'+
		  			'</span>'+
		  			'<ul id="ulbottom">'+
		  				'<li>'+
		  					'<button class="All">All</button>'+
		  				'</li>'+
		  				'<li>'+
		  					'<button class="Active">Active</button>'+
		  				'</li>'+
		  				'<li>'+
		  					'<button class="Completed">Completed</button>'+
		  				'</li>'+
		  				'<li class="lastLi">'+
		  					'<button class="clearCompleted divnone" id = "lastliID">clear Completed</button>'+
		  				'</li>'+
		  			'</ul>'+
		  		'</div>'
	    	document.getElementById("allThings").innerHTML = loginTodo+mainTodo;							
		},

		//用户登录验证
		loginInput: function() {
			var C = {
				userNoExit: function() {
					alert("该用户不存在");
				},
				passwordNoSure: function() {
					alert("密码错误");
				},
				succeed:function() {
					alert("登录成功");
				},
				register:function() {
					alert("注册成功");
				},

				initMainTodo:function() {
					// var All = document.getElementById("allThings")
					document.getElementById("TodosMainId").className = "main";
					document.getElementById("menu").className = null;
					document.getElementById("loginMainId").className = "loginTop divnone";
					document.getElementById("mainId").className = "loginMain divnone";
					document.getElementById("CreatId").className = "Creat divnone";
				}
			}
			return C;
		},

		//创建账号按钮
		creatAccount: function() {
					document.getElementById("SecurityId").className = "Question";
					document.getElementById("CreatId").className = "Creat divnone";
					document.getElementById("mainId").style.height = "410px";
					document.getElementById("signInId").className = "signIn divnone"
					document.getElementById("RegisterId").className = "Register";
		},

		//注册账号
		register: function() {
			document.getElementById("SecurityId").className = "Security divnone";
			document.getElementById("CreatId").className = "Creat";
			document.getElementById("mainId").style.height = "250px";
			document.getElementById("RegisterId").className = "Register divnone"
			document.getElementById("signInId") .className = "signIn";
		},

		//添加新的todo
		addTodo: function() {
			var menu = document.getElementById("menu");
			var ifbottom = document.getElementById("bottomid");

		    var div = document.createElement("div");
	        var span1 = document.createElement("span");
	        var input = document.createElement("input");
	        span1.className = "getsParent";
	        input.className = "text3";
	        input.type = "button";
	        input.value = "get";
	        span1.appendChild(input);
	        div.appendChild(span1);
	        var span2 = document.createElement("span");
	        span2.className = "childText";
	        span2.innerHTML = M.getKeyValue();
	        div.appendChild(span2);
	        var span3 = document.createElement("span");
	        span3.className = "removeButton";
	        span3.innerHTML = "X";
	        div.appendChild(span3);
	        var img = document.createElement("img");
	        img.src = "images/beforeClick.png";
	        img.className = "mainImg beforeClick";
	        div.appendChild(img);
	        div.className = "child";
	        if(menu.className == "onCompleted") {
        		div.className = "child divnone";
        	}
	        menu.appendChild(div);
	  	    document.getElementById("bottomid").className = "bottom";

	  	    //取消aS按钮
	        document.getElementById("aSId").className = "text2";
		},

		//删除todo
		removeTodo:function() {
			var event = EventUtil.getEvent(event);
			var target = EventUtil.getTarget();
			var menu = document.getElementById("menu");
		    document.getElementById("lastliID").className = "clearCompleted divnone";
	    	menu.removeChild(target.parentNode);
		},
		//当nunber为0时隐藏底部
		removeBottom:function() {
			document.getElementById("bottomid").className = "bottom divnone";
	   		document.getElementById("aSId").className = "text2";
		},
		getBottom:function() {
			document.getElementById("bottomid").className = "bottom";
			document.getElementById("aSId").className = "text2 get";
		},
		//完成事件
		finishTodo:function() {
			var event = EventUtil.getEvent(event);
			var target = EventUtil.getTarget();			
			var menu = document.getElementById("menu");			
			document.getElementById("aSId").className = "text2 get";
			target.className = "text3 get";
			target.parentNode.nextSibling.className = "childText get2";			
			var getLength = menu.childNodes.length;
			var A = {
				changeAS: function() {
					document.getElementById("aSId").className = "text2";
				},
				onActive: function() {
					target.parentNode.parentNode.className = "child childGet divnone";
					document.getElementById("lastliID").className = "clearCompleted divnone";
				},
				noOnActive: function() {
					target.parentNode.parentNode.className = "child childGet";
					document.getElementById("lastliID").className = "clearCompleted";
				}
			}
		 return A;
		},

		//取消完成事件
		cancelFinish:function() {
			var event = EventUtil.getEvent(event);
			var target = EventUtil.getTarget();
			var menu = document.getElementById("menu");
			document.getElementById("lastliID").className = "clearCompleted divnone";
			target.className = "text3";
			target.parentNode.nextSibling.className = "childText";
			document.getElementById("aSId").className = "text2";
			var A = {
				noOnCompleted:function() {
					target.parentNode.parentNode.className = "child";
				},
				onCompleted:function() {
					target.parentNode.parentNode.className = "child divnone";
				},
				changCompleted:function() {
					document.getElementById("lastliID").className = "clearCompleted";
				}
			};
			return A;
		},

		//隐藏todo
		divnoneTodo: function() {
			var A = {
				divnoneChild:function(i) {
					menu.childNodes[i].className = "child divnone";
			  },
			  divnoneChildG:function(i) {
			  	menu.childNodes[i].className = "child childGet divnone";
			  },
			  divClearCompleted:function() {
			  	document.getElementById("lastliID").className = "clearCompleted divnone";//隐藏全清按钮
			  }
			}
			return A;
		},

		//使隐藏的todo出现
		showTodo: function() {
			var A = {
				showChild: function(i) {
					menu.childNodes[i].className = "child";
				},
				showChildG: function(i) {
					menu.childNodes[i].className = "child childGet";
				},
				showClearCompleted:function() {
					document.getElementById("lastliID").className = "clearCompleted";
				}
			}

			return  A;
		},

		//全选按钮
		AllSelect: function() {
			var A = {
				changeText3:function(i) {
					menu.childNodes[i].childNodes[0].childNodes[0].className = "text3 get";
				},
				changeChildText:function(i) {
					menu.childNodes[i].childNodes[1].className = "childText get2";
				}
			}
			return A;
		},

		//取消全选按钮
		cancelAllSelect:function() {
			var A = {
				changeText3:function(i) {
					menu.childNodes[i].childNodes[0].childNodes[0].className = "text3";
				},
				changeChildText:function(i) {
					menu.childNodes[i].childNodes[1].className = "childText";
				}
			}

			return A;
		},

		//退出登录
		leave:function() {
			document.getElementById("TodosMainId").className = "main divnone";
			document.getElementById("menu").className = "divnone";
			document.getElementById("loginMainId").className = "loginTop";
			document.getElementById("mainId").className = "loginMain";
			document.getElementById("CreatId").className = "Creat";
			document.getElementById("bottomid").className = "bottom divnone";
			document.getElementById("menu").innerHTML = "";
		}
}
} ()
