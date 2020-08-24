#!/bin/bash

ionic cordova build android --prod --release
# keytool -genkey -v -keystore androidkeyderecifedomundo.keystore -alias derecifedomundo -keyalg RSA -keysize 2048 -validity 10000
cp androidkeyderecifedomundo.keystore platforms/android/app/build/outputs/apk/release/androidkeyderecifedomundo.keystore
cd platforms/android/app/build/outputs/apk/release/
rm derecifedomundo.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore androidkeyderecifedomundo.keystore app-release-unsigned.apk derecifedomundo -storepass "com.blogspot.robertinhoderecife"
zipalign -v 4 app-release-unsigned.apk derecifedomundo.apk
ii .