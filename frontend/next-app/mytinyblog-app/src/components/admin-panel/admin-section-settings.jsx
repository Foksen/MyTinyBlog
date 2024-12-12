import { Text, Title, Caption } from "@tailus-ui/typography";
import Card from "@tailus-ui/Card";
import clsx from "clsx";
import Label from "@tailus-ui/Label";
import Input from "@tailus-ui/Input";
import Textarea from "@tailus-ui/Textarea";
import Button from "@tailus-ui/Button";
import { IconSave } from "../../../public/icons/icon-save";
import { IconRefresh } from "../../../public/icons/icon-refresh";
import RadioGroup from "@tailus-ui/RadioGroup";
import Aligner from "@tailus-ui/Aligner";
import Image from "next/image";
import Switch from "@tailus-ui/Switch";

const RadioCard = ({ value, children }) => (
  <Label
    htmlFor={value}
    size="sm"
    className="h-20 cursor-pointer block border p-0 overflow-hidden rounded-[--card-radius] bg-[--ui-bg] card-shadow has-[[data-state='checked']]:ring-2 -ring-offset-px ring-primary-600 dark:has-[[data-state='checked']]:bg-[--ui-soft-bg] border-none"
  >
    {children}
    <RadioGroup.Item value={value} id={value} className="hidden">
      <RadioGroup.Indicator />
    </RadioGroup.Item>
  </Label>
);

export function AdminSectionSettings() {
  return (
    <section>
      <div className="flex items-center justify-between">
        <Title as="h1" size="2xl" weight="bold">
          Настройки блога
        </Title>
      </div>
      <Card variant="soft" className="mt-8 bg-gray-925 border border-gray-800">
        <Title>Информация о блоге</Title>
        <form className="mt-6">
          <div className="grid xl:grid-cols-2 gap-x-20 gap-y-8">
            <div className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="name">Название блога</Label>
                <Input
                  id="name"
                  className="outline-transparent border-gray-800"
                  value="Мой маленький блог"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="name">Описание блога</Label>
                <Textarea
                  className="h-32 max-h-64 min-h-12 outline-transparent border-gray-800"
                  placeholder="Используйте # для задания заголовков"
                  id="updateContent"
                  value="Тут будет описание"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="name">Разное</Label>
              <Aligner fromRight>
                <Label htmlFor="airplane-mode">Показывать статистику</Label>
                <Switch.Root
                  className="mt-1 outline-transparent"
                  id="airplane-mode"
                >
                  <Switch.Thumb />
                </Switch.Root>
                <Caption as="p" size="base" className="mr-6">
                  Добавить кнопку для просмотра статистики (просмотры, лайки) на
                  основной странице. Будет видна всем
                </Caption>
              </Aligner>
            </div>

            <div className="space-y-3">
              <Label htmlFor="name">Тема</Label>
              <RadioGroup.Root
                aria-label="User feedback"
                defaultValue="themeDark"
                className="space-y-4"
                fancy
              >
                <Aligner>
                  <RadioGroup.Item value="themeTrust" id="themeTrust">
                    <RadioGroup.Indicator className="outline-transparent" />
                  </RadioGroup.Item>
                  <Label htmlFor="themeTrust">Trust</Label>
                  <Caption className="col-start-2">Description</Caption>
                </Aligner>
                <Aligner>
                  <RadioGroup.Item value="themeOz" id="themeOz">
                    <RadioGroup.Indicator />
                  </RadioGroup.Item>
                  <Label htmlFor="themeOz">Oz</Label>
                  <Caption className="col-start-2">Description</Caption>
                </Aligner>
                <Aligner>
                  <RadioGroup.Item value="themeMystery" id="themeMystery">
                    <RadioGroup.Indicator />
                  </RadioGroup.Item>
                  <Label htmlFor="themeMystery">Mystery</Label>
                  <Caption className="col-start-2">Description</Caption>
                </Aligner>
                <Aligner>
                  <RadioGroup.Item value="themePassion" id="themePassion">
                    <RadioGroup.Indicator />
                  </RadioGroup.Item>
                  <Label htmlFor="themePassion">Passion</Label>
                  <Caption className="col-start-2">Description</Caption>
                </Aligner>
              </RadioGroup.Root>
            </div>

            <div className="space-y-3">
              <Label htmlFor="name">Аватар</Label>
              <RadioGroup.Root
                className="flex gap-6 flex-wrap  border-transparent outline-transparent"
                defaultValue="image1"
              >
                <RadioCard
                  value="image1"
                  className="w-auto border-transparent outline-transparent"
                >
                  <Image
                    src="/images/1.jpg"
                    width="100"
                    height="100"
                    className="w-full h-full"
                  />
                </RadioCard>

                <RadioCard
                  value="image2"
                  className="w-auto border-transparent outline-transparent"
                >
                  <Image
                    src="/images/2.jpg"
                    width="100"
                    height="100"
                    className="w-full h-full"
                  />
                </RadioCard>

                <RadioCard
                  value="image3"
                  className="w-auto border-transparent outline-transparent"
                >
                  <Image
                    src="/images/3.jpg"
                    width="100"
                    height="100"
                    className="w-full h-full"
                  />
                </RadioCard>

                <RadioCard
                  value="image4"
                  className="w-auto border-transparent outline-transparent"
                >
                  <Image
                    src="/images/4.jpg"
                    width="100"
                    height="100"
                    className="w-full h-full"
                  />
                </RadioCard>

                <RadioCard
                  value="image5"
                  className="w-auto border-transparent outline-transparent"
                >
                  <Image
                    src="/images/5.jpg"
                    width="100"
                    height="100"
                    className="w-full h-full"
                  />
                </RadioCard>

                <RadioCard
                  value="image6"
                  className="w-auto border-transparent outline-transparent"
                >
                  <Image
                    src="/images/6.jpg"
                    width="100"
                    height="100"
                    className="w-full h-full"
                  />
                </RadioCard>
              </RadioGroup.Root>
            </div>
          </div>

          <div className="mt-8 flex gap-4 justify-end">
            <Button.Root intent="danger" variant="ghost">
              <Button.Label>Отменить</Button.Label>
            </Button.Root>

            <Button.Root>
              <Button.Icon size="sm" type="leading">
                <IconSave strokeWidth={4} />
              </Button.Icon>
              <Button.Label>Сохранить</Button.Label>
            </Button.Root>
          </div>
        </form>
      </Card>
    </section>
  );
}
