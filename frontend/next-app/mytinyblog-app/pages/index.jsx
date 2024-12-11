import { Footer } from "../src/components/footer";
import { Header } from "../src/components/header";
import { LayoutIndex } from "../src/layout/layout-index";

export default function HomePage() {
  return (
    <div>
      <Header title="MyTinyBlog" />
      <LayoutIndex />
      <Footer />
    </div>
  );
}
