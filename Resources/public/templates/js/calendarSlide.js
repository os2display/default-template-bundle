/**
 * Calendar slide.
 */

// Register the function, if it does not already exist.
if (!window.slideFunctions['calendar_all']) {
  window.slideFunctions['calendar'] = {
    /**
     * Setup the slide for rendering.
     * @param scope
     *   The slide scope.
     */
    setup: function setupCalendarSlide(scope) {
      var slide = scope.ikSlide;

      // Only show first image in array.
      if (slide.media_type === 'image' && slide.media.length > 0) {
        slide.currentImage = slide.media[0].image;
      }

      // Set currentLogo.
      slide.currentLogo = slide.logo;

      // Setup the inline styling
      scope.theStyle = {
        width: "100%",
        height: "100%",
        fontsize: slide.options.fontsize * (scope.scale ? scope.scale : 1.0)+ "px"
      };

      // Set the responsive font size if it is needed.
      if (slide.options.responsive_fontsize) {
        scope.theStyle.responsiveFontsize = slide.options.responsive_fontsize * (scope.scale ? scope.scale : 1.0)+ "vw";
      }
    },

    /**
     * Run the slide.
     *
     * @param slide
     *   The slide.
     * @param region
     *   The region object.
     */
    run: function runCalendarSlide(slide, region) {
      region.itkLog.info("Running calendar slide: " + slide.title);

      var duration = slide.duration !== null ? slide.duration : 15;

      if (slide.external_data) {
        var now = new Date();
        now = now.getTime();

        var arr = [];

        // Filter out finished events.
        for (var i = 0; i < slide.external_data.length; i++) {
          if (slide.external_data[i].end_time * 1000 > now) {
            var booking = slide.external_data[i];
            arr.push(booking);
          }
        }

        slide.selected_data = arr;
      }

      // Wait fadeTime before start to account for fade in.
      region.$timeout(function () {
        // Set the progress bar animation.
        region.progressBar.start(duration);

        // Wait for slide duration, then show next slide.
        // + fadeTime to account for fade out.
        region.$timeout(function () {
          region.nextSlide();
        }, duration * 1000 + region.fadeTime);
      }, region.fadeTime);
    }
  };
}
