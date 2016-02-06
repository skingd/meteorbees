Samples = new Mongo.Collection("samples");

Router.route('/', function(){
   this.render('miteForm');
    this.layout('layout');
});

Router.route("/viewSamples", function(){
   this.render('viewSamples');
    this.layout('layout');
});


if (Meteor.isClient) {

    Meteor.subscribe("samples");

    Template.viewSamples.helpers({
        "samples": function () {
            //Return all values or empty if database is invalid
            return Samples.find({}, {sort: {createdOn: -1}}) || {};
        }
    });

    Template.miteForm.events({
        "submit form": function (event) {
            event.preventDefault();


            //Get the text fields and load their values into variables
            var hiveName = $(event.target).find('input[name=hiveName]');
            var sampleDate = $(event.target).find('input[name=sampleDate]');
            var sampleDuration = $(event.target).find('input[name=sampleDuration]');
            var miteCount = $(event.target).find('input[name=miteCount]');
            // var createdOn = null;

            var hiveNameText = hiveName.val();
            var sampleDateText = sampleDate.val();
            var sampleDurationText = sampleDuration.val();
            var miteCountText = miteCount.val();

            //If all of the above forms have content, load the values into the database
            if (hiveName.length > 0 && sampleDate.length > 0 && sampleDuration.length > 0 && miteCount.length > 0) {
                Samples.insert({
                    hiveName: hiveNameText,
                    sampleDate: sampleDateText,
                    sampleDuration: sampleDurationText,
                    miteCount: miteCountText,
                    //createdOn: date.now()
                });

                //Once inserted, reset fields to blank
                hiveName.val("");
                sampleDate.val("");
                sampleDuration.val("");
                miteCount.val("");
            } else {
                //add some messages here
            }
        }
    });

    Template.dataButton.events({

        //Go to sample page
        'click #data-btn': function () {
            event.preventDefault();
            Router.go('/viewSamples');
        }
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

    Meteor.publish("samples", function(){
       return Samples.find();
    });
}
