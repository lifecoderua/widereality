/**********
 * Chat functions
 **********/
var LINK_PRINT = /%.+/i;

//Useful links
var links = {
	'эфимерка': 'http://ek.erclans.ru/efimerka/',
	'профы': 'http://order.ereality.ru/articles.php?article_id=71#pro',
	'овл': 'http://bregan.erclans.ru/bregan/index.php?q=ovl'
}

/**
 * Test messages against pattern and replace occurences
 */
shortLinks = function(){
	var msg = $('#div_chat_panel #chat_msg').val();

	var test = LINK_PRINT.exec(msg);
	for (x in test){
		var item = test[x].slice(1);
		if (links[item]){
			msg = msg.replace(test[x], links[item]);
			$('#div_chat_panel #chat_msg').val(msg);
		}
	}
}


function chatListener(){
	//Small timeout allows last letter to appear in the input field
	$('#div_chat_panel #chat_msg').keypress(
		function(){setTimeout(shortLinks, 100);}
		);
}


/**
 * Main handler
 */
function start(){
	chatListener();
}

start();
