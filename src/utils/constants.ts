// Navbar component
 const NAV_LINKS = ["About", "Projects", "Experience", "Contact"];


// Hero section's -- 3-D models view setting
 const cameraSettings = {
      position: [0, 100, 300], 
      fov: 35, 
      near: 0.1,
      far: 1000,
    }

 const skills = [
   { name: "JavaScript", texture: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649847/javascript_odc0kq.png" },
   { name: "TypeScript", texture: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649856/typescript_ap9p7u.png" },
  { name: "MongoDB", texture: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649851/mongodb_xpnnwb.png" },
  { name: "Angular.js", texture: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1738172180/angu_bxrmgx.png" },
  { name: "React.js", texture: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649854/reactjs_fjmhwm.png" },
  { name: "Next.js", texture: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1738173209/next_idh08i.png" },
  { name: "Express.js", texture: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649844/express-js_sjzfnn.png" },
  { name: "Node.js", texture: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649852/nodejs_hh3xhd.png" },
  { name: "Redux Toolkit", texture: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649855/redux_ppr49i.png" },
  { name: "REST API", texture: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649855/restapi_zv9w5t.png" },
  { name: "PostgreSQL", texture: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649853/psql_kwpkvz.png" },
  { name: "Git", texture: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649844/git_npntvb.png" },
  { name: "Microservices", texture: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649849/microservices_f6ojb0.png" },
  { name: "Docker", texture: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649843/docker_ezr8ui.png" },
  { name: "Postman", texture: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649852/postman_zlsqo1.png" },
  { name: "Firebase", texture: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649844/firebase_o6rhff.png" },
  { name: "JWT", texture: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649848/jwt_hsq8jt.png" },
  { name: "Swagger API", texture: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649856/swagger_vywqsm.png" },
  { name: "Netlify", texture: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649851/netlify_wh2ryj.png" },
  { name: "Vercel", texture: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649857/vercel_qpks7f.png" },
  { name: "JSON", texture: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649848/json_brpqae.png" },
  { name: "CSS", texture: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649842/css_gwp7ey.png" },
  { name: "HTML", texture: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649845/html_b3c9pf.png" },
];
  

const projects = [
  {
    title: "vedCart",
    image: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649491/ved__landing_ah7rei.png",
    description: "An E-commerce platform built with EJS, Express.js and MongoDB.",
    Documentation: "https://fierce-beechnut-b24.notion.site/vedCart-An-Ayurvedic-Site-15dbbb0ca6bc807daa05e6c9a3e411b3?pvs=4",
    githubLink: "https://github.com/kishankumar07/vedcart.git",
  },
  {
    title: "Netflix Clone",
    image: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649490/netflix_clone__landing_hwiume.png",
    description: "A Netflix clone with React.js, TypeScript, and Firebase authentication.",
    Documentation: "https://fierce-beechnut-b24.notion.site/NetflixClone_1-7-15dbbb0ca6bc80cdafa7ef3d1fa1a9a7?pvs=4",
    githubLink: "https://github.com/kishankumar07/netflixClone1.7.git",
  },
  {
    title: "MERN Authentication",
    image: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649482/mern_auth_ukbjy1.png",
    description: "MERN Stack Application with User authentication and Admin panel",
    Documentation: "https://fierce-beechnut-b24.notion.site/MERN-Auth-ts-15dbbb0ca6bc8097b2d0dd52436b712c?pvs=4",
    githubLink: "https://github.com/kishankumar07/mern-authentication_ts.git",
  },
  {
    title: "Shopping cart backend",
    image: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649483/swagger_api_k9wcea.png",
    description: "RESTful Backend api's developed for an E-commerce application",
    Documentation: "https://fierce-beechnut-b24.notion.site/Shopping-Cart-Backend-15ebbb0ca6bc806aadbcc78c2782f95d?pvs=4",
    githubLink: "https://github.com/kishankumar07/shopping_cart_backend.git",
  },
  {
    title: "Financial management ",
    image: "https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649481/financial_management_bo0u0b.png",
    description: "Built on Microservices architecture for financial transactions",
    Documentation: "https://fierce-beechnut-b24.notion.site/Financial-Management-System-15ebbb0ca6bc80c28f9cf5f5bcd0e62b?pvs=4",
    githubLink: "https://github.com/kishankumar07/financial_management_mircoServices.git",
  },
];

const experiences = [
  {
    year: "Oct 2023 - Present",
    company: "Brototype",
    role: "Full Stack Developer",
    details: [
          "Develop and deploy full-stack MERN applications with efficient backend services.",
          "Create and maintain comprehensive API documentation for seamless integration.",
          "Implement best practices using MVC and microservices architectures for scalable development."
        ]
        
  },
  {
    year: "Oct 2023 - Dec 2021",
    company: "Reliance Industries Ltd.",
    role: "Telecom Engineer",
    details: [
          "Led the construction and deployment of fiber networks across multiple FSA regions.",
          "Coordinated cross-functional teams to ensure on-time project delivery and RFS conversion.",
          "Monitored safety and quality standards to maintain a secure and efficient work site."
        ]
        
  },
  {
    year: "Nov 2020 -Dec 2021",
    company: "Sharewealth Securities Ltd.",
    role: "IT Support Executive",
    details: [
          "Provided remote and onsite IT support, ensuring timely resolution of technical issues.",
          "Configured and troubleshot Microsoft Outlook for seamless email communication.",
          "Conducted demo sessions for new clients, guiding them on using share trading platforms efficiently."
        ]
        
  },
];

 const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];


export {
  themes, 
  experiences,
  projects,
  skills,
  NAV_LINKS,
  cameraSettings
}