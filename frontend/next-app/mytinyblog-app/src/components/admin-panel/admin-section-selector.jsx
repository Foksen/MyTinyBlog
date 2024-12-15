import { Text } from "@tailus-ui/typography";
import { AdminSectionPosts } from "./admin-section-posts";
import { AdminSectionAdmins } from "./admin-section-admins";
import { AdminSectionSettings } from "./admin-section-settings";
import { AdminSectionSubscribers } from "./admin-section-subscribers";
import { AdminSectionMonitoring } from "./admin-section-monitoring";

export function AdminSectionSelector({ sectionName }) {
  switch (sectionName) {
    case "settings":
      return <AdminSectionSettings />;
    case "posts":
      return <AdminSectionPosts />;
    case "admins":
      return <AdminSectionAdmins />;
    case "subscribers":
      return <AdminSectionSubscribers />;
    case "monitoring":
      return <AdminSectionMonitoring />;
    default:
      return (
        <Text size="xl" weight="bold">
          AdminSection not found
        </Text>
      );
  }
}
