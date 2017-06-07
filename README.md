# Teleroomba

<img src="https://github.com/Rubinhuang9239/iCreate-Telepresence/blob/master/icon.png" height="144" width="144"/><img src="https://github.com/Rubinhuang9239/iCreate-Telepresence/blob/master/openSourceHardware.png" height="144" width="144"/>

<h2>Info</h2>

A telepresence researching project that build for NYU NYC/Abu Dhabi/Shanghai campus.<br />
Thanks to Open Source Hardware Community, we hacked iRobot-Create roomba with Arduino(DFRobot Bluno), and created a telepresence robot.

<h2>History + Future Development</h2>

<b>Teleroomba 1.x</b>

A 2D video and real time communication telepresence robot

<br />
The following image provides the concept of this project(teleroomba 1.x).<br/>
<img src="https://github.com/Rubinhuang9239/iCreate-Telepresence/blob/master/design/concept.jpg" width="480" />
<br/>

It’s a roomba based robot which controlled from a web + Android + Arduino system.
User can control the robot from a web browser with keyboard input/mouse/touch screen.

<b>Teleroomba 2.x</b>

A 2D/3D video and real time communication telepresence robot

It’s a roomba based robot which controlled from a web + Android + Arduino system.
With the power of Lattepanda and Linux, this model is able to live stream a UV map from 360 camera like thetaS.

User can control the robot from a web browser with keyboard input/mouse/touch screen.
An individual window will stream the 360 video.

<b>Teleroomba 3.x</b>

A 2D/3D video and real time communication telepresence robot

A fully integrated system on Linux runs on lattepanda/raspberry Pi
support multi HDMI-Input/output, connect to live stream engine, webGL and even Unity game features.

<h2>Software and hardware structure</h2>
The following imgae shows current version of teleroomba(2.x)
  <img src="https://github.com/Rubinhuang9239/iCreate-Telepresence/blob/master/design/teleroomba_system_2/teleroomba_system_2_software.jpg" width="360"/>
  <img src="https://github.com/Rubinhuang9239/iCreate-Telepresence/blob/master/design/teleroomba_system_2/teleroomba_system_2_hardware.jpg" width="360"/>

<h2>Video and documentations</h2>

documented over iterations
<br/>
<b>Teleroomba 1.x</b>
<br/>
Video
<br/>
  <a href="https://vimeo.com/162164013"><img src="https://github.com/Rubinhuang9239/teleroomba/blob/master/design/playback.jpg" height="160" /></a>
  <a href="https://vimeo.com/163361357">
  <img href="https://vimeo.com/162164013" src="https://github.com/Rubinhuang9239/teleroomba/blob/master/design/playback2.jpg"  height="160" /></a>
  <a href="https://vimeo.com/166125306">
  <img href="https://vimeo.com/166125306" src="https://github.com/Rubinhuang9239/teleroomba/blob/master/design/playback3.jpg"  height="160" /></a>
  <a href="https://vimeo.com/177041877">
  <img href="https://vimeo.com/177041877" src="https://github.com/Rubinhuang9239/teleroomba/blob/master/design/playback4.jpg"  height="160" /></a>
<br/>
Details
<br/>
  <img src="https://github.com/Rubinhuang9239/teleroomba/blob/master/documentation/frame/v1.2.0/overview_full_height.jpg" height="150" />
  <img src="https://github.com/Rubinhuang9239/teleroomba/blob/master/documentation/frame/v1.2.0/overview_side.jpg" height="150" />
  <img src="https://github.com/Rubinhuang9239/teleroomba/blob/master/documentation/frame/v1.2.0/overview_short.jpg" height="150" />
  <img src="https://github.com/Rubinhuang9239/teleroomba/blob/master/documentation/frame/v1.2.0/serial_shield_outlet1.jpg" height="150" />
  <img src="https://github.com/Rubinhuang9239/teleroomba/blob/master/documentation/frame/v1.2.0/base_back.jpg" height="150" />
<br/><br/>
<b>Teleroomba 2.x</b>
<br/>
Lattepanda + Node.js
<br/>
<img src="https://github.com/Rubinhuang9239/teleroomba/blob/master/documentation/frame/v2.1.0/roomba_front.jpg" height="320" />



<h5>Circuit</h5>
<h5>Interface</h5>
More documentation in this link


<br /><br />
<h2>Hacking of the iRobot</h2>

<h3>Hacking documentation in google slides:</h3>

https://docs.google.com/presentation/d/1esRmssKKQKUmZPN4M6qO2HnMcj071nKUZhuvG29GHJI/edit?usp=sharing

<h3>Offical iRobot® Create® 2 Open Interface (OI):</h3>

http://www.irobotweb.com/~/media/MainSite/PDFs/About/STEM/Create/iRobot_Roomba_600_Open_Interface_Spec.pdf?la=en


<h2>Build</h2>
<a href = "https://github.com/Rubinhuang9239/Teleroomba/wiki/1.x-build-wiki">see 1.x build wiki</a>
<br/>
<a href = "https://github.com/Rubinhuang9239/Teleroomba/wiki/2.x-build-wiki">see 2.x build wiki</a>
<br/>

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


<h2>Credits + Resource</h2>

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
