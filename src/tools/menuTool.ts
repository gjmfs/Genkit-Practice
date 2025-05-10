import { z, Genkit } from "genkit";

import menu from "../model/menuData";

// The function to fetch data is fine
const getAllMenuData = async () => {
  try {
    const menuItems = await menu.find();
    console.log(menuItems);
    return menuItems;
  } catch (err) {
    console.error("Error fetching menu data:", err);
    throw err;
  }
};

// Define the Zod schema for a single menu item
export const menuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
});

export const menuTool = (ai: Genkit) =>
  ai.defineTool(
    {
      name: "todaysMenu",
      description: "use this tool to retrieve all items on today's menu",
      inputSchema: z.object({}),
      outputSchema: z.object({
        menuData: z
          .array(menuItemSchema)
          .describe("A list of all items on the menu"),
      }),
    },
    async () => {
      const menuDataArray = await getAllMenuData();
      return { menuData: menuDataArray };
    }
  );
