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
   { name: "JavaScript", texture: "/skillIcons/javascript.png" },
   { name: "TypeScript", texture: "/skillIcons/typescript.png" },
  { name: "MongoDB", texture: "/skillIcons/mongodb.png" },
  { name: "React.js", texture: "/skillIcons/reactjs.png" },
  { name: "Express.js", texture: "/skillIcons/express-js.png" },
  { name: "Node.js", texture: "/skillIcons/nodejs.png" },
  { name: "Redux Toolkit", texture: "/skillIcons/redux.png" },
  { name: "REST API", texture: "/skillIcons/restapi.png" },
  { name: "PostgreSQL", texture: "/skillIcons/psql.png" },
  { name: "Git", texture: "/skillIcons/git.png" },
  { name: "Microservices", texture: "/skillIcons/microservices.png" },
  { name: "Docker", texture: "/skillIcons/docker.png" },
  { name: "Postman", texture: "/skillIcons/postman.png" },
  { name: "Firebase", texture: "/skillIcons/firebase.png" },
  { name: "JWT", texture: "/skillIcons/jwt.png" },
  { name: "Swagger API", texture: "/skillIcons/swagger.png" },
  { name: "Netlify", texture: "/skillIcons/netlify.png" },
  { name: "Vercel", texture: "/skillIcons/vercel.png" },
  { name: "JSON", texture: "/skillIcons/json.png" },
  { name: "CSS", texture: "/skillIcons/css.png" },
  { name: "HTML", texture: "/skillIcons/html.png" },
];
  

const projects = [
  {
    title: "vedCart",
    image: "/projectsImages/ved__landing.png",
    description: "An E-commerce platform built with EJS, Express.js and MongoDB.",
    Documentation: "https://fierce-beechnut-b24.notion.site/vedCart-An-Ayurvedic-Site-15dbbb0ca6bc807daa05e6c9a3e411b3?pvs=4",
    githubLink: "https://github.com/kishankumar07/vedcart.git",
  },
  {
    title: "Netflix Clone",
    image: "/projectsImages/netflix_clone__landing.png",
    description: "A Netflix clone with React.js, TypeScript, and Firebase authentication.",
    Documentation: "https://fierce-beechnut-b24.notion.site/NetflixClone_1-7-15dbbb0ca6bc80cdafa7ef3d1fa1a9a7?pvs=4",
    githubLink: "https://github.com/kishankumar07/netflixClone1.7.git",
  },
  {
    title: "MERN Authentication",
    image: "/projectsImages/mern_auth.png",
    description: "MERN Stack Application with User authentication and Admin panel",
    Documentation: "https://fierce-beechnut-b24.notion.site/MERN-Auth-ts-15dbbb0ca6bc8097b2d0dd52436b712c?pvs=4",
    githubLink: "https://github.com/kishankumar07/mern-authentication_ts.git",
  },
  {
    title: "Shopping cart backend",
    image: "/projectsImages/swagger_api.png",
    description: "RESTful Backend api's developed for an E-commerce application",
    Documentation: "https://fierce-beechnut-b24.notion.site/Shopping-Cart-Backend-15ebbb0ca6bc806aadbcc78c2782f95d?pvs=4",
    githubLink: "https://github.com/kishankumar07/shopping_cart_backend.git",
  },
  {
    title: "Financial management ",
    image: "/projectsImages/financial_management.png",
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