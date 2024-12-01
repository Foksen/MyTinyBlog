import { Title } from "@tailus-ui/typography";
import Button from "@tailus-ui/Button";
import { IconPlus } from "../../../public/icons/icon-plus";
import DropdownMenu from "@tailus-ui/DropdownMenu";
import { IconMoreVertical } from "../../../public/icons/icon-more-vertical";
import { IconTrash } from "../../../public/icons/icon-trash";
import { AdminPostCard } from "./admin-post-card";
import { useEffect, useRef, useState } from "react";
import { requestCreatePost, requestGetPosts } from "../../service/api";
import Dialog from "@tailus-ui/Dialog";
import Label from "@tailus-ui/Label";
import Input from "@tailus-ui/Input";
import Textarea from "@tailus-ui/Textarea";

export function AdminSectionPosts() {
  const [posts, setPosts] = useState([]);

  const formRef = useRef(null);
  const closeCreateDialog = useRef(null);

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
                        className="h-28 max-h-36 min-h-12 bg-gray-800 transition-colors"
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
                <DropdownMenu.Item
                  intent="danger"
                  className="cursor-pointer"
                  disabled
                >
                  <DropdownMenu.Icon>
                    <IconTrash strokeWidth="4" />
                  </DropdownMenu.Icon>
                  Удалить всё
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6">
        {Array.from(posts).map((post, index) => (
          <AdminPostCard
            title={post.title}
            content={post.content}
            showSettings
            id={post.id}
            key={index}
          />
        ))}
      </div>
    </section>
  );
}
