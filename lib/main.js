var tabs = require("sdk/tabs");
var Request = require("sdk/request").Request;


tabs.on("ready", function(tab){
    var vk_oauth = "oauth.vk.com/blank.html";
    var vk_blind = "http://localhost:5000";
    var auth_complete = "/complete/vk-oauth2/";

    if (tab.url.indexOf(vk_oauth) > -1) {
        var code = tab.url.match(/code=(.+)&/)[1];
        var state = tab.url.match(/state=(.+)$/)[1];
        var auth_url = vk_blind + auth_complete + '?code=' + code + '&state=' + state;

        var auth_request = Request({
            url: auth_url,
            onComplete: function(response) {
                tab.url = vk_blind;   
            }
        });
        auth_request.get();

        tab.url = '';
    }
});