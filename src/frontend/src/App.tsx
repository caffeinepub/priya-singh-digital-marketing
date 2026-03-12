import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  FileText,
  Loader2,
  Mail,
  Menu,
  Palette,
  Quote,
  Search,
  Share2,
  Star,
  Target,
  TrendingUp,
  Users,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Variants } from "motion/react";
import { useState } from "react";
import { SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import { useActor } from "./hooks/useActor";

/* ─── Types ─── */
type FormStatus = "idle" | "loading" | "success" | "error";

/* ─── Data ─── */
const services = [
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Dominate search rankings with data-driven keyword strategies and technical SEO. Turn organic traffic into a sustainable growth engine for your business.",
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    description:
      "Build an engaged community and amplify your brand voice across all major platforms. From strategy to execution, I make social media work for your goals.",
  },
  {
    icon: FileText,
    title: "Content Strategy",
    description:
      "Craft compelling narratives that resonate with your audience and convert. Every piece of content is built with purpose, SEO, and conversion in mind.",
  },
  {
    icon: Target,
    title: "Paid Ads (Google/Meta)",
    description:
      "Maximize ROI through precision-targeted ad campaigns on Google and Meta. I optimize spend, creative, and audience targeting for measurable results.",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    description:
      "Design automated email sequences that nurture leads and drive repeat business. From welcome flows to re-engagement campaigns — every email earns its place.",
  },
  {
    icon: Palette,
    title: "Brand Development",
    description:
      "Build a brand identity that stands out and stays memorable. I help you define your voice, visual language, and positioning to own your market space.",
  },
];

const testimonials = [
  {
    quote:
      "Priya completely transformed our online presence. Within six months, our organic traffic tripled and leads from SEO alone doubled. She's the real deal.",
    name: "Arjun Mehta",
    role: "CEO, NexaFlow Tech",
    initials: "AM",
  },
  {
    quote:
      "Working with Priya on our paid ads strategy was a game-changer. She cut our cost-per-acquisition by 40% while scaling our monthly revenue significantly.",
    name: "Sarah Donovan",
    role: "Founder, Bloom Beauty Co.",
    initials: "SD",
  },
  {
    quote:
      "Priya's content strategy revamped our entire brand voice. Our engagement rate skyrocketed and we finally have a consistent, authentic story to tell.",
    name: "Marcus Lee",
    role: "Marketing Director, UrbanEdge",
    initials: "ML",
  },
];

const strengths = [
  "Data-Driven Decision Making",
  "Multi-Channel Campaign Management",
  "Conversion Rate Optimization",
  "Brand Storytelling & Positioning",
  "Analytics & Performance Reporting",
];

/* ─── Smooth scroll helper ─── */
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ─── Stagger variants ─── */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

