# Teleroomba
<img src="https://github.com/Rubinhuang9239/iCreate-Telepresence/blob/master/icon.png" height="169" width="169" />
<img src="https://github.com/Rubinhuang9239/iCreate-Telepresence/blob/master/openSourceHardware.png" height="144" width="144" />

A telepresence researching project that build for NYU NYC/Abu Dhabi/Shanghai campus.<br />
Thanks to Open Source Hardware Community, we hacked iRobot-Create roomba with Arduino(DFRobot Bluno), and created a telepresence robot. <br />
The following image provides the concept of this project.<br />

<img src="https://github.com/Rubinhuang9239/iCreate-Telepresence/blob/master/design/concept.jpg" width="480" />


<br />
<h5>Demo Video</h5>

WebRTC Video Stream + Data Channel Testing<br />
<iframe src="https://player.vimeo.com/video/162164013" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<p><a target="_blank" href="https://vimeo.com/162164013">teleroomba_doc</a>

<img target="_blank" href="https://vimeo.com/162164013" src="https://github.com/Rubinhuang9239/teleroomba/blob/master/design/playback.jpg" width="260" />


<br /><br />
<h2>Hacking</h2>

<h3>Hacking documentation in google slides:</h3>

https://docs.google.com/presentation/d/1esRmssKKQKUmZPN4M6qO2HnMcj071nKUZhuvG29GHJI/edit?usp=sharing

<h3>Offical iRobot® Create® 2 Open Interface (OI):</h3>

http://www.irobotweb.com/~/media/MainSite/PDFs/About/STEM/Create/iRobot_Roomba_600_Open_Interface_Spec.pdf?la=en

<br /><br />
<h2>Build</h2>

<h3>Hardware overview:</h3>
1.Roomba<br />
2.Acrylic Base<br />
3.Monopod<br />
4.MCU (DFrobot Bluno) <br />
5.Android Phone

<h3>Circuit build:</h3>

<h5>[PCB Software]Eagle</h5>
Eago is a popular softeware for PCB editing.<br />
It's free to use it for its basic functions.<br />

http://www.cadsoftusa.com/download-eagle/


<h5>[CNC]OtherMill</h5>
We assume you have "otherMill", the laptop CNC machine.

<h5>[Software]OtherPlan</h5>
You want to get "otherPlan" softerware to Print out your circuit, it's free, you can download it here.<br />
https://othermachine.co/othermill/otherplan/
<br /><br />
A very handy video for how to use it

https://www.youtube.com/embed/SuPlmSrdD6I

<h3>Web Server:</h3>

<h5>For hosting the Server for peer connection, please make sure you are running the latest version of NODE.JS</h5>
<br />
https://nodejs.org/en/

<h5>As you have installed NODE.JS and NPM(Node package manager)</h5>

NPM website:<br />
https://www.npmjs.com/<br><br>
Install node package by run following commend in `terminal` or `commend line`. 

```
sudo npm install
```

Run `roomba.js` with `node commend` in local or host it on your server with <b>`https`</b>

```
node roomba.js
```

<h3>Mobile App (Currently Android Only)</h3>


<h5>Following SDK/Framework are needed.</h5>

<b>`Andorid`</b>

SDK<br />
http://developer.android.com/sdk/index.html

Android tutorial from Shawn Van Every's "Always on always connected syllabus"<br /> https://itp.nyu.edu/~sve204/alwaysonalwaysconnected_spring16/<br />

<b>`Cordova`, `Phonegap` </b>

Cordova:<br/>
Apache Cordova is an open-source mobile development framework. It allows you to use standard web technologies<br />
https://cordova.apache.org/

Phonegap:<br/>
http://phonegap.com/

<b>`CrossWalk`</b>

Provide a powerful webview with the support for almost any web APIs
https://crosswalk-project.org/

<br /><br />
<h2>Other + Resource</h2>

<h3>Credits + Thanks:</h3>
Early contributor:<br />
Rubin Huang<br />
Marc Abbey

Advising:<br />
Dan O'sullivan<br />
Shawn Van Every<br />

<h3>Current API:</h3>
coming soon....

<h3>More related projects:</h3>

<h5>From iRobot.com</h5>
http://www.irobot.com/About-iRobot/STEM/Create-2/Projects.aspx

<h5>From random hackers:</h5>

Johnny Chung Lee's DIY Telepresence Robot(2011)
with source code and intruductions
http://procrastineering.blogspot.com/2011/02/low-cost-video-chat-robot.html

<h5>SmartBots</h5>

http://www.overdriverobotics.com/SmartBot/meet-smartbot-mk2-programmable-phone-robot/
