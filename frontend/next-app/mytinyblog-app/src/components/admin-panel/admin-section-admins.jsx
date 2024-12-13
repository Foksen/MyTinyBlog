import { Text, Title, Caption } from "@tailus-ui/typography";
import Button from "@tailus-ui/Button";
import { IconPlus } from "../../../public/icons/icon-plus";
import clsx from "clsx";
import Badge from "@tailus-ui/Badge";
import DropdownMenu from "@tailus-ui/DropdownMenu";
import { IconMoreVertical } from "../../../public/icons/icon-more-vertical";
import { IconTrash } from "../../../public/icons/icon-trash";
import {
  requestDeleteUser,
  requestGetUsers,
  requestRegister,
} from "../../service/api";
import { useEffect, useRef, useState } from "react";
import { ADMIN_PANEL_ADMIN_EMAIL_MAX_LEN } from "../../constants/admin-constants";
import Dialog from "@tailus-ui/Dialog";
import Label from "@tailus-ui/Label";
import Input from "@tailus-ui/Input";
import Select from "@tailus-ui/Select";

function AdminLevelBadge(adminLevel) {
  let name;

  switch (adminLevel) {
    case "ROOT":
      name = "Бог";
      break;
    case "ADMIN":
      name = "Администратор";
      break;
    case "MODERATOR":
      name = "Модератор";
      break;
    case "NOT_SPECIFIED":
      name = "Не указан";
      break;
  }

  let intent =
    (adminLevel == "ROOT" && "warning") ||
    (adminLevel == "ADMIN" && "info") ||
    (adminLevel == "MODERATOR" && "success") ||
    (adminLevel == "NOT_SPECIFIED" && "danger");

  return (
    <Badge size="sm" intent={intent}>
      {name}
    </Badge>
  );
}

function formatEmail(email) {
  if (email == null) {
    return "null";
  }
  const overflow = email.length > ADMIN_PANEL_ADMIN_EMAIL_MAX_LEN;
  if (!overflow) {
    return email;
  }
  return email.substring(0, ADMIN_PANEL_ADMIN_EMAIL_MAX_LEN) + "...";
}

