# 🥚 Huev Next.js Boilerplate

Welcome to the most egg-cellent Next.js boilerplate you'll ever crack open! 🍳

## 🚀 Features

- 🎯 **TypeScript** - Because any is the enemy of good code
- ⚡ **Next.js 15** - The latest and greatest, now with Turbopack!
- 🎨 **Tailwind CSS + DaisyUI + shadcn/ui** - Make it pretty without crying
- 🔐 **Auth0** - Optional authentication that just works (like magic! ✨)
- 🍃 **MongoDB + Mongoose** - Store your data like a boss
- 📧 **Resend** - Email handling that doesn't suck
- 🎉 **Confetti** - Because who doesn't love confetti?
- 🔥 **Hot Toast** - Notifications that look as good as actual toast
- 🎭 **Framer Motion** - Make your UI move like butter
- 🎯 **API Error Handling** - Because errors should be helpful, not scary

## 🏃‍♂️ Quick Start

Clone the repo (replace 'my-app' with your project name)
npx create-next-app@latest my-app --use-npm --example https://github.com/yourusername/huev
Navigate to your new project
cd my-app
Install dependencies
npm install
Run the development server
npm run dev

## 🔧 Environment Variables

Create a `.env` file in your root directory:

env
Required
MONGODB*URI=your_mongodb_connection_string
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=development
Optional Auth0 Configuration
AUTH0_SECRET=use_openssl_rand*-hex_32_to_generate
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your-tenant.region.auth0.com
AUTH0_CLIENT_ID=your_client_id
AUTH0_CLIENT_SECRET=your_client_secret

## 🏗️ Project Structure

src/
├── app/ # App router pages and API routes
├── components/ # React components
│ ├── providers/ # Context providers
│ └── ui/ # UI components
├── lib/ # Utility functions and configurations
│ ├── api/ # API utilities
│ ├── config/ # Configuration files
│ └── errors/ # Error handling
├── hooks/ # Custom React hooks
└── types/ # TypeScript type definitions

## 🎨 Styling

We use a triple threat of styling solutions:

- 🎨 **Tailwind CSS** - Utility-first CSS
- 🌸 **DaisyUI** - Beautiful component library
- 🎯 **shadcn/ui** - High-quality React components

### Theme Colors

typescript
primary: "#F4BD41" // The yolk of our egg 🍳
secondary: "#3B82F6" // The sky's the limit 🌌
accent: "#F97316" // For that extra pop! 💥

## 🔒 Authentication

Auth0 is optional but ready to go! To enable it:

1. Create an Auth0 application
2. Uncomment Auth0 variables in `.env`
3. Fill in your Auth0 credentials
4. Start authenticating like a pro! 🔐

typescript
// Using auth in components
import { useAuth } from '@/hooks/useAuth';
export function MyComponent() {
const { user, login, logout, isConfigured } = useAuth();
return isConfigured ? (
<button onClick={login}>Login</button>
) : (

<p>Auth not configured</p>
);
}

## 🚨 Error Handling

We've got your back with a robust error handling system:

typescript
try {
// Your code here
} catch (error) {
if (error instanceof ApiError) {
return errorResponse(error);
}
return errorResponse(
ApiError.internal("Oops! Something went wrong", {
detail: error instanceof Error ? error.message : String(error)
})
);
}

## 🎉 Fun Features

- 🎊 **Confetti** - `useConfetti` hook for celebration moments
- 🍞 **Toast** - Beautiful notifications that pop
- 🎭 **Animations** - Smooth transitions with Framer Motion
- 🎨 **Icons** - Huge collection from react-icons and lucide-react

## 📦 What's Next?

1. Replace this README with your project's info
2. Update the theme colors in `tailwind.config.ts`
3. Configure your MongoDB connection
4. Set up Auth0 (optional)
5. Start building something awesome! 🚀

## 🤝 Contributing

Found a bug? Want to add a feature? Contributions are welcome! Just:

1. Fork it
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a PR

## 📝 License

MIT - Go wild! 🎉

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for the infrastructure
- You for choosing this boilerplate!

---

Made with 🥚 by the huev team

Remember: The only limit is your imagination! (and maybe your CPU) 🚀
This README:
Is friendly and approachable
Uses emojis to make sections easily scannable
Provides clear instructions
Includes code examples
Has a touch of humor
Covers all major features
Provides a clear project structure
Includes contribution guidelines
Uses proper markdown formatting
Feel free to adjust the tone or add more sections as needed! 🎉
