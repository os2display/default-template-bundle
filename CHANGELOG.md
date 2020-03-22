# os2display/default-template-bundle CHANGELOG

## 2.1.0

* Merged PR https://github.com/os2display/default-template-bundle/pull/26 - Feature: Configurable video formats

## 2.0.0

* Merged PR: https://github.com/os2display/default-template-bundle/pull/25 to fix black video poster background.

## 1.2.0

* Avoid loading iframe before it is shown. This will create a slight load when the iframe slide is shown.
* Added text explaining the possible issues with using the iframe template.
* Added option to explicitly set iframe width and height.

## 1.1.2

* Merged https://github.com/os2display/default-template-bundle/pull/10.

## 1.1.1

* Changed video source order to be: webm, ogg, mp4.
* Removed Offline checks in video slide.
* Fixed removal of event listeners for video slide.
* Fixed empty sources checks and removed possibility of infinite loop crash.
* Fixed manual calender filter order.

## 1.1.0

* Removed os2display requirements.
* Fixed image paths.
* Updated npm packages.
* Fixed issue with slideshow positioning.
* Fixed issue with media type for video slides.

## 1.0.4

* Fixed background-editor type to not be fixed to image.
* Made background-editor and logo-editor template configurable.
* Added fixed-logo-editor.
* Fixed styling compile.
