import { Text, Title } from "@tailus-ui/typography";
import Card from "@tailus-ui/Card";
import clsx from "clsx";
import DropdownMenu from "@tailus-ui/DropdownMenu";
import Button from "@tailus-ui/Button";
import { IconMoreVertical } from "../../../public/icons/icon-more-vertical";
import { IconTrash } from "../../../public/icons/icon-trash";
import { IconInfo } from "../../../public/icons/icon-info";
import { IconEdit } from "../../../public/icons/icon-edit";
import { IconExternalLink } from "../../../public/icons/icon-external-link";

export function DropDown({ id }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        asChild
        className="absolute top-2 right-2 outline-transparent"
      >
        <Button.Root variant="ghost" intent="gray">
          <Button.Icon type="only">
            <IconMoreVertical strokeWidth="4" />
          </Button.Icon>
        </Button.Root>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          mixed
          sideOffset={5}
          className="bg-gray-925 border-gray-800"
        >
          <DropdownMenu.Item
            className="cursor-pointer"
            onClick={() => {
              id
                ? window.open(`/posts/${id}`, "_blank").focus()
                : alert("PostCard id = null");
            }}
          >
            <DropdownMenu.Icon>
              <IconExternalLink strokeWidth="4" />
            </DropdownMenu.Icon>
            Открыть
          </DropdownMenu.Item>

          <DropdownMenu.Item className="cursor-pointer" disabled>
            <DropdownMenu.Icon>
              <IconEdit strokeWidth="4" />
            </DropdownMenu.Icon>
            Редактировать
          </DropdownMenu.Item>

          <DropdownMenu.Item className="cursor-pointer" disabled>
            <DropdownMenu.Icon>
              <IconInfo strokeWidth="4" />
            </DropdownMenu.Icon>
            Информация
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="bg-gray-700" />

          <DropdownMenu.Item
            intent="danger"
            className="cursor-pointer"
            disabled
          >
            <DropdownMenu.Icon>
              <IconTrash strokeWidth="4" />
            </DropdownMenu.Icon>
            Удалить
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export function AdminPostCard({ className, title, content, id }) {
  return (
    <Card
      variant="outlined"
      className={clsx("relative bg-gray-900 border-gray-800", className)}
    >
      <Title as="h4" className="line-clamp-2">
        {title}
      </Title>
      <Text className="my-0 mt-3 line-clamp-3">{content}</Text>
      <DropDown id={id} />
    </Card>
  );
}
