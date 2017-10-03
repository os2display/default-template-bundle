angular.module('toolsModule').directive('horizonEditor', [
  'mediaFactory', '$timeout', function (mediaFactory, $timeout) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        slide: '=',
        close: '&'
      },
      link: function (scope) {
        var index = null;

        scope.step = null;

        scope.selectedMedia = [];

        /**
         * Set the step to background-picker.
         */
        scope.backgroundPicker = function backgroundPicker(pickedIndex) {
          index = pickedIndex;

          if (scope.slide.media.indexOf(scope.slide.options.regions[index].mediaId)) {
            scope.selectedMedia = [scope.slide.media[scope.slide.options.regions[index].mediaId]];
          }

          scope.step = 'background-picker';
        };

        /**
         * Set the step to pick-from-media.
         */
        scope.pickFromMedia = function pickFromMedia(index) {
          scope.step = 'pick-from-media';
        };

        /**
         * Set the step to pick-from-computer.
         */
        scope.pickFromComputer = function pickFromComputer(index) {
          scope.step = 'pick-from-computer';
        };

        scope.back = function back() {
          scope.selectedMedia = [];
          scope.step = null;
          index = null;
        };

        /**
         * Add/remove a media from scope.slide.media.
         *
         * Update mediaId references in slide.options.regions.
         *
         * @param clickedMedia
         */
        var clickMedia = function (clickedMedia) {
          var mediaList = [];
          var found = false;
          var mediaIndex = null;

          for (var i in scope.slide.media) {
            var media = scope.slide.media[i];

            if (media.id === clickedMedia.id) {
              found = true;
              mediaIndex = i;
            }
            mediaList.push(media);
          }

          if (!found) {
            mediaList.push(clickedMedia);
            mediaIndex = mediaList.length - 1;
          }

          scope.slide.options.regions[index].mediaId = mediaIndex;

          scope.slide.media = mediaList;
          scope.selectedMedia = scope.slide.options.regions[index].mediaId ? [scope.slide.media[scope.slide.options.regions[index].mediaId]] : [];
        };

        // Register event listener for select media.
        scope.$on('mediaOverview.selectMedia', function (event, media) {
          clickMedia(media);
        });

        // Register event listener for media upload success.
        scope.$on('mediaUpload.uploadSuccess', function (event, data) {
          mediaFactory.getMedia(data.id).then(
            function success(media) {
              scope.slide.media.push(media);
              scope.slide.options.regions[index].mediaId = scope.slide.media.length - 1;
            },
            function error(reason) {
              busService.$emit('log.error', {
                'cause': reason,
                'msg': 'Kunne ikke tilføje media.'
              });
            }
          );

          var notAllSuccess = data.queue.find(function (item, index) {
            return !item.isSuccess;
          });

          if (!notAllSuccess) {
            scope.close();
          }
        });

      },
      templateUrl: '/bundles/os2displaydefaulttemplate/apps/toolsModule/horizon-editor.html'
    };
  }
]);
