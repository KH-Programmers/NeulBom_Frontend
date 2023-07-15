import { getRelativeTimeString } from "@/utils/time";
import { Notification, NotificationType } from "@/utils/types";
import { format } from "date-fns";
import React from "react";
import { IconType } from "react-icons";
import { TbSettings } from "react-icons/tb";

const getIcon = (type: NotificationType): IconType => {
  switch (type) {
    case NotificationType.System:
      return TbSettings;
  }
};

export const NotificationItem: React.FC<{ notification: Notification }> = ({
  notification,
}) => {
  const Icon = React.useMemo(
    () => getIcon(notification.type),
    [notification.type],
  );
  const timeFormat = React.useMemo(() => {
    if (typeof window !== "undefined") {
      return getRelativeTimeString(notification.date);
    }

    return format(notification.date, "yyyy-MM-dd hh:mm");
  }, [notification.date]);

  return (
    <div className="p-4 flex gap-4">
      <div className="w-12 h-12 bg-black/10 rounded-full flex justify-center items-center text-black/60">
        <Icon size={24} />
      </div>
      <div className="flex-grow w-0">
        <div className="text-base font-semibold">{notification.title}</div>
        <div className="text-sm">{notification.description}</div>
        <div className="text-sm text-black/60 mt-2">{timeFormat}</div>
      </div>
    </div>
  );
};
