import { Text, Title } from "@tailus-ui/typography";
import Button from "@tailus-ui/Button";
import { IconPlus } from "../../../public/icons/icon-plus";
import clsx from "clsx";
import Badge from "@tailus-ui/Badge";
import DropdownMenu from "@tailus-ui/DropdownMenu";
import { IconMoreVertical } from "../../../public/icons/icon-more-vertical";
import { IconTrash } from "../../../public/icons/icon-trash";

function AdminLevelBadge(adminLevel) {
  let name;

  switch (adminLevel) {
    case "root":
      name = "Бог";
      break;
    case "admin":
      name = "Администратор";
      break;
    default:
      name = "unknown";
  }

  let intent =
    (adminLevel == "root" && "danger") || (adminLevel == "admin" && "info");

  return (
    <Badge size="sm" intent={intent}>
      {name}
    </Badge>
  );
}

function TableHeader({ columns }) {
  return (
    <thead>
      <tr className="bg-gray-925">
        {Array.from(columns).map((col, index) => (
          <td
            className={clsx(
              "px-4 border-white/5 py-3",
              index < columns.length - 2 && "border-r-2"
            )}
            key={index}
          >
            <Text
              className="my-0 text-gray-500"
              size="sm"
              weight="bold"
              align={col == "Id" ? "center" : null}
            >
              {col}
            </Text>
          </td>
        ))}
      </tr>
    </thead>
  );
}

function TableBody({ adminInfos, adminProps }) {
  return (
    <tbody>
      {Array.from(adminInfos).map((adminInfo, indexRow) => (
        <tr
          className={indexRow % 2 == 0 ? "bg-gray-800" : "bg-gray-900"}
          key={indexRow}
        >
          {Array.from(adminProps).map((prop, indexProp) => (
            <td
              className={clsx(
                "px-4 border-white/5 py-3",
                indexProp < adminProps.length - 1 && "border-r-2"
              )}
              key={indexProp}
            >
              <Text
                className={clsx(
                  "my-0 text-gray-300",
                  prop == "username" && "text-white"
                )}
                weight={prop == "username" ? "medium" : null}
                align={prop == "id" ? "center" : null}
              >
                {prop == "level"
                  ? AdminLevelBadge(adminInfo[prop])
                  : adminInfo[prop]}
              </Text>
            </td>
          ))}

          <td className="py-2 w-9 px-4">
            <DropdownMenu.Root className="ml-auto">
              <DropdownMenu.Trigger asChild className="outline-transparent">
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
          </td>
        </tr>
      ))}
    </tbody>
  );
}

const ADMIN_INFOS = [
  {
    id: 0,
    username: "Foksen",
    email: "izholobov2004@gmail.com",
    password: "password",
    level: "root",
  },
  {
    id: 1,
    username: "Aleksei",
    email: "lehaAmaCRM@yandex.ru",
    password: "password",
    level: "admin",
  },
];

export function AdminSectionAdmins() {
  return (
    <section>
      <div className="flex items-center justify-between">
        <Title as="h1" size="2xl" weight="bold">
          Администраторы
        </Title>

        <div className="flex gap-2">
          <Button.Root
            variant="outlined"
            intent="primary"
            className="outline-transparent"
            disabled
          >
            <Button.Icon size="sm" type="leading">
              <IconPlus strokeWidth="4" />
            </Button.Icon>
            <Button.Label>Зарегистрировать</Button.Label>
          </Button.Root>
        </div>
      </div>

      <table className="mt-8 w-full max-w-6xl rounded-md overflow-hidden">
        <TableHeader
          columns={["Id", "Логин", "Почта", "Пароль", "Уровень", ""]}
        />
        <TableBody
          adminInfos={ADMIN_INFOS}
          adminProps={["id", "username", "email", "password", "level"]}
        />
      </table>
    </section>
  );
}
