export type Meal = {
  name: string;
  allergy: number[] | null;
};

export type MealOfDate = {
  date: Date;
  lunch: Meal[];
  dinner: Meal[];
};
