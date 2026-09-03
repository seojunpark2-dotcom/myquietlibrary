(() => {
  function playCtaSound(event) {
    const link = event.target.closest('a.cta');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (Audio) {
      const context = new Audio();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(540, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(380, context.currentTime + 0.08);
      gain.gain.setValueAtTime(0.1, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.1);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.11);
    }
    window.setTimeout(() => window.location.assign(link.href), 120);
  }

  document.addEventListener('click', playCtaSound);
})();