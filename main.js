document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.skill__group--item1 li, .skill__group--item2 li').forEach(li => {
    const skillsText = li.querySelector('.skills-text');
    
    ScrollTrigger.create({
      trigger: li,
      start: 'top 80%', // liがビューポートの80%位置に来たときにトリガー
      end: 'bottom 20%', // liがビューポートの20%位置を過ぎたときに終了
      onEnter: () => {
        gsap.to(li, { backgroundColor: '#FBFBFB', duration: 0.5 });
        gsap.to(skillsText, { backgroundColor: '#FBFBFB', duration: 0.5 });
      },
      onEnterBack: () => {
        gsap.to(li, { backgroundColor: '#9dc4b788', duration: 0.5 });
        gsap.to(skillsText, { backgroundColor: '#9dc4b788', duration: 0.5 });
      },
      onLeaveBack: () => {
        gsap.to(li, { backgroundColor: '#9dc4b788', duration: 0.5 });
        gsap.to(skillsText, { backgroundColor: '#9dc4b788', duration: 0.5 });
      },
    });
  });
});
