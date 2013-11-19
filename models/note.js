
// Simple note model that gets its content fetched from the server
var Note = Backbone.Model.extend({
    
    url: function() {
        return "/note/" + this.id;
    },
    
    defaults: {
        title: "",
        created:  Date(),
        content: ""
    },

    initialize: function() {
        this.on("change", function(){
            this.save();
        });
    }
});