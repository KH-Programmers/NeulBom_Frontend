"use client";

import React from "react";
import { Command } from "cmdk";
import { TbPencil, TbSearch, TbUser } from "react-icons/tb";

export const CommandPalette: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
        console.log("wow");
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Command.Dialog
      label="메뉴"
      shouldFilter={false}
      onOpenChange={setOpen}
      open={open}
    >
      <Command.Input onValueChange={setValue} value={value} />
      <Command.List>
        {value && (
          <Command.Group heading="검색" inputMode="search">
            <Command.Item value="search">
              <TbSearch size={20} />
              <div>
                {"'"}
                {value}
                {"'"} 검색
              </div>
            </Command.Item>
            <Command.Item value="search-post">
              <TbPencil size={20} />
              <div>
                {"'"}
                {value}
                {"'"} 포스트 검색
              </div>
            </Command.Item>
            <Command.Item value="search-user">
              <TbUser size={20} />
              <div>
                {"'"}
                {value}
                {"'"} 유저 검색
              </div>
            </Command.Item>
          </Command.Group>
        )}
      </Command.List>
    </Command.Dialog>
  );
};
