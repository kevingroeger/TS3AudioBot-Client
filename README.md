# TS3AudioBot-Client

TS3AudioBot-Client is a lightweight clientside application for Windows and MacOS
that aims to enhance the experience of [Splamy's TS3AudioBot](https://github.com/Splamy/TS3AudioBot). It is an alternative to the built-in WebInterface.
 
The app is written with [reactjs](https://reactjs.org/), [redux-toolkit](https://redux-toolkit.js.org/) and [electronjs](https://www.electronjs.org/). Also it makes use of the awesome npm package [yt-search](https://www.npmjs.com/package/yt-search).

#### Download

##### Current stable version: 1.0

Windows: [ts3audiobot-client-1.0_win.zip](https://github.com/kevingroeger/TS3AudioBot-Client/releases/download/v1.0/ts3audiobot-client_1.0_win.zip)

MacOS: [ts3audiobot-client-1.0_mac.zip](https://github.com/kevingroeger/TS3AudioBot-Client/releases/download/v1.0/ts3audiobot-client_1.0_mac.zip)

## Quick Start

 - Download and execute the app and make sure the api of your TS3AudioBot Instance is running.

 - Enter the server address / IP of your server into the Base Url input field.

 - Save the configuration and click the small download button on the right of the Bot Config.

(The following can be optional depending on your rights management)

 - Message a TS3AudioBot instance `!api key` in a private chat.

 - Paste the output into the API key input and save the configuration. 

## Overview

 - [Serverside setup](#serverside-setup)
 - [Configuration](#configuration)
    - [Base Url](#base-url)
    - [Bot Config](#bot-config)
    - [Api Key](#api-key)
 - [Known issues and bugs](#known-issues-and-bugs)
    - [Known issues](#known-issues)
 - [Customizing the app](#customizing-the-app)
 - [License](#license)

## Features

<p align="center">
 <a href="https://imgur.com/sM7frQw.png"><img width="30%" src="https://imgur.com/sM7frQw.png"></a>
 <a href="https://imgur.com/QqGH2GQ.png"><img width="30%" src="https://imgur.com/QqGH2GQ.png"></a>
 <a href="https://imgur.com/bUt2auc.png"><img width="30%" src="https://imgur.com/bUt2auc.png"></a>
</p>


## Serverside setup

[Back to Overview](#overview)

Make sure that your webserver is running, your ts3audiobot.toml should include the following code:
```$xslt
[web]
hosts = ["*"]
port = 58913

[web.api]
enabled = true
```
More information on this can be found [here](https://github.com/Splamy/TS3AudioBot/wiki/WebAPI).

## Configuration

[Back to Overview](#overview)

On first start, you need to configure your app.

### Base Url

Enter the full Url to your server here. It should have the following format:
`http(s)://<server>:<port>` without closing slash.

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

This option can be customized. If you want to rename your bots you can just do it. Just make sure to not break the format or change the ids. Keep in mind that this will only change the name that is viewed to your client, not the name of the bot itself.
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

## Known issues and bugs

If you find a bug that is not listed here, please submit it as an Issue.

#### Known issues:

 - None

## Customizing the app

[Back to Overview](#overview)

If you want to learn about customizing the app to your needs, go [to the wiki](https://github.com/kevingroeger/TS3AudioBot-Client/wiki/)

## License

[Back to Overview](#overview)

MIT License, [tl;dr](https://tldrlegal.com/license/mit-license)

Copyright 2020 Kevin Gröger

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

