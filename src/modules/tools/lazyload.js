export default function lazyLoad() {
  setTimeout(() => {
    var lazyVideos = [].slice.call(document.querySelectorAll('video.lazy'));
    console.log(lazyVideos);
    let i = 0;

    function waitForLoad(lazyVideo) {
      return new Promise((resolve) => {
        var videoSource = lazyVideo.children[0];
        if (videoSource && typeof videoSource.tagName === 'string' && videoSource.tagName === 'SOURCE') {
          lazyVideo.src = videoSource.dataset.src;
          lazyVideo.classList.remove('lazy');
        }
        lazyVideo.onloadeddata = () => resolve();
      });
    }

    async function loadVideo(lazyVideo) {
      await waitForLoad(lazyVideo);
      i++;
      if (i < lazyVideos.length) {
        loadVideo(lazyVideos[i]);
      }
    }
    if (lazyVideos[0]) {
      loadVideo(lazyVideos[0]);
    }
  }, 1000);
}
