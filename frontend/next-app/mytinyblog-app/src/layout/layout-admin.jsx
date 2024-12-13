import { Text } from "@tailus-ui/typography";
import Image from "next/image";
import Button from "@tailus-ui/Button";
import { IconArchieve } from "../../public/icons/icon-archieve";
import { IconGithub } from "../../public/icons/icon-github";
import { IconTelegram } from "../../public/icons/icon-telegram";
import { IconLayers } from "../../public/icons/icon-layers";
import { IconLogOut } from "../../public/icons/icon-logout";
import { IconUser } from "../../public/icons/icon-user";
import Separator from "@tailus-ui/Separator";
import clsx from "clsx";
import { AdminSectionSelector } from "../components/admin-panel/admin-section-selector";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { requestIsAuthorized } from "../service/api";
import { IconEmail } from "../../public/icons/icon-email";
import { IconSettings } from "../../public/icons/icon-settings";

function AsidePanelLink({
  className,
  title,
  isActive,
  icon,
  disabled,
  intent,
  handleSectionChange,
}) {
  return (
    <li onClick={handleSectionChange}>
      <Button.Root
        variant={isActive ? "soft" : "ghost"}
        className={clsx(
          "w-full justify-start gap-2 outline-transparent",
          className
        )}
        intent={intent ?? "gray"}
        disabled={disabled ? true : null}
      >
        {icon ? (
          <Button.Icon
            size="sm"
            type="leading"
            className={isActive ? "text-white" : null}
          >
            {icon}
          </Button.Icon>
        ) : null}
        <Button.Label className={isActive ? "text-white" : null}>
          {title}
        </Button.Label>
      </Button.Root>
    </li>
  );
}

function AsidePanel({ handleSectionChange, currentSection, router }) {
  return (
    <aside className="fixed min-h-screen border-r bg-gray-950 border-gray-800">
      <div className="relative min-h-screen px-5 py-6 w-60">
        <Image
          src="logo/mtb-admin.svg"
          width="87"
          height="58"
          className="ml-3 h-8 w-auto"
          alt="mtb-admin-logo"
        />
        <ul className="flex flex-col gap-1 mt-6">
          <AsidePanelLink
            title="Список постов"
            icon={<IconArchieve strokeWidth="4" />}
            isActive={currentSection == "posts"}
            handleSectionChange={() => handleSectionChange("posts")}
          />

          <AsidePanelLink
            title="Настройки блога"
            icon={<IconSettings strokeWidth="4" />}
            isActive={currentSection == "settings"}
            handleSectionChange={() => handleSectionChange("settings")}
          />

          <AsidePanelLink
            title="Администраторы"
            icon={<IconUser strokeWidth="4" />}
            isActive={currentSection == "admins"}
            handleSectionChange={() => handleSectionChange("admins")}
          />

          <AsidePanelLink
            title="Рассылка"
            icon={<IconEmail strokeWidth="4" />}
            isActive={currentSection == "subscribers"}
            handleSectionChange={() => handleSectionChange("subscribers")}
            disabled
          />

          <AsidePanelLink
            title="Мониторинг"
            icon={<IconLayers strokeWidth="4" />}
            isActive={currentSection == "monitoring"}
            handleSectionChange={() => handleSectionChange("monitoring")}
            disabled
          />

          <Separator className="my-2 text-gray-800" fancy />

          <AsidePanelLink
            title="Выйти из админки"
            icon={<IconLogOut strokeWidth="4" />}
            intent="danger"
            handleSectionChange={() => {
              localStorage.removeItem("token");
              router.push("/login");
            }}
          />
        </ul>

        <Text className="absolute left-5 bottom-9 m-0 justify-self-start text-gray-600">
          @{new Date().getFullYear()}
        </Text>

        <div className="absolute right-5 bottom-6 flex justify-self-end gap-4">
          <Button.Root
            variant="outlined"
            intent="primary"
            size="lg"
            href="https://t.me/savage_foksen"
            className="outline-transparent"
          >
            <Button.Icon size="xl" type="only">
              <IconTelegram strokeWidth={4} className="text-primary-500" />
            </Button.Icon>
          </Button.Root>

          <Button.Root
            variant="outlined"
            intent="secondary"
            size="lg"
            href="https://github.com/Foksen"
            className="outline-transparent"
          >
            <Button.Icon size="xl" type="only">
              <IconGithub className="text-secondary-500" />
            </Button.Icon>
          </Button.Root>
        </div>
      </div>
    </aside>
  );
}

export function LayoutAdmin() {
  const [loading, setLoading] = useState(true);

  const [currentSection, setCurrentSection] = useState("admins");

  const router = useRouter();

  const checkIsAuthorized = async (token) => {
    try {
      await requestIsAuthorized(token);
      setLoading(false);
    } catch (e) {
      console.error(e);
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    checkIsAuthorized(token);
  }, []);

  if (loading) {
    return null;
  }

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  return (
    <div>
      <AsidePanel
        handleSectionChange={handleSectionChange}
        currentSection={currentSection}
        router={router}
      />
      <main className="ml-60 px-14 py-12">
        <AdminSectionSelector sectionName={currentSection} />
      </main>
    </div>
  );
}
