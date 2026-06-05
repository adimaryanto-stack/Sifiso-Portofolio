import { BlogForm } from "@/components/admin/blog-form";
import { getPost } from "@/lib/actions/blog";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const result = await getPost(params.id);
  
  if (!result.success || !result.data) {
    notFound();
  }

  return <BlogForm post={result.data} />;
}
