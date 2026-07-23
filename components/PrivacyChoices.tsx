'use client';

export default function PrivacyChoices({ label }: { label: string }) {
  function openChoices() {
    const googlefc = (window as Window & {
      googlefc?: { showRevocationMessage?: () => void };
    }).googlefc;

    if (googlefc?.showRevocationMessage) {
      googlefc.showRevocationMessage();
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
