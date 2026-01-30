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
    <footer className="relative bg-secondary text-secondary-foreground overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-brandaccent/5" />
      
      <div className="relative w-full max-w-[120rem] mx-auto px-8 lg:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <span className="font-heading text-2xl font-bold text-primary-foreground">P</span>
              </div>
              <span className="font-heading text-3xl font-bold text-secondary-foreground">
                PicklePro
              </span>
            </div>
            <p className="font-paragraph text-base text-secondary-foreground/70 leading-relaxed">
              Precision-engineered pickleballs designed for champions. Experience the perfect balance of performance and durability.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-heading text-xl font-bold text-secondary-foreground mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['Features', 'Specifications', 'Technology'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="font-paragraph text-base text-secondary-foreground/70 hover:text-primary transition-colors inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-heading text-xl font-bold text-secondary-foreground mb-6">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 font-paragraph text-base text-secondary-foreground/70 hover:text-primary transition-colors group"
                  >
                    <item.icon size={18} className="group-hover:scale-110 transition-transform" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-secondary-foreground/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-paragraph text-sm text-secondary-foreground/60">
              © {currentYear} PicklePro. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#privacy"
                className="font-paragraph text-sm text-secondary-foreground/60 hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="font-paragraph text-sm text-secondary-foreground/60 hover:text-primary transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
