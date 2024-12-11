import Card from "@tailus-ui/Card";
import { Title } from "@tailus-ui/typography";
import Input from "@tailus-ui/Input";
import Label from "@tailus-ui/Label";
import Button from "@tailus-ui/Button";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { requestAuth, requestIsAuthorized } from "../service/api";

function SectionLogin() {
  const router = useRouter();

  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const authorize = async (authRequest) => {
    try {
      let token = await requestAuth(authRequest);
      localStorage.setItem("token", `Bearer ${token.token}`);
      router.push("/admin-panel");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authorize(JSON.stringify(formData));
  };

  const handleAuthClick = (e) => {
    e.preventDefault();
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event("submit", { bubbles: true }));
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <Card
        variant="outlined"
        className="max-w-md w-full mb-10 mx-8 p-8 bg-gray-900 border-gray-800"
      >
        <Title as="h4" size="2xl">
          Авторизация
        </Title>
        <form
          className="flex flex-col gap-3 mt-4 line-clamp-5"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-3">
            <Label htmlFor="username">Логин или почта</Label>
            <Input
              variant="soft"
              id="username"
              className="bg-gray-800"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="password">Пароль</Label>
            <Input
              variant="soft"
              type="password"
              id="password"
              className="bg-gray-800"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button.Root className="mt-4 ml-auto w-min" onClick={handleAuthClick}>
            <Button.Label>Войти</Button.Label>
          </Button.Root>
        </form>
      </Card>
    </section>
  );
}

export function LayoutLogin() {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const checkIsAuthorized = async (token) => {
    try {
      await requestIsAuthorized(token);
      router.push("/admin-panel");
    } catch (e) {
      console.error(e);
      localStorage.removeItem("token");
      setLoading(false);
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token != null) {
      checkIsAuthorized(token);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading == true) {
    return null;
  }

  return (
    <main className="min-h-screen w-full">
      <SectionLogin />
    </main>
  );
}
