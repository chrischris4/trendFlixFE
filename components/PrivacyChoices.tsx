'use client';

export default function PrivacyChoices({ label }: { label: string }) {
  function openChoices() {
    const w = window as Window & {
      googlefc?: { showRevocationMessage?: () => void };
      __tcfapi?: unknown;
    };

    // googlefc est injecté par AdSense partout, mais showRevocationMessage()
    // ne fait rien si aucun CMP n'est actif pour cet utilisateur (hors EEE/UK).
    // On ne l'appelle donc que si l'API TCF est bien présente.
    if (w.__tcfapi && w.googlefc?.showRevocationMessage) {
      w.googlefc.showRevocationMessage();
      return;
    }
    window.location.assign('/privacy');
  }

  return (
    <button
      type="button"
      onClick={openChoices}
      style={{ border: 0, padding: 0, background: 'transparent', color: '#AAAAAA', fontSize: 13, cursor: 'pointer' }}
    >
      {label}
    </button>
  );
}
