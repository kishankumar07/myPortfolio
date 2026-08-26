import { useState, Suspense, lazy } from 'react';
import { useMediaQuery } from 'react-responsive';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { FaLock } from 'react-icons/fa6';

// 3D Earth Globe component
const Globe = lazy(() => import('./Three-d-Items/Globe'));

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
    if (validateForm()) {
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
    <div id="contact" className="bg-base-200 py-16 px-4 md:px-8 overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center text-primary font-bold text-3xl md:text-4xl xl:text-5xl mb-12"
      >
        Contact me
      </motion.h1>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* 3D Interactive Rotating Globe */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            <div className="w-full h-[340px] sm:h-[380px] md:h-[420px] lg:h-[450px] cursor-grab active:cursor-grabbing relative flex items-center justify-center">
              <Suspense
                fallback={
                  <div className="flex flex-col items-center justify-center h-full gap-3">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="text-sm font-medium text-base-content/70">Loading 3D Globe...</p>
                  </div>
                }
              >
                <Canvas
                  dpr={[1, 2]}
                  gl={{
                    antialias: true,
                    alpha: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.25,
                  }}
                  camera={{
                    position: [0, 0.2, 5.5],
                    fov: isMobile ? 48 : 42,
                    near: 0.1,
                    far: 1000,
                  }}
                >
                  {/* Studio lighting for bright, crisp Earth view */}
                  <ambientLight intensity={1.4} />
                  <directionalLight position={[10, 14, 12]} intensity={2.4} castShadow />
                  <directionalLight position={[-10, 8, 8]} intensity={1.2} color="#bae6fd" />
                  <pointLight position={[0, 6, 6]} intensity={1.2} color="#ffffff" />
                  <hemisphereLight color="#ffffff" groundColor="#0284c7" intensity={0.9} />

                  <Globe />
                </Canvas>
              </Suspense>
            </div>
            <p className="text-xs text-base-content/60 font-mono tracking-wide mt-2 text-center select-none">
              📍 Dubai, UAE • Available Worldwide
            </p>
          </motion.div>

          {/* Browser Window Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 w-full"
          >
            {isMobile ? (
              <div className="flex justify-center items-center py-2">
                <div
                  className="mockup-phone bg-base-200 p-5 w-[320px] max-w-full overflow-hidden shadow-2xl border border-base-300"
                >
                  <div className="camera"></div>
                  <h2 className="text-xl font-semibold my-4 text-center text-base-content">
                    Let's connect
                  </h2>

                  <div className="display flex flex-col items-center px-4 py-2">
                    <form className="w-full max-w-xs space-y-4" onSubmit={handleSubmit}>
                      {/* Full Name */}
                      <div className="form-control">
                        <label className="label py-1">
                          <span className="label-text font-medium text-base-content">Full Name</span>
                        </label>
                        <input
                          type="text"
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
                        <label className="label py-1">
                          <span className="label-text font-medium text-base-content">Email Address</span>
                        </label>
                        <input
                          type="email"
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
                        <label className="label py-1">
                          <span className="label-text font-medium text-base-content">Your Message</span>
                        </label>
                        <textarea
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
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-base-content">
                    Let's connect
                  </h2>

                  <form className="w-full max-w-lg space-y-4" onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className="form-control">
                      <label className="label py-1">
                        <span className="label-text font-medium text-base-content">Full Name</span>
                      </label>
                      <input
                        type="text"
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
                      <label className="label py-1">
                        <span className="label-text font-medium text-base-content">Email Address</span>
                      </label>
                      <input
                        type="email"
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
                      <label className="label py-1">
                        <span className="label-text font-medium text-base-content">Your Message</span>
                      </label>
                      <textarea
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
