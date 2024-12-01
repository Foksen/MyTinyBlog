import { Footer } from "../src/components/footer";
import { Header } from "../src/components/header";
import { LayoutPost } from "../src/layout/layout-post";

export default function PostPage() {
  return (
    <div>
      <Header title="Записки Игорька" />
      <LayoutPost />
      <Footer />
    </div>
  );
}
