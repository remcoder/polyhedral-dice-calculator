// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'nl.remcoder.polyhedral-dice-calculator',
  name: 'RPG Dice Calculator',
  description: 'Roll n-sided dice',
  version: '1.0.0'
  //author: 'Remco Veldkamp',
  //email: 'remcoder@gmail.com',
  //website: 'http://example.com'
});

// Set up resources such as icons and launch screens.
App.icons({
  android_xhdpi : 'resources/app-icon.png'
});

App.launchScreens({
  android_xhdpi_portrait : 'resources/splash/android-xhdpi-portrait.png'
});

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('orientation', 'portrait');

// Pass preferences for a particular PhoneGap/Cordova plugin
App.configurePlugin('com.phonegap.plugins.facebookconnect', {
  APP_ID: '1234567890',
  API_KEY: 'supersecretapikey'
});
