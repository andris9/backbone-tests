
module( "Backbone Model example", {
    
    setup: function() {
        // prepare something for all following tests

        // Overrides XMLHttpRequest object
        this.server = sinon.fakeServer.create();

        this.server.respondWith(
            "GET", "/note/14", [
                200, 
                {"Content-Type": "application/json"},
                JSON.stringify({
                    id: 14,
                    title: "Postit note",
                    created: "Mon Nov 18 2013 23:40:47 GMT+0200 (EET)",
                    content: "Awesome content"
                })
            ]);
    },
    teardown: function() {
        // clean up after each test

        // Restores original XMLHttpRequest object
        this.server.restore();
    }
});

test("Note model exists", function() {
    // Nothing fancy, just check if a model is available
    ok(typeof Note == "function");
});

test("Fetch model content by ID", function() {
    var note = new Note({id: 14});
    equal(note.get("title"), "");

    // Fetch model data from fake server
    note.fetch();

    // Response with XMLHttpRequest.readyState == 4
    this.server.respond();
    
    // Model should have got updated
    equal(note.get("title"), "Postit note");
});

test("Post to URL on save", function() {
    var note = new Note({id: 14});

    // Overrides note.save()
    var saveStub = sinon.stub(note, "save");

    note.set("title", "Another title");

    // Check if note.save() was called exactly once
    ok(saveStub.calledOnce);

    // Restores original note.save()
    saveStub.restore();
});

