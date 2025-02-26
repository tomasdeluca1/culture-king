"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const DocSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <motion.div
    variants={fadeIn}
    className="mb-12 p-6 bg-base-100 rounded-xl shadow-lg border border-base-content/5"
  >
    <h2 className="text-2xl font-bold mb-4 text-base-content">{title}</h2>
    {children}
  </motion.div>
);

const CodeBlock = ({ children }: { children: string }) => (
  <pre className="bg-base-300 p-4 rounded-lg overflow-x-auto">
    <code className="text-sm text-base-content">{children}</code>
  </pre>
);

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            variants={fadeIn}
            className="text-4xl font-bold mb-8 text-center"
          >
            Documentation
          </motion.h1>

          <DocSection title="Installation">
            <p className="mb-4">
              Get started with Huev Next.js Boilerplate by running the following
              commands:
            </p>
            <CodeBlock>{`npx create-next-app@latest my-app --use-npm --example https://github.com/yourusername/huev
cd my-app
npm install
npm run dev`}</CodeBlock>
          </DocSection>

          <DocSection title="Environment Setup">
            <p className="mb-4">
              Create a <code>.env</code> file in your project root and add the
              following variables:
            </p>
            <CodeBlock>{`# Required
MONGODB_URI=your_mongodb_connection_string
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=development

# Optional Auth0
# AUTH0_SECRET=your_secret
# AUTH0_BASE_URL=http://localhost:3000
# AUTH0_ISSUER_BASE_URL=your_auth0_domain
# AUTH0_CLIENT_ID=your_client_id
# AUTH0_CLIENT_SECRET=your_client_secret`}</CodeBlock>
          </DocSection>

          <DocSection title="Authentication">
            <p className="mb-4">
              Auth0 integration is optional. To use it, uncomment the Auth0
              variables in your <code>.env</code> file and use the{" "}
              <code>useAuth</code> hook:
            </p>
            <CodeBlock>{`import { useAuth } from '@/hooks/useAuth';

export function AuthExample() {
  const { user, login, logout, isConfigured } = useAuth();
  
  if (!isConfigured) return null;
  
  return user ? (
    <button onClick={logout}>Logout</button>
  ) : (
    <button onClick={login}>Login</button>
  );
}`}</CodeBlock>
          </DocSection>

          <DocSection title="API Error Handling">
            <p className="mb-4">
              Use the built-in error handling system in your API routes:
            </p>
            <CodeBlock>{`import { ApiError } from '@/lib/errors/ApiError';
import { errorResponse, successResponse } from '@/lib/api/responseHandler';

export async function GET() {
  try {
    // Your code here
    return successResponse({ data: 'Success!' });
  } catch (error) {
    if (error instanceof ApiError) {
      return errorResponse(error);
    }
    return errorResponse(
      ApiError.internal('Something went wrong')
    );
  }
}`}</CodeBlock>
          </DocSection>

          <DocSection title="Styling">
            <p className="mb-4">
              The boilerplate includes three styling solutions:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Tailwind CSS for utility-first styling</li>
              <li>DaisyUI for beautiful components</li>
              <li>shadcn/ui for high-quality React components</li>
            </ul>
            <p className="mb-4">Example using all three:</p>
            <CodeBlock>{`<div className="p-4 bg-base-100">
  <button className="btn btn-primary">DaisyUI Button</button>
  <Button className="bg-primary text-white">shadcn/ui Button</Button>
  <div className="text-primary hover:text-primary-focus">
    Tailwind Styled Text
  </div>
</div>`}</CodeBlock>
          </DocSection>

          <div className="text-center mt-12">
            <Link
              href="/get-started"
              className="btn btn-primary btn-lg rounded-full"
            >
              Get Started Now
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
