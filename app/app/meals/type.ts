export type Meal = {
  name: string;
  allergy: string | null;
};

export type MealOfDate = {
  date: Date;
  lunch: Meal[];
  dinner: Meal[];
};
