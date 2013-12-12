Playlist
========

The playlist app is a storytelling template that organizes point data sets, usually from a CSV file embedded in a web map, into an organized interactive list. Your audience can explore the points from the map itself or they can click on a corresponding item in a list.

![App](https://raw.github.com/esri/playlist-storytelling-template-js/master/playlist-screenshot.png)

[View it live](http://esri.github.io/playlist-storytelling-template-js/deploy/) |
[User Download (source code not included)](http://bit.ly/1cImr14) |
[Developer Download](http://bit.ly/1h7LzUy)

**Latest release is version 2.1.1**, if you want to be informed of new releases, we recommend you to watch this repository.

This help will guide you through the steps for publishing playlist apps like:
- [Top 10 National Parks in New South Wales, Australia](http://downloads.esri.com/agol/pub/nsw10/index.html)
- [World of Story Maps](http://storymaps.esri.com/stories/2013/storylocator/)

## Help Content
- [How to deploy a playlist app](#how-to-deploy-a-playlist-app)
- [Data storage options](#data-storage-options)
- [FAQ](#faq)
- [What's new](#whats-new)
- [Developer guide](#developer-guide)
- [Feedback](#feedback)
- [Issues](#issues)
- [Contributing](#contributing)
- [Licensing](#licensing)

## How to deploy a playlist app

To use the downloadable version, download the [User Download](http://bit.ly/1cImr14); it contains the following files:

| File					| Contains												|
| --------------------- | ----------------------------------------------------- |
| app/					| Minified source code									|
| resources/			| Application resources (markers, icons, fonts)			|
| **samples/**			| Sample data to create your web map					|
| **index.html**		| Application html file (Contains app configuration)	|
| license.txt			| Application terms of use								|
| Readme.pdf			| How to create your first app							|

To create a playlist tour follow a few simple steps, outlined below. To successfully publish your story map using this template you’ll need to be able to host the application and the photos you will use on a publicly accessible server and you’ll also need an ArcGIS Online account (public or subscription) to author and save the map used in the playlist. The storytelling playlist app relies on a web map ID from [ArcGIS Online](http://www.arcgis.com/) to get the data.

Currently, the playlist supports CSV or feature service layers that have been added to a web map.

To get started, follow these basic instructions:

1. Open ArcGIS Online web map viewer
2. Create a web map that fits your needs (basemap, additional context layers, etc.)
3. Import your playlist data layers into the web map
4. Save the web map at the initial extent that you would like your playlist to begin
5. **Share your web map with everyone**
6. Open **index.html** with a text editor
7. Scroll down till you find the **configOptions** settings and edit these options
	- **webmap**: unique identifier for the ArcGIS.com map.
	- dataFields (change only if not following sample data)
		- **nameField**: field to be used as playlist text
		- **imageField**: field to be used as thumbnail in playlist
		- **colorField**: field to determine marker color
		- **orderField**: field to determine playlist order
		- **filterField**: field to determine what items will added to the search filter (leave blank to remove filter)
	- playlistLegend
		- **layerTitle**: name the playlist layer for display in the map legend
		- items
			- **visible**: choose (true or false) if item is visible in legend
			- **name**: add name for item to be displayed in legend
8. Optionally remove samples folder and Readme.pdf
9. Copy files to your web server root or in a specific folder

It is crucial for the application performance that your tour points have well-defined thumbnail images. Thumbnail images are used in the side playlist. If you choose to host the pictures yourself, you will have to manually create thumbnails of your pictures. Using the full resolution pictures for the thumbnail will result in poor performance. The recommended thumbnail size is 70x70px.

## Data storage options

You can use any point Feature Service or CSV as a playlist data source as long as your layer follow the expected requirements detailed below. To use your layer, simply add it into your webmap through ArcGIS Online web map viewer.

| Fields													| Valid fields names (case insensitive)		|
| ---------------------------------------------------------	| -----------------------------------------	|
| Name														| name, title						 	    |
| Thumbnail													| thumb_url, thumbnail				        |
| Color												        | color										|
| Order														| order										|

If your playlist layer has different field attributes, you will need to change the **dataFields** options under the configOptions in the **index.html**.

The playlist template also supports thumbnails which will be displayed along side of item's title and map icon. These thumbnail will be pulled from the **thumbnail** attribute above but requires the images to be hosted on the web. The thumbnail can either be hosted on your organization's web server or on a third party service such as Flickr or Dropbox.

## FAQ

### Is the template compatible with previous version?
Yes, web map designed for the previous version should continue to work without any modification. Customization and enhancement of the application will require code changes, most of them should be easy to translate into the new application.

### Can I deploy playlist on Portal for ArcGIS?
Yes, by default the playlist app expects web maps to be saved on ArcGIS.com. If you are using using portal, you will need to modify the **sharingUrl** option in the **index.html**. If you also require a login to the app, see below.

### Can I use private web map or layer?
Yes, but you will need to install a proxy server on your web server to make sure the login credentioals can be pass securely to ArcGIS Online. For more information, see the **[Using the proxy page](https://developers.arcgis.com/en/javascript/jshelp/ags_proxy.html)** in the ArcGIS JavaScript documentation.

### Can the template be used offline?
Yes, by using Portal for ArcGIS. When deployed on a Portal for ArcGIS instance, the Map Tour doesn't require any external service to function. But by default the template will still include the header social buttons and template publishers are able to import pictures from the some online pictures hosting services

## What's new?

#### Playlist 2.1.1 released on 12/12/2013

- Update JavaScript API to version 3.8
- Minor Bug Fixes

#### Playlist 2.1 released on 12/4/2013

- Responsive UI to support tablets and smartphones
- Click to copy Bitly link
- Various bug fixes

#### Playlist 2.0 released on 11/22/2013

- Supports feature layers and shapefiles
- Search function with optional filter button
- Legend for playlist layers
- Toggle for legend and description
- Toggle side pane
- Banner will be removed when embeded
- Various bug fixes

## Developer guide

This developer guide is intended to developer that wants to modify behavior or add new functionalities to the playlist application. If you only need to customize look and feel of the playlist, you should be able to do so using the User download.
It requires basic knowledge of HTML, Javascript and CSS languages.

Download and unzip the [Developer download](http://bit.ly/1h7LzUy) or clone the repo. All changes should be made in the **source/** folder of the source code.

### Set up your local machine

#### Software

Download and install the following software

- [Git](https://help.github.com/articles/set-up-git), [Ruby](http://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-1.9.3-p448.exe?direct), [Ruby Dev Kit](https://github.com/downloads/oneclick/rubyinstaller/DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe), [Node](http://nodejs.org/)

#### Steps

1. Start by installing Ruby 1.9.3. As you step through the install make sure the following is selected
	- [x] Add Ruby executables to PATH
2. When the installation is finished, verify Ruby was installed correctly by opening up a command prompt and running `irb` to run the Interactive Ruby shell. You should see: `irb(main):001:0>` in the console.  Simply type `exit` to close **irb**, and then close the command prompt window.
3. Next, install the Ruby Development Kit. This download is just a self extracting archive, so pick a permanent place you want to extract the files to. (e.g. C:\rubydev\)
4. After the Ruby Development Kit has been extracted, open another command prompt window and change the directory to the location you extracted the files to: (e.g. C:\rubydev\)
5. We will be running two commands to setup the Development Kit to work with your Ruby installation:
	- `ruby dk.rb init` to set up the install configuration
	- `ruby dk.rb install` to link up the development kit to your Ruby location.
6. While still in the command prompt window, the Bundler (http://gembundler.com/) gem will have to be installed so the project can run and download all the needed dependencies.  Type `gem install bundler` and Ruby will install the gem.
7. Now install GitHub, and step through the installation process.
8. Now install Node JS.
	- Make sure to include the Node Package Manager (NPM) in your installation.
9. If you haven't created your own fork of the playlist app, do so now by clicking on the **Fork** button in the upper left.
10. You will now want to clone your forked repo to your local machine.

### Setup project folder

In order to modify pages locally on your machine you will have to set up GitHub and the development environment on your machine.

1. Open git shell/bash at project folder
2. Run `bundle install`
3. Run `npm install`

### Preview and test development version

1. Run `bundle exec middleman`
2. Open [http://localhost:4567/](http://localhost:4567/)

### Build project for deployment

1. Run `bundle exec middleman build`
2. Copy contents of the **deploy** folder to your web server

## Feedback

We would love to hear from you!
- [Vist the story maps forum](http://forums.arcgis.com/forums/264-Story-Maps)
- [StoryMaps Website](http://storymaps.esri.com/home/)
- [@EsriStoryMaps](http://twitter.com/EsriStoryMaps)
- [ArcGIS Blog](http://blogs.esri.com/esri/arcgis/)

## Issues

Find a bug or want to request a new feature? Please let us know by submitting an issue.

## Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/esri/contributing)

## Licensing
Copyright 2013 Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [license.txt](license.txt) file.


[](Esri Tags: Storytelling Playlist ArcGIS-Online Template)
[](Esri Language: JavaScript)
