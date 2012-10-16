/**********
 * Chat functions
 **********/
var LINK_PRINT = /%.+/i;
//ToDo: refine and make greedy. Test string is:
// var s = '[аупопа] [собака] А я иду, гуляю по [Москве], и я пройти еще смогу';
// res = NICKNAME.exec(s);
var NICKNAME = /^(?:\[.+\])*/i;

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


/**
 * Add long messages support
 */ 
sendLongMessage = function(){
	var msg = $('#div_chat_panel #chat_msg').val();
	var recipients = NICKNAME.exec(msg);
	var delimiter = '...';
	//max length of chunk, with room for '...' between messages
	var chunkSize = 247 - recipients.length - delimiter.length;	
	var part;
	do {
		if (msg.length < chunkSize + delimiter.length) {
			part = msg;
			msg = '';
		} else {
			part = recipients + msg.substr(0, chunkSize) + '...';		
		}
		msg = msg.slice(chunkSize);

	  $('#div_chat_panel #chat_msg').val(msg);

	  var press = jQuery.Event("keypress");
		press.ctrlKey = false;
		press.which = 13;
		$('#div_chat_panel form').trigger(press);		
	} while(msg.length > 0);
}

function chatListener(){
	//Small timeout allows last letter to appear in the input field
	$('#div_chat_panel #chat_msg').keypress(
		function(event){
			setTimeout(shortLinks, 100);
			if (event.which == 13 && $('#div_chat_panel #chat_msg').val().length > 250){
				event.preventDefault();
				sendLongMessage();
			}
		});
}


/**
 * Main handler
 */
function start(){
	chatListener();
}

start();

// [Смотритель] $(element).sendkeys(string) inserts string at the insertion point in an input, textarea or other element with contenteditable=true. If the insertion point is not currently in the element, it remembers where the insertion point was when sendkeys was last called (if the insertion point was never in the element, it appends to the end).