function TableHeader({ columns }) {
  return (
    <thead>
      <tr className="bg-gray-925">
        {Array.from(columns).map((col, index) => (
          <td
            className={clsx(
              "px-4 border-white/5 py-3",
              index < columns.length - 2 && "border-r-2",
              col == "Id" && ""
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

function TableBody({ adminInfos, adminProps, deleteUserHandler }) {
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
                indexProp < adminProps.length - 1 && "border-r-2",
                prop == "id" && ""
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
                {(prop == "email" && formatEmail(adminInfo[prop])) ||
                  (prop == "role" && AdminLevelBadge(adminInfo[prop])) ||
                  adminInfo[prop]}
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
                    className="cursor-pointer px-0"
                  >
                    <Button.Root
                      variant="ghost"
                      intent="danger"
                      className="w-full h-8 gap-2 justify-start"
                      onClick={() => deleteUserHandler(adminInfo["id"])}
                    >
                      <Button.Icon type="leading" size="sm">
                        <IconTrash strokeWidth="4" />
                      </Button.Icon>
                      <Button.Label className="text-sm">Удалить</Button.Label>
                    </Button.Root>
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

export function AdminSectionAdmins() {
  const [admins, setAdmins] = useState([]);

  const getAdmins = async () => {
    try {
      const data = await requestGetUsers(localStorage.getItem("token"));
      setAdmins(data);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteAdmin = async (id) => {
    try {
      await requestDeleteUser(id, localStorage.getItem("token"));
      setAdmins(admins.filter((admin, _) => admin["id"] != id));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  // CREATE ADMIN

  const formRef = useRef(null);
  const closeCreateDialog = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    userRole: null,
    email: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const createUser = async (formData, token) => {
    try {
      await requestRegister(JSON.stringify(formData), token);
      const newAdmin = {
        id: admins[admins.length - 1].id + 1,
        username: formData.username,
        password: formData.password,
        role: formData.userRole,
        email: formData.email,
      };
      console.log(newAdmin);
      setAdmins([...admins, newAdmin]);
      console.log(admins);
      if (closeCreateDialog.current) {
        closeCreateDialog.current.dispatchEvent(
          new Event("click", { bubbles: true })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    createUser(formData, token);
  };

  const handleCreateClick = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event("submit", { bubbles: true }));
    }
  };

  // CREATE ADMIN

  return (
    <section>
      <div className="flex items-start justify-between">
        <Title as="h1" size="2xl" weight="bold">
          Администраторы
        </Title>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button.Root
              variant="outlined"
              intent="primary"
              className="outline-transparent"
            >
              <Button.Icon size="sm" type="leading">
                <IconPlus strokeWidth="4" />
              </Button.Icon>
              <Button.Label>Добавить</Button.Label>
            </Button.Root>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="z-40 bg-gray-950/20 " />
            <Dialog.Content
              className="z-50 p-8 max-w-md bg-gray-900 border border-gray-800 outline-none"
              onPointerDownOutside={(e) => e.preventDefault()}
              fancy
            >
              <Dialog.Title className="text-2xl mb-5">
                Добавить администратора
              </Dialog.Title>

              <form onSubmit={handleSubmit} ref={formRef}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label size="md" htmlFor="username">
                      Никнейм
                    </Label>
                    <Input
                      variant="soft"
                      className="bg-gray-800 transition-colors"
                      type="text"
                      id="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label size="md" htmlFor="password">
                      Пароль
                    </Label>
                    <Input
                      variant="soft"
                      className="bg-gray-800 transition-colors"
                      type="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label size="md" htmlFor="userRole">
                      Уровень
                    </Label>
                    <Select.Root
                      onValueChange={(value) => {
                        setFormData({
                          ...formData,
                          userRole: value,
                        });
                      }}
                    >
                      <Select.Trigger
                        size="md"
                        className="justify-between outline-transparent border-none !bg-gray-800"
                      >
                        <Select.Value />
                        <Select.Icon className="text-[8px]" />
                      </Select.Trigger>

                      <Select.Portal>
                        <Select.Content
                          mixed
                          className="z-50 border-none outline-transparent bg-gray-800"
                        >
                          <Select.Viewport>
                            <Select.Item
                              value="MODERATOR"
                              className="pl-2 items-center outline-transparent border-none"
                            >
                              <Select.ItemIndicator />
                              <Select.ItemText>Модератор</Select.ItemText>
                            </Select.Item>

                            <Select.Item
                              value="ADMIN"
                              className="pl-2 items-center outline-transparent border-none"
                            >
                              <Select.ItemIndicator />
                              <Select.ItemText>Администратор</Select.ItemText>
                            </Select.Item>

                            <Select.Item
                              value="ROOT"
                              className="pl-2 items-center outline-transparent border-none"
                            >
                              <Select.ItemIndicator />
                              <Select.ItemText>Бог</Select.ItemText>
                            </Select.Item>
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  </div>
                  <div className="space-y-2">
                    <Label size="md" htmlFor="email">
                      Почта
                    </Label>
                    <Input
                      variant="soft"
                      className="bg-gray-800 transition-colors"
                      type="text"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <Caption>Не обязательное</Caption>
                  </div>
                </div>
              </form>

              <Dialog.Actions className="-mx-[--card-padding] px-[--card-padding]">
                <Dialog.Close asChild>
                  <Button.Root
                    variant="outlined"
                    intent="gray"
                    size="sm"
                    className="outline-transparent"
                    onClick={() => {
                      setFormData({
                        username: "",
                        password: "",
                        userRole: null,
                        email: "",
                      });
                    }}
                    ref={closeCreateDialog}
                  >
                    <Button.Label>Закрыть</Button.Label>
                  </Button.Root>
                </Dialog.Close>
                <Button.Root
                  variant="solid"
                  intent="primary"
                  size="sm"
                  type="submit"
                  className="outline-transparent"
                  onClick={handleCreateClick}
                >
                  <Button.Label>Добавить</Button.Label>
                </Button.Root>
              </Dialog.Actions>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      <table className="mt-8 w-full max-w-3xl rounded-md overflow-hidden">
        <TableHeader columns={["Id", "Логин", "Почта", "Уровень", ""]} />
        <TableBody
          adminInfos={admins}
          adminProps={["id", "username", "email", "role"]}
          deleteUserHandler={deleteAdmin}
        />
      </table>
    </section>
  );
}
