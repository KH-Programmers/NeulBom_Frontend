import React from "react";
import { generateNotification } from "./util";
import { Notification } from "@/utils/types";
import { NotificationItem } from "./NotificationItem";
import { Virtuoso } from "react-virtuoso";

const fakeNotifications: Notification[] = new Array(10000)
  .fill(void 0)
  .map(() => generateNotification())
  .sort((a, b) => b.date.getTime() - a.date.getTime());

export const NotificationPopupContent: React.FC = () => {
  return (
    <div className="h-full">
      <Virtuoso
        height="100%"
        totalCount={fakeNotifications.length}
        itemContent={(index) => (
          <NotificationItem notification={fakeNotifications[index]} />
        )}
      />
    </div>
  );
};
