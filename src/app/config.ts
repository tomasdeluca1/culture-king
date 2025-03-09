export const runtime = "nodejs"; // This ensures the app runs on Node.js runtime instead of Edge

// Add configuration for memory and timeout if needed
export const generateStaticParams = async () => {
  return [];
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const dynamicParams = true;
