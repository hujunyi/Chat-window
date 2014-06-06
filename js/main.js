var Message = Backbone.Model.extend({
  defaults: {
              "name": "anonymous user"
            },
});
var MessageList = Backbone.Collection.extend({
  model :Message,
});
var MessageListView = Backbone.View.extend({
  el: ".main",
    events: {
      "click #send": "sendMessage",
    "click #edit": "editName",
    "click #confirm": "confirmName",
    "keypress": "enter"

    },
    initialize: function(options){
      _.bindAll(this,'render','updateList');
      this.messageList = options.messageList;
      this.name = "Joey";
      this.render();
    },
    render: function(){
      this.messageList.bind("reset",this.updateList);
      this.messageList.bind("add",this.updateList);
      this.updateList();
    },
    updateList: function(){
      var template = _.template($("#message-list-template").html(),{messages:this.messageList.models});
      this.$(".list-unstyled").html(template);
    },
    sendMessage: function(){
       var content = this.$("#message").val();
       if(content!==""){
         var message = new Message({name:this.name,content:content});
         this.messageList.add(message);
       }
    },
    enter :function(e){
       if(e.which == 13){
         if($("#message").is(":focus")){
           this.sendMessage();
         }
         if($("#edit-input").is(":focus")){
           this.confirmName();
         }
       }
     },
    editName: function(){
      this.$("#edit-input").show();
      this.$("#edit").hide();
      this.$("#confirm").show();
      this.$("#name-label").hide();
    },
    confirmName: function(){
       this.name = this.$("#edit-input").val().trim();
       if(this.name ===""){
         this.name = "anonymous user"
       }
       this.$("#edit-input").hide();
       this.$("#edit").show();
       this.$("#confirm").hide();
       this.$("#name-label").html(this.name);
       this.$("#name-label").show();
     },
});

var Router = Backbone.Router.extend({
  routes:{
           '':'home'
         }
});
var router = new Router();
var message1 = new Message({name:"HR",content:"Hey,Joey. You did a good job! I am gonna give you an offer!"});
var message2 = new Message({name:"Joey",content:"Thank you!"});
var messageList = new MessageList();
messageList.add(message1);
messageList.add(message2);
router.on('route:home',function(){
  var messageListView = new MessageListView({messageList: messageList});
});
Backbone.history.start();
