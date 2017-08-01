var EventUtil = {
	
	addHandler: function(element,type,handler) {
		if(element.addEventListener) {
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent) {
			element.attachEvent("on" + type,handler);
		}else {
			element["on" +type] = handler;
		}
	},

	getEvent: function(event) {
		return event ? event : window.event;
	},

	getTarget: function() {
		return event.target || event.srcElement;
	},

	preventDefault: function(event) {
		if (event.preventDefault) {
			event.preventDefault();
		}else {
			event.returnValue = false;
		}
	}
}


Controller = function(){
	var M = Model,
	    V = View;

    var C = {  
        start: function() {
            V.initTodo()
            this.__listen()
        },

	    	__listen() {
	    		//页面点击事件监听
	    		EventUtil.addHandler(document,"click",function() {
	    			var event = EventUtil.getEvent(event);
						var target = EventUtil.getTarget();
						var className = target.className;
						var menu = document.getElementById("menu");
						var getLength = menu.childNodes.length;
						//登录页面验证
						if(className == "signIn") {
							if(M.loginInput().getItem()) {
								if(M.loginInput().isPass()){
									V.loginInput().succeed();
									V.loginInput().initMainTodo();
									M.loginInput().initData();
								}else {
									V.loginInput().passwordNoSure();
								}
							}else{
								V.loginInput().userNoExit();
							}
						};
						//创建账号页面
						if(className == "creatAccount") {
							V.creatAccount();
						}

						//创建账号按钮
						if (className =="Register" ) {
							M.loginInput().setItem();
							V.register();
							V.loginInput().register();
							M.loginInput().savedata();
						}

						//删除todo按钮
						if(className == "removeButton") {
							V.removeTodo();
							M.numberTest();
							if(M.numberTest()==0) {
								V.removeBottom();
								var getLength = menu.childNodes.length;    						
          			for(var i=0;i<getLength;i++) {
									if(menu.childNodes[i].className == "child"||menu.childNodes[i].className == "child divnone"||menu.childNodes[i].className == "child childGet divnone"||menu.childNodes[i].className == "child childGet") {
										V.getBottom();
									}
								}

							}

						}

						//完成事件按钮
						if(className == "text3") {
							V.finishTodo();
							if(menu.className == "onActive") {
								V.finishTodo().onActive();
							}else {
								V.finishTodo().noOnActive();
							}
							for(var i=0;i<getLength;i++) {
	              if(menu.childNodes[i].className == "child") {
				    			V.finishTodo().changeAS();
								}
							}
							M.numberTest();
						}

						//取消完成事件
						if(className == "text3 get") {
							V.cancelFinish();
							var getLength = menu.childNodes.length;

							if (menu.className == "onCompleted") {
								V.cancelFinish().onCompleted();
							}else {
								V.cancelFinish().noOnCompleted();
							}
	        		for(var i=0;i<getLength;i++) {
			 					if(menu.childNodes[i].className == "child childGet") {
									V.cancelFinish().changCompleted();
								}
							}
							M.numberTest();
						}

						//未完成事件按钮
						if(className == "Active") {
							menu.className = "onActive";
							for(var i = 0;i<getLength;i++) {
								if(menu.childNodes[i].className == "child childGet"){
									V.divnoneTodo().divnoneChildG(i);
								}
								if(menu.childNodes[i].className == "child divnone"){
									V.showTodo().showChild(i);
								}
							}

							V.divnoneTodo().divClearCompleted();
						}

						//全部事件按钮
						if(className =="All") {
							menu.className = "onAll";
							var getLength = menu.childNodes.length;
							for(var i = 0;i<getLength;i++) {
 								if(menu.childNodes[i].className == "child childGet divnone") {
 									V.showTodo().showChildG(i);
 								}
 								if(menu.childNodes[i].className == "child divnone") {
 									V.showTodo().showChild(i);
 								}

 								if(menu.childNodes[i].className == "child childGet") {
 			    				V.showTodo().showClearCompleted();
 								}
 							}
						}

						//已完成事件按钮
						if(className == "Completed") {
							menu.className = "onCompleted";
 							var getLength = menu.childNodes.length;

 							for(var i = 0;i<getLength;i++) {
 								if(menu.childNodes[i].className == "child childGet divnone") {
 									V.showTodo().showChildG(i);
 								}
 								if (menu.childNodes[i].className == "child") {
 									V.divnoneTodo().divnoneChild(i);
 								}
 								if(menu.childNodes[i].className == "child childGet") {
 									V.showTodo().showClearCompleted();
 								}
 							}
						}

						//全选按钮
						if(className =='text2') {
							document.getElementById("lastliID").className = "clearCompleted";
							target.className = "text2 get";
							var getLength = menu.childNodes.length;
							for(var i=0;i<getLength;i++) {
									if(menu.childNodes[i].className == "child")	 {
										V.showTodo().showChildG(i);
										V.AllSelect().changeText3(i);
										V.AllSelect().changeChildText(i);
									}
				
									if(menu.childNodes[i].className == "child divnone") {
										V.divnoneTodo().divnoneChildG(i);
										V.AllSelect().changeText3(i);
										V.AllSelect().changeChildText(i);
									}			
							}

							if(menu.className == "onCompleted") {
			  				var getLength = menu.childNodes.length;
								for(var i=0;i<getLength;i++) {
									if(menu.childNodes[i].className == "child childGet divnone") {
										V.showTodo().showChildG(i);
									}
								}
							}

							if(menu.className == "onActive") {
								var getLength = menu.childNodes.length;
								for(var i=0;i<getLength;i++) {
									if(menu.childNodes[i].className == "child childGet") {
										V.divnoneTodo().divnoneChildG(i);
									}
								}
							}

									M.numberTest();	
						}	

						//取消全选
						if(className =="text2 get") {
							target.className = "text2";
							V.divnoneTodo().divClearCompleted();
							for(var i=0;i<getLength;i++) {
								if (menu.childNodes[i].className == "child childGet") {
									menu.childNodes[i].className = "child";
										V.cancelAllSelect().changeText3(i);
										V.cancelAllSelect().changeChildText(i)
								}			
							}

							if(menu.className == "onCompleted") {
								for(var i=0;i<getLength;i++) {
									if(menu.childNodes[i].className == "child") {
										V.divnoneTodo().divnoneChild(i);
									}
								}
							}

							if(menu.className == "onActive") {
								for(var i=0;i<getLength;i++) {
									if(menu.childNodes[i].className == "child childGet divnone") {
										V.showTodo().showChild(i);
										V.cancelAllSelect().changeText3(i);
										V.cancelAllSelect().changeChildText(i)
									}
								}
							}
						M.numberTest();		
						}

						//删除全部已完成事件按钮
						if(className == "clearCompleted") {
							document.getElementById("aSId").className = "text2";
							for(var i=0;i<getLength;i++) {
	 							if(menu.childNodes[i] != undefined){
	 								if (menu.childNodes[i].className == "child childGet") {
	 		    					menu.removeChild(menu.childNodes[i]);
	 		     					i--;
	 								}
	 							}
	 						}
	 						V.divnoneTodo().divClearCompleted();
	 						M.numberTest();	
	 						if(M.numberTest()==0) {
	 							V.removeBottom();
	 						}
						}
						//优先级按钮
						if(className == "mainImg beforeClick") {
							target.className = "mainImg afterClick";
							target.src = "images/afterClick.png";
							menu.insertBefore(target.parentNode,menu.childNodes[2]);
						}
						//取消优先级按钮
						if(className == "mainImg afterClick") {
							target.className = "mainImg beforeClick";
							target.src = "images/beforeClick.png";
							menu.appendChild(target.parentNode);
						}
						//退出登录按钮
						if(className =="leave") {
							M.loginInput().leave();
							V.initTodo()
						}
     			});
					//页面双击事件监听
					EventUtil.addHandler(document,"dblclick",function() {
						var event = EventUtil.getEvent(event);
						var target = EventUtil.getTarget();
						var className = target.className;
						if (className == "childText" || className =="childText get2") {
    	      	target.id = "onContenteditable";
    					target.setAttribute("contenteditable",true);
    					target.focus();
  				  }
					})
					//页面失去焦点监听
					EventUtil.addHandler(document,"focusout",function() {
						var event = EventUtil.getEvent(event);
						var target = EventUtil.getTarget();
						var className = target.className;

						if(target.id == "onContenteditable") {
							target.id = null;
							target.setAttribute("contenteditable","false");

							//删除修改后空格的节点
	 						if(target.innerHTML == "") {
		   					menu.removeChild(target.parentNode);
		   					M.numberTest();
							}	
						}
					})
	    		//键盘事件监听
	    		EventUtil.addHandler(document,"keypress",function() {
	    			var event = EventUtil.getEvent(event);
						var target = EventUtil.getTarget();
						var className = target.className;
						//添加todo
						if(className == "text") {
							if(event.keyCode == 13 && target.value != "") {
								V.addTodo();
								target.value = "";
                event.preventDefault(event);
                M.numberTest();
							}
						}
						//确定todo修改
						if(target.className == "childText") {
							if(event.keyCode == 13) {
								target.id = null;
								target.setAttribute("contenteditable","false");
								if(target.innerHTML == "") {
									menu.removeChild(target.parentNode);
									M.numberTest();
								}						
							}			
            }
	    		})
	    		 //刷新事件监听
	    		EventUtil.addHandler(window,"beforeunload",function() {
	    		  	M.loginInput().savebeforeUnload();
	    		})
	    	}

	    }

	    return C;
}()

		var C =Controller;
		C.start();
window.onload = function() {
	Model.loginInput().putData();	
}

	    		// EventUtil.addHandler(window,"beforeunload",function() {
	    		//   	alert("linzifa");
	    		// })