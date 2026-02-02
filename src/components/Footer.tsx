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

    </footer>
  );
}
