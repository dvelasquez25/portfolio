# Personal Portfolio

A modern, responsive portfolio website built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com).

## Features

- 🚀 **Fast & Lightweight** - Built with Astro for optimal performance
- 📱 **Responsive Design** - Looks great on all devices
- 🎨 **Modern UI** - Clean, professional design with Tailwind CSS
- ✨ **Smooth Animations** - Professional GSAP animations and interactions
- ⚡ **SEO Optimized** - Built-in SEO features
- 🔧 **Easy to Customize** - Simple structure for easy modifications

## Sections

- **Hero Section** - Introduction and call-to-action with smooth entrance animations
- **About** - Personal story and experience with scroll-triggered animations
- **Skills** - Technical skills with animated progress bars and interactive cards
- **Projects** - Featured work with hover effects and staggered animations
- **Contact** - Multiple ways to get in touch with interactive elements
- **Footer** - Social links and additional information
- **Floating Action Button** - Smooth scroll-to-top functionality

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd portfolio-1
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open your browser and visit `http://localhost:4321`

## Customization

### Personal Information

Update the following files with your information:

1. **`src/pages/index.astro`** - Main content

   - Replace "Your Name" with your actual name
   - Update the hero section description
   - Modify the about section content
   - Update project details and links
   - Change contact information

2. **`src/layouts/Layout.astro`** - Page metadata
   - Update the default description
   - Modify the title format

### Styling

The portfolio uses Tailwind CSS for styling. You can:

- Modify colors by changing the blue-600 classes to your preferred color
- Update the gradient backgrounds in the project cards
- Adjust spacing and typography using Tailwind utility classes

### Adding Projects

To add new projects, duplicate the project card structure in the projects section:

```html
<div
  class="bg-gray-50 rounded-2xl overflow-hidden group hover:shadow-lg transition-shadow"
>
  <div
    class="h-48 bg-gradient-to-br from-[your-color] to-[your-color] flex items-center justify-center"
  >
    <span class="text-white text-4xl">[emoji]</span>
  </div>
  <div class="p-6">
    <h3 class="text-xl font-semibold text-gray-900 mb-2">Project Title</h3>
    <p class="text-gray-600 mb-4">Project description</p>
    <div class="flex flex-wrap gap-2 mb-4">
      <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
        >Technology</span
      >
    </div>
    <div class="flex space-x-4">
      <a href="#" class="text-blue-600 hover:text-blue-700 font-medium"
        >View Project</a
      >
      <a href="#" class="text-blue-600 hover:text-blue-700 font-medium"
        >Source Code</a
      >
    </div>
  </div>
</div>
```

### Skills Section

Update the skills section by modifying the progress bars and skill names in the skills cards.

## Deployment

### Build for Production

```bash
pnpm build
```

### Deploy to Cloudflare Pages (Recommended)

This project includes a GitHub Actions workflow for automatic deployment to Cloudflare Pages.

#### Setup Instructions:

1. **Create a Cloudflare Pages project:**

   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to Pages
   - Create a new project
   - Note down your project name

2. **Get your Cloudflare credentials:**

   - Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
   - Create a new token with "Cloudflare Pages" permissions
   - Note down your Account ID (found in the dashboard sidebar)

3. **Add GitHub Secrets:**

   - Go to your GitHub repository
   - Navigate to Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
     - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID
     - `CLOUDFLARE_PAGES_PROJECT_NAME`: Your Cloudflare Pages project name

4. **Deploy:**
   - Push to the `main` branch
   - The GitHub Action will automatically build and deploy your site

#### Manual Deployment with Wrangler:

```bash
# Install Wrangler globally
pnpm add -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages deploy dist
```

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `pnpm build`
4. Set publish directory: `dist`

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository to Vercel
3. Vercel will automatically detect Astro and configure the build

## Technologies Used

- [Astro](https://astro.build) - Static site generator
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [GSAP](https://greensock.com/gsap/) - Professional animation library
- [Inter Font](https://rsms.me/inter/) - Modern typeface

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have any questions or need help customizing your portfolio, feel free to open an issue or reach out!
