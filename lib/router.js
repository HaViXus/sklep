if(Meteor.isClient) {
    Router.route('/',function(){
        this.render('home', {data: {title: 'Home'}});
    });
  }