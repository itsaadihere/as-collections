export default function Footer() {
  return (
    <footer className="bg-[#3b234a] text-white/80 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        <img src="/logo.png" alt="A.S Collection" className="h-12 w-auto mx-auto mb-8 brightness-0 invert opacity-50" />
        
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-[0.2em] text-white/50 uppercase mb-2">Designed & Developed By</p>
          <a 
            href="https://mockup.media/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#f17a7e] hover:text-white transition-colors text-lg font-medium"
          >
            Mockup Media (SMC-Private) Limited
          </a>
        </div>

        <p className="text-sm text-white/60 font-medium tracking-wide">© 2026 A.S Collection. All rights reserved.</p>
      </div>
    </footer>
  );
}
