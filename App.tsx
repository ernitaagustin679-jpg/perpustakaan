import React, { useState, useEffect } from 'react';
import { 
  Library, 
  Search, 
  BookOpen, 
  Clock, 
  MapPin, 
  ChevronRight, 
  ArrowRight, 
  Calendar, 
  User, 
  CheckCircle2, 
  Menu, 
  X,
  CreditCard,
  Coffee,
  Wifi,
  Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface NavItem {
  label: string;
  href: string;
}

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Book {
  id: number;
  title: string;
  author: string;
  location: string;
  status: 'Available' | 'On Loan';
}

// --- Icons (Added missing ones or reused) ---
const Info = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
);

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Guide', href: '#guide' },
    { label: 'Services', href: '#services' },
    { label: 'Booking', href: '#booking' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.replace('#', '');
      const element = id === '' ? document.body : document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 soft-shadow' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center text-white soft-shadow">
            <Library size={24} />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-slate-800">Lumina</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-medium text-slate-600 hover:text-brand-500 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <button className="bg-brand-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-600 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-500/20">
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-base font-medium text-slate-600"
              >
                {item.label}
              </a>
            ))}
            <button className="bg-brand-500 text-white w-full py-3 rounded-xl font-semibold">
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);

  const mockBooks: Book[] = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', location: 'Level 2, Shelf A1', status: 'Available' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', location: 'Level 3, Shelf B4', status: 'Available' },
    { id: 3, title: '1984', author: 'George Orwell', location: 'Level 1, Shelf C9', status: 'On Loan' },
    { id: 4, title: 'The Silent Patient', author: 'Alex Michaelides', location: 'Level 2, Shelf F2', status: 'Available' },
  ];

  const filteredBooks = mockBooks.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-100/50 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-500 text-xs font-bold uppercase tracking-wider mb-6 border border-brand-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            New Guide System 2.0
          </div>
          <h1 className="font-display text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-6">
            The smarter way to <span className="text-brand-500">explore</span> your library.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-lg mb-10">
            Navigating thousands of books shouldn't be hard. Lumina provides real-time guidance, digital access, and seamless bookings for modern learners.
          </p>
          
          <div className="relative mb-10 max-w-md">
            <div className={`flex items-center gap-3 p-4 bg-white rounded-2xl border transition-all ${showResults ? 'border-brand-500 ring-4 ring-brand-50' : 'border-slate-200'}`}>
              <Search className="text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search for titles, authors, or shelf ID..."
                className="flex-1 bg-transparent border-none outline-none text-slate-700 font-medium placeholder:text-slate-400"
                value={searchQuery}
                onFocus={() => setShowResults(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">
                  <X size={16} />
                </button>
              )}
            </div>

            <AnimatePresence>
              {showResults && searchQuery.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl soft-shadow border border-slate-100 overflow-hidden z-50 p-2"
                >
                  {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                      <div key={book.id} className="p-3 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-between group cursor-pointer">
                        <div>
                          <div className="font-bold text-slate-800 text-sm group-hover:text-brand-500 transition-colors uppercase">{book.title}</div>
                          <div className="text-xs text-slate-500">{book.author}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] font-bold text-brand-500 bg-brand-50 px-2 py-0.5 rounded-md mb-1">{book.location}</div>
                          <div className={`text-[10px] font-bold ${book.status === 'Available' ? 'text-green-500' : 'text-amber-500'}`}>{book.status}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-slate-400 text-sm">
                      <div className="mb-2">No matches found for "{searchQuery}"</div>
                      <div className="text-xs">Try searching for generic keywords like "Gatsby" or "1984"</div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            
            {showResults && (
              <div className="fixed inset-0 z-40" onClick={() => setShowResults(false)} />
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setIsCardOpen(true)}
              className="bg-brand-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-brand-600 transition-all hover:translate-y-[-2px] soft-shadow"
            >
              Digital Card <CreditCard size={20} />
            </button>
            <button 
              onClick={() => document.getElementById('guide')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all"
            >
              View Map
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-6 text-sm text-slate-400">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="User" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <span>Trusted by 12k+ active readers every month</span>
          </div>
        </motion.div>

        {/* Digital Card Modal */}
        <AnimatePresence>
          {isCardOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCardOpen(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden soft-shadow"
              >
                <div className="bg-brand-500 p-8 text-white relative h-48 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                       <Library size={24} />
                       <span className="font-display font-bold text-lg">LUMINA</span>
                    </div>
                    <button onClick={() => setIsCardOpen(false)} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                      <X size={18} />
                    </button>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-widest opacity-70 mb-1">Pass ID</div>
                    <div className="font-mono text-xl tracking-wider">4920-5512-8801</div>
                  </div>
                </div>
                <div className="p-10 text-center">
                  <div className="w-48 h-48 bg-slate-50 border-2 border-slate-100 rounded-3xl mx-auto mb-8 flex items-center justify-center relative group">
                    {/* Simulated QR Code dots */}
                    <div className="grid grid-cols-4 gap-2 opacity-20 group-hover:opacity-100 transition-opacity duration-700">
                      {[...Array(16)].map((_, i) => (
                        <div key={i} className={`w-6 h-6 rounded-sm ${Math.random() > 0.4 ? 'bg-brand-500' : 'bg-slate-300'}`} />
                      ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Smartphone className="text-brand-500 animate-pulse" size={40} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Library Access Card</h3>
                  <p className="text-slate-500 text-sm mb-8">Scan at any Lumina Kiosk or Entry Gate for instant access to premium archive services.</p>
                  <button 
                    onClick={() => setIsCardOpen(false)}
                    className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative lg:ml-auto"
        >
          <div className="relative z-10 w-full max-w-[500px] aspect-square rounded-[2rem] bg-white soft-shadow p-8 flex flex-col gap-6 animate-float">
            <div className="flex items-center justify-between p-4 bg-brand-50 rounded-2xl border border-brand-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-500 shadow-sm">
                  <BookOpen size={20} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400">Current Borrow</div>
                  <div className="text-sm font-bold text-slate-800 uppercase">The Great Gatsby</div>
                </div>
              </div>
              <div className="text-[10px] font-bold text-brand-500 py-1 px-2 bg-white rounded-lg">DUE IN 2D</div>
            </div>

            <div className="flex-1 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800" 
                alt="Library" 
                className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent p-6 flex flex-col justify-end">
                <div className="text-white font-display font-medium text-lg">Main Reference Hall</div>
                <div className="text-white/80 text-sm flex items-center gap-1"><MapPin size={12} /> Level 3, Wing B</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-sage-50 rounded-2xl border border-sage-100 flex flex-col gap-1">
                  <div className="text-sage-500"><Clock size={20} /></div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Library Hours</div>
                  <div className="text-sm font-bold text-slate-800">Closed in 4h</div>
               </div>
               <div className="p-4 bg-lavender-50 rounded-2xl border border-lavender-100 flex flex-col gap-1 text-center items-center justify-center">
                  <div className="text-purple-400 font-display font-bold text-2xl">98%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Success Rate</div>
               </div>
            </div>
          </div>
          
          {/* Decorative shapes */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-400/20 blur-3xl rounded-full" />
          <div className="absolute top-10 -left-16 w-32 h-32 bg-sage-400/20 blur-3xl rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1000",
      title: "Main Reading Hall",
      category: "Architecture"
    },
    {
      url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1000",
      title: "Private Focus Pods",
      category: "Study"
    },
    {
      url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1000",
      title: "Classic Reference",
      category: "Books"
    },
    {
      url: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=1000",
      title: "Digital Archive",
      category: "System"
    },
    {
      url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1000",
      title: "Kid's Discovery",
      category: "Youth"
    },
    {
      url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1000",
      title: "Collaborative Zone",
      category: "Communal"
    }
  ];

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">Discover Your Space</h2>
          <p className="text-slate-500">Every corner of Lumina is designed to inspire your next breakthrough.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden group soft-shadow cursor-pointer"
            >
              <img 
                src={img.url} 
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <div className="text-brand-400 font-bold text-xs uppercase tracking-widest mb-1">{img.category}</div>
                <div className="text-white font-display text-2xl font-bold">{img.title}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "How do I get a library card?", a: "You can register directly in our app or at the reception desk with a valid photo ID. Your digital card will be active instantly." },
    { q: "Is the study pod free to use?", a: "Yes! All registered members get 4 hours of free pod usage per day. Premium members enjoy unlimited access and 24/7 entry." },
    { q: "What happens if I return a book late?", a: "We have a 3-day grace period. After that, a small daily fine applies. You can always renew your loan via the Lumina app before the due date." },
    { q: "Can I bring my own beverages?", a: "Sealer water bottles are allowed in all study areas. For coffee and snacks, please visit our Reader's Cafe on the ground floor." }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-500">Everything you need to know about the Lumina guide system.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-6 px-8 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-800">{faq.q}</span>
                <div className={`p-1 rounded-full transition-transform duration-300 ${openIndex === i ? 'rotate-180 bg-brand-100 text-brand-500' : 'bg-slate-100 text-slate-400'}`}>
                  <ChevronRight size={20} className="rotate-90" />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-8 text-slate-500 text-sm leading-relaxed border-t border-slate-50 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GuideSection = () => {
  const steps: Step[] = [
    {
      id: 1,
      title: "Digital Entry",
      description: "Scan your digital ID or student card at the entrance turnstiles for instant access.",
      icon: <CreditCard size={24} />,
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Smart Search",
      description: "Use our kiosks or mobile app to locate any book down to the exact shelf and row.",
      icon: <Search size={24} />,
      color: "bg-sage-500",
    },
    {
      id: 3,
      title: "Self Checkout",
      description: "Borrow books instantly by placing them on the RFID reader. No queues, no waiting.",
      icon: <CheckCircle2 size={24} />,
      color: "bg-orange-400",
    },
  ];

  return (
    <section id="guide" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">Step-by-Step Experience</h2>
          <p className="text-slate-500">Accessing knowledge has never been this fluid. Follow our simple guiding system to make the most of your time.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[68px] left-[15%] right-[15%] h-0.5 bg-slate-100 -z-10" />
          
          {steps.map((step, idx) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 ${step.color} text-white rounded-2xl flex items-center justify-center soft-shadow mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-brand-500 mb-2">STEP 0{step.id}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const services: Service[] = [
    { title: "Quiet Study Pods", description: "Soundproof pods for deep focus work sessions.", icon: <Wifi size={24} /> },
    { title: "Cloud Printing", description: "Print from any device and pick up at the station.", icon: <Smartphone size={24} /> },
    { title: "Reader's Cafe", description: "Modern coffee bar with healthy snacks and calm music.", icon: <Coffee size={24} /> },
    { title: "Meeting Rooms", description: "Fully equipped rooms for group projects.", icon: <User size={24} /> },
    { title: "Digital Archive", description: "Access millions of e-books and journals offline.", icon: <BookOpen size={24} /> },
    { title: "24/7 Access", description: "Extended hours for registered gold-tier members.", icon: <Clock size={24} /> },
  ];

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">Premium Facilities</h2>
            <p className="text-slate-500">Beyond books, we provide the ultimate environment for intellectual growth and comfort.</p>
          </div>
          <button className="text-brand-500 font-bold flex items-center gap-1 hover:gap-2 transition-all">
            See all services <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center mb-6 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{service.title}</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">{service.description}</p>
              <div className="h-1 w-0 bg-brand-500 group-hover:w-full transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BookingSection = () => {
  const [formData, setFormData] = useState({
    space: 'Individual Study Pod',
    date: '',
    time: '09:00 AM',
    name: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.date) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      space: 'Individual Study Pod',
      date: '',
      time: '09:00 AM',
      name: ''
    });
  };

  return (
    <section id="booking" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-brand-500 rounded-[3rem] p-10 lg:p-20 relative overflow-hidden flex flex-col lg:flex-row gap-16 items-center">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="lg:w-1/2 relative z-10 text-white">
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">Ready to reserve your space?</h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Don't leave your productivity to chance. Book a study pod or meeting room in seconds using our real-time availability engine.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"><CheckCircle2 size={16} /></div>
                <span>Free for all registered members</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"><CheckCircle2 size={16} /></div>
                <span>High-speed fiber optic Wi-Fi</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"><CheckCircle2 size={16} /></div>
                <span>Complimentary coffee & water</span>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full max-w-md relative z-10">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="bg-white rounded-[2rem] p-8 soft-shadow"
                >
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Select Space</label>
                      <select 
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all text-sm appearance-none"
                        value={formData.space}
                        onChange={(e) => setFormData({...formData, space: e.target.value})}
                      >
                        <option>Quiet Podcast Studio</option>
                        <option>Meeting Room A (Main)</option>
                        <option>Individual Study Pod</option>
                        <option>Collaboration Zone</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Date</label>
                        <div className="relative">
                          <input 
                            type="date" 
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all text-sm" 
                            required
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><Calendar size={16} /></div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Time</label>
                        <div className="relative">
                          <select 
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all text-sm appearance-none"
                            value={formData.time}
                            onChange={(e) => setFormData({...formData, time: e.target.value})}
                          >
                            <option>09:00 AM</option>
                            <option>11:00 AM</option>
                            <option>02:00 PM</option>
                            <option>04:30 PM</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><Clock size={16} /></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="John Doe" 
                        required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all text-sm" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-500 text-white font-bold py-4 rounded-xl hover:bg-brand-600 transition-all hover:scale-[1.02] active:scale-[0.98] mt-4 shadow-lg shadow-brand-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : 'Confirm Reservation'}
                    </button>
                    <p className="text-[10px] text-center text-slate-400 mt-4">
                      By booking, you agree to our usage guidelines and the quiet-zone policy.
                    </p>
                  </form>
                </motion.div>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-[2rem] p-10 soft-shadow text-center"
                >
                  <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h3>
                  <p className="text-slate-500 text-sm mb-8">We've reserved {formData.space} for you on {formData.date} at {formData.time}.</p>
                  
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left mb-8 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400 uppercase font-bold">Ref ID</span>
                      <span className="text-slate-800 font-bold uppercase">LMN-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400 uppercase font-bold">Reader</span>
                      <span className="text-slate-800 font-bold">{formData.name}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                       <span className="text-slate-400 uppercase font-bold">Access Code</span>
                       <span className="text-brand-500 font-bold tracking-widest">4492</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleReset}
                    className="text-slate-500 font-bold text-sm hover:text-brand-500 transition-colors"
                  >
                    Make another booking
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white">
                <Library size={20} />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">Lumina</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              The next generation library guide system. Empowering modern learners with smart navigation and digital integration.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-500 transition-all cursor-pointer">
                <Smartphone size={18} />
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-500 transition-all cursor-pointer">
                <Wifi size={18} />
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-500 transition-all cursor-pointer">
                <MapPin size={18} />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-slate-100">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#guide" onClick={(e) => { e.preventDefault(); document.getElementById('guide')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-brand-500 transition-colors">Our Guide</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Digital Archive</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Kiosk Search</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Membership Types</a></li>
            </ul>
          </div>

          <div>
             <h4 className="font-bold mb-6 text-slate-100">Resources</h4>
             <ul className="space-y-4 text-sm text-slate-400">
               <li><a href="#" className="hover:text-brand-500 transition-colors">Help Center</a></li>
               <li><a href="#" className="hover:text-brand-500 transition-colors">API Docs</a></li>
               <li><a href="#" className="hover:text-brand-500 transition-colors">Developer Portal</a></li>
               <li><a href="#" className="hover:text-brand-500 transition-colors">Privacy Policy</a></li>
             </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-slate-100">Location</h4>
            <div className="space-y-4 text-sm text-slate-400">
              <div className="flex gap-3">
                <MapPin className="shrink-0 text-brand-500" size={18} />
                <span>124 Innovation Avenue, Knowledge District, Metropolis</span>
              </div>
              <div className="flex gap-3">
                <Clock className="shrink-0 text-brand-500" size={18} />
                <span>Mon-Fri: 8AM - 10PM<br/>Sat-Sun: 10AM - 6PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
          <div>© 2024 Lumina Systems. All rights reserved.</div>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-white">Status</span>
            <span className="cursor-pointer hover:text-white">Cookies</span>
            <span className="cursor-pointer hover:text-white">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <GuideSection />
      <GallerySection />
      <ServicesSection />
      <BookingSection />
      <FAQSection />
      <Footer />
      
      {/* Small floating action button for bottom right (mobile help) */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-brand-500 text-white rounded-full shadow-2xl flex items-center justify-center z-40 md:hidden"
      >
        <Search size={24} />
      </motion.button>
    </div>
  );
}
