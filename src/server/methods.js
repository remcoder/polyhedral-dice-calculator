Meteor.methods({
  roll(die, result) {
    Rolls.insert({
      creationDate : new Date,
      die,
      result
    })
  }
});
