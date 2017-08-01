Model = function() {

	var todoList;
	return {
			//登录数据处理
			loginInput: function() {
				var	username = document.getElementById("usernameId").value;
	 			var	password = document.getElementById("passwordId").value;
	 			var storage = this.getLocalStorage();
	 			var All = document.getElementById("allThings");
				var A = {
					getItem: function() {
	 					return storage.getItem(username);
					},
					isPass: function() {
						return storage.getItem(username) ==password;
					},
					setItem: function() {
						storage.setItem(username,password);
					},
					initData:function() {
						storage.setItem("saveUsername",username);

						if(username) {
					         $.ajax({
		                    type: 'get',
		                    url: 'http://localhost:3000/people/' + username,
		                    dataType: "json",
		                    success: function(data) {
		                     	if(data.things) {
		                     		All.innerHTML = data.things
		                     	}
		                    }
		                  });
			      }
					},
					//注册时存储数据；
					savedata:function() {
						$.ajax({
			                type: 'post',
			                url: 'http://localhost:3000/people',
			                dataType: "json",
			                data: {
			                    "name":username,
			                    "password":password,
			                    "id": username
			                }
			            });
					},

					//刷新时储存数据
					saveMainData:function() {
						var allThings = document.getElementById("allThings").innerHTML;
		        $.ajax({
              type: 'put',
              url: 'http://localhost:3000/people/'+username,
              dataType: "json",
              data: {
                "name":username,
                "password":password,
                "things":allThings
              }
            }
            );
					},

					//更新数据
					putData:function() {
						var All = document.getElementById("allThings");
						var realUsername =  storage.getItem("saveUsername");
	          if (realUsername) {
           		$.ajax({
                   type: 'get',
                   url: 'http://localhost:3000/people/' + realUsername,
                   dataType: "json",
                   success: function(data) {
                        if(data.things) {
                            All.innerHTML = data.things;
                         }
                    }
            });
						}
					},

					//退出登录
					leave:function() {
						storage.setItem("saveUsername",null);
					},

					//刷新储存数据
					savebeforeUnload() {

						var realUsername = storage.getItem("saveUsername");
						var savePassword = storage.getItem(realUsername);
						var allThings = document.getElementById("allThings").innerHTML;
		        $.ajax({
              type: 'put',
              url: 'http://localhost:3000/people/'+realUsername,
              dataType: "json",
              data: {
                "name": realUsername,
                "password":savePassword,
                "things":allThings
                 }
             });
					}
				}				
				return A;
			},

			//返回输入框的值
			getKeyValue:function() {
				var event = EventUtil.getEvent(event);
				var target = EventUtil.getTarget();

				return 	target.value;

			},

			//计数器
			numberTest:function() {
				var menu = document.getElementById("menu");
        var getLength = menu.childNodes.length;
        var number=0;
        for(var i=0;i<getLength;i++) {
					if(menu.childNodes[i].className == "child"||menu.childNodes[i].className == "child divnone") {
					document.getElementById("aSId").className = "text2";
					number++;
					}
		  	}
				strongSet = document.getElementsByTagName("strong");
	   		strongSet[0].innerHTML = number;

	   		return number;
			},
		    getLocalStorage: function() {
				if(typeof localStorage =="object") {
					return localStorage;
				}else if(typeof globalStorage == "object") {
					return globalStorage[location.host];
				}else {
					throw new Error("Local storage not available");
				}
			}
	}
} ()




