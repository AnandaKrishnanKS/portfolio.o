"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Mail,
  Send,
  CheckCircle,
  Phone,
  MapPin,
} from "lucide-react";
import { personalInfo } from "@/data/portfolioData";
import SpotlightCard from "@/ui/SpotlightCard";
import { GitHubIcon, LinkedInIcon, TwitterIcon, InstagramIcon } from "@/components/BrandIcons";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSuccess(true);

    // Trigger premium confetti celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#6366f1", "#a855f7", "#ec4899"], // Indigo, Purple, Pink
    });

    // Clear form
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setSuccess(false), 5000);
  };

  const contactDetails = [
    { label: "Email Me", value: personalInfo.email, icon: Mail, href: `mailto:${personalInfo.email}` },
    { label: "WhatsApp", value: personalInfo.phone, icon: Phone, href: personalInfo.whatsappUrl },
    { label: "Location", value: personalInfo.location, icon: MapPin, href: "#" },
  ];

  const socialLinks = [
    { icon: GitHubIcon, url: personalInfo.githubUrl, label: "GitHub" },
    { icon: LinkedInIcon, url: personalInfo.linkedinUrl, label: "LinkedIn" },
    { icon: TwitterIcon, url: personalInfo.twitterUrl, label: "Twitter" },
    { icon: InstagramIcon, url: personalInfo.instagramUrl, label: "Instagram" },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-widest text-primary mb-2"
          >
            Connection
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Get In Touch
          </motion.h2>
          <div className="h-1 w-12 bg-primary rounded-full mt-4" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7 text-left w-full">
            <SpotlightCard className="p-6 sm:p-8" tiltEffect={false}>
              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-5 w-full"
                  >
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-xs font-semibold text-muted-foreground">
                          Your Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="glass-card px-4 py-2.5 rounded-xl border border-white/5 bg-black/20 text-xs text-foreground placeholder-muted-foreground outline-none focus:border-primary/50 transition-colors"
                          placeholder="Zoro"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-xs font-semibold text-muted-foreground">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="glass-card px-4 py-2.5 rounded-xl border border-white/5 bg-black/20 text-xs text-foreground placeholder-muted-foreground outline-none focus:border-primary/50 transition-colors"
                          placeholder="zoro@example.com"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="subject" className="text-xs font-semibold text-muted-foreground">
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="glass-card px-4 py-2.5 rounded-xl border border-white/5 bg-black/20 text-xs text-foreground placeholder-muted-foreground outline-none focus:border-primary/50 transition-colors"
                        placeholder="Collaboration opportunity"
                      />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-xs font-semibold text-muted-foreground">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="glass-card px-4 py-2.5 rounded-xl border border-white/5 bg-black/20 text-xs text-foreground placeholder-muted-foreground outline-none focus:border-primary/50 transition-colors resize-none"
                        placeholder="Hi Zoro, I would love to talk about a project..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-2 py-3 rounded-xl bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 clickable"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="py-12 flex flex-col items-center justify-center text-center"
                  >
                    <CheckCircle className="w-16 h-16 text-primary mb-4 animate-bounce" />
                    <h3 className="text-lg font-bold text-foreground mb-2">Message Sent Successfully!</h3>
                    <p className="text-xs text-muted-foreground max-w-sm font-light">
                      Thank you for reaching out. I have received your message and will get back to you as soon as possible.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </SpotlightCard>
          </div>

          {/* Right Column: Contact Details & Socials (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left w-full">
            {/* Contact detail cards */}
            <div className="flex flex-col gap-4 w-full">
              {contactDetails.map((detail) => {
                const Icon = detail.icon;
                return (
                  <a
                    key={detail.label}
                    href={detail.href}
                    target={detail.href !== "#" ? "_blank" : undefined}
                    rel="noreferrer"
                    className="w-full"
                  >
                    <SpotlightCard className="p-4 flex items-center gap-4 group" tiltEffect={true}>
                      <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-transparent transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                          {detail.label}
                        </span>
                        <h4 className="text-xs font-bold text-foreground mt-0.5 group-hover:text-primary transition-colors">
                          {detail.value}
                        </h4>
                      </div>
                    </SpotlightCard>
                  </a>
                );
              })}
            </div>

            {/* Social Links Panel */}
            <SpotlightCard className="p-6" tiltEffect={false}>
              <h3 className="text-xs font-bold text-foreground mb-4 uppercase tracking-wider">
                Follow Me
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      title={social.label}
                      className="p-3 rounded-xl glass-card hover:bg-primary hover:text-primary-foreground text-muted-foreground hover:border-transparent transition-all clickable"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
