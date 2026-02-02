import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    { icon: Mail, label: 'hello@picklepro.com', href: 'mailto:hello@picklepro.com' },
    { icon: Phone, label: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: MapPin, label: 'San Francisco, CA', href: '#' },
  ];

  return (
    <footer className="relative bg-foreground text-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brandaccent/5 via-transparent to-blue-600/5" />

      <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 pb-16 border-b border-white/10">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-brandaccent flex items-center justify-center">
                <span className="font-heading text-xl font-bold text-white">P</span>
              </div>
              <span className="font-heading text-2xl font-bold">PicklePro</span>
            </div>
            <p className="font-paragraph text-white/60 leading-relaxed">
              Premium pickleball equipment engineered for champions. Experience the difference precision makes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="font-paragraph text-white/60 hover:text-brandaccent transition-colors">Features</a></li>
              <li><a href="#specifications" className="font-paragraph text-white/60 hover:text-brandaccent transition-colors">Specifications</a></li>
              <li><a href="/" className="font-paragraph text-white/60 hover:text-brandaccent transition-colors">Home</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-6">Contact</h3>
            <ul className="space-y-4">
              {contactInfo.map((info, i) => (
                <li key={i}>
                  <a href={info.href} className="flex items-center gap-3 text-white/60 hover:text-brandaccent transition-colors group">
                    <info.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-paragraph">{info.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-paragraph text-white/40 text-sm">
            © {currentYear} PicklePro. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-paragraph text-white/40 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="font-paragraph text-white/40 hover:text-white transition-colors text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
