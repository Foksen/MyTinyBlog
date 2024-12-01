import { Text } from "@tailus-ui/typography";
import Button from "@tailus-ui/Button";
import { IconTelegram } from "../../public/icons/icon-telegram";
import { IconGithub } from "../../public/icons/icon-github";
import Image from "next/image";

export function Footer({ admin = false }) {
  return (
    <footer className="grid grid-cols-3 items-center px-8 py-6 border-t border-gray-900">
      <Text className="m-0 justify-self-start text-gray-600">
        @{new Date().getFullYear()}
      </Text>

      {admin ? (
        <Image
          src="logo/mtb-admin.svg"
          width="87"
          height="58"
          className="justify-self-center h-10 w-auto "
          alt="mtb-logo"
        />
      ) : (
        <Image
          src="logo/mtb.svg"
          width="84"
          height="31"
          className="mb-1 justify-self-center h-6 w-auto "
          alt="mtb-admin-logo"
        />
      )}

      <div className="flex justify-self-end gap-4">
        <Button.Root
          variant="outlined"
          intent="primary"
          size="lg"
          href="https://t.me/savage_foksen"
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
        >
          <Button.Icon size="xl" type="only">
            <IconGithub className="text-secondary-500" />
          </Button.Icon>
        </Button.Root>
      </div>
    </footer>
  );
}
