import { Footer } from "../../src/components/footer";
import { Header } from "../../src/components/header";
import { LayoutPost } from "../../src/layout/layout-post";
import { requestGetPost } from "../../src/service/api";

export async function getServerSideProps(context) {
  try {
    const { id } = context.params;
    const post = await requestGetPost(id);
    return {
      props: {
        post,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default function PostPage({ post }) {
  return (
    <div>
      <Header title={`Мой маленький блог | ${post.title}`} />
      <LayoutPost post={post} />
      <Footer />
    </div>
  );
}
