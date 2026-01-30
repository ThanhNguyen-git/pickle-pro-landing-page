// HPI 1.7-V
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import type { BallFeatures } from '@/entities';
import { Image } from '@/components/ui/image';
import { ArrowRight, Check, Star, Zap, Shield, Wind } from 'lucide-react';

// --- 3D Components ---

function PickleballSphere({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Base rotation
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, state.clock.getElapsedTime() * 0.1 + mousePosition.y * 0.5, 0.1);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, state.clock.getElapsedTime() * 0.15 + mousePosition.x * 0.5, 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 128, 128]} scale={2.2}>
        <MeshDistortMaterial
          color="#BEEB00"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.15}
          metalness={0.9}
          bumpScale={0.02}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>
    </Float>
  );
}

function Scene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#E6F47A" />
      <Environment preset="studio" />
      <PickleballSphere mousePosition={mousePosition} />
    </>
  );
}

// --- UI Components ---

const Marquee = ({ text }: { text: string }) => {
  return (
    <div className="relative flex overflow-hidden py-6 bg-brandaccent text-secondary select-none">
      <motion.div
        className="flex whitespace-nowrap font-heading text-4xl lg:text-6xl font-bold uppercase tracking-tighter"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {Array(8).fill(text).map((item, i) => (
          <span key={i} className="mx-8 flex items-center gap-4">
            {item} <Star className="w-6 h-6 lg:w-10 lg:h-10 fill-current" />
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const SectionHeading = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`font-heading text-4xl md:text-6xl lg:text-7xl tracking-tight ${className}`}
    >
      {children}
    </motion.h2>
  );
};

// --- Main Page Component ---

export default function HomePage() {
  const [features, setFeatures] = useState<BallFeatures[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    async function loadFeatures() {
      try {
        const result = await BaseCrudService.getAll<BallFeatures>('ballfeatures');
        setFeatures(result.items);
      } catch (error) {
        console.error('Failed to load features:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadFeatures();
  }, []);

  // Parallax for Hero Text
  const heroTextY = useTransform(smoothProgress, [0, 0.2], [0, 100]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="bg-background min-h-screen w-full overflow-clip selection:bg-brandaccent selection:text-secondary">
      <Header />

      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-secondary">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-primary/20 rounded-full blur-[120px] opacity-40 animate-pulse" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-brandaccent/10 rounded-full blur-[100px] opacity-30" />
          <div className="absolute inset-0 bg-[url('https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=1')] opacity-[0.03] mix-blend-overlay" />
        </div>

        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 h-full items-center">
          {/* Left Content */}
          <motion.div 
            style={{ y: heroTextY, opacity: heroOpacity }}
            className="lg:col-span-5 flex flex-col justify-center pt-20 lg:pt-0"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-block py-1 px-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-brandaccent font-heading text-xs tracking-widest uppercase mb-6">
                Next Gen Technology
              </span>
              <h1 className="font-heading text-6xl lg:text-8xl xl:text-9xl text-secondary-foreground leading-[0.9] tracking-tight mb-8">
                Clean<br />
                <span className="text-brandaccent">Fresh Air</span><br />
                Indoors
              </h1>
              <p className="font-paragraph text-lg lg:text-xl text-secondary-foreground/70 max-w-md leading-relaxed mb-10">
                Engineered for the modern champion. Experience the perfect balance of speed, control, and durability with the world's most advanced pickleball.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="#features" className="group relative px-8 py-4 bg-brandaccent text-secondary rounded-full font-heading font-medium overflow-hidden transition-all hover:scale-105">
                  <span className="relative z-10 flex items-center gap-2">
                    Discover Features <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>
                <button className="px-8 py-4 border border-white/20 text-secondary-foreground rounded-full font-heading font-medium hover:bg-white/5 transition-colors">
                  Watch Film
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right 3D Content */}
          <div className="lg:col-span-7 h-[50vh] lg:h-full w-full relative z-20 cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
              <Scene mousePosition={mousePosition} />
            </Canvas>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-secondary-foreground/40 text-xs font-heading tracking-widest uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-brandaccent to-transparent" />
        </motion.div>
      </section>

      <Marquee text="ENGINEERED FOR VICTORY" />

      {/* --- INTRO STATEMENT --- */}
      <section className="py-32 lg:py-48 bg-background relative overflow-hidden">
        <div className="w-full max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <SectionHeading className="text-foreground leading-[0.95]">
              Redefining<br />
              <span className="text-primary opacity-80">Aerodynamics.</span>
            </SectionHeading>
            <div className="lg:pl-12">
              <p className="font-paragraph text-xl lg:text-2xl text-foreground/80 leading-relaxed">
                We stripped away the unnecessary to focus on what matters: pure performance. Our proprietary polymer blend ensures consistent bounce in any temperature, while the precision-drilled holes minimize wind resistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- STICKY FEATURES SHOWCASE --- */}
      <section id="features" className="relative bg-secondary text-secondary-foreground py-24 lg:py-0">
        {isLoading ? (
          <div className="h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-brandaccent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : features.length > 0 ? (
          <div className="relative w-full max-w-[120rem] mx-auto">
            <div className="lg:flex">
              {/* Sticky Image Container */}
              <div className="hidden lg:flex lg:w-1/2 h-screen sticky top-0 items-center justify-center p-12 lg:p-24">
                <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden bg-[#1a2a2a] border border-white/5 shadow-2xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFeatureIndex}
                      initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={features[activeFeatureIndex]?.featureImage || "https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=2"}
                        alt={features[activeFeatureIndex]?.featureTitle || "Feature Image"}
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
                      
                      {/* Floating Badge */}
                      <div className="absolute bottom-8 left-8 right-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                          <Zap className="w-4 h-4 text-brandaccent" />
                          <span className="font-heading text-sm text-white tracking-wide">
                            {features[activeFeatureIndex]?.benefitHighlight || "High Performance"}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Scrolling Text Content */}
              <div className="w-full lg:w-1/2 relative z-10">
                {features.map((feature, index) => (
                  <FeatureTextBlock 
                    key={feature._id} 
                    feature={feature} 
                    index={index} 
                    onInView={() => setActiveFeatureIndex(index)} 
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="py-32 text-center">
            <p className="text-secondary-foreground/50">Features loading...</p>
          </div>
        )}
      </section>

      {/* --- PARALLAX BREATHER --- */}
      <section className="relative w-full h-[80vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-secondary">
          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0.5, 1], [-100, 100]) }}
            className="absolute inset-0"
          >
            <Image
              src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=3"
              alt="Pickleball Lifestyle"
              className="w-full h-full object-cover opacity-40 scale-110"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-secondary via-transparent to-background" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-5xl lg:text-8xl text-white mb-6">Play Without Limits</h2>
            <p className="font-paragraph text-xl text-white/70 max-w-2xl mx-auto">
              Designed for those who demand perfection in every shot.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- TECHNICAL SPECIFICATIONS --- */}
      <section className="py-32 bg-background relative">
        <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
            <SectionHeading className="text-foreground">
              Technical<br />Specifications
            </SectionHeading>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-foreground" />
              <div className="w-3 h-3 rounded-full bg-foreground/30" />
              <div className="w-3 h-3 rounded-full bg-foreground/30" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10 rounded-[2rem] overflow-hidden">
            {features.slice(0, 4).map((feature, i) => (
              <div key={i} className="bg-background p-10 hover:bg-subtlebackground transition-colors duration-500 group">
                <div className="mb-8 w-12 h-12 rounded-full bg-brandaccent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {i === 0 ? <Wind className="w-6 h-6 text-foreground" /> : 
                   i === 1 ? <Shield className="w-6 h-6 text-foreground" /> :
                   i === 2 ? <Zap className="w-6 h-6 text-foreground" /> :
                   <Check className="w-6 h-6 text-foreground" />}
                </div>
                <h3 className="font-heading text-lg text-foreground/60 mb-2 uppercase tracking-wider">{feature.featureTitle}</h3>
                <p className="font-heading text-3xl lg:text-4xl text-foreground font-bold mb-4">
                  {feature.specificationValue || "Standard"}
                </p>
                <p className="font-paragraph text-foreground/70 text-sm leading-relaxed">
                  {feature.featureDescription?.substring(0, 80)}...
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-brandaccent/5 rounded-full blur-[150px]" />
        
        <div className="w-full max-w-[100rem] mx-auto px-6 lg:px-12 text-center relative z-10">
          <h2 className="font-heading text-6xl lg:text-9xl mb-12 tracking-tighter">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandaccent to-primary">Dominate?</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="px-12 py-6 bg-brandaccent text-secondary text-xl font-heading font-bold rounded-full hover:bg-white transition-colors w-full md:w-auto">
              Get Yours Now
            </button>
            <button className="px-12 py-6 border border-white/20 text-white text-xl font-heading font-bold rounded-full hover:bg-white/10 transition-colors w-full md:w-auto">
              View Retailers
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// --- Sub-Components ---

function FeatureTextBlock({ feature, index, onInView }: { feature: BallFeatures; index: number; onInView: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) onInView();
  }, [isInView, onInView]);

  return (
    <div ref={ref} className="min-h-screen flex items-center px-6 lg:px-24 py-24 border-l border-white/5">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8 }}
        className="max-w-xl"
      >
        <div className="flex items-center gap-4 mb-6">
          <span className="font-heading text-6xl text-white/10 font-bold">0{index + 1}</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>
        
        <h3 className="font-heading text-4xl lg:text-6xl text-white mb-8 leading-tight">
          {feature.featureTitle}
        </h3>
        
        <p className="font-paragraph text-xl text-white/60 leading-relaxed mb-10">
          {feature.featureDescription}
        </p>

        {feature.specificationValue && (
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="font-heading text-sm text-brandaccent uppercase tracking-widest mb-2">Spec</p>
              <p className="font-paragraph text-2xl text-white">{feature.specificationValue}</p>
            </div>
            {feature.benefitHighlight && (
              <div>
                <p className="font-heading text-sm text-brandaccent uppercase tracking-widest mb-2">Benefit</p>
                <p className="font-paragraph text-2xl text-white">{feature.benefitHighlight}</p>
              </div>
            )}
          </div>
        )}

        {/* Mobile Image Fallback */}
        <div className="lg:hidden mt-12 rounded-2xl overflow-hidden aspect-video relative">
           <Image
              src={feature.featureImage || "https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=4"}
              alt={feature.featureTitle || "Feature"}
              className="w-full h-full object-cover"
            />
        </div>
      </motion.div>
    </div>
  );
}