import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Thank you for reaching out! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-card -z-10" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-flame-orange font-semibold uppercase tracking-wider text-sm mb-4">
            Get in Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Contact <span className="flame-text">Us</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Have an issue you need help with or want to get involved to provide support? We'd love to hear
            from you. Reach out and let's make a difference together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border">
              <div className="p-3 rounded-xl flame-gradient">
                <MapPin className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Our Locations</h3>
                <p className="text-muted-foreground">
                  Igniting across UK, Philippines, India, Pakistan, Bangladesh, Georgia & more!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border">
              <div className="p-3 rounded-xl flame-gradient">
                <Mail className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                <p className="text-muted-foreground">
                  mflynn1999@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border">
              <div className="p-3 rounded-xl flame-gradient">
                <Phone className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                <p className="text-muted-foreground">
                  +44 7762 293742
                  <br />
                  24/7 Please leave a message 
                </p>

                <div className="flex gap-4 pt-2 border-t border-border/50">
                  <a href="https://www.facebook.com/MagikWorlds/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-flame-orange transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://x.com/MagicWorlds3" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-flame-orange transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="https://www.youtube.com/@MagicworldsTV" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-flame-orange transition-colors">
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-card p-8 rounded-2xl border border-border"
          >
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  placeholder="Tell us about the issue you'd like to report or how you'd like to help..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 flame-gradient px-8 py-4 rounded-xl font-semibold text-lg text-primary-foreground hover:opacity-90 transition-all"
              >
                Send Message
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
