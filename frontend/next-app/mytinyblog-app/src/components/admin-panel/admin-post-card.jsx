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
import AlertDialog from "@tailus-ui/AlertDialog";
import { useRef, useState } from "react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { parseMarkdownText } from "../../utils/parse-markdown";
import Dialog from "@tailus-ui/Dialog";
import Label from "@tailus-ui/Label";
import Input from "@tailus-ui/Input";
import Textarea from "@tailus-ui/Textarea";
import { requestUpdatePost } from "../../service/api";

export function DropDown({ post, onDelete, setPostShown }) {
  const closeDeleteDialog = useRef(null);

  const updateFormRef = useRef(null);

  const [updateFormData, setUpdateFormData] = useState({
    updateTitle: post.title ?? "",
    updateContent: post.content ?? "",
  });

  const handleUpdateFormChange = (e) => {
    const { id, value } = e.target;
    setUpdateFormData({
      ...updateFormData,
      [id]: value,
    });
  };

  const updatePost = async (id, post, token) => {
    try {
      await requestUpdatePost(id, post, token);
      setPostShown({
        title: updateFormData.updateTitle,
        content: updateFormData.updateContent,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    updatePost(
      post.id,
      JSON.stringify({
        ...post,
        title: updateFormData.updateTitle,
        content: updateFormData.updateContent,
      }),
      localStorage.getItem("token")
    );
  };

  const handleUpdateClick = () => {
    if (updateFormRef.current) {
      updateFormRef.current.dispatchEvent(
        new Event("submit", { bubbles: true })
      );
    }
  };

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
              post.id
                ? window.open(`/posts/${post.id}`, "_blank").focus()
                : alert("PostCard id = null");
            }}
          >
            <DropdownMenu.Icon>
              <IconExternalLink strokeWidth="4" />
            </DropdownMenu.Icon>
            Открыть
          </DropdownMenu.Item>

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button.Root
                variant="ghost"
                intent="gray"
                className="w-full h-8 gap-2 justify-start"
              >
                <Button.Icon type="leading" size="sm">
                  <IconEdit strokeWidth="4" />
                </Button.Icon>
                <Button.Label className="text-sm">Изменить</Button.Label>
              </Button.Root>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="z-40 bg-gray-950/20" />
              <Dialog.Content
                className="z-50 p-8 max-w-lg bg-gray-900 border border-gray-800"
                onPointerDownOutside={(e) => e.preventDefault()}
                fancy
              >
                <Dialog.Title className="text-2xl mb-4">
                  Изменить пост "{post.title}"
                </Dialog.Title>

                <form onSubmit={handleUpdateSubmit} ref={updateFormRef}>
                  <div className="space-y-4">
                    <div className="space-y-2.5">
                      <Label size="md" htmlFor="updateTitle">
                        Заголовок
                      </Label>
                      <Input
                        variant="soft"
                        className="bg-gray-800 transition-colors"
                        type="url"
                        id="updateTitle"
                        value={updateFormData.updateTitle}
                        onChange={handleUpdateFormChange}
                        required
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label size="md" htmlFor="updateContent">
                        Содержание
                      </Label>
                      <Textarea
                        variant="soft"
                        className="h-32 max-h-64 min-h-12 bg-gray-800 transition-colors"
                        placeholder="Используйте # для задания заголовков"
                        id="updateContent"
                        value={updateFormData.updateContent}
                        onChange={handleUpdateFormChange}
                        required
                      />
                    </div>
                  </div>
                </form>

                <Dialog.Actions className="-mx-[--card-padding] px-[--card-padding]">
                  <Dialog.Close asChild>
                    <DropdownMenuItem>
                      <Button.Root
                        variant="outlined"
                        intent="gray"
                        size="sm"
                        className="outline-transparent"
                        onClick={() =>
                          setUpdateFormData({
                            updateTitle: post.title ?? "",
                            updateContent: post.content ?? "",
                          })
                        }
                      >
                        <Button.Label>Закрыть</Button.Label>
                      </Button.Root>
                    </DropdownMenuItem>
                  </Dialog.Close>
                  <Dialog.Close asChild>
                    <DropdownMenuItem>
                      <Button.Root
                        variant="solid"
                        intent="primary"
                        size="sm"
                        type="submit"
                        className="outline-transparent"
                        onClick={handleUpdateClick}
                      >
                        <Button.Label>Изменить</Button.Label>
                      </Button.Root>
                    </DropdownMenuItem>
                  </Dialog.Close>
                </Dialog.Actions>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          {/*  */}
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button.Root
                variant="ghost"
                intent="gray"
                className="w-full h-8 gap-2 justify-start"
              >
                <Button.Icon type="leading" size="sm">
                  <IconInfo strokeWidth="4" />
                </Button.Icon>
                <Button.Label className="text-sm">Информация</Button.Label>
              </Button.Root>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="z-40 bg-gray-950/20" />
              <Dialog.Content
                className="z-50 p-8 max-w-md bg-gray-900 border border-gray-800"
                onPointerDownOutside={(e) => e.preventDefault()}
                fancy
              >
                <Dialog.Title className="text-2xl mb-4">
                  Информация о "{post.title}"
                </Dialog.Title>

                <div className="flex flex-col gap-4">
                  {Object.entries(post).map(([key, value]) => (
                    <div key={key} className="flex gap-5">
                      <Text className="m-0 flex-shrink-0">{key}</Text>
                      <div className="border-b border-gray-800 flex-grow"></div>
                      <Text className="m-0 text-white line-clamp-1">
                        {parseMarkdownText({
                          text:
                            key == "creationDate"
                              ? value.toString().substring(0, 10)
                              : value.toString().replace("\n", " ").length > 26
                              ? value
                                  .toString()
                                  .replace("\n", "")
                                  .substring(0, 26) + "..."
                              : value.toString().replace("\n", ""),
                          includeEmptyStrings: false,
                          applyStyling: false,
                        })}
                      </Text>
                    </div>
                  ))}
                </div>

                <Dialog.Actions className="-mx-[--card-padding] px-[--card-padding]">
                  <Dialog.Close asChild>
                    <DropdownMenuItem>
                      <Button.Root
                        variant="outlined"
                        intent="gray"
                        size="sm"
                        className="outline-transparent"
                      >
                        <Button.Label>Закрыть</Button.Label>
                      </Button.Root>
                    </DropdownMenuItem>
                  </Dialog.Close>
                </Dialog.Actions>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          {/*  */}

          <DropdownMenu.Separator className="bg-gray-700" />

          <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
              <Button.Root
                variant="ghost"
                intent="danger"
                className="w-full h-8 gap-2 justify-start"
              >
                <Button.Icon type="leading" size="sm">
                  <IconTrash strokeWidth="4" />
                </Button.Icon>
                <Button.Label className="text-sm">Удалить</Button.Label>
              </Button.Root>
            </AlertDialog.Trigger>

            <AlertDialog.Portal>
              <AlertDialog.Overlay className="bg-gray-950/20" />
              <AlertDialog.Content className="p-8 max-w-lg bg-gray-900 border border-gray-800">
                <AlertDialog.Title className="text-2xl mb-4">
                  Удаление поста
                </AlertDialog.Title>
                <AlertDialog.Description className="mt-2">
                  Вы уверены, что хотите удалить пост "{post.title}"?
                </AlertDialog.Description>

                <AlertDialog.Actions>
                  <AlertDialog.Cancel asChild>
                    <DropdownMenuItem>
                      <Button.Root
                        variant="outlined"
                        intent="gray"
                        size="sm"
                        className="outline-transparent"
                        ref={closeDeleteDialog}
                      >
                        <Button.Label>Закрыть</Button.Label>
                      </Button.Root>
                    </DropdownMenuItem>
                  </AlertDialog.Cancel>

                  <AlertDialog.Action asChild>
                    <DropdownMenuItem>
                      <Button.Root
                        variant="solid"
                        intent="danger"
                        size="sm"
                        className="outline-transparent"
                        onClick={() => {
                          onDelete();
                          if (closeDeleteDialog.current) {
                            closeDeleteDialog.current.dispatchEvent(
                              new Event("click", { bubbles: true })
                            );
                          }
                        }}
                      >
                        <Button.Label>Удалить</Button.Label>
                      </Button.Root>
                    </DropdownMenuItem>
                  </AlertDialog.Action>
                </AlertDialog.Actions>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog.Root>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export function AdminPostCard({ className, post, onDelete }) {
  const [postShown, setPostShown] = useState({
    title: post.title,
    content: post.content,
  });

  return (
    <Card
      variant="outlined"
      className={clsx("relative p-5 bg-gray-900 border-gray-800", className)}
    >
      <Title as="h4" className="line-clamp-2 mb-2">
        {postShown.title}
      </Title>
      {parseMarkdownText({
        className: "space-y-[2px] overflow-hidden line-clamp-3",
        text: postShown.content,
        includeEmptyStrings: false,
        applyStyling: false,
      })}
      <DropDown post={post} onDelete={onDelete} setPostShown={setPostShown} />
    </Card>
  );
}
