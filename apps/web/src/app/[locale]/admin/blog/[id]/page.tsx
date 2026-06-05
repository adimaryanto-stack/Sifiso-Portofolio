import { BlogForm } from "@/components/admin/blog-form";
import { getPost } from "@/lib/actions/blog";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditBlogPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const result = await getPost(id);
  
  if (!result.success || !result.data) {
    notFound();
  }

  return <BlogForm post={result.data} />;
}
