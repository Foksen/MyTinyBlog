import { Footer } from "../src/components/footer";
import { Header } from "../src/components/header";
import { LayoutLogin } from "../src/layout/layout-login";

export default function LoginPage() {
  return (
    <div>
      <LayoutLogin />
      <Footer admin />
    </div>
  );
}
