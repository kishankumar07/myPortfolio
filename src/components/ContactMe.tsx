import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';
import emailjs from '@emailjs/browser'
import { toast } from 'react-toastify';

const ContactMe = () => {
//   const form = useRef<HTMLFormElement>(null);      
  const isMobile = useMediaQuery({ maxWidth: 768 }); // Detect if the device is mobile

  const [formData, setFormData] = useState({
      from_name: "",
      reply_to: "",
      message: "",
    });
  
    const [errors, setErrors] = useState({
      from_name: "",
      reply_to: "",
      message: "",
    });
  
    const validateForm = () => {
      const newErrors: { from_name: string; reply_to: string; message: string } = {
        from_name: "",
        reply_to: "",
        message: "",
      };
    
      if (!formData.from_name.trim()) {
        newErrors.from_name = "Full Name is required.";
      }
    
      if (!formData.reply_to.trim()) {
        newErrors.reply_to = "Email is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.reply_to)) {
        newErrors.reply_to = "Invalid email format.";
      }
    
      if (!formData.message.trim()) {
        newErrors.message = "Message cannot be empty.";
      }
    
      setErrors(newErrors);
    
      // Check if all error fields are empty
      return Object.values(newErrors).every((error) => error === "");
    };
    
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (validateForm()) {
        console.log('validated')
      emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, // Service ID
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // Template ID
        formData, // The form data
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY // Public Key
      )
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
        toast.success("Message sent successfully!")
      })
      .catch((error) => {
        console.error("Failed to send reply_to:", error);
        toast.error("Failed to send the message. Please try again later.");
      });
      }else{
        console.log('validation failed')
      }
    };

  return (
    <div id={`contact`} className={`bg-base-200`}>

     <h1 className='text-center text-primary font-bold text-3xl md:text-4xl xl:text-5xl'>Contact me</h1>


      {isMobile ?  (
  <div className="flex justify-center items-center h-screen bg-base-200">
    <div
      className="mockup-phone bg-base-200 p-5 w-[320px] h-[600px] overflow-hidden"
      style={{
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", 
      }}
    >
      <div className="camera"></div>
      <h2 className="text-xl my-4 text-center">Let's Connect</h2>

      <div className="display flex flex-col items-center px-4 py-4 overflow-y-auto">
        {/* Contact Form */}
        <form className="w-full max-w-xs space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="from_name"
              placeholder="Enter your full name"
              className={`input input-bordered w-full ${
                errors.from_name ? "input-error" : ""
              }`}
              value={formData.from_name}
              onChange={handleChange}
            />
            {errors.from_name && (
              <p className="text-error text-sm mt-1">{errors.from_name}</p>
            )}
          </div>

          {/* Email Address */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              type="email"
              name="reply_to"
              placeholder="Enter your email address"
              className={`input input-bordered w-full ${
                errors.reply_to ? "input-error" : ""
              }`}
              value={formData.reply_to}
              onChange={handleChange}
            />
            {errors.reply_to && (
              <p className="text-error text-sm mt-1">{errors.reply_to}</p>
            )}
          </div>

          {/* Your Message */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Message</span>
            </label>
            <textarea
              name="message"
              placeholder="Write your message here..."
              className={`textarea textarea-bordered w-full ${
                errors.message ? "textarea-error" : ""
              }`}
              rows={3}
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && (
              <p className="text-error text-sm mt-1">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-control mt-4">
            <button className="btn btn-primary w-full">Send Message</button>
          </div>
        </form>
      </div>
    </div>
  </div>
)  : (
  <div className="mockup-browser bg-base-200 border mx-auto mt-10 max-w-3xl" style={{ width: "800px" }}>
  <div className="mockup-browser-toolbar flex items-center px-4">
    <div className="flex space-x-2">
      {/* Red Ball */}
      <div className="w-3 h-3 rounded-full bg-red-500"></div>
      {/* Yellow Ball */}
      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
      {/* Green Ball */}
      <div className="w-3 h-3 rounded-full bg-green-500"></div>
    </div>
    <div className="input ml-auto">https://kishanta.in</div>
  </div>
  <div className="bg-base-200 flex flex-col items-center px-4 py-6">
    <h2 className="text-3xl font-semibold my-4">Let's connect</h2>

    {/* Contact Form */}
    <form className="w-full max-w-md space-y-4 my-3" onSubmit={handleSubmit}>
      {/* Full Name */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Full Name</span>
        </label>
        <input
          type="text"
          name="from_name"
          placeholder="Enter your full name"
          className={`input input-bordered w-full ${errors.from_name ? "input-error" : ""}`}
          value={formData.from_name}
          onChange={handleChange}
        />
        {errors.from_name && <p className="text-error text-sm mt-1">{errors.from_name}</p>}
      </div>

      {/* Email Address */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email Address</span>
        </label>
        <input
          type="email"
          name="reply_to"
          placeholder="Enter your email address"
          className={`input input-bordered w-full ${errors.reply_to ? "input-error" : ""}`}
          value={formData.reply_to}
          onChange={handleChange}
        />
        {errors.reply_to && <p className="text-error text-sm mt-1">{errors.reply_to}</p>}
      </div>

      {/* Your Message */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Your Message</span>
        </label>
        <textarea
          name="message"
          placeholder="Write your message here..."
          className={`textarea textarea-bordered w-full ${errors.message ? "textarea-error" : ""}`}
          rows={5}
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        {errors.message && <p className="text-error text-sm mt-1">{errors.message}</p>}
      </div>

      {/* Submit Button */}
      <div className="form-control mt-4">
        <button className="btn btn-primary w-full">Send Message</button>
      </div>
    </form>
  </div>
</div>

      )}

{/* Divider */}
<div className="flex w-full flex-col bg-base-200">
  <div className="divider bg-base-200"></div>
  </div>
  {/* Divider */}

</div>
    
  );
};

export default ContactMe;
