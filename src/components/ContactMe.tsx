import SectionHeading from './SectionHeading';
import DeferredScene from './DeferredScene';
import { useState, Suspense, lazy } from 'react';
import { useMediaQuery } from 'react-responsive';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';


import { FaLock } from 'react-icons/fa6';

// 3D Earth Globe component
const ContactGlobeScene = lazy(() => import('./ContactGlobeScene'));

const ContactMe = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [formData, setFormData] = useState({
    from_name: '',
    reply_to: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    from_name: '',
    reply_to: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {
      from_name: '',
      reply_to: '',
      message: '',
    };

    if (!formData.from_name.trim()) {
      newErrors.from_name = 'Full Name is required.';
    }

    if (!formData.reply_to.trim()) {
      newErrors.reply_to = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.reply_to)) {
      newErrors.reply_to = 'Invalid email format.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be empty.';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (validateForm()) {
      if (!import.meta.env.VITE_EMAILJS_SERVICE_ID || !import.meta.env.VITE_EMAILJS_TEMPLATE_ID || !import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
        toast.error("The contact form is temporarily unavailable. Please connect through my LinkedIn profile.");
        return;
      }
      setIsSubmitting(true);
      emailjs
        .send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          formData,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
        .then(() => {
          toast.success('Message sent successfully!');
          setFormData({ from_name: '', reply_to: '', message: '' });
          setIsSubmitting(false);
        })
        .catch((error) => {
          console.error('Failed to send email:', error);
          toast.error('Failed to send the message. Please try again later.');
          setIsSubmitting(false);
        });
    }
  };

  return (
    <div id="contact" className="contact-showcase bg-base-200 py-16 px-4 md:px-8 overflow-hidden">
      <SectionHeading className="text-center max-w-6xl mx-auto mb-12">Contact Me</SectionHeading>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* 3D Interactive Rotating Globe */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="contact-globe-column lg:col-span-6 lg:order-2 flex flex-col items-center justify-center"
          >
            <div className="contact-globe-stage w-full cursor-grab active:cursor-grabbing relative flex items-center justify-center">
              <Suspense
                fallback={
                  <div className="flex flex-col items-center justify-center h-full gap-3">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="text-sm font-medium text-base-content/70">Loading 3D Globe...</p>
                  </div>
                }
              >
<DeferredScene><ContactGlobeScene /></DeferredScene>
              </Suspense>
            </div>
            <p className="text-xs text-base-content/60 font-mono tracking-wide mt-2 text-center select-none">
              📍 Dubai, UAE • Available Worldwide
            </p>
          </motion.div>

          {/* Browser Window Contact Form */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="contact-form-column lg:col-span-6 lg:order-1 w-full"
          >
            {isMobile ? (
              <div className="flex justify-center items-center py-2">
                <div
                  className="mockup-phone bg-base-200 p-5 w-[320px] max-w-full overflow-hidden shadow-2xl border border-base-300"
                >
                  <div className="camera"></div>
                  <h3 className="contact-form-heading my-4 text-center text-base-content">
                    Let's connect
                  </h3>

                  <div className="display flex flex-col items-center px-4 py-2">
                    <form className="w-full max-w-xs space-y-4" onSubmit={handleSubmit}>
                      {/* Full Name */}
                      <div className="form-control">
                        <label htmlFor="contact-from_name" className="label py-1">
                          <span className="label-text font-medium text-base-content">Full Name</span>
                        </label>
                        <input
                          type="text"
                          id="contact-from_name"
                          autoComplete="name"
                          aria-required="true"
                          name="from_name"
                          placeholder="Enter your full name"
                          className={`input input-bordered w-full bg-base-100 ${
                            errors.from_name ? 'input-error' : ''
                          }`}
                          value={formData.from_name}
                          onChange={handleChange}
                        />
                        {errors.from_name && (
                          <p className="text-error text-xs mt-1">{errors.from_name}</p>
                        )}
                      </div>

                      {/* Email Address */}
                      <div className="form-control">
                        <label htmlFor="contact-reply_to" className="label py-1">
                          <span className="label-text font-medium text-base-content">Email Address</span>
                        </label>
                        <input
                          type="email"
                          id="contact-reply_to"
                          autoComplete="email"
                          aria-required="true"
                          name="reply_to"
                          placeholder="Enter your email address"
                          className={`input input-bordered w-full bg-base-100 ${
                            errors.reply_to ? 'input-error' : ''
                          }`}
                          value={formData.reply_to}
                          onChange={handleChange}
                        />
                        {errors.reply_to && (
                          <p className="text-error text-xs mt-1">{errors.reply_to}</p>
                        )}
                      </div>

                      {/* Your Message */}
                      <div className="form-control">
                        <label htmlFor="contact-message" className="label py-1">
                          <span className="label-text font-medium text-base-content">Your Message</span>
                        </label>
                        <textarea
                          id="contact-message"
                          aria-required="true"
                          name="message"
                          placeholder="Write your message here..."
                          className={`textarea textarea-bordered w-full bg-base-100 ${
                            errors.message ? 'textarea-error' : ''
                          }`}
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                        {errors.message && (
                          <p className="text-error text-xs mt-1">{errors.message}</p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="form-control pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-primary w-full shadow-md"
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-base-200 border border-base-300 w-full shadow-xl rounded-2xl overflow-hidden">
                {/* Browser Titlebar without pill effect */}
                <div className="relative flex items-center px-4 py-3 bg-base-300/60 border-b border-base-300 min-h-[48px]">
                  <div className="flex items-center space-x-2 shrink-0 z-10">
                    <div className="w-3 h-3 rounded-full bg-red-500 hover:opacity-80 transition-opacity"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 hover:opacity-80 transition-opacity"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 hover:opacity-80 transition-opacity"></div>
                  </div>
                  {/* Standout Website URL Display */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="flex items-center gap-1.5 text-sm sm:text-base font-sans select-none tracking-wide">
                      <FaLock className="w-3.5 h-3.5 text-emerald-500 shrink-0 mr-0.5" />
                      <span className="text-base-content/50 font-normal">https://</span>
                      <span className="text-base-content/65 font-medium">www.</span>
                      <span className="text-primary font-extrabold tracking-wider underline decoration-primary/40 decoration-2 underline-offset-4">
                        kishanta.in
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-base-200 flex flex-col items-center px-6 py-8">
                  <h3 className="contact-form-heading mb-6 text-center text-base-content">
                    Let's connect
                  </h3>

                  <form className="w-full max-w-lg space-y-4" onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className="form-control">
                      <label htmlFor="contact-from_name" className="label py-1">
                        <span className="label-text font-medium text-base-content">Full Name</span>
                      </label>
                      <input
                        type="text"
                        id="contact-from_name"
                          autoComplete="name"
                          aria-required="true"
                          name="from_name"
                        placeholder="Enter your full name"
                        className={`input input-bordered w-full bg-base-100 ${
                          errors.from_name ? 'input-error' : ''
                        }`}
                        value={formData.from_name}
                        onChange={handleChange}
                      />
                      {errors.from_name && (
                        <p className="text-error text-xs mt-1">{errors.from_name}</p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="form-control">
                      <label htmlFor="contact-reply_to" className="label py-1">
                        <span className="label-text font-medium text-base-content">Email Address</span>
                      </label>
                      <input
                        type="email"
                        id="contact-reply_to"
                          autoComplete="email"
                          aria-required="true"
                          name="reply_to"
                        placeholder="Enter your email address"
                        className={`input input-bordered w-full bg-base-100 ${
                          errors.reply_to ? 'input-error' : ''
                        }`}
                        value={formData.reply_to}
                        onChange={handleChange}
                      />
                      {errors.reply_to && (
                        <p className="text-error text-xs mt-1">{errors.reply_to}</p>
                      )}
                    </div>

                    {/* Your Message */}
                    <div className="form-control">
                      <label htmlFor="contact-message" className="label py-1">
                        <span className="label-text font-medium text-base-content">Your Message</span>
                      </label>
                      <textarea
                        id="contact-message"
                          aria-required="true"
                          name="message"
                        placeholder="Write your message here..."
                        className={`textarea textarea-bordered w-full bg-base-100 ${
                          errors.message ? 'textarea-error' : ''
                        }`}
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                      {errors.message && (
                        <p className="text-error text-xs mt-1">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="form-control pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary w-full font-semibold shadow-md"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
