import { useEffect, useRef, useState } from "react";
import { Text, Title } from "@tailus-ui/typography";
import clsx from "clsx";
import { ADMIN_PANEL_SUBSCRIBER_EMAIL_MAX_LEN } from "../../constants/admin-constants";
import {
  requestDeleteSubscription,
  requestGetSubscriptions,
} from "../../service/api";
import DropdownMenu from "@tailus-ui/DropdownMenu";
import Button from "@tailus-ui/Button";
import { IconMoreVertical } from "../../../public/icons/icon-more-vertical";
import { IconTrash } from "../../../public/icons/icon-trash";

function formatEmail(email) {
  if (email == null) {
    return "null";
  }
  const overflow = email.length > ADMIN_PANEL_SUBSCRIBER_EMAIL_MAX_LEN;
  if (!overflow) {
    return email;
  }
  return email.substring(0, ADMIN_PANEL_SUBSCRIBER_EMAIL_MAX_LEN) + "...";
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

function TableBody({
  subscribersInfo,
  subscriberProps,
  deleteSubscriberHandler,
}) {
  return (
    <tbody>
      {Array.from(subscribersInfo).map((subscriberInfo, indexRow) => (
        <tr
          className={indexRow % 2 == 0 ? "bg-gray-800" : "bg-gray-900"}
          key={indexRow}
        >
          {Array.from(subscriberProps).map((prop, indexProp) => (
            <td
              className={clsx(
                "px-4 border-white/5 py-3",
                indexProp < subscriberProps.length - 1 && "border-r-2",
                prop == "id" && ""
              )}
              key={indexProp}
            >
              <Text
                className={clsx(
                  "my-0 text-gray-300",
                  prop == "email" && "text-white"
                )}
                align={prop == "id" ? "center" : null}
              >
                {(prop == "email" && formatEmail(subscriberInfo[prop])) ||
                  (prop == "creationDate" &&
                    subscriberInfo[prop]?.substring(0, 10)) ||
                  subscriberInfo[prop]}
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
                      onClick={() =>
                        deleteSubscriberHandler(subscriberInfo["id"])
                      }
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

export function AdminSectionSubscribers() {
  const [subscribers, setSubscribers] = useState([]);

  const getSubscribers = async () => {
    try {
      const data = await requestGetSubscriptions(localStorage.getItem("token"));
      setSubscribers(data);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteSubscriberHandler = async (id) => {
    try {
      await requestDeleteSubscription(id, localStorage.getItem("token"));
      setSubscribers(
        subscribers.filter((subscriber, _) => subscriber["id"] != id)
      );
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getSubscribers();
  }, []);

  console.log(subscribers);

  return (
    <section>
      <div className="flex items-start justify-between">
        <Title as="h1" size="2xl" weight="bold">
          Рассылка
        </Title>
      </div>

      <table className="mt-8 w-full max-w-xl rounded-md overflow-hidden">
        <TableHeader columns={["Id", "Почта", "Дата привязки", ""]} />
        <TableBody
          subscribersInfo={subscribers}
          subscriberProps={["id", "email", "creationDate"]}
          deleteSubscriberHandler={deleteSubscriberHandler}
        />
      </table>
    </section>
  );
}
