Samples = new Mongo.Collection("samples");

if (Meteor.isClient) {

Meteor.subscribe("samples");

    Session.setDefault('page', 'miteCount');

    UI.body.helpers({
        isPage: function(page){
            return Session.equals('page', page)
        }
    })

    UI.body.events({

        'click .option': function(event, template){
            Session.set('page', event.currentTarget.getAttribute('data-page'))
        }
    })

    Template.miteForm.helpers({
        "samples": function(){
            //Return all values or empty if database is invalid
            return Samples.find({}, {sort: {createdOn: -1}}) || {};
        }
    });

    Template.miteForm.events({
        "submit form": function(event){
            event.preventDefault();


            //Get the text fields and load their values into variables
            var hiveName = $(event.target).find('input[name=hiveName]');
            var sampleDate = $(event.target).find('input[name=sampleDate]');
            var sampleDuration = $(event.target).find('input[name=sampleDuration]');
            var miteCount = $(event.target).find('input[name=miteCount]');
           // var createdOn = null;

            //If all of the above forms have content, load the values into the database
            if(hiveName.length > 0 && sampleDate.length > 0 && sampleDuration.length > 0 && miteCount.length > 0){
                Samples.insert({
                   hiveName: hiveName,
                   sampleDate: sampleDate,
                   sampleDuration: sampleDuration,
                   miteCount: miteCount,
                   //createdOn: date.now()
                });

                //Once inserted, reset fields to blank
                hiveName.val("");
                sampleDate.val("");
                sampleDuration.val("");
                miteCount.val("");
            }else{
                //add some messages here
            }
        }
    });

    Template.viewSamples.rendered
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

    Meteor.publish("samples", function(){
       return Samples.find();
    });
}
