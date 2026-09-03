(() => {
  let context;
  let lastSoundAt = 0;

  function playNavigationSound() {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;

    context ||= new Audio();
    if (context.state === 'suspended') context.resume();

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(720, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(420, context.currentTime + 0.13);
    gain.gain.setValueAtTime(0.16, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.16);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.17);
    lastSoundAt = Date.now();
  }

  function navigationLink(target) {
    return target.closest('.topbar a, .cta');
  }

  document.addEventListener('pointerdown', (event) => {
    if (navigationLink(event.target)) playNavigationSound();
  }, { capture: true });

  document.addEventListener('click', (event) => {
    const link = navigationLink(event.target);
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank') return;

    event.preventDefault();
    if (Date.now() - lastSoundAt > 80) playNavigationSound();
    window.setTimeout(() => window.location.assign(link.href), 180);
  }, { capture: true });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && navigationLink(event.target)) playNavigationSound();
  }, { capture: true });
})();