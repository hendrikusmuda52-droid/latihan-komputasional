import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { PWAInstaller } from "@/components/pwa-installer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SAKOLA - E-Learning Informatika & Koding SMP Santo Augustinus",
  description:
    "SAKOLA - Santo Augustinus Komputasi Online Learning Aplikasi. Platform e-learning untuk latihan mengetik, berpikir komputasional, dan koding.",
  keywords: [
    "SAKOLA",
    "Santo Augustinus",
    "e-learning",
    "informatika",
    "koding",
    "berpikir komputasional",
    "mengetik",
    "SMP",
  ],
  authors: [{ name: "SMP Santo Augustinus" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Latihan Komputasional",
  },
  // ── Updated icons: use new school logo icons ──
  // favicon.ico for browser tab, icon-512.png for Apple touch icon,
  // icon-192.png + icon-512.png for PWA install screen
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-512.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('SW registered:', registration.scope);

                    // Bug #14 fix: force-check for SW updates on every page load
                    // Browsers normally check for SW updates every ~24h, but we want
                    // users to get updates ASAP (especially after Vercel auto-deploy)
                    registration.update().catch(function(err) {
                      console.log('SW update check failed:', err);
                    });

                    // Listen for new SW waiting to activate
                    registration.addEventListener('updatefound', function() {
                      var newWorker = registration.installing;
                      if (!newWorker) return;
                      newWorker.addEventListener('statechange', function() {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                          // New SW is waiting — prompt user to reload
                          console.log('[SW] New version available. Reloading to activate...');
                          // Auto-reload after short delay (less disruptive than a prompt)
                          // Skip waiting so new SW takes control on next reload
                          newWorker.postMessage({ type: 'SKIP_WAITING' });
                          // Show toast-like notification
                          var banner = document.createElement('div');
                          banner.style.cssText = 'position:fixed;top:16px;left:50%;transform:translateX(-50%);background:#0f766e;color:white;padding:12px 20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);z-index:9999;font-size:14px;font-family:system-ui,sans-serif;display:flex;align-items:center;gap:12px;';
                          banner.innerHTML = '<span>Versi baru tersedia</span>';
                          var btn = document.createElement('button');
                          btn.textContent = 'Muat Ulang';
                          btn.style.cssText = 'background:white;color:#0f766e;border:none;padding:6px 12px;border-radius:4px;font-weight:600;cursor:pointer;font-size:13px;';
                          btn.onclick = function() { window.location.reload(); };
                          banner.appendChild(btn);
                          document.body.appendChild(banner);
                          // Auto-reload after 10 seconds if user doesn't click
                          setTimeout(function() {
                            if (document.body.contains(banner)) {
                              window.location.reload();
                            }
                          }, 10000);
                        }
                      });
                    });
                  }).catch(function(err) {
                    console.log('SW registration failed:', err);
                  });

                  // Bug #14 fix: when new SW takes control, reload page once
                  // so user gets fresh assets from new cache
                  var refreshing = false;
                  navigator.serviceWorker.addEventListener('controllerchange', function() {
                    if (refreshing) return;
                    refreshing = true;
                    window.location.reload();
                  });
                });
              }
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <PWAInstaller />
      </body>
    </html>
  );
}
