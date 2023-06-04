import React from "react";
import { generateNotification } from "./util";
import { Notification } from "@/utils/types";
import { NotificationItem } from "./NotificationItem";

const fakeNotifications: Notification[] = new Array(1000)
  .fill(void 0)
  .map(() => generateNotification())
  .sort((a, b) => b.date.getTime() - a.date.getTime());

export const NotificationPopupContent: React.FC = () => {
  return (
    <div>
      {fakeNotifications.map((x, i) => (
        <NotificationItem key={i} notification={x} />
      ))}
    </div>
  );
};