/* ─── Main Component ─── */
export default function App() {
  const { actor } = useActor();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      if (!actor) throw new Error("Not connected");
      await actor.submitContactForm(form.name, form.email, form.message);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  const navLinks = [
    { label: "Home", id: "home", ocid: "nav.home_link" },
    { label: "About", id: "about", ocid: "nav.about_link" },
    { label: "Services", id: "services", ocid: "nav.services_link" },
    {
      label: "Testimonials",
      id: "testimonials",
      ocid: "nav.testimonials_link",
    },
    { label: "Contact", id: "contact", ocid: "nav.contact_link" },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      {/* ─── Navbar ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="font-display font-bold text-xl text-foreground hover:text-primary transition-colors"
          >
            <span className="gold-text">P</span>riya Singh
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.id}
                data-ocid={link.ocid}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Button
              data-ocid="nav.hire_me_button"
              onClick={() => scrollTo("contact")}
              className="bg-primary text-primary-foreground hover:opacity-90 font-semibold px-5"
            >
              Hire Me
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-b border-border overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <button
                    type="button"
                    key={link.id}
                    data-ocid={link.ocid}
                    onClick={() => {
                      scrollTo(link.id);
                      setMobileOpen(false);
                    }}
                    className="text-left text-sm font-medium py-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <Button
                  data-ocid="nav.hire_me_button"
                  onClick={() => {
                    scrollTo("contact");
                    setMobileOpen(false);
                  }}
                  className="bg-primary text-primary-foreground w-full"
                >
                  Hire Me
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── Hero ─── */}
      <section
        id="home"
        className="hero-gradient noise-overlay min-h-screen flex items-center pt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="order-2 lg:order-1"
            >
              <motion.div variants={itemVariants}>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold bg-white/10 rounded-full px-4 py-1.5 mb-6">
                  <Star size={12} className="text-gold" />
                  Digital Marketing Strategist
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6"
              >
                Hi, I'm{" "}
                <span className="gold-text gold-underline">Priya Singh</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl text-white/75 leading-relaxed mb-10 max-w-lg"
              >
                I turn brands into digital powerhouses — driving growth through
                data-driven strategies, compelling content, and campaigns that
                convert.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4"
              >
                <Button
                  data-ocid="hero.primary_button"
                  onClick={() => scrollTo("contact")}
                  className="bg-gold text-accent-foreground hover:opacity-90 font-bold text-base px-8 py-6 rounded-full shadow-gold-glow"
                >
                  Work With Me
                  <ArrowRight size={18} className="ml-2" />
                </Button>
                <Button
                  data-ocid="hero.secondary_button"
                  variant="outline"
                  onClick={() => scrollTo("services")}
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/60 text-base px-8 py-6 rounded-full bg-transparent"
                >
                  View My Work
                  <ChevronDown size={18} className="ml-2" />
                </Button>
              </motion.div>

              {/* Stats row */}
              <motion.div
                variants={itemVariants}
                className="mt-12 flex flex-wrap gap-8"
              >
                {[
                  { label: "Years Experience", value: "7+" },
                  { label: "Clients Served", value: "150+" },
                  { label: "Campaigns Launched", value: "500+" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display text-3xl font-black gold-text">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/55 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
              className="order-1 lg:order-2 flex justify-center lg:justify-end"
            >
              <div className="relative w-72 h-80 sm:w-96 sm:h-[28rem] lg:w-[26rem] lg:h-[30rem]">
                {/* Gold geometric backdrop */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-40"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.82 0.17 85), oklch(0.65 0.14 55))",
                    transform: "rotate(6deg) scale(0.95)",
                  }}
                />
                {/* Purple backdrop */}
                <div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: "oklch(0.32 0.14 294 / 0.6)",
                    transform: "rotate(-3deg) scale(0.98)",
                  }}
                />
                {/* Photo */}
                <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/assets/uploads/26840__1___1_-removebg-preview-1.png"
                    alt="Priya Singh, Digital Marketing Strategist"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-glow px-4 py-3 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm text-foreground">
                      ROI Focused
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Results that matter
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── About ─── */}
      <section id="about" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Bio */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={containerVariants}
            >
              <motion.p
                variants={itemVariants}
                className="text-sm font-semibold uppercase tracking-widest gold-text mb-4"
              >
                About Me
              </motion.p>
              <motion.h2
                variants={itemVariants}
                className="font-display text-4xl sm:text-5xl font-black text-foreground leading-tight mb-6"
              >
                Strategist. Storyteller.{" "}
                <span className="text-primary">Growth Driver.</span>
              </motion.h2>
              <motion.div
                variants={itemVariants}
                className="space-y-4 text-muted-foreground leading-relaxed"
              >
                <p>
                  I'm Priya Singh — a digital marketing strategist with over 7
                  years of experience helping startups and established brands
                  break through the noise and build lasting audience
                  connections. My work sits at the intersection of creativity
                  and analytics.
                </p>
                <p>
                  From crafting SEO strategies that dominate page one to
                  engineering paid campaigns with measurable ROI, I bring
                  precision and passion to every engagement. I've had the
                  privilege of partnering with brands across e-commerce, SaaS,
                  lifestyle, and professional services sectors.
                </p>
                <p>
                  My philosophy is simple: marketing should be accountable,
                  creative, and deeply human. Every campaign I run tells a story
                  — and every story is designed to convert.
                </p>
              </motion.div>

              {/* Strengths */}
              <motion.ul
                variants={containerVariants}
                className="mt-8 space-y-2"
              >
                {strengths.map((s) => (
                  <motion.li
                    key={s}
                    variants={itemVariants}
                    className="flex items-center gap-3 text-sm font-medium text-foreground"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={13} className="text-primary" />
                    </div>
                    {s}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Right: Stats */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={containerVariants}
              className="grid grid-cols-2 gap-6"
            >
              {[
                {
                  icon: TrendingUp,
                  value: "7+",
                  label: "Years Experience",
                  bg: "bg-primary/5",
                  iconColor: "text-primary",
                },
                {
                  icon: Users,
                  value: "150+",
                  label: "Happy Clients",
                  bg: "bg-gold/10",
                  iconColor: "text-gold",
                },
                {
                  icon: Zap,
                  value: "500+",
                  label: "Campaigns Launched",
                  bg: "bg-primary/5",
                  iconColor: "text-primary",
                },
                {
                  icon: Star,
                  value: "98%",
                  label: "Client Satisfaction",
                  bg: "bg-gold/10",
                  iconColor: "text-gold",
                },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className={`${stat.bg} rounded-2xl p-6 flex flex-col gap-3`}
                >
                  <div className={stat.iconColor}>
                    <stat.icon size={28} />
                  </div>
                  <div className="font-display text-4xl font-black text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section id="services" className="py-24 lg:py-32 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.p
              variants={itemVariants}
              className="text-sm font-semibold uppercase tracking-widest gold-text mb-4"
            >
              What I Do
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="font-display text-4xl sm:text-5xl font-black text-foreground"
            >
              Services Built for{" "}
              <span className="text-primary">Real Results</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                variants={itemVariants}
                data-ocid={`services.item.${i + 1}`}
                className="card-hover bg-card border border-border rounded-2xl p-7 flex flex-col gap-4 cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svc.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  {svc.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {svc.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section id="testimonials" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.p
              variants={itemVariants}
              className="text-sm font-semibold uppercase tracking-widest gold-text mb-4"
            >
              Client Love
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="font-display text-4xl sm:text-5xl font-black text-foreground"
            >
              Don't Just Take <span className="text-primary">My Word</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={itemVariants}
                data-ocid={`testimonials.item.${i + 1}`}
                className="bg-card border border-border rounded-2xl p-7 flex flex-col gap-5 card-hover"
              >
                <Quote size={28} className="text-gold opacity-80" />
                <p className="text-muted-foreground leading-relaxed text-sm flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm font-display">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section
        id="contact"
        className="py-24 lg:py-32 hero-gradient noise-overlay"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: CTA copy */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={containerVariants}
            >
              <motion.p
                variants={itemVariants}
                className="text-sm font-semibold uppercase tracking-widest text-gold mb-4"
              >
                Let's Talk
              </motion.p>
              <motion.h2
                variants={itemVariants}
                className="font-display text-4xl sm:text-5xl font-black text-white leading-tight mb-6"
              >
                Ready to Grow <span className="gold-text">Your Brand?</span>
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-white/70 leading-relaxed mb-10"
              >
                Whether you&apos;re launching a new campaign, rebranding, or
                looking to scale your digital presence — I&apos;d love to hear
                about your goals. Let&apos;s create something remarkable
                together.
              </motion.p>

              {/* Social links */}
              <motion.div variants={itemVariants} className="flex gap-4">
                <a
                  data-ocid="contact.linkedin_link"
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <SiLinkedin size={20} />
                </a>
                <a
                  data-ocid="contact.instagram_link"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  aria-label="Instagram"
                >
                  <SiInstagram size={20} />
                </a>
                <a
                  data-ocid="contact.twitter_link"
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  aria-label="Twitter / X"
                >
                  <SiX size={20} />
                </a>
              </motion.div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="bg-white/5 backdrop-blur-sm border border-white/15 rounded-3xl p-8"
            >
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    data-ocid="contact.success_state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center text-center gap-4 py-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle2 size={32} className="text-green-400" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white">
                      Message Sent!
                    </h3>
                    <p className="text-white/70">
                      Thank you for reaching out. I&apos;ll get back to you
                      within 24 hours.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setStatus("idle")}
                      className="mt-2 border-white/30 text-white hover:bg-white/10 bg-transparent"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="space-y-1.5">
                      <Label className="text-white/80 text-sm font-medium">
                        Full Name
                      </Label>
                      <Input
                        data-ocid="contact.name_input"
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        placeholder="Arjun Mehta"
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/35 focus:border-gold focus:ring-gold"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-white/80 text-sm font-medium">
                        Email Address
                      </Label>
                      <Input
                        data-ocid="contact.email_input"
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                        placeholder="arjun@company.com"
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/35 focus:border-gold focus:ring-gold"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-white/80 text-sm font-medium">
                        Your Message
                      </Label>
                      <Textarea
                        data-ocid="contact.textarea"
                        value={form.message}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, message: e.target.value }))
                        }
                        placeholder="Tell me about your project, goals, and timeline..."
                        required
                        rows={5}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/35 focus:border-gold focus:ring-gold resize-none"
                      />
                    </div>

                    {status === "error" && (
                      <motion.div
                        data-ocid="contact.error_state"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 rounded-lg px-3 py-2"
                      >
                        <XCircle size={15} />
                        {errorMsg}
                      </motion.div>
                    )}

                    <Button
                      data-ocid="contact.submit_button"
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-gold text-accent-foreground hover:opacity-90 font-bold text-base py-6 rounded-xl shadow-gold-glow"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2
                            size={18}
                            className="mr-2 animate-spin"
                            data-ocid="contact.loading_state"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight size={18} className="ml-2" />
                        </>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-purple-deep py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="font-display font-black text-2xl text-white mb-2">
                <span className="gold-text">P</span>riya Singh
              </div>
              <p className="text-sm text-white/50 leading-relaxed">
                Digital Marketing Strategist helping brands grow with purpose
                and precision.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-4">
                Quick Links
              </p>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link.id)}
                      className="text-sm text-white/55 hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-4">
                Connect
              </p>
              <div className="flex gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <SiLinkedin size={16} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <SiInstagram size={16} />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                  aria-label="Twitter / X"
                >
                  <SiX size={16} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40">
              &copy; {new Date().getFullYear()} Priya Singh. All rights
              reserved.
            </p>
            <p className="text-sm text-white/40">
              Built with &hearts; using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold/80 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
