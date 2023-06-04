import { Notification, NotificationType } from "@/utils/types";
import { faker } from "@faker-js/faker";

export const generateNotification = (): Notification => {
  return {
    type: NotificationType.System,
    date: faker.date.recent({ days: 365 }),
    title: faker.lorem.words(4),
    description: faker.lorem.paragraph(),
  };
};
