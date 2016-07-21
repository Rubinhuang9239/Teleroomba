# Teleroomba
<img src="https://github.com/Rubinhuang9239/iCreate-Telepresence/blob/master/icon.png" height="169" width="169" />
<img src="https://github.com/Rubinhuang9239/iCreate-Telepresence/blob/master/openSourceHardware.png" height="144" width="144" />

<h2>Info</h2>

A telepresence researching project that build for NYU NYC/Abu Dhabi/Shanghai campus.<br />
Thanks to Open Source Hardware Community, we hacked iRobot-Create roomba with Arduino(DFRobot Bluno), and created a telepresence robot. <br />
The following image provides the concept of this project(teleroomba 1.x).<br />

<img src="https://github.com/Rubinhuang9239/iCreate-Telepresence/blob/master/design/concept.jpg" width="480" />
<br /><br />
<h5>Current + Future Dev Schedule</h5>

Teleroomba 1.x

A 2D video and real time communication telepresence robot

It’s a roomba based robot which controlled from a web + Android + Arduino system.
User can control the robot from a web browser with keyboard input/mouse/touch screen.

Teleroomba 2.x

A 2D/3D video and real time communication telepresence robot

It’s a roomba based robot which controlled from a web + Android + Arduino system.
With the power of Lattepanda and Linux, this model is able to live stream a UV map from 360 camera like thetaS.

User can control the robot from a web browser with keyboard input/mouse/touch screen.
An individual window will stream the 360 video.

Teleroomba 3.x

A 2D/3D video and real time communication telepresence robot

A fully integrated system on Linux runs on lattepanda/raspberry Pi
support multi HDMI-Input/output, connect to live stream engine, webGL and even Unity game features.


<br />
<img src="https://github.com/Rubinhuang9239/iCreate-Telepresence/blob/master/design/360_system.jpg" width="480" />


<h5>Demo Video</h5>

WebRTC Video Stream + Data Channel Testing<br />
<br/>
documented over iterations
<br/>
<a href="https://vimeo.com/162164013"><img src="https://github.com/Rubinhuang9239/teleroomba/blob/master/design/playback.jpg" height="200" /></a>
<a href="https://vimeo.com/163361357">
<img href="https://vimeo.com/162164013" src="https://github.com/Rubinhuang9239/teleroomba/blob/master/design/playback2.jpg"  height="200" /></a>
<a href="https://vimeo.com/166125306">
<img href="https://vimeo.com/166125306" src="https://github.com/Rubinhuang9239/teleroomba/blob/master/design/playback3.jpg"  height="200" /></a>

<h5>Overview</h5>
<br/>
<img src="https://github.com/Rubinhuang9239/teleroomba/blob/master/documentation/frame/v2.0/overview_full_height.jpg" height="150" />
<img src="https://github.com/Rubinhuang9239/teleroomba/blob/master/documentation/frame/v2.0/overview_side.jpg" height="150" />
<img src="https://github.com/Rubinhuang9239/teleroomba/blob/master/documentation/frame/v2.0/overview_short.jpg" height="150" />
<img src="https://github.com/Rubinhuang9239/teleroomba/blob/master/documentation/frame/v2.0/serial_shield_outlet1.jpg" height="150" />
<img src="https://github.com/Rubinhuang9239/teleroomba/blob/master/documentation/frame/v2.0/base_back.jpg" height="150" />
<br/>
<h5>Circuit</h5>
<h5>Interface</h5>
More documentation in this link


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
5.Android Phone<br />
Shop Bluno: http://www.dfrobot.com/index.php?route=product/product&product_id=1044#.V04EkpMrKRs<br />
Bluno Wiki: http://www.dfrobot.com/wiki/index.php/Bluno_SKU:DFR0267<br />

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

<h3>Control Manual</h3>
You can connect to turn server and call the mobile device on roomba(default auto connect and call) and establish bluetooth connection between the device & Roomba's serial port from control terminal. Full manual list here:
<br />
<ol>
<li>Connect with id</li>
<li>Call device with id</li>
<li>Bluno BLE scan</li>
<li>Restart safty mode</li>
<li>Serial board reset</li>
<li>Auto Docking</li>
</ol>

<h3>HUD display</h3>
<b>Distance</b>
A group of lines accroded to the perspective of the lense for helping driver to estimate the distance.

<b>Direction</b>
A rough predict of your crusing path, it will only show turning sign when roomba is doing same spot turning.


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
