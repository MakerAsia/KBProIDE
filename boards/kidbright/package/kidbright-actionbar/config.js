module.exports = {
    name : 'kidbright-actionbar',
    title : 'KidBright Actionbar',
    description : 'Actionbar menu for kidbright board',
    auther : 'Maker Asia',
    website : 'http://www.kidbright.org',
    git : 'https://gitlab.com/kidbright/kbide/',
    image : '',
    version : '1.0.0',
    component : [
        'actionbar-wifi',
        'actionbar-set-clock'
    ],
    data : {
        loaded : false , //this will automatic set to 'true' if this pacakage loaded to IDE
    },
    persistence : {
        test : true
    }
};