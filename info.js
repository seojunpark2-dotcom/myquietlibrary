(() => {
  function playClick() {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;
    const context = new Audio();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.frequency.setValueAtTime(540, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(380, context.currentTime + 0.055);
    gain.gain.setValueAtTime(0.07, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.065);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.07);
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link || !link.href || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank') {
      if (event.target.closest('button')) playClick();
      return;
    }
    event.preventDefault();
    playClick();
    window.setTimeout(() => window.location.assign(link.href), 85);
  });
})();