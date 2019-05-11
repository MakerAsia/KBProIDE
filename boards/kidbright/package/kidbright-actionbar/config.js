module.exports = {
    name : 'kidbright-actionbar',
    title : 'KidBright Actionbar',
    description : 'Actionbar menu for kidbright board',
    auther : '?',
    website : '?',
    git : '',
    image : '',
    version : '1.0.0',
    component : [
        'actionbar-just-compile',
        'actionbar-build',
        'actionbar-wifi',
        'actionbar-set-clock',
        'actionbar-qrcode'
    ],
    data : {
        wifi_ssid : '',
        wifi_password : '',
        enable_iot : false,
        loaded : false , //this will automatic set to 'true' if this pacakage loaded to IDE
    },
    persistence : {
        test : true
    }
};
