import lottie from 'lottie-web';
let backdrop = document.getElementById('backdrop');

export default function loadAnim() {
  lottie.loadAnimation({
    container: backdrop, // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../../lottie/backdrop.json', // the path to the animation json
  });
}
