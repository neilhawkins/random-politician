// Version 1.0 
// Copyright Neil Hawkins
// 12/05/2014

var RandoMP = {

    getMPs: "http://www.theyworkforyou.com/api/getMPs?key=GEGMS7CVRzUFFvoPV2DbcscS&output=js&callback=?",

    getHansard: function(MP_id) {
        return "http://www.theyworkforyou.com/api/getHansard?key=GEGMS7CVRzUFFvoPV2DbcscS&output=js&callback=?&person=" + MP_id
    },

    MPs: null,

    init: function(request) {
        this.bind_events();
        this.make_request(request);
    },

    bind_events: function() {
        var self = this;
        $('.btn').on('click', function() {
            self.pick_MP();
        });

    },

    make_request: function(request_url) {

        var self = this;

        var response_data = JSON.parse(localStorage.getItem('MPs'));
        this.MPs = response_data;

        if (!response_data) {
            $.getJSON(request_url).done(function(data) {
                localStorage.setItem('MPs', JSON.stringify(data));
                self.MPs = data;
                self.pick_MP();
            });
        } else

            this.pick_MP();

    },

    pick_MP: function() {
        var random_id = Math.floor(Math.random() * 648);
        var chosen_one = this.MPs[random_id];

        $('#chosen_one h1').text(chosen_one.name + " MP");
        //$('#chosen_one .last_words').text(app.response_data.rows[0].body)
    }
}

$(document).ready(function() {
    RandoMP.init(RandoMP.getMPs);
});