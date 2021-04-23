import anime from 'animejs/lib/anime.es.js';

async function targetProcess(contentTarget) {
  let data = { parent: contentTarget };
  contentTarget.classList.add('content_open');
  contentTarget.setAttribute('id', 'contentOpen');
  for (let j = 0; j <= contentTarget.children.length; j++) {
    if (j === contentTarget.children.length) {
      return data;
    }
    let dataName = contentTarget.children[j].className;
    data[dataName] = contentTarget.children[j];
  }
}

async function newTarget(target) {
  return new Promise((res) => {
    if (!target.classList.contains('content_item')) {
      target = target.offsetParent;
      if (!target.classList.contains('content_item')) {
        target = target.offsetParent;
        res(target);
      } else {
        res(target);
      }
    } else {
      res(target);
    }
  });
}

function cleanUp(contentTarget) {
  console.log('removing');
  contentTarget.classList.remove('content_open');
  contentTarget.setAttribute('id', '');
}

function getRect(targetData) {
  return {
    bg: targetData.content_bg.getBoundingClientRect(),
    feature: targetData.content_feature.getBoundingClientRect(),
  };
}

const contentOpen = async (e, post, i) => {
  return new Promise(async (res) => {
    let target = await newTarget(e.target);
    let targetData = await targetProcess(target);

    const rect = getRect();

    console.log(e);
    console.log(i);
    console.log(post);

    anime({
      targets: [targetData.content_bg, targetData.content_feature],
      duration: (target, index) => (index ? 800 : 250),
      easing: (target, index) => (index ? 'easeOutElastic' : 'easeOutSine'),
      elasticity: 250,
      translateX: 0,
      translateY: 0,
      scaleX: 1,
      scaleY: 1,
      complete: () => (this.isAnimating = false),
    });

    let openBox = document.getElementById('contentOpen');
    openBox.addEventListener('click', () => {
      cleanUp(targetData.parent);
      res();
    });
  });
};

export default contentOpen;
