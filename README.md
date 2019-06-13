## iOWN mobile app

#### Install dependencies

```
npm/yarn install
```

## Run

#### Development
```
npm run start or yarn start
```

#### Build mobile app

1. `npm run build`
2. copy all from folder `./build` to `./iown-app/www`
3. `cd iown-app`
4. `cordova build android` || `cordova build ios`
5. - For Android `.apk` will be in `/platforms/android/app/build/outputs/apk/debug/app-debug.apk`
   - For IOS - open in Xcode project

