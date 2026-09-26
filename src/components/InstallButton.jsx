import { useState, useEffect } from 'react'

function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setDeferredPrompt(null)
      }
    } else {
      // Jika browser belum memicu prompt otomatis (misal di PC / localhost)
      alert('Aplikasi siap di-install! Klik ikon install di ujung kanan address bar browser (atau titik tiga > Install).')
    }
  }

  return (
    <button className="install-floating-btn" onClick={handleInstallClick}>
      ⬇ Install App
    </button>
  )
}

export default InstallButton