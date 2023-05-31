import { useParams } from "next/navigation";

export const useSelectedCategory = () => {
  const params = useParams();

  if ("category" in params) {
    return params.category as string;
  }

  return "all";
};
