// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'nl.remcoder.polyhedral-dice-calculator',
  name: 'RPG Dice Calculator',
  description: 'Roll n-sided dice',
  version: '1.1.1',
  author: 'Remco Veldkamp',
  email: 'remcoder@gmail.com'
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
