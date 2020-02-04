let topics =  require("./kafka/topics");
let {publish} = require("./kafka/publisher");

(function(){
		setTimeout(function(){
				publish(topics.USER_CREATED,JSON.stringify({user:"Maison"}),function(error, result){
						console.log(error,result)
				})
		}, 5000)
})();