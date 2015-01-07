/*! random-politician - v0.1.0 - 2015-01-07
* Copyright (c) 2015 ;*/var RandoMP = {

    MPs: null,
    hansard: null,

    colours: {

        "Conservative": "#0087DC",
        "Labour": "#DC241f",
        "Liberal Democrat": "#FDBB30",
        "DUP": "#D46A4C",
        "Scottish National Party": "#FFFF00",
        "Sinn Fein": "#008800",
        "Independent": "#DDDDDD",
        "Plaid Cymru": "#008142",
        "Social Democratic and Labour Party": "#99FF66",
        "Alliance": "#FFD700",
        "Green": "#6AB023",
        "Respect": "#FF3300",
        "Speaker": "white",
        "UKIP": "#70147A"
    },

    getMPs: "http://www.theyworkforyou.com/api/getMPs?key=E5L2aTCuvEZnAXuVfyGN83sM&output=js&callback=?",

    init: function(request) {
        this.bind_events();
        this.make_request(request);
    },

    bind_events: function() {
        var self = this;
        $('.mp').on('click', function() {
            $('#last-words').html("");
            self.pick_MP();
        });
    },

    lastWords: function() {
        var date = this.hansard.rows[0].hdate;
        date = date.replace(/(\d+)-(\d+)-(\d+)/, '$3/$2/$1');
        $('#date-spoken').html("<p>Last spoke in parliament on : " + date + "</p>");
        $('#last-words').html(this.hansard.rows[0].body);
    },

    getHansard: function(id) {
        var self = this;
        $.getJSON("http://www.theyworkforyou.com/api/" +
            "getDebates?key=GEGMS7CVRzUFFvoPV2DbcscS&person=" + id +
            "&type=commons&page=1&num=1&output=js&callback=?").done(function(data) {
            self.hansard = data;
            self.lastWords();
        });
    },

    pick_MP: function() {
        var random_id = Math.floor(Math.random() * this.MPs.length);
        var chosen_one = this.MPs[random_id];
        var MP_id = chosen_one.person_id;
        var party = chosen_one.party;
        this.MP_id = MP_id;
        $('#mp-name').text(chosen_one.name + " MP").css('color', this.colours[party]);
        this.getHansard(MP_id);
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
        } else {
            this.pick_MP();
        }
    }
};

$(document).ready(function() {
    RandoMP.init(RandoMP.getMPs);
});
