# TS3AudioBot-Client

TS3AudioBot-Client is a lightweight clientside application for Windows and MacOS
that aims to enhance the experience of [Splamy's TS3AudioBot](https://github.com/Splamy/TS3AudioBot).

It is an alternative to the built-in WebInterface which is written with [reactjs](https://reactjs.org/) and [electronjs](https://www.electronjs.org/).

## Overview

 - [Features](#features)
 - [Setup](#setup)
    - [Serverside](#1-serverside)
    - [Clientside](#2-clientside)
    - [Download](#download)
 - [Configuration](#configuration)
    - [Base Url](#base-url)
    - [Bot Config](#bot-config)
    - [Api Key](#api-key)
 - [Usage](#usage)
    - [Dashboard](#dashboard)
    - [Playlist](#playlist)
    - [Radio](#radio)
    - [Toplist](#toplist)
    - [History](#history)
 - [Known issues and bugs](#known-issues-and-bugs)
    - [Known issues](#known-issues)
 - [Customizing the app](#customizing-the-app)
    - [How to start](#how-to-start)
    - [Standard configuration](#standard-configuration)
    - [Radio Configuration ](#radio-configuration)
    - [Colors](#colors)
    - [Creating the custom app](#creating-the-custom-app)
    - [Note on setup on Windows](#note-on-setup-on-windows)
    - [Note on Linux](#note-on-linux)
 - [License](#license)

## Features

Clear Overview
![image1](https://imgur.com/7JVO7yJ)
![image2](https://imgur.com/UAj6mLX)

See your history
![image3](https://imgur.com/e5xdR7l)

Configurable and different styles
![image4](https://imgur.com/htj2zw0)
![image5](https://imgur.com/5qZUBGY)

## Setup

### 1. Serverside

Make sure that your webserver is running, your ts3audiobot.toml should include the following code:
```$xslt
[web]
hosts = ["*"]
port = 58913

[web.api]
enabled = true
```
More information on this can be found [here](https://github.com/Splamy/TS3AudioBot/wiki/WebAPI).

### 2. Clientside

Simply download the app for your system and start it.

#### Download

##### Current Version: 0.8

Windows: [TS3AudioBot-Client_Win.zip](https://github.com/kevingroeger/TS3AudioBot-Client/releases/download/v0.8/TS3AudioBot-Client_Win.zip)

MacOS: [TS3AudioBot-Client-0.8.0-mac.zip](https://github.com/kevingroeger/TS3AudioBot-Client/releases/download/v0.8/TS3AudioBot-Client-0.8.0-mac.zip)

## Configuration

On first start, you need to configure your app.

### Base Url

Enter the full Url to your server here. It should have the following format:
`http(s)://<server>:<port>`

Eg. it could be one of the following:
```
http://localhost:56913
https://example.com:58913
http://116.203.238.192:58913
```

It is highly recommended to hit the save-button after entering or changing your url.

### Bot Config

Before entering any Bot Config, make sure you have successfully saved the correct Base Url.

After you've done that you can just press the download button on the right and your config will be automatically set.

If this does not work, you either entered the wrong Base Url, can't establish a connection to the server or you don't have any bots running.

This option can be customized. If you want to rename your bots you can just do it. Just make sure to not break the format or change the ids.
Eg. 
```
[{"name":"TS3AudioBot","id":0},{"name":"<MyCustomName>","id":1}]
```

After you've successfully entered correct values, for each bot a new tab will appear on your window.

### API Key

Altough it is not recommended; if you don't want to use api keys, you can edit your rights.toml to the following:
```$xslt
"+" = "*"
```

If you want to use api keys, just open a private chat to any bot on your TeamSpeak3 server, use the command `!api key` and paste the output into the api key field.

Make sure to save your configuration. 

## Usage

Altough the usage is pretty straight forward, here is a quick overview:

### Dashboard

If a song is currently playing, it will be shown here with some basic controls (play/pause, next)

Also you can enter a mp3 radiostream, a youtube link or another supported link here. For more information about what is supported visit [Splamy's TS3AudioBot](https://github.com/Splamy/TS3AudioBot).

### Playlist

You can create, play and add playlists to the queue here. Only youtube playlists are supported. Names cannot include any whitespaces. The playlists will be saved for everyone using the app.

### Radio

There is currently only a small choice of preconfigured radio streams here. If you want to add your own radio go to [Radio Config](#radio-configuration).

### Toplist

The most played songs will be shown here in a compact list.

### History

The last 12 songs are shown here.

## Known issues and bugs

This is a early development build, so there are some things that I couldn't yet implement.

If you find a bug that is not listed here, please submit it as an Issue.

#### Known issues:
 - When a new song starts, the app doesn't load the song information by itself if the reload button isn't pressed manually.
 - Some information isn't getting loaded correctly, eg. PlayCount in history and toplist.
 - The app sometimes shows a song that isn't playing anymore for a short time.

## Customizing the app

The app is easily customizable. If you want to provide a version to your friends without them needing to change the configuration by themselves, you can absolutely do so.

### How to start

Altough it can be done without, some javascript knowledge is helpful when trying to create a custom version.
Changing the standard configuration is quite easy. Make sure you have [yarn](https://yarnpkg.com/) installed on your system. 

Just clone the git repository delete and use `yarn` to install the required node modules.

### Standard Configuration

If you want to provide a custom version with a complete configuration to somebody, just enter the values into `/public/config.js`

Eg, you can edit your custom config like this:
```$xslt
// eslint-disable-next-line no-unused-vars
var Configs = {
  baseUrl: 'http://example.com:58913',
  savedBackground: '#000',
  botArray: [
    {
      name: 'RealCoolBot1',
      id: 0
    },{
      name: 'RealCoolBot2',
      id: 0
    }
  ],
  apiKey: ''
}

```

### Radio Configuration 

To change the radio config you can edit the file `/src/utils/radio.js`

Just add another object to the array, eg:

```javascript
[ /*...*/
  {
    src: nrj,
    name: 'NRJ',
    url: 'https://scdn.nrjaudio.fm/de/33003/mp3_128.mp3?origine=wlan&cdn_path=adswizz_lbs10&adws_out_b1'
  },{
    src: image, // either 'https://<imageurl>.<png/jpg> or imageName (see below)
    name: '<Radio Name>',
    url: 'https://<someUrl>.mp3'
  }
]
```

You can either place an Image in the images folder and import it like this:
```javascript
import imageName from '../images/imageName.<jpg/png>'
```

Or you can just provide a url to an image and input it like this:
```javascript
{
    src: 'https://<someUrl><.jpg/.png>',
    name: '<Radio Name>',
    url: 'https://<someUrl>.mp3'
  }
```

The stream url must use the format mp3 or it might not work.

### Colors

You can also add or edit the styles by changing `/src/utils/colors.js`

Knowledge in css is not required but it can help to make your own style. Just add or edit the options by providing a valid css value for 'background'.

ie.:
```
'#000'
'#e8d9f0'
'steelblue'
'linear-gradient(180deg, #FFFFFF 0%, #6284FF 50%, #FF0000 100%)'
```

Some cool colors and gradients can also be found on [cssgradient.io](https://cssgradient.io/).

### Creating the custom app

To be able to share the customized app to your friends check the package.json for the following line:
```
"electron-pack": "electron-builder build -mw"
```

Change it depending on the system your users are using.

Windows: 
```
"electron-pack": "electron-builder build -w"
```
MacOS:
```
"electron-pack": "electron-builder build -m"
```
Linux:
```
"electron-pack": "electron-builder build -l"
```
If you need to provide it for more than one platform you can just concatenate them, eg:

MacOS and Windows: (standard option)
```
"electron-pack": "electron-builder build -mw"
```

#### Note on setup on Windows

It is *not* recommended to use the setup file for Windows. Instead you should provide the win-unpacked folder to your users. 

Removing or updating the installed version on windows requires changes to the registy. If you use the unpacked version the issues do not exist. 

#### Note on Linux

I have not tested the app on linux and will not provide any support for linux-specific problems.

## License

MIT License, [tl;dr](https://tldrlegal.com/license/mit-license)

Copyright 2020 Kevin Gröger

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

