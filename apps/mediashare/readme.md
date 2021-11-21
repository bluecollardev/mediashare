### Maybe is not the best way to resolve lua, but I added this line at the bottom of my .zshrc (it will work in .bashrc too!)
export PATH="$GEM_HOME/bin:$PATH"
export PATH="/usr/local/opt/lua@5.3/bin:$PATH"

### Export Android env vars
export ANDROID_HOME=/Users/lucas/Library/Android/sdk
export ANDROID_SDK_ROOT=/Users/lucas/Library/Android/sdk
export ANDROID_AVD_HOME=/Users/lucas/.android/avd

### Todos
- There are issues with react-native-video (https://github.com/react-native-video/react-native-video) and react-native-web
- Note that ViewPropTypes was removed from react-native-web, as react-native is going to stop exporting prop types.
- react-native-web 0.11.x has ViewPropTypes etc. but doesn't work with react-dom 17.x, it requires an early 16 version...

The following libraries are not supported at all:
- expo-secure-store (cannot work on web)

There is no non-native (i.e. web) version of Utilities/Platform in react-native, so things that depend on it break in a web build.
- Resolve relative reference ../Utilities/Platform using react-native-web (fixed using webpack.config.js)
