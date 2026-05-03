export default function ContactPage() {
  return (
    <div className="flex-1 bg-white pt-10">
      <div className="max-w-4xl mx-auto px-6 mb-20">
        <h1 className="text-4xl font-bold text-[#3b234a] italic mb-6 text-center">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-[#fffbf9] p-8 rounded-2xl shadow-sm border border-[#fdf3f5]">
            <h2 className="text-2xl font-bold text-[#3b234a] mb-6">Send us a message</h2>
            <form className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-[#65586d] mb-1">Name</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-[#f17a7e] bg-white text-[#3b234a]" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#65586d] mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-[#f17a7e] bg-white text-[#3b234a]" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#65586d] mb-1">Message</label>
                <textarea rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-[#f17a7e] bg-white text-[#3b234a]" placeholder="How can we help you?"></textarea>
              </div>
              <button type="button" className="bg-[#f17a7e] hover:bg-[#e0696d] text-white font-bold tracking-wider py-3 rounded shadow-md transition-colors shadow-[#f17a7e]/30 mt-2">
                SEND MESSAGE
              </button>
            </form>
          </div>
          
          <div className="flex flex-col justify-center gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#3b234a] mb-2">Customer Support</h3>
              <p className="text-[#65586d]">Email: support@ascollection.com<br/>Phone: +1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#3b234a] mb-2">Headquarters</h3>
              <p className="text-[#65586d]">123 Fashion Avenue<br/>Style District, NY 10001<br/>United States</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#3b234a] mb-2">Business Hours</h3>
              <p className="text-[#65586d]">Monday - Friday: 9am - 6pm EST<br/>Saturday - Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
