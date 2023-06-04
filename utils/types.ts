export enum NotificationType {
  System = "system",
}

export interface SystemNotification extends NotificationBase {
  type: NotificationType.System;

  title: string;
  description?: string;
}

export interface NotificationBase {
  date: Date;
}

export type Notification = SystemNotification;
