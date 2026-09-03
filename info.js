(() => {
  let context;

  function playNavigationSound() {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;

    context ||= new Audio();
    if (context.state === 'suspended') context.resume();

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(620, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(410, context.currentTime + 0.09);
    gain.gain.setValueAtTime(0.13, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.11);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.12);
  }

  function isNavigationLink(target) {
    return target.closest('.topbar a, .cta');
  }

  document.addEventListener('pointerdown', (event) => {
    if (isNavigationLink(event.target)) playNavigationSound();
  }, { capture: true });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && isNavigationLink(event.target)) playNavigationSound();
  }, { capture: true });
})();