import { Title } from "@tailus-ui/typography";
import Button from "@tailus-ui/Button";
import { IconPlus } from "../../../public/icons/icon-plus";
import DropdownMenu from "@tailus-ui/DropdownMenu";
import { IconMoreVertical } from "../../../public/icons/icon-more-vertical";
import { IconTrash } from "../../../public/icons/icon-trash";
import { AdminPostCard } from "./admin-post-card";
import { useEffect, useRef, useState } from "react";
import {
  requestCreatePost,
  requestDeleteAllPosts,
  requestDeletePost,
  requestGetPosts,
} from "../../service/api";
import Dialog from "@tailus-ui/Dialog";
import Label from "@tailus-ui/Label";
import Input from "@tailus-ui/Input";
import Textarea from "@tailus-ui/Textarea";
import AlertDialog from "@tailus-ui/AlertDialog";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

export function AdminSectionPosts() {
  const [posts, setPosts] = useState([]);

  const formRef = useRef(null);
  const closeCreateDialog = useRef(null);
  const closeDeleteAllDialog = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const getPosts = async () => {
    try {
      const data = await requestGetPosts();
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createPost = async (postRequest, token) => {
    try {
      let newPost = await requestCreatePost(postRequest, token);
      setPosts([...posts, newPost]);
      if (closeCreateDialog.current) {
        closeCreateDialog.current.dispatchEvent(
          new Event("click", { bubbles: true })
        );
      }
      setFormData({
        title: "",
        content: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (id) => {
    try {
      let result = await requestDeletePost(id, localStorage.getItem("token"));
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAllPosts = async () => {
    try {
      await requestDeleteAllPosts(localStorage.getItem("token"));
      setPosts([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    createPost(JSON.stringify(formData), token);
  };

  const handleCreateClick = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event("submit", { bubbles: true }));
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between">
        <Title as="h1" size="2xl" weight="bold">
          Список постов
        </Title>

        <div className="flex gap-2">
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
                <Button.Label>Создать</Button.Label>
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
                  Новый пост
                </Dialog.Title>

                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2.5">
                      <Label size="md" htmlFor="title">
                        Заголовок
                      </Label>
                      <Input
                        variant="soft"
                        className="bg-gray-800 transition-colors"
                        type="url"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label size="md" htmlFor="message">
                        Содержание
                      </Label>
                      <Textarea
                        variant="soft"
                        className="h-32 max-h-64 min-h-12 bg-gray-800 transition-colors"
                        placeholder="Используйте # для задания заголовков"
                        id="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </form>

                <Dialog.Actions className="-mx-[--card-padding] px-[--card-padding]">
                  <Dialog.Close asChild>
                    <Button.Root
                      variant="outlined"
                      intent="gray"
                      size="sm"
                      ref={closeCreateDialog}
                      onClick={() => {
                        setFormData({
                          title: "",
                          content: "",
                        });
                      }}
                      className="outline-transparent"
                    >
                      <Button.Label>Закрыть</Button.Label>
                    </Button.Root>
                  </Dialog.Close>
                  <Button.Root
                    variant="solid"
                    intent="primary"
                    size="sm"
                    type="submit"
                    onClick={handleCreateClick}
                    className="outline-transparent"
                  >
                    <Button.Label>Создать</Button.Label>
                  </Button.Root>
                </Dialog.Actions>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild className="outline-transparent">
              <Button.Root
                variant="soft"
                intent="gray"
                className="outline-transparent"
              >
                <Button.Icon size="sm" type="only">
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
                      <Button.Label className="text-sm">
                        Удалить все
                      </Button.Label>
                    </Button.Root>
                  </AlertDialog.Trigger>

                  <AlertDialog.Portal>
                    <AlertDialog.Overlay className="bg-gray-950/20" />
                    <AlertDialog.Content className="p-8 max-w-lg bg-gray-900 border border-gray-800">
                      <AlertDialog.Title className="text-2xl mb-4">
                        Удаление поста
                      </AlertDialog.Title>
                      <AlertDialog.Description className="mt-2">
                        Вы уверены, что хотите удалить все посты?
                      </AlertDialog.Description>

                      <AlertDialog.Actions>
                        <AlertDialog.Cancel asChild>
                          <DropdownMenuItem>
                            <Button.Root
                              variant="outlined"
                              intent="gray"
                              size="sm"
                              className="outline-transparent"
                              ref={closeDeleteAllDialog}
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
                                deleteAllPosts();
                                if (closeDeleteAllDialog.current) {
                                  closeDeleteAllDialog.current.dispatchEvent(
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
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6">
        {Array.from(posts).map((post, index) => (
          <AdminPostCard
            post={post}
            showSettings
            key={index}
            onDelete={() => deletePost(post.id)}
          />
        ))}
      </div>
    </section>
  );
}
