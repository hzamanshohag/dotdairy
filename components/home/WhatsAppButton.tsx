"use client";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/8801781033511"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 sm:bottom-24 sm:right-6 sm:h-16 sm:w-16"
    >
      {/* WhatsApp Icon */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-8 w-8 sm:h-9 sm:w-9"
        aria-hidden="true"
      >
        <path d="M20.52 3.48A11.86 11.86 0 0012.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.9 11.9 0 005.75 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.16-3.44-8.44zM12.06 21.8h-.01a9.86 9.86 0 01-5.02-1.37l-.36-.21-3.74.98 1-3.65-.23-.37a9.84 9.84 0 01-1.52-5.28C2.18 6.47 6.61 2.04 12.07 2.04a9.82 9.82 0 017 2.9 9.82 9.82 0 012.9 6.99c0 5.46-4.44 9.87-9.91 9.87zm5.41-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
      </svg>

      {/* Notification Pulse */}
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-30" />
    </a>
  );
}
