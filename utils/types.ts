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

export const Allergy = [
  "달걀",
  "우유",
  "메밀",
  "땅콩",
  "대두",
  "밀",
  "고등어",
  "게",
  "새우",
  "돼지고기",
  "복숭아",
  "토마토",
  "아황산",
  "호두",
  "닭고기",
  "쇠고기",
  "오징어",
  "조개류",
  "굴",
  "홍합",
  "전복",
  "잣",
];

export function getAllergy(allergies: number[]): string {
  return allergies.map((x) => Allergy[x - 1]).join(", ");
}